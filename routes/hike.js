
exports.index = function(req, res) {
 res.render('hike', {title: 'My Hiking Log'});
};

exports.add_hike = function(req, res) {
};

exports.test_json = function(req, res) {
  var obj = {
    "username":"chatchai",
    "location":"kmutnb"
  };
  res.json(obj);
};
