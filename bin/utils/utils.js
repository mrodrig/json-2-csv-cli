'use strict';

const path = require('path'),
    fs = require('fs'),
    converter = require('json-2-csv');

module.exports = {
    constructKeysList,
    readInputFile,
    convertToAbsolutePath,
    parseInputFiles,
    determineConverter,
    performConversion,
    processOutput
};

function convertToAbsolutePath(filePath) {
    if (filePath && !path.isAbsolute(filePath)) {
        return path.join(process.cwd(), filePath);
    }
    return filePath;
}

function readInputFile(filePath) {
    filePath = convertToAbsolutePath(filePath);
    return fs.readFileSync(filePath).toString();
}

function parseInputFiles(params) {
    if (params.json) {
        params.json = JSON.parse(params.json);
    }
    return params;
}

function determineConverter(params) {
    if (params.json) {
        params.conversion = 'json2csv';
        params.converter = converter.json2csvAsync;
    } else if (params.csv) {
        params.conversion = 'csv2json';
        params.converter = converter.csv2jsonAsync;
    } else {
        return Promise.reject('No data provided for conversion');
    }

    return params;
}

function performConversion(params) {
    switch (params.conversion) {
        case 'json2csv':
            return params.converter(params.json, params.options)
                .then((outputData) => {
                    params.outputData = outputData;
                    return params;
                });
        case 'csv2json':
            return params.converter(params.csv, params.options)
                .then((outputData) => {
                    params.outputData = outputData;
                    return params;
                });
        default:
            return Promise.reject('Invalid conversion specified.');
    }
}

function writeToFile(filePath, data) {
    fs.writeFileSync(filePath, data);
}

function processOutput(params) {
    if (params.output && params.json) {
        // Write the raw output data when converting from JSON to CSV
        return writeToFile(params.output, params.outputData);
    } else if (params.output) {
        // Pretty print the output when converting from CSV to JSON
        return writeToFile(params.output, JSON.stringify(params.outputData, null, 4));
    }

    // Otherwise, no output specified, convert to valid JSON string, send to stdout via the console
    if (typeof params.outputData === 'object') { // JSON
        console.log(JSON.stringify(params.outputData, null, 2)); // eslint-disable-line no-console
    } else { // CSV
        console.log(params.outputData);
    }
    
}

function constructKeysList(key, keys) {
    // Initialize as empty array, if undefined at start
    if (!keys) {
        keys = [];
    }

    keys.push(key);
    return keys;
}
