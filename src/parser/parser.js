const { ParseCSVStream, ParseJSONStream } = require('../streams/')
const { bodyMockFilePath, mockFilePath, headerMockFilePath } = require('../config')
const fs = require('fs')

class Parser {

    constructor() { 
        this._headerMockFilePath = headerMockFilePath
        this._bodyMockFilePath = bodyMockFilePath
        this._mockFilePath = mockFilePath
    }

    /**
     * Parse the given *.csv file into *.json file.
     * @param {string} srcPath - A full path to your *.csv file. 
     * @param {string} destPath - A full path to your destination *.json file. If there is no such file the new one will be created.
     * @param {string} [separator=auto] - A string that identifies character or characters to use in separating the string in *.csv file.
     */
    parseCSV(srcPath, destPath, separator = null) { 
        try {
            const srcFleSize = fs.statSync(srcPath).size 
            const csvStream = new ParseCSVStream({}, srcFleSize, separator)

            fs.createReadStream(srcPath)
                .pipe(csvStream)
                .pipe(fs.createWriteStream(destPath))

        } catch (error) {
            return this._errorHandler(error, srcPath)
        }
    }

    /**
     * Parse the given *.json file into *.csv file.
     * @param {string} srcPath - A full path to your *.csv file. 
     * @param {string} destPath - A full path to your destination *.json file. If there is no such file the new one will be created.
     * @param {string} [separator=auto] - A string that identifies character or characters to use in separating the string in *.csv file.
     */
    parseJSON(srcPath, destPath, separator = null) { 
        try {
            const jsonStream = new ParseJSONStream({}, separator)

            fs.createReadStream(srcPath)
                .pipe(jsonStream)
                .pipe(fs.createWriteStream(destPath))
                
        } catch (error) {
            return this._errorHandler(error, srcPath)
        }
    }

    _errorHandler(err, fileName) { 
        if(err.code === "ENOENT") { 
            console.log(`${fileName} does not exist!`)
        } else { 
            console.log(err)
        }
    }

    /**
     * Generates a mock file with the given size in Mb.
     * @param {number} mockSize - Approximately mock file size in Mb.
     */
    generateMockFile(mockSize = 800) { 
        const header = fs.readFileSync(this._headerMockFilePath, { encoding : 'utf-8' })
        const body = fs.readFileSync(this._bodyMockFilePath, { encoding : 'utf-8' })
        const bodySize = fs.statSync(this._bodyMockFilePath).size
        const steps = Math.floor(mockSize * 1000000.0 / bodySize)
        const file = fs.createWriteStream(this._mockFilePath)
        
        file.write(header)
        for (let i = 0; i < steps; i++) {
            file.write(body)
        }
        file.end()
    }
}

module.exports = Parser