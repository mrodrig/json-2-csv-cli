#!/usr/bin/env node

'use strict';

const pkg = require('../package.json'),
    utils = require('./utils/utils'),
    { program } = require('commander');

program
    .version(pkg.version)
    .usage('<jsonFile> [options]')
    .argument('<jsonFile>', 'JSON file to convert')
    .option('-o, --output [output]', 'Path of output file. If not provided, then stdout will be used', utils.convertToAbsolutePath)
    .option('-S, --check-schema', 'Check for schema differences')
    .option('-f, --field <delimiter>', 'Field delimiter')
    .option('-w, --wrap <delimiter>', 'Wrap delimiter')
    .option('-e, --eol <delimiter>', 'End of Line delimiter')
    .option('-E, --empty-field-value <value>', 'Empty field value')
    .option('-d, --escape-header-nested-dots', 'Escape header nested dots')
    .option('-b, --excel-bom', 'Excel Byte Order Mark character prepended to CSV')
    .option('-x, --exclude-keys [keys]', 'Comma separated list of keys to exclude', utils.constructKeysList)
    .option('-A, --expand-array-objects', 'Expand array objects')
    .option('-W, --without-header', 'Withhold the prepended header')
    .option('-p, --prevent-csv-injection', 'Prevent CSV Injection')
    .option('-s, --sort-header', 'Sort the header fields')
    .option('-F, --trim-fields', 'Trim field values')
    .option('-H, --trim-header', 'Trim header fields')
    .option('-U, --unwind-arrays', 'Unwind array values to their own CSV line')
    .option('-I, --iso-date-format', 'Use ISO 8601 date format')
    .option('-L, --locale-format', 'Use locale format for values')
    .option('-B, --wrap-booleans', 'Wrap booleans')
    .option('-k, --keys [keys]', 'Keys of documents to convert to CSV', utils.constructKeysList)
    .parse(process.argv);

const options = program.opts();

Promise.resolve({
    json: utils.readInputFile(program.args && program.args.length && program.args[0]),
    output: options.output,
    options: {
        delimiter: {
            field: options.field,
            wrap: options.wrap,
            eol: options.eol
        },
        emptyFieldValue: options.emptyFieldValue,
        escapeHeaderNestedDots: Boolean(options.escapeHeaderNestedDots),
        excelBOM: Boolean(options.excelBom),
        excludeKeys: options.excludeKeys,
        prependHeader: !options.withoutHeader,
        preventCsvInjection: Boolean(options.preventCsvInjection),
        sortHeader: Boolean(options.sortHeader),
        trimHeaderFields: Boolean(options.trimHeader),
        trimFieldValues: Boolean(options.trimFields),
        checkSchemaDifferences: Boolean(options.checkSchema),
        expandArrayObjects: Boolean(options.expandArrayObjects),
        unwindArrays: Boolean(options.unwindArrays),
        useDateIso8601Format: Boolean(options.isoDateFormat),
        useLocaleFormat: Boolean(options.localeFormat),
        wrapBooleans: Boolean(options.wrapBooleans),
        keys: options.keys
    }
})
    .then(utils.parseInputFiles)
    .then(utils.determineConverter)
    .then(utils.performConversion)
    .then(utils.processOutput);
