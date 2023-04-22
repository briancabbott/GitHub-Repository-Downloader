#!/usr/bin/env python3

# The path-filtering orb takes a TSV formatted string to
# correlate Git changes in a path to a CircleCI workflow to run
#
# In many cases - including this script - we don't have a _path_ to filter, but some other precondition we need to turn on and off. Thus we render mustache templates with our job information
#
# To provide a similar mechanism as path-filtering, this script takes TSV files and turns those TSV records into objects, which is then passed to mustache through the "items" array. Field names are taken from the header row in the TSV file input
#

import chevron

import sys
import csv
import os


def main(template_file, tsv_file):
    item = []
    with open(tsv_file) as tsvf:
        items = csv.DictReader(tsvf, delimiter="\t")

        items_list = list(items)
        if (len(items_list) > 0):
            with open(template_file) as templatef:
                print(chevron.render(templatef, {"items": items_list}))


def process_path(x):
    return os.path.abspath(os.path.expanduser(os.path.expandvars(x)))


main(process_path(sys.argv[1]), process_path(sys.argv[2]))
