const fs = require('fs')
const { ParseCSVStream, ParseJSONStream } = require('../streams/')
const { bodyMockFilePath, mockFilePath, headerMockFilePath } = require('../config')
const { errorLog, warningLog, successLog } = require('../utils')

class Parser {
  constructor () {
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
  parseCSV (srcPath, destPath, separator) {
    try {
      const srcFleSize = fs.statSync(srcPath).size
      const csvStream = new ParseCSVStream({}, srcFleSize, separator)
      warningLog('Starting parsing...')

      fs.createReadStream(srcPath)
        .on('error', (err) => this._errorHandler(err, srcPath))
        .pipe(csvStream)
        .on('error', (err) => this._errorHandler(err))
        .pipe(fs.createWriteStream(destPath))
        .on('error', (err) => this._errorHandler(err, destPath))
        .on('finish', () => {
          successLog('Parsing was successfully finished.')
        })
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
  parseJSON (srcPath, destPath, separator) {
    try {
      const jsonStream = new ParseJSONStream({}, separator)
      warningLog('Starting parsing...')

      fs.createReadStream(srcPath)
        .on('error', (err) => this._errorHandler(err, srcPath))
        .pipe(jsonStream)
        .on('error', (err) => this._errorHandler(err))
        .pipe(fs.createWriteStream(destPath))
        .on('error', (err) => this._errorHandler(err, destPath))
        .on('finish', () => {
          successLog('Parsing was successfully finished.')
        })
    } catch (error) {
      return this._errorHandler(error, srcPath)
    }
  }

  _errorHandler (err, fileName) {
    if (err.code === 'ENOENT') {
      if (fileName) {
        errorLog(`A ${fileName} does not exist! Check your command line arguments.`)
      } else {
        errorLog('File does not exist! Check your command line arguments.')
      }
    } else {
      errorLog(err.message)
    }
  }

  /**
     * Generates a mock file with the given size in Mb.
     * @param {number} [mockSize = 800] - Approximately mock file size in MB.
     * @param {string} customPath - A path to a mock file. If file doesn't exist than it will be created.
     */
  generateMockFile (mockSize = 800, customPath) {
    try {
      warningLog(`Creating a mock file with size of ~${mockSize} MB.`)
      const header = fs.readFileSync(this._headerMockFilePath, { encoding: 'utf-8' })
      const body = fs.readFileSync(this._bodyMockFilePath, { encoding: 'utf-8' })
      const bodySize = fs.statSync(this._bodyMockFilePath).size
      const steps = Math.floor(mockSize * 1000000.0 / bodySize)
      const path = customPath || this._mockFilePath
      const file = fs.createWriteStream(path)
        .on('finish', () => {
          successLog(`A mock file ${path} was successfully created with size of ${Math.floor(fs.statSync(path).size / 1000000.0)} MB.`)
        })

      file.write(header)
      for (let i = 0; i < steps; i++) {
        file.write('\n' + body)
      }
      file.end()
    } catch (error) {
      return this._errorHandler(error)
    }
  }
}

module.exports = Parser
