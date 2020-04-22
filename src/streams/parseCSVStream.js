const { separatorDetector } = require('../utils/')
const { Transform } = require('stream')

class ParseCSVStream extends Transform {
  /**
     * A custom transform stream to parse *.csv to *.json files.
     * @param {object} options - Options object passed to both Writable and Readable constructors.
     * @param {number} fileSize - The size of the source *.csv file in bytes.
     * @param {string} separator - A string that identifies character or characters to use in separating the string in *.csv files.
     */
  constructor (options = {}, fileSize, separator) {
    super(options)
    this._isFirstChunk = true
    this._arr = []
    this._headers = []
    this._buffer = null
    this._isPart = false
    this._readBytes = 0
    this._allBytes = fileSize
    this._separator = separator
    this._streamHasData = true
  }

  _transform (chunk, encoding, cb) {
    let rawCSVString = chunk.toString()
    this._readBytes += chunk.length
    this._streamHasData = this._readBytes !== this._allBytes

    if (this._buffer) {
      rawCSVString = this._buffer + rawCSVString
      this._buffer = null
      this._isPart = false
    }

    this._arr = rawCSVString.split('\n')

    if (this._isFirstChunk) {
      this._separator = separatorDetector(this._arr[0], this._arr[1], this._separator)
      if (typeof this._separator !== 'string') {
        return this.emit('error', this._separator)
      }
      this._headers = this._arr.shift().trim().split(this._separator)
    }

    const lastChar = rawCSVString[rawCSVString.length - 1]
    if (lastChar !== '\n') {
      this._isPart = true
    } else {
      this._arr.pop()
    }

    if (this._isPart) this._buffer = this._arr.pop()

    const parsedCSV = this._parseCSVBody()

    let jsonData = this._isFirstChunk ? `[ ${parsedCSV}` : parsedCSV
    if (this._streamHasData) jsonData += ','

    this._isFirstChunk = false

    cb(null, jsonData)
  }

  _parseCSVBody (isLastChunk = false) {
    const arr = isLastChunk ? [this._buffer] : this._arr
    const jsonData = arr.map(item => {
      const row = item.split(this._separator)
      const jsonItem = row.map((item, i) => {
        return `"${this._headers[i]}" : "${item.trim()}"`
      })
      return `{ ${jsonItem.join(',')} }`
    })
    return isLastChunk ? `, ${jsonData.join(',')} ]` : jsonData.join(',')
  }

  _flush (callback) {
    callback(null, this._parseCSVBody(true))
  }
}

module.exports = {
  ParseCSVStream
}
