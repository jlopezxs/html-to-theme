var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Platform Model
 * ==========
 */

var Platform = new keystone.List('Platform');

Platform.add({
	name: { type: String, required: true, index: true },
	createdAt: { type: Date, default: Date.now },
	state: { type: Types.Select, options: 'draft, published', default: 'draft', index: true },
  version: { type: Types.Number}
});

/**
 * Registration
 */

Platform.defaultColumns = 'name, createdAt, state, version';
Platform.register();
