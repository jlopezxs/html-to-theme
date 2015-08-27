var fs = require('fs'),
	tagsFile;

exports = module.exports = function(req, res) {
	// Path of the uploaded file
	var filePath = req.files.file.path;

	// Reading the uploaded file
	fs.readFile(filePath, 'utf-8', function(err, data) {
		if (err) throw err;

		tagsFile = {
			content:data.replace(/\n/g,'')
		};

		console.log(tagsFile);
	});

	res.redirect('/');
};
