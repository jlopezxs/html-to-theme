var fs = require('fs'),
    keystone = require('keystone'),
    ReplaceTag = keystone.list('ReplaceTag'),
    cheerio = require('cheerio');

exports = module.exports = function(req, res) {

    var filePath = req.files.file.path,
        platform = req.body.platform,
        html;

    fs.readFile(filePath, 'utf-8', function(err, data) {
        if (err) throw err;

        html = data.replace(/\n/g, '');

        var $ = cheerio.load(html);

        ReplaceTag.model.find()
            .where('platform', platform)
            .exec(function(err, tags) {
                var DATA = 'data-value';

                if (tags.length > 0) {
                    tags.forEach(function(element) {
                        var tagName = DATA + '="' + element.tag + '"';
                        $('[' + tagName + ']').filter(function() {
                            var $tagElement = $(this);
                            $tagElement.html(element.replace);
                        });
                        html = $.html();
                        console.log(html);
                    });
                } else {
                    console.log('EMPTY!');
                }
            });
    });

    res.redirect('/');
};
