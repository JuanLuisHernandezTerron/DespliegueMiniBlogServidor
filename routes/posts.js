var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var db = mongoose.connection;
var User = require("../models/User");
var posts = require("../models/Post");

router.post('/', function(req, res, next) {
    User.findById(req.body.iduser, function(err, userinfo) {
      if (err) res.status(500).send(err);
      else {
          // crear la instancia Post
          var postInstance = new posts({
            iduser: req.body.iduser,
            title: req.body.title,
            description: req.body.description
          });
          // añadir postInstance al array de posts del usuario
          userinfo.posts.push(postInstance);
          // salvar el post en las colecciones users y posts
          userinfo.save(function(err) {
            if (err) res.status(500).send(err);
            else {
              postInstance.save(function(err) {
                if (err) res.status(500).send(err);
                res.sendStatus(200);
              });
            }
          });
        }
    });
});

router.get('/', function(req, res, next) {
    posts.find().sort('-publicationdate').populate('user').exec(function(err, posts) {
    if (err) res.status(500).send(err);
    else res.status(200).json(posts);
    });
});

module.exports = router;