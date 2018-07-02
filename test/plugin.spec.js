const assert = require('chai').assert;

const PouchDB = require('pouchdb');
PouchDB.plugin(require('pouchdb-adapter-memory'));
PouchDB.plugin(require('../src/plugin'));

describe('pouchdb-checksum', function() {
  let original;
  let duplicate;

  beforeEach(() => {
    original = new PouchDB('this', { adapter:'memory' });
    duplicate = new PouchDB('that', { adapter:'memory' });
  });

  it('should generate a known hash for an empty database', () =>
    // given
    dbWithoutDocs()
      .then(db => assertHash(db, 'da39a3ee5e6b4b0d3255bfef95601890afd80709')));

  it('should generate a known hash for a database with content', () =>
    // given
    dbWithDocs({ _id:'1' }, { _id:'2' })
      .then(db => assertHash(db, '07a05974f19ee5a490238d04aa2dc9020d03d749')));

  it('should generate an identical hash for a duplicated db', () =>
    // given
    dbWithDocs({ _id:'1' }, { _id:'2' })
      .then(original => {
        const duplicate = new PouchDB(randomDbName(), { adapter:'memory' });
        return original.replicate.to(duplicate)
          .then(() => assertHash(duplicate, '07a05974f19ee5a490238d04aa2dc9020d03d749'));
        }));
});

function dbWithoutDocs() {
  return Promise.resolve(new PouchDB(randomDbName(), { adapter:'memory' }));
}

function dbWithDocs(...docs) {
  return dbWithoutDocs()
    .then(db => db.bulkDocs(docs).then(() => db));
}

function assertHash(db, expected) {
  return db.checksum()
    .then(actual => assert.equal(actual, expected));
}
function randomDbName() { return `db-${Math.random()}`; }
