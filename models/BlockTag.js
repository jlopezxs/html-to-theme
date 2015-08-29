var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * BlockTag Model
 * ==========
 */

var BlockTag = new keystone.List('BlockTag');

BlockTag.add({
	name: { type: String, required: true, index: true },
	platform: { type: Types.Relationship, ref: 'Platform'},
	startTag: { type: Types.Html, index: true, default: '' },
  	fileSource: { type: Types.Html, index: true, default: '' },
	createdAt: { type: Date, default: Date.now }
});

/**
 * Registration	
 */

BlockTag.defaultColumns = 'platform, startTag, fileSource';
BlockTag.register();
