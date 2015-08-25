var keystone = require('keystone'),
	Platform = keystone.list('Platform');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	view.on('init', function(next) {
		Platform.model.find()
			.exec(function(err, data) {
				locals.platforms = data;
				next();
			});
	});
	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';

	// Render the view
	view.render('index');

};
