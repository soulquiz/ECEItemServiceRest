var mysql = require('mysql');

// mysql database connection
var con = mysql.createConnection({
  host: "aaciq4ouz6pazz.cimyxesey95t.ap-northeast-1.rds.amazonaws.com",
  user: "root",
  password: "323643123",
  database: "ece_item"
});

exports.get_take_info = function(req, res) {
  if(isNaN(req.params.order_number)) {
    res.json({status: 'Order Number must be Integer'});
  }else {
    var sql = "select take_name as name, personal.department , order_no, take_date \n" +
                        "from orders\n" +
                        "inner join personal\n" +
                        "on orders.take_name = personal.p_name\n" +
                        "where orders.order_no = (\n" +
                        "		" + req.params.order_number + "\n" +
                        ");";  // gettakeinfo
    con.query(sql, function(err, result) {
      if(err) throw err;

      if (result.length > 0) {
        // res.send('Get Order Information number : ' + req.params.order_number);
        res.json(result);
      }else {
        res.json({status: 'Not found'});
      };
    });
  };
};
