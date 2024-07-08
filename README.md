# json-2-csv-cli
**Convert JSON to CSV _or_ CSV to JSON**

This module provides the command line interface functionality for the [json-2-csv](https://www.npmjs.org/package/json-2-csv) package.

[![NPM version](https://img.shields.io/npm/v/@mrodrig/json-2-csv-cli.svg)](https://www.npmjs.org/package/@mrodrig/json-2-csv-cli)
[![Downloads](https://img.shields.io/npm/dm/@mrodrig/json-2-csv-cli.svg)](https://www.npmjs.org/package/@mrodrig/json-2-csv-cli)

## Installation

CLI:
```bash
$ npm install -g @mrodrig/json-2-csv-cli
```

## Usage
### json2csv
```
Usage: json2csv <jsonFile> [options]

Arguments:
  jsonFile                         JSON file to convert

Options:
  -V, --version                    output the version number
  -o, --output [output]            Path of output file. If not provided, then stdout will be used
  -a, --array-indexes-as-keys      Includes array indexes in the generated keys
  -S, --check-schema               Check for schema differences
  -f, --field <delimiter>          Field delimiter
  -w, --wrap <delimiter>           Wrap delimiter
  -e, --eol <delimiter>            End of Line delimiter
  -E, --empty-field-value <value>  Empty field value
  -n, --expand-nested-objects      Expand nested objects to be deep converted to CSV
  -k, --keys [keys]                Keys of documents to convert to CSV
  -d, --escape-header-nested-dots  Escape header nested dots
  -b, --excel-bom                  Excel Byte Order Mark character prepended to CSV
  -x, --exclude-keys [keys]        Comma separated list of keys to exclude
  -A, --expand-array-objects       Expand array objects
  -W, --without-header             Withhold the prepended header
  -p, --prevent-csv-injection      Prevent CSV Injection
  -s, --sort-header                Sort the header fields
  -F, --trim-fields                Trim field values
  -H, --trim-header                Trim header fields
  -U, --unwind-arrays              Unwind array values to their own CSV line
  -I, --iso-date-format            Use ISO 8601 date format
  -L, --locale-format              Use locale format for values
  -B, --wrap-booleans              Wrap booleans
  -h, --help                       display help for command
```

### csv2json
```
Usage: csv2json <csvFile> [options]

Arguments:
  csvFile                      CSV file to convert

Options:
  -V, --version                output the version number
  -o, --output [output]        Path of output file. If not provided, then stdout will be used
  -f, --field <delimiter>      Field delimiter
  -w, --wrap <delimiter>       Wrap delimiter
  -e, --eol <delimiter>        End of Line delimiter
  -b, --excel-bom              Excel Byte Order Mark character prepended to CSV
  -p, --prevent-csv-injection  Prevent CSV Injection
  -F, --trim-fields            Trim field values
  -H, --trim-header            Trim header fields
  -h, --header-fields          Specify the fields names in place a header line in the CSV itself
  -k, --keys [keys]            Keys of documents to convert to CSV
  --help                       display help for command
```

### Memory
To increase the allowed heap size, set `max_old_space_size` in `NODE_OPTIONS`.

Linux/macOs:
```bash
export NODE_OPTIONS=--max_old_space_size=4096
```

Windows:
```cmd
set NODE_OPTIONS=--max_old_space_size=4096
```
