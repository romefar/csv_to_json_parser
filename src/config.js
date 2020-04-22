const path = require('path')

// Available separators.
const possibleSep = [',', '-', '_', '#', ';', ':', '|', '*', '^']
const bodyMockFilePath = path.join(__dirname, '/mocks/body-mock.csv')
const mockFilePath = path.join(__dirname, '/mocks/mock.csv')
const headerMockFilePath = path.join(__dirname, '/mocks/header-mock.csv')

module.exports = {
  possibleSep,
  bodyMockFilePath,
  mockFilePath,
  headerMockFilePath
}
