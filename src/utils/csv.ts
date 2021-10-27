import fs from  "fs";
import path from  "path";
import json2csv from 'json2csv'

// Constructor method to assist our ReadFileSync
const readFileSync = (filePath: string) => {
    if (fs.existsSync(filePath)) {
        return fs.readFileSync(filePath, {encoding: "utf-8"});
    } else {
        throw  new Error(`No such file ${filePath}`)
    }
}

const findWord = async (text: string, filePath: string) => {
    const result = await readFileSync(path.join(__dirname, filePath));
    return Promise.resolve(RegExp("\\b" + text + "\\b").test(result));
};

// 循环创建目录
const makeDirs = (pathStr: string) => {
    if (fs.existsSync(pathStr)) {
        return true
    } else {
        if (makeDirs(path.dirname(pathStr))) {
            fs.mkdirSync(pathStr)
            return true
        }
    }
}

export const getFileName = (filePath: string) => {
    const start = filePath.lastIndexOf("/") > 0 ? filePath.lastIndexOf("/") + 1 : 0;
    const end = filePath.lastIndexOf(".");
    const fileName = filePath.substring(start, end)
    return fileName
}

export const writeCsv = async (filePath: string, data: any) => {
    const pathname = filePath.substring(0, filePath.lastIndexOf("/"));
    const csvParse =  json2csv.parse
    let rows;
    // If file doesn't exist, we will create new file and add rows with headers.
    if (!fs.existsSync(filePath)) {
        rows = csvParse(data, {header: true, quote: ""});
        const isDirs = makeDirs(pathname)
        if (isDirs) {
            fs.writeFileSync(filePath, rows);
        } else {
            throw new Error("not dir");
        }
    } else {
        // Rows without headers.
        rows = csvParse(data, {header: false, quote: ""});
        // Append file function can create new file too.
        fs.appendFileSync(filePath, rows);
    }
    // Always add new line if file already exists.
    fs.appendFileSync(filePath, "\n");
}

export const writeLogCsv = async (filePath: string, data: any) => {
    const pathname = filePath.substring(0, filePath.lastIndexOf("/")+1);
    const fileLogName = getFileName(filePath)+".log.csv"
    await writeCsv(pathname+fileLogName,data)
}

export const convertToMap = (data: string,separator="\r\n") => {
    const table = [];
    const rows = data.split(separator);
    const header = rows[0].split(",")
    for (let i = 1; i < rows.length - 1; i++) {
        const info = rows[i].split(",")
        const _obj = {}
        header.map((val, index) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            _obj[val] = info[index]
        })
        table.push(_obj);
    }
    return table;
}

export function  getCsv(path: string) {
    const data = readFileSync(path)
    return convertToMap(data.toString())
}

export function  getLogCsv(path: string) {
    const data = readFileSync(path)
    return convertToMap(data.toString(),"\n")
}
//
// ;
// (async () => {
//     try {
//         await writeCsv("log1.csv", [{"CryptoKitties": 1}])
//     } catch (e) {
//         console.log(e)
//     }
//
// })()


