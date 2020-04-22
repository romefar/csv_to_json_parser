const { possibleSep: availableSeparators } = require('../config')

const separatorDetector = (firstRow, secondRow, separator = null) => {
  const firstRowMap = new Map()
  const secondRowMap = new Map()
  const possibleSep = separator ? [separator] : availableSeparators

  possibleSep.forEach(item => firstRowMap.set(item, firstRow.split(item).length))
  possibleSep.forEach(item => secondRowMap.set(item, secondRow.split(item).length))
  const [firstSep, firstSepCount] = [...firstRowMap.entries()].reduce((acc, item) => item[1] > acc[1] ? item : acc)
  const [secondSep, secondSepCount] = [...secondRowMap.entries()].reduce((acc, item) => item[1] > acc[1] ? item : acc)

  if (firstSep === secondSep && firstSepCount === secondSepCount && firstSepCount !== 1 && secondSepCount !== 1) {
    return firstSep
  } else if (!separator) {
    return new Error("Couldn't determine a separtor.")
  } else {
    return new Error("Couldn't parse a *.csv file with the given separator.")
  }
}

module.exports = {
  separatorDetector
}
