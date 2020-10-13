# Prime CSV Generator

This is a rudimentary tool to create test CSV files for the prototype Data Input project, with the
following assumptions:

1. Use the YAML API schema reference as a starting point for the CSV columns
2. Generate as many rows as desired with semi-realistic data for testing throughput/performance and
   just generally loading data into a prototype demo.
3. Generate a CSV with basic "test cases" that can be used in unit/integration testing
    * Currently this is just "null" columns
4. Be fairly easy to modify as we add fields to the schema

> There is minimal error checking in this program right yet as it's to support a prototype.

## Usage

Prepare your local version as normal (`npm install` et al). This was created with node `v12.18.3`.

Command Line Options:

* Optional: `-f, --schemafile <schemafile>` location of edited part of the YAML schema. Defaults to
  `example-schema.yaml`

* Optional: `-n, --numlines <numlines>` number of fake CSV lines to generate. Defaults to `10`.
  *Note: if you enable a test file, this number will always be set to the minimum lines to create a
  unique test case per line*

* Optional: `-tf, --testfile [boolean]` whether or not to generate a test file. Defaults to `false`.

Examples:

```
node makecsv.js -f example-schema.yaml -n 1000 | tee /tmp/1000-line-test.csv

node makecsv.js -tf | tee /tmp/test-file.csv

node makecsv.js -n 100000 > /tmp/100k-line-test.csv
```

*Notes on timing and sizing on my macbook:*

```
~/Documents/github/prime-csv-generator$ time node makecsv.js -n 100000 > /tmp/100k-line-test.csv

real    0m8.505s
user    0m7.812s
sys     0m0.734s
~/Documents/github/prime-csv-generator$ ls -alFh /tmp/100k-line-test.csv 
-rw-r--r--  1 peter.waterman  wheel    34M Oct 13 09:27 /tmp/100k-line-test.csv
~/Documents/github/prime-csv-generator$ time node makecsv.js -n 1000000 > /tmp/1mil-line-test.csv

real    1m30.481s
user    1m16.187s
sys     0m6.790s
~/Documents/github/prime-csv-generator$ ls -alFh /tmp/1mil-line-test.csv 
-rw-r--r--  1 peter.waterman  wheel   336M Oct 13 09:29 /tmp/1mil-line-test.csv
```