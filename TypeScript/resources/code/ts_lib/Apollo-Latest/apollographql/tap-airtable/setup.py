from setuptools import setup

setup(name='tap-airtable',
      version='0.0.2',
      description='Singer.io tap for extracting data from the Airtable API',
      author='AIME Mentorinng',
      url='https://singer.io',
      classifiers=['Programming Language :: Python :: 3 :: Only'],
      py_modules=['tap_airtable'],
      install_requires=[
          'backoff==1.8.0',
          'requests==2.20.1',
          'singer-python==5.12.1',
      ],
      entry_points='''
          [console_scripts]
          tap-airtable=tap_airtable:main
      ''',
      packages=['tap_airtable'],
      include_package_data=True,
    )
