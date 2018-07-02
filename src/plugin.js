const crypto = require('crypto');

const byId = (a, b) => a === b ? 0 : a < b ? -1 : 1;
const updateHash = (hash, doc) => hash.update(doc.id) && hash.update(doc.value.rev);

function checksum() {
  return this.allDocs()
    .then(res => res.rows.sort(byId))
    .then(rows => rows.reduce(updateHash, crypto.createHash('sha1')))
    .then(hash => hash.digest('hex'));
}

module.exports = { checksum };
