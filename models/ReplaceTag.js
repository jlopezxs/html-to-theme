var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * ReplaceTag Model
 * ==========
 */

var ReplaceTag = new keystone.List('ReplaceTag');

ReplaceTag.add({
  name: { type: String, required: true, index: true },
  platform: { type: Types.Relationship, ref: 'Platform'},
	tag: { type: Types.Html, index: true, default: '' },
  replace: { type: Types.Html, index: true, default: '' },
	createdAt: { type: Date, default: Date.now }
});

/**
 * Registration
 */

ReplaceTag.defaultColumns = 'platform, tag, replace';
ReplaceTag.register();
