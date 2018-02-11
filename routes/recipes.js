var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://simone:5121@ds231588.mlab.com:31588/myrecipelist_simone', ['recipes']);

//Sends to browser
//finds recipes from db and sends back as json

//Get All recipes
router.get('/recipes', function(req, res, next) {
   db.recipes.find(function(err, recipes) {
     if(err) {
        res.send(err);
     }
     res.json(recipes);
   });
});


//Get Single recipe
//retrieves object id from params and finds it in recipes db
router.get('/recipe/:id', function(req, res, next) {
   db.recipes.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, recipe) {
     if(err) {
        res.send(err);
     }
     res.json(recipe);
   });
});

//Save recipe
router.post('/recipe', function(req, res, next) {
    var recipe = req.body;
    if(!recipe.title || (recipe.isDone + '')) {
        res.status(400);
        res.json({
          "error": "Bad Data"
        });
    } else {
        db.recipes.save(recipe, function(err, recipe) {
            if(err) {
               res.send(err);
            }
            res.json(recipe);
        });
    }
});

//Delete recipe
router.delete('/recipe/:id', function(req, res, next) {
   db.recipes.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, recipe) {
     if(err) {
        res.send(err);
     }
     res.json(recipe);
   });
});


//Update recipe
router.put('/recipe/:id', function(req, res, next) {
   var recipe = req.body();
   var updrecipe = {};

   if(recipe.isDone) {
      updrecipe.isDone = recipe.isDone;
   }

   if(recipe.title) {
      updrecipe.title = recipe.title;
   }

   if(!updrecipe) {
     res.status(400);
     res.json({
        "error": "Bad Data"
     });
   } else {
       db.recipes.update({_id: mongojs.ObjectId(req.params.id)}, updrecipe, {}, function(err, recipe) {
         if(err) {
            res.send(err);
         }
         res.json(recipe);
       });
   }

   db.recipes.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, recipe) {
     if(err) {
        res.send(err);
     }
     res.json(recipe);
   });
});


module.exports = router;
