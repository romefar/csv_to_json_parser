const fs = require('fs') 
const path = require('path')
const { Transform } = require('stream')

class ParseCSVStream extends Transform { 
    constructor(options = {}, fileSize, separator) { 
        super(options)
        
        this.isHeader = true
        this.headers = []
        this.buffer = null
        this.isPart = false
        this.readBytes = 0
        this.allBytes = fileSize
        this.separator = separator
    }

    _transform(chunk, encoding, cb)  {
        let data = chunk.toString()
        let arr = []
        this.readBytes += chunk.length

        if(this.buffer) { 
            data = this.buffer + data
            this.buffer = null
            this.isPart = false
        }

        arr = data.split('\n')

        if(this.isHeader) { 
            this.headers = arr.shift().trim().split(this.separator)
            this.isHeader = false
        }

        let lastChar = data[data.length - 1]
        if(lastChar !== '\n' && !this.isHeader) { 
            this.isPart = true
        } 

        if(this.isPart) { 
            this.buffer = arr.pop()
        }

        let jsonItems = arr.map(item => {
            let row = item.split(this.separator)
            let jsonItem = row.map((item, i) => {
               return `\"${this.headers[i]}\" : \"${item.trim()}\"`
            })
            return `{ ${jsonItem.join(',')} }`
        })

        let jsonChunk = this.readBytes-chunk.length === 0 ? `[ ${jsonItems.join(',')}` : `${jsonItems.join(',')}` 
        jsonChunk +=  this.readBytes === this.allBytes ? '' : ',' 
        cb(null, jsonChunk) 
    }

    _flush(callback) {
        callback(null, ' ]')
    }
}

module.exports = {
    ParseCSVStream
}