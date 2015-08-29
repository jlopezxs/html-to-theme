var fs = require('fs'),
    keystone = require('keystone'),
    ReplaceTag = keystone.list('ReplaceTag'),
    cheerio = require('cheerio'),
    Q = require('q');

exports = module.exports = function(req, res) {

    var filePath = req.files.file.path;

    var generateDataAttr = function(string, key, value) {
        return string.replace(new RegExp('{' + key + '}', 'g'), value);
    };

    var getReplaceTags = function(platform) {
        var deferred = Q.defer();

        ReplaceTag.model.find()
            .where('platform', platform)
            .exec(function(err, data) {
                console.log(data);
                deferred.resolve(data);
            });

        return deferred.promise;
    };

    var replaceTags = function(html, tags) {
        var $ = cheerio.load(html);
        var DATA = '[data-value="{tag}"]';
        var DATA_ATTR = 'tag';
        var tagSelector;


        if (tags.length > 0) {
            tags.forEach(function(element) {
                tagSelector = generateDataAttr(DATA, DATA_ATTR, element.tag);

                $(tagSelector).filter(function() {
                    var $tagElement = $(this);
                    $tagElement.html(element.replace);
                });

                html = $.html();

                console.log(html);
            });
        } else {
            console.log('EMPTY!');
        }
    };

    fs.readFile(filePath, 'utf-8', function(err, data) {
        if (err) throw err;

        var platform = req.body.platform;

        getReplaceTags(platform).then(function(tags) {
            replaceTags(data.replace(/\n/g, ''), tags);
        });
    });

    res.redirect('/');
};
