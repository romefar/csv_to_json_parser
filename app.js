const fs = require('fs') 
const path = require('path')
const Parser = require('./src/parser/parser')
const fileName = "small_test_dest.csv"

// const testStream = new ParseCSVStream({}, fs.statSync(filePath).size, ',' )
// const jsonStream = new ParseJSONStream()
// fs.createReadStream('./small_test_1.json')
//     .pipe(jsonStream)
//     .pipe(fs.createWriteStream('./small_test_2.csv'))

// console.log(new Parser('ass', "asd", "asd", 40).generateMockFile())
console.log(fs.accessSync('./asdasd.txt'))