# CSV <=> JSON parser

A simple parser that provides CSV to JSON and JSON to CSV parsing. 
Includes three commands:

- createCSVMock - generates a mock file;
- jsonToCSV - parses JSON file into CSV file;
- csvToJSON - parses CSV file into JSON file. 

---

## Installation

```bash
npm i testing_csv_node_parser -g
```
---

## Usage

> Note: **Parser is not working with the nested JSON/CSV data.**

## Generating a mock file

To generate a mock file use the following command:

```
csv-parser createCSVMock --mockPath "./mock.csv" --size 20
```

### Options

| Option | Default | Description|
|--------|---------|------------|
| `--mockPath` | **required**  | A path to a *.csv mock file. If there is no such file the new one will be created. |
| `--size` | 800 | File size in MB | 

---

## Parsing CSV to JSON file

To parse a *.csv file to *.json use the following command:

```
csv-parser csvToJSON --sourceFile "./mock.csv" --resultFile "./mock.json" --separator ","
```

### Options

| Option | Default | Description|
|--------|---------|------------|
| `--sourceFile` | **required**  | A path to a *.csv file. |
| `--resultFile` | **required**  | A path to a *.json file. If there is no such file the new one will be created. | 
| `--separator`  |   | A string that identifies character to use in separating the strings in *.csv files. |

---

## Parsing JSON to CSV file

To parse a *.csv file to *.json use the following command:

```
csv-parser jsonToCSV --sourceFile "./mock.csv" --resultFile "./mock.json" --separator ","
```

### Options

| Option | Default | Description|
|--------|---------|------------|
| `--sourceFile` | **required**   | A path to a *.json file. |
| `--resultFile` | **required**  | A path to a *.csv file. If there is no such file the new one will be created. | 
| `--separator`  | "," | A string that identifies character to use in separating the strings in *.csv files. |

---

## Mock file example 

```
cdatetime,address,district,beat,grid,crimedescr,ucr_ncic_code,latitude,longitude
1/1/06 0:00,1326 HELMSMAN WAY,1,1B,444,1708 US THEFT OF MAIL,2310,38.60960217,-121.4918375
1/1/06 0:00,2315 STOCKTON BLVD,6,6B,1005,ASSAULT WITH WEAPON - I RPT,7000,38.55426406,-121.4546045
1/1/06 0:00,5112 63RD ST,6,6B,1088,530.5 PC USE PERSONAL ID INFO,2604,38.52816497,-121.4314528
1/1/06 0:00,6351 DRIFTWOOD ST,4,4C,1261,SUSP PERS-NO CRIME - I RPT,7000,38.51092155,-121.5488201
1/1/06 0:00,7721 COLLEGE TOWN DR,3,3C,888,530.5 PC USE PERSONAL ID INFO,2604,38.55611545,-121.4142729
1/1/06 0:00,8460 ROVANA CIR,6,6C,1447,484G(B) PC ACCESS CARD FRAUD,2605,38.50398051,-121.3923987
```
