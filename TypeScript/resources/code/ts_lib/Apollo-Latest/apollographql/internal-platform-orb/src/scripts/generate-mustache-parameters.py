#!/usr/bin/env python3

# PORTIONS OF THIS CODE from
# https://github.com/CircleCI-Public/path-filtering-orb/blob/main/src/scripts/create-parameters.py
import json
import os
import re
import subprocess

from functools import reduce

def checkout(revision):
  """
  Helper function for checking out a branch

  :param revision: The revision to checkout
  :type revision: str
  """
  subprocess.run(
    ['git', 'checkout', revision],
    check=True
  )

output_path = os.environ.get('OUTPUT_PATH')
head = os.environ.get('CIRCLE_SHA1')
base_revision = os.environ.get('BASE_REVISION')
mapping = os.environ.get("MAPPING")
if not mapping:
    print("fallback to reading the file")
    mapping = open(os.environ.get("MAPPING_FILE")).read()
#checkout(base_revision)  # Checkout base revision to make sure it is available for comparison
# checkout(head)  # return to head commit

base = subprocess.run(
  ['git', 'merge-base', base_revision, head],
  check=True,
  capture_output=True
).stdout.decode('utf-8').strip()

if head == base:
  try:
    # If building on the same branch as BASE_REVISION, we will get the
    # current commit as merge base. In that case try to go back to the
    # first parent, i.e. the last state of this branch before the
    # merge, and use that as the base.
    base = subprocess.run(
      ['git', 'rev-parse', 'HEAD~1'], # FIXME this breaks on the first commit, fallback to something
      check=True,
      capture_output=True
    ).stdout.decode('utf-8').strip()
  except:
    # This can fail if this is the first commit of the repo, so that
    # HEAD~1 actually doesn't resolve. In this case we can compare
    # against this magic SHA below, which is the empty tree. The diff
    # to that is just the first commit as patch.
    base = '4b825dc642cb6eb9a060e54bf8d69288fbee4904'

print('Comparing {}...{}'.format(base, head))
changes = subprocess.run(
  ['git', 'diff', '--name-only', base, head],
  check=True,
  capture_output=True
).stdout.decode('utf-8').splitlines()

mappings = [
  m.split() for m in
  mapping.splitlines()
]

def check_mapping(m):
  if 3 != len(m):
    raise Exception(f"Invalid mapping ({m})")
  path, param, value = m
  regex = re.compile(r'^' + path + r'$')
  for change in changes:
    if regex.match(change):
      return True
  return False

# HERE IS THE DIVERGENCE FROM PATH-FILTERING
def convert_mapping(accumulator, current):
  """
    arguments:
      accumulator -- dictionary type. Keys and values will be passed to mustache to enrich template
      current -- array of the last two values in the matching MAPPING line. aka will be ["build-what", "one"]
  """
  parameter_name  = current[1]
  parameter_value = json.loads(current[2])

  is_parameter_an_array = isinstance(parameter_value, list)

  if is_parameter_an_array:
    parameter_array = accumulator.get(parameter_name, [])
    parameter_value_array_value = parameter_value[0]

    parameter_array.append(parameter_value_array_value)
    accumulator[parameter_name] = parameter_array
  else:
    accumulator[parameter_name] = parameter_value

  return accumulator
# END DIVERGENCE FROM PATH-FILTERING

mappings = filter(check_mapping, mappings)
mappings = reduce(convert_mapping, mappings, {})  # (I also changed this to a reduce function...)

with open(output_path, 'w') as fp:
  fp.write(json.dumps(mappings))
