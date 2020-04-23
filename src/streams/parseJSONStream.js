const { Transform } = require('stream')

class ParseJSONStream extends Transform {
  /**
     * A custom transform stream to parse *.json to *.csv files.
     * @param {object} options - Options object passed to both Writable and Readable constructors.
     * @param {string} [separator = ','] - A string that identifies character or characters to use in separating the strings in *.csv files.
     */
  constructor (options = {}, separator) {
    super(options)
    this._isFirstChunk = true
    this._headers = []
    this._buffer = null
    this._arr = []
    this._separator = separator
  }

  _transform (chunk, encoding, cb) {
    let rawJSONString = this._formatJSON(chunk.toString())
    if (this._buffer) rawJSONString = this._buffer + rawJSONString

    this._arr = rawJSONString.split('},{')
    this._separator = this._separator || ','
    this._buffer = this._arr.pop()

    if (this._isFirstChunk) this._headers = this._parseHeaders()

    const parsedJSON = this._parseJSONBody()
    const csvData = this._isFirstChunk ? `${this._headers.join(',')}${parsedJSON}` : parsedJSON
    this._isFirstChunk = false
    cb(null, csvData)
  }

  _formatJSON (jsonString) {
    return jsonString.replace(/\s\s+/g, ' ')
      .replace(/}, {/g, '},{')
  }

  _replaceQuotesAndTrim (jsonString) {
    return jsonString.trim().replace(/"/g, '')
  }

  _parseHeaders () {
    // TODO: potentially error!
    const rawJSONHeaders = this._arr[0].split(',')
    const headers = rawJSONHeaders.map((item, i) => {
      if (i === 0) item = item.slice(4)
      let headerItem = item.split(':')
      headerItem = this._replaceQuotesAndTrim(headerItem[0])
      return headerItem
    })
    return headers
  }

  _splitJSONPair (jsonString) {
    const index = jsonString.split('').findIndex(item => item === ':')
    const [, value] = [jsonString.slice(0, index), jsonString.slice(index + 1)]
    return value
  }

  _parseJSONBody (isLastChunk = false) {
    const arr = isLastChunk ? [this._buffer] : this._arr
    const csvData = arr.map(item => {
      const row = item.split(',')
      const csvItem = row.map((item, i) => {
        if (isLastChunk && i === row.length - 1) item = item.replace(/[\]}]/g, '')

        return this._replaceQuotesAndTrim(this._splitJSONPair(item))
      })
      return csvItem.join(this._separator)
    })
    return `\n${csvData.join('\n')}`
  }

  _flush (callback) {
    callback(null, this._parseJSONBody(true))
  }
}

module.exports = {
  ParseJSONStream
}
