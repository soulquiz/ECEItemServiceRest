var mysql = require('mysql');

// mysql database connection
var con = mysql.createConnection({
  host: "aaciq4ouz6pazz.cimyxesey95t.ap-northeast-1.rds.amazonaws.com",
  user: "root",
  password: "323643123",
  database: "ece_item"
});

exports.get_last_order = function(req, res) {
  var sql = "select id, name, price, description, location, status, note, res_name as responsible_name, item.order_no as order_number\n"
                      + "	 ,company.c_name as company_name, company.address as company_address\n"
                      + "from ((item\n"
                      + "inner join froms on item.order_no = froms.order_no)\n"
                      + "inner join company on froms.c_name = company.c_name)\n"
                      + "where item.order_no = (\n"
                      + "	select max(order_no) from orders\n"
                      + "	);";  // getLastOrder()
  con.query(sql, function(err, result) {
    if(err) throw err;
    console.log(result);
  });
 res.send('Get Last Order');
};

exports.get_order = function(req, res) {
  var sql = "select id, name, price, description, location, status, note, res_name as responsible_name, item.order_no as order_number\n"
                          + "	 ,company.c_name as company_name, company.address as company_address\n"
                          + "from ((item\n"
                          + "inner join froms on item.order_no = froms.order_no)\n"
                          + "inner join company on froms.c_name = company.c_name)\n"
                          + "where item.order_no = (\n"
                          + "	" + req.params.order_number + "\n"
                          + "	);";  // getOrder(orderNumber)
  con.query(sql, function(err, result) {
    if(err) throw err;
    console.log(result);

    if (result.length > 0) {
      // res.send('Get Order Information number : ' + req.params.order_number);
      res.json(result);
    }else {
      res.json({status: 'Not found'});
    };
  });


};




// var sql = "select p_name, department, examine.order_no, examine.rank\n" +
//                     "from personal\n" +
//                     "inner join examine \n" +
//                     "on personal.p_name = examine.exam_name\n" +
//                     "where examine.order_no = (\n" +
//                     "		" + orderNumber + "\n" +
//                     ");";  // getexamineinfo


// var sql = "select take_name as name, personal.department , order_no, take_date \n" +
//                     "from orders\n" +
//                     "inner join personal\n" +
//                     "on orders.take_name = personal.p_name\n" +
//                     "where orders.order_no = (\n" +
//                     "		" + orderNumber + "\n" +
//                     ");";  // gettakeinfo
