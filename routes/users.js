var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var User = require("../models/User");
var db = mongoose.connection;

/* GET users listing. */

router.post('/', function(req, res, next) {
  User.create(req.body, function(err, userinfo) {
  if (err) res.status(500).send(err);
  else res.sendStatus(200);
  });
});

router.put('/:id', function(req, res, next) {
  User.findByIdAndUpdate(req.params.id, req.body, function(err,userinfo) {
  if (err) res.status(500).send(err);
  else res.sendStatus(200);
  });
});

router.delete('/:id', function(req, res, next) {
  User.findByIdAndDelete(req.params.id, function(err, userinfo) {
  if (err) res.status(500).send(err);
  else res.sendStatus(200);
  });
});

// Comprueba si el usuario existe
router.post('/signin', function(req, res, next) {
  User.findOne({ username: req.body.username }, function(err, user) {
      if (err) res.status(500).send('¡Error comprobando elusuario!');
        // Si el usuario existe...
      if (user != null) {
        user.comparePassword(req.body.password, function(err,isMatch) {
      if (err) return next(err);
    // Si el password es correcto...
    if (isMatch)
      res.status(200).send({ message: 'ok', role: user.role, id: user._id });
        else
          res.status(200).send({ message: 'la password no coincide' });
        });
      } else res.status(401).send({ message: 'usuario no registrado'
    });
  });
});
  //Buscar un usuario
router.post('/find',function(req,res){
  User.findOne({username: req.body.username, email: req.body.email},function(err,user){
   (user == null)?res.status(401).send('¡No se ha encontrado el usuario!') : res.status(200).json(user);
  })
})
// Actualizar un atributo de un usuario, cuando no se pasa nada por parametro, el put hay que hacerlo desde la raiz, no hace falta post
router.put('/',function(req,res){
  User.updateMany({},{$set:{'role':"asdf"}},function(err,user){
    (user == null) ? res.status(401).send('!No se ha podido actualizar ningun dato¡') : res.status(200).json(user)
  })
});

router.post("/", function (req, res) {
  var new_User = req.body;
  res
    .status(200)
    .send("Has ingresado bien el usuario, el usuario " + req.body.name);
});

router.post('/', function(req, res, next) {
  User.findById(req.body.iduser, function(err, userinfo) {
    if (err) res.status(500).send(err);
    else {
        // crear la instancia Post
        var postInstance = new Post({
          user: req.body.iduser,
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
  
module.exports = router;
