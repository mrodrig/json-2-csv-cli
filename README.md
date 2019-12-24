# json-2-csv-cli
**Convert JSON to CSV _or_ CSV to JSON**

This module provides the command line interface functionality for the [json-2-csv](https://www.npmjs.org/package/json-2-csv) package.

[![Dependencies](https://img.shields.io/david/mrodrig/json-2-csv-cli.svg)](https://www.npmjs.org/package/@mrodrig/json-2-csv-cli)
[![Downloads](http://img.shields.io/npm/dm/@mrodrig/json-2-csv-cli.svg)](https://www.npmjs.org/package/@mrodrig/json-2-csv-cli)
[![NPM version](https://img.shields.io/npm/v/@mrodrig/json-2-csv-cli.svg)](https://www.npmjs.org/package/@mrodrig/json-2-csv-cli)
[![Known Vulnerabilities](https://snyk.io/test/npm/@mrodrig/json-2-csv-cli/badge.svg)](https://snyk.io/test/npm/@mrodrig/json-2-csv-cli)
[![Package Size](https://img.shields.io/bundlephobia/min/@mrodrig/json-2-csv-cli.svg)](https://www.npmjs.org/package/@mrodrig/json-2-csv-cli)

## Installation

CLI:
```bash
$ npm install @mrodrig/json-2-csv-cli
```

## Usage
### json2csv
```
Usage: json2csv <jsonFile> [options]

Options:
  -V, --version                    output the version number
  -o, --output [output]            Path of output file. If not provided, then stdout will be used
  -f, --field <delimiter>          Optional field delimiter
  -w, --wrap <delimiter>           Optional wrap delimiter
  -e, --eol <delimiter>            Optional end of line delimiter
  -b, --excel-bom                  Excel Byte Order Mark character prepended to CSV
  -W, --without-header             Withhold the prepended header
  -s, --sort-header                Sort the header fields
  -H, --trim-header                Trim header fields
  -F, --trim-fields                Trim field values
  -S, --check-schema               Check for schema differences
  -E, --empty-field-value <value>  Empty field value
  -A, --expand-array-objects       Expand array objects
  -k, --keys [keys]                Keys of documents to convert to CSV
  -h, --help                       output usage information
```

### csv2json
```
Usage: csv2json <csvFile> [options]

Options:
  -V, --version            output the version number
  -c, --csv <csv>          Path of json file to be converted
  -o, --output [output]    Path of output file. If not provided, then stdout will be used
  -f, --field <delimiter>  Optional field delimiter
  -w, --wrap <delimiter>   Optional wrap delimiter
  -e, --eol <delimiter>    Optional end of line delimiter
  -b, --excel-bom          Excel Byte Order Mark character prepended to CSV
  -H, --trim-header        Trim header fields
  -F, --trim-fields        Trim field values
  -k, --keys [keys]        Keys of documents to convert to CSV
  -h, --help               output usage information
```
