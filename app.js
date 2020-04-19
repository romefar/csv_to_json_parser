const fs = require('fs') 
const path = require('path')
const { Writable, Readable, Transform,finished } = require('stream')
const server = require("http").createServer();
const fileName = "test.csv"
const filePath = path.join(__dirname, fileName)
const header = `cdatetime,address,district,beat,grid,crimedescr,ucr_ncic_code,latitude,longitude`
let content = `\n1/1/06 0:00,3108 OCCIDENTAL DR,3,3C        ,1115,10851(A)VC TAKE VEH W/O OWNER,2404,38.55042047,-121.3914158
1/1/06 0:00,2082 EXPEDITION WAY,5,5A        ,1512,459 PC  BURGLARY RESIDENCE,2204,38.47350069,-121.4901858
1/1/06 0:00,4 PALEN CT,2,2A        ,212,10851(A)VC TAKE VEH W/O OWNER,2404,38.65784584,-121.4621009
1/1/06 0:00,22 BECKFORD CT,6,6C        ,1443,476 PC PASS FICTICIOUS CHECK,2501,38.50677377,-121.4269508
1/1/06 0:00,3421 AUBURN BLVD,2,2A        ,508,459 PC  BURGLARY-UNSPECIFIED,2299,38.6374478,-121.3846125
1/1/06 0:00,5301 BONNIEMAE WAY,6,6B        ,1084,530.5 PC USE PERSONAL ID INFO,2604,38.52697863,-121.4513383
1/1/06 0:00,2217 16TH AVE,4,4A        ,957,459 PC  BURGLARY VEHICLE,2299,38.537173,-121.4875774
1/1/06 0:00,3547 P ST,3,3C        ,853,484 PC   PETTY THEFT/INSIDE,2308,38.56433456,-121.4618826
1/1/06 0:00,3421 AUBURN BLVD,2,2A        ,508,459 PC  BURGLARY BUSINESS,2203,38.6374478,-121.3846125
1/1/06 0:00,1326 HELMSMAN WAY,1,1B        ,444,1708 US   THEFT OF MAIL,2310,38.60960217,-121.4918375
1/1/06 0:00,2315 STOCKTON BLVD,6,6B        ,1005,ASSAULT WITH WEAPON - I RPT,7000,38.55426406,-121.4546045
1/1/06 0:00,5112 63RD ST,6,6B        ,1088,530.5 PC USE PERSONAL ID INFO,2604,38.52816497,-121.4314528
1/1/06 0:00,6351 DRIFTWOOD ST,4,4C        ,1261,SUSP PERS-NO CRIME - I RPT,7000,38.51092155,-121.5488201
1/1/06 0:00,7721 COLLEGE TOWN DR,3,3C        ,888,530.5 PC USE PERSONAL ID INFO,2604,38.55611545,-121.4142729
1/1/06 0:00,8460 ROVANA CIR,6,6C        ,1447,484G(B) PC ACCESS CARD FRAUD,2605,38.50398051,-121.3923987`
//  const file = fs.createWriteStream(filePath);

