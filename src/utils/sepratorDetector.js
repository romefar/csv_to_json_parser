const { possibleSep:availableSeparators } = require('../config')

const separatorDetector = ([firstRow, secondRow]) => {
    let firstRowMap = new Map()
    let secondRowMap = new Map()
    let possibleSep = availableSeparators

    possibleSep.forEach(item => firstRowMap.set(item, firstRow.split(item).length))
    possibleSep.forEach(item => secondRowMap.set(item, secondRow.split(item).length))
    let [firstSep, firstSepCount] = [...firstRowMap.entries()].reduce((acc, item) => item[1] > acc[1] ? item : acc)
    let [secondSep, secondSepCount] = [...secondRowMap.entries()].reduce((acc, item) => item[1] > acc[1] ? item : acc)

    if(firstSep === secondSep && firstSepCount === secondSepCount) { 
        return firstSep
    } else { 
        throw new Error("Couldn't determine a separtor.")
    }
} 

module.exports = { 
    separatorDetector
}
