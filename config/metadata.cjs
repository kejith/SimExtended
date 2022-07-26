const { name, author, dependencies, repository, version } = require('../package.json')

module.exports = {
  name: name,
  namespace: 'https://kejith.de/',
  version: version,
  author: author,
  source: repository.url,
  // 'license': 'MIT',
  match: [
    'https://*.pr0game.com/*'
  ],
  require: [
    `https://cdn.jsdelivr.net/npm/jquery@${dependencies.jquery}/dist/jquery.min.js`,
    `https://cdn.jsdelivr.net/npm/toastify-js`,
  ],
  grant: ['GM_setValue', 'GM_getValue', 'GM.xmlHttpRequest', 'GM_info'],
  icon64: "https://kejith.de/images/spylard.png",
  // connect: [
  //   'httpbin.org'
  // ],
  'run-at': 'document-end'
}