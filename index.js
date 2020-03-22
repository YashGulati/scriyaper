const path = require('path')
const JSDOM = require("jsdom").JSDOM

const rest = require('./utils/rest')
const fsys = require('./utils/fsys')
const config = require('./config')

let downloadFilePath = path.join('downloads', `${config['file-name']}.json`)

fsys.writeFile(downloadFilePath)
rest.getPage(config.site).then((r) => {
  const dom = new JSDOM(r)
  const {document} = dom.window

  const rows = []
  document.querySelectorAll(config.id.selector).forEach(o => {
    rows.push({[config.id.key]: o.textContent})
  })
  console.log(rows.length, "rows found")
  rows.forEach((row, rowIdx) => {
    for (const map of config.map) {
      const value = document.querySelectorAll(map.selector)[rowIdx]
      if (null != value) {
        row[map.key] = value.textContent
      }
    }
  })
  fsys.writeFile(downloadFilePath, JSON.stringify({rows}))
})
