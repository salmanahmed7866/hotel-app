const path = require("path")
const DataUri = require("datauri/parser.js")


const getDataUrl = (file) => {
    const parser = new DataUri();
    const extname = path.extname(file.originalname).toString()
    return parser.format(extname, file.buffer)
}
module.exports = getDataUrl