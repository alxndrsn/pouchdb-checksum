`pouchdb-checksum`
==================

Generate a checksum of the data in your pouch database.

This plugin geneates a hash of the data in your pouchdb based on `_id` and `_rev` fields.  No other data is included in the hash.

# Install

	npm install pouchdb-checksum

# Usage

	const PouchDB = require('pouchdb');
	PouchDB.plugin(require('pouchdb-checksum'));

	const db = new PouchDB('my-db');
	db.checksum()
	  .then(hash => console.log('hash of my-db is', hash);
