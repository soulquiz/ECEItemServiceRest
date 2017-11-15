var mysql = require('mysql');

// mysql database connection
var con = mysql.createConnection({
  host: "aaciq4ouz6pazz.cimyxesey95t.ap-northeast-1.rds.amazonaws.com",
  user: "root",
  password: "323643123",
  database: "ece_item"
});

exports.get_examine_info = function(req, res) {
  if(isNaN(req.params.order_number)) {
    res.json({status: 'Order Number must be Integer'});
  }else {
    var sql = "select p_name, department, examine.order_no, examine.rank\n" +
                        "from personal\n" +
                        "inner join examine \n" +
                        "on personal.p_name = examine.exam_name\n" +
                        "where examine.order_no = (\n" +
                        "		" + req.params.order_number + "\n" +
                        ");";  // getexamineinfo
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