const createBigFile = () => {
    file.write(header)
    for (let i = 0; i < 300; i++) {
        file.write(`
1/1/06 0:00,3108 OCCIDENTAL DR,3,3C        ,1115,10851(A)VC TAKE VEH W/O OWNER,2404,38.55042047,-121.${Math.floor(Math.random() * 300)}${i}
1/1/06 0:00,2082 EXPEDITION WAY,5,5A        ,1512,459 PC  BURGLARY RESIDENCE,2204,38.47350069,-121.${Math.floor(Math.random() * 300)}${i}
1/1/06 0:00,4 PALEN CT,2,2A        ,212,10851(A)VC TAKE VEH W/O OWNER,2404,38.65784584,-121.${Math.floor(Math.random() * 300)}${i}
1/1/06 0:00,22 BECKFORD CT,6,6C        ,1443,476 PC PASS FICTICIOUS CHECK,2501,38.50677377,-121.${Math.floor(Math.random() * 300)}${i}
1/1/06 0:00,3421 AUBURN BLVD,2,2A        ,508,459 PC  BURGLARY-UNSPECIFIED,2299,38.6374478,-121.${Math.floor(Math.random() * 300)}${i}
1/1/06 0:00,5301 BONNIEMAE WAY,6,6B        ,1084,530.5 PC USE PERSONAL ID INFO,2604,38.52697863,-121.${Math.floor(Math.random() * 300)}${i}
1/1/06 0:00,2217 16TH AVE,4,4A        ,957,459 PC  BURGLARY VEHICLE,2299,38.537173,-121.${Math.floor(Math.random() * 300)}${i}
1/1/06 0:00,3547 P ST,3,3C        ,853,484 PC   PETTY THEFT/INSIDE,2308,38.56433456,-121.${Math.floor(Math.random() * 300)}${i}
1/1/06 0:00,3421 AUBURN BLVD,2,2A        ,508,459 PC  BURGLARY BUSINESS,2203,38.6374478,-121.${Math.floor(Math.random() * 300)}${i}
1/1/06 0:00,1326 HELMSMAN WAY,1,1B        ,444,1708 US   THEFT OF MAIL,2310,38.60960217,-121.${Math.floor(Math.random() * 300)}${i}
1/1/06 0:00,2315 STOCKTON BLVD,6,6B        ,1005,ASSAULT WITH WEAPON - I RPT,7000,38.55426406,-121.${Math.floor(Math.random() * 300)}${i}
1/1/06 0:00,5112 63RD ST,6,6B        ,1088,530.5 PC USE PERSONAL ID INFO,2604,38.52816497,-121.${Math.floor(Math.random() * 300)}${i}
1/1/06 0:00,6351 DRIFTWOOD ST,4,4C        ,1261,SUSP PERS-NO CRIME - I RPT,7000,38.51092155,-121.${Math.floor(Math.random() * 300)}${i}
1/1/06 0:00,7721 COLLEGE TOWN DR,3,3C        ,888,530.5 PC USE PERSONAL ID INFO,2604,38.55611545,-121.${Math.floor(Math.random() * 300)}${i}
1/1/06 0:00,8460 ROVANA CIR,6,6C        ,1447,484G(B) PC ACCESS CARD FRAUD,2605,38.50398051,-121.${Math.floor(Math.random() * 300)}${i}`)
    }
    file.end()
}

const inStream = new Readable({
    read(size) {
        this.push(String.fromCharCode(this.currentCharCode++));
        if (this.currentCharCode > 90) {
          this.push(null);
        }
      }
})

// const outStream = new Writable({
//     write(chunk, encoding, callback) {
//         let data = chunk.toString().split('\\n')
//         data.pop()
//         let res = data.map(item => {
//             return item.split(',').map(item => item.trim())
//         })
//         console.log(res)
//         callback()
//     }
// })
// inStream.currentCharCode = 65;
// inStream.pipe(process.stdout)
// process.stdin.pipe(outStream)
// createBigFile()


// server.on("request", (req, res) => {
//     fs.readFile(filePath, (err, data) => { // ~ 4 GB RAM usage
//         if (err) throw err;

//         res.end(data);
//     });
//     // const src = fs.createReadStream(filePath)
//     // src.pipe(res)
//   });
  
//   server.listen(8000, () => {
//       console.log(`Server is up in port 8080.`)
//   });
let isHeader = true
let isFirst = true
let headers = []
let buffer = null
let isPart = false
let arr = null
let isEnd = false
let istest = 0
let size = 0
let endSize = fs.statSync(filePath).size

const parseStream = new Transform({
    transform(chunk, encoding, cb)  {
        let data = chunk.toString()
        size += chunk.length

        if(buffer) { 
            // console.log(buffer, "------" , data.split('\n')[0], data.split('\n')[0] === " ")
        //   console.log(data[0] === " ")
            data = buffer + data
            // console.log("SLICEe " + data.slice(0, 20))
            // console.log(buffer + data[0])
            // console.log(data.split('\n')[0])
            buffer = null
            isPart = false
        }
        arr = data.split('\n')
        if(isHeader) { 
            headers = arr.shift().trim().split(",")
            isHeader = false
        }

        let lastChar = data[data.length - 1]
        if(lastChar !== '\n' && !isHeader) { 
            isPart = true
        } 

        if(istest === 8) { 
            console.log(arr)
        }

        if(isPart) { 
            buffer = arr.pop()
        }

        let res = arr.map(item => {
            let row = item.split(",")
            let json = row.map((item, i) => {
               return `\"${headers[i]}\" : \"${item.trim()}\"`
            })
            return `{ ${json.join(",")} }`
        })
        let newjson = size-chunk.length === 0 ? `[ ${res.join(',')}` : `${res.join(',')}` 
        newjson +=  size === endSize ? '' : ',' 
        cb(null, newjson) 
    },

    flush(callback) {
        callback(null, ' ]')
    }
}
)

fs.createReadStream('./test.csv')
    .pipe(parseStream)
    .pipe(fs.createWriteStream('./test.json'))