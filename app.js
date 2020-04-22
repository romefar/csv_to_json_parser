const yargs = require('yargs')
const Parser = require('./src/parser/parser')
const parser = new Parser()

yargs.command({
    command: "csvToJSON",
    describe : "Parse the given *.csv file into *.json file.",
    builder: { 
        sourceFile: {
            describe: "A full path to a source *.csv file.",
            demandOption: true,
            type : "string"
        },
        resultFile: {
            describe : "A full path to a destination *.csv file.",
            demandOption: true,
            type : "string",
        },
        separator: {
            describe : "A string that identifies character to use in separating the string in *.csv files.",
            type : "string"
        }
    },
    handler({sourceFile, resultFile, separator}) { 
        parser.parseCSV(sourceFile, resultFile, separator)
    }
});

yargs.command({
    command: "jsonToCSV",
    describe : "Parse the given *.json file into *.csv file.",
    builder: { 
        sourceFile: {
            describe: "A full path to a source *.json file.",
            demandOption: true,
            type : "string"
        },
        resultFile: {
            describe : "A full path to a destination *.json file.",
            demandOption: true,
            type : "string",
        },
        separator: {
            describe : "A string that identifies character to use in separating the string in *.csv files. Default = \',\'",
            type : "string"
        }
    },
    handler({sourceFile, resultFile, separator}) { 
        parser.parseJSON(sourceFile, resultFile, separator)
    }
});

yargs.command({
    command: "createCSVMock",
    describe: "Generate a *.csv file with the given size in MB.",
    builder: { 
        mockPath: {
            describe : "A full path to a new mock file.",
            type : "string"
        }, 
        size: { 
            describe : "Mock file size in Mb (default - 800 MB).",
            type : "number"
        }
    },
    handler({mockPath, size}){
        parser.generateMockFile(size, mockPath)
    }
});

yargs.parse()