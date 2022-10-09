#!/usr/bin/env node

'use strict';

const pkg = require('../package.json'),
    utils = require('./utils/utils'),
    { program } = require('commander');

program
    .version(pkg.version)
    .usage('<jsonFile> [options]')
    .option('-o, --output [output]', 'Path of output file. If not provided, then stdout will be used', utils.convertToAbsolutePath)
    .option('-f, --field <delimiter>', 'Optional field delimiter')
    .option('-w, --wrap <delimiter>', 'Optional wrap delimiter')
    .option('-e, --eol <delimiter>', 'Optional end of line delimiter')
    .option('-b, --excel-bom', 'Excel Byte Order Mark character prepended to CSV')
    .option('-W, --without-header', 'Withhold the prepended header')
    .option('-s, --sort-header', 'Sort the header fields')
    .option('-H, --trim-header', 'Trim header fields')
    .option('-F, --trim-fields', 'Trim field values')
    .option('-S, --check-schema', 'Check for schema differences')
    .option('-E, --empty-field-value <value>', 'Empty field value')
    .option('-A, --expand-array-objects', 'Expand array objects')
    .option('-U, --unwind-arrays', 'Unwind array values to their own CSV line')
    .option('-k, --keys [keys]', 'Keys of documents to convert to CSV', utils.constructKeysList, undefined)
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
        excelBOM: Boolean(options.excelBom),
        prependHeader: !options.withoutHeader,
        sortHeader: Boolean(options.sortHeader),
        trimHeaderFields: Boolean(options.trimHeader),
        trimFieldValues: Boolean(options.trimFields),
        checkSchemaDifferences: Boolean(options.checkSchema),
        expandArrayObjects: Boolean(options.expandArrayObjects),
        unwindArrays: Boolean(options.unwindArrays),
        emptyFieldValue: options.emptyFieldValue,
        keys: options.keys
    }
})
    .then(utils.parseInputFiles)
    .then(utils.determineConverter)
    .then(utils.performConversion)
    .then(utils.processOutput);
