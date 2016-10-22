module.exports = {
  checkLogin: function (req, res) {
    if(!req.session.me){
      return res.view('login');
    }
    return res.view('dashboard');
  },
  getUser: function (req, res) {
    User.findOne({
      id: req.session.me
    }, function (err, user) {
      if(err){
        res.negotiate(err);
      }
      return res.send(user);
    });
  }
};

