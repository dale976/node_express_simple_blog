'use strict';

var express = require('express'),
    router = express.Router();


/* GET home page. */
router.get('/', function(req, res) {
    var db = req.db,
        collection = db.get('bloglist');

    collection.find({}, {}, function(err, data) {
        res.render('index', {
            title: 'Blog',
            entries: data
        });
    });
});

// Get the article page
router.get('/article/:id', function(req, res) {

    var db = req.db,
        collection = db.get('bloglist'),
        articleId = parseInt(req.params.id);

    collection.find({ "id": articleId }, {}, function(err, data) {
        res.render('article', {
            title: data[0].title,
            blog: data[0]
        });
    });

});

// Add a blog post
router.post('/addpost', function(req, res) {
    var db = req.db,
        collection = db.get('bloglist'),
        itemCount, publishedDate = new Date();

    collection.count({}, function(err, cnt) {
        itemCount = cnt;

        collection.insert({
            'id': cnt + 1,
            'title': req.body.title,
            'body': req.body.body,
            'published': publishedDate.toDateString(),
            'author': req.body.author
        }, function(err, data) {

            res.send(
                (err === null) ? { msg: '' } : { msg: err }
            );

        });
    });
});


// Delete a blog post
router.delete('/removepost/:id', function(req, res) {
    var db = req.db,
        collection = db.get('bloglist'),
        entryToDelete = req.params.id;

    collection.remove({ '_id': entryToDelete }, function(err) {
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

module.exports = router;
