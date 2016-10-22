/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	signup: function (req, res) {
    var Password = require('machinepack-passwords');

    Password.encryptPassword({
      password: req.param('password'),
      difficulty: 10
    }).exec({
      error: function (err) {
        return res.negotiate(err);
      },
      success: function (encryptedPassword) {
        require('machinepack-gravatar').getImageUrl({
          emailAddress: req.param('email')
        }).exec({
          error: function (err) {
            return res.negotiate(err);
          },
          success: function (gravatarUrl) {
            //Create user
            User.create({
              name: req.param('name'),
              email: req.param('email'),
              password: encryptedPassword,
              lastLoggedIn: new Date(),
              avatar: gravatarUrl
            }, function userCreated(err, newUser) {
              if(err){
                console.log('Error: '+err);
                return res.negotiate(err);
              }

              //Session var
              return res.json({
                id: newUser.id
              });
            });
          }
        });
      }
    });
  },

  login: function (req, res) {
    //Validate user
    User.findOne({
      email: req.param('email')
    }, function foundUser(err, user) {
      if(err){
        return res.negotiate(err);
      }

      if(!user){
        return res.notFound();
      }

      require('machinepack-passwords').checkPassword({
        passwordAttempt: req.param('password'),
        encryptedPassword: user.password
      }).exec({
        error: function (err) {
          return res.negotiate(err);
        },
        incorrect: function () {
          console.log('Invalid credentials!');
          return res.notFound();
        },
        success: function () {
          req.session.me = user.id;
          console.log('Login success!');
          return res.ok();
        }
      });
    });
  },
  logout: function (req, res) {
    User.findOne({
      id: req.session.me
    }, function (err, user) {
      if(err){
        res.negotiate(err);
      }

      if(!user){
        return res.notFound();
      }

      req.session.me = null;
      return res.redirect('/login');
    });
  }
};

