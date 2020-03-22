const fetch = require('node-fetch')

module.exports = {
  getPage: (path) => {
  return fetch(path).then((r) => r.text()).then((r) => {
    console.log("fetched path-", path)
    return r
  })
}
}