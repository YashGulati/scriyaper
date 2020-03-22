const fs = require('fs')

module.exports = {
  writeFile: (filePath, content='') => {
    try {
      fs.writeFileSync(filePath, content)
    } catch(e) {
      console.log("Unable to write file-", filePath)
      console.log(e)
      console.log("Exiting!")
      process.exit()
    }
}
}