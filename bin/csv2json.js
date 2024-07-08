#!/usr/bin/env node

'use strict';

const pkg = require('../package.json'),
    utils = require('./utils/utils'),
    { program } = require('commander');

program
    .version(pkg.version)
    .usage('<csvFile> [options]')
    .argument('<csvFile>', 'CSV file to convert')
    .option('-o, --output [output]', 'Path of output file. If not provided, then stdout will be used', utils.convertToAbsolutePath)
    .option('-f, --field <delimiter>', 'Field delimiter')
    .option('-w, --wrap <delimiter>', 'Wrap delimiter')
    .option('-e, --eol <delimiter>', 'End of Line delimiter')
    .option('-b, --excel-bom', 'Excel Byte Order Mark character prepended to CSV')
    .option('-p, --prevent-csv-injection', 'Prevent CSV Injection') // NEW - BOOL
    .option('-F, --trim-fields', 'Trim field values')
    .option('-H, --trim-header', 'Trim header fields')
    .option('-B, --wrap-booleans', 'Wrap booleans')
    .option('-k, --keys [keys]', 'Keys of documents to convert to CSV', utils.constructKeysList, undefined)
    .parse(process.argv);

const options = program.opts();

Promise.resolve({
    csv: utils.readInputFile(program.args && program.args.length && program.args[0]),
    output: options.output,
    options: {
        delimiter: {
            field: options.field,
            wrap: options.wrap,
            eol: options.eol
        },
        excelBOM: Boolean(options.excelBom),
        preventCsvInjection: Boolean(options.preventCsvInjection),
        trimHeaderFields: Boolean(options.trimHeader),
        trimFieldValues: Boolean(options.trimFields),
        wrapBooleans: Boolean(options.wrapBooleans),
        keys: options.keys
    }
})
    .then(utils.parseInputFiles)
    .then(utils.determineConverter)
    .then(utils.performConversion)
    .then(utils.processOutput);
