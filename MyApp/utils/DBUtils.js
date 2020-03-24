/**
 * Created by Administrator on 2017/1/30 0030.
 */
var mysql = require('mysql');

var TEST_DATABASE = 'recorder';
var TEST_TABLE = 'user';

//创建连接
var client ;

var DBUtil = {
    init: function () {
        client = mysql.createConnection({
            user: 'root',
            password: 'root'
        });
        client.connect();
        client.query("use " + TEST_DATABASE);
    },
    query: function (sql,callback) {
        this.init();

        client.query('SELECT * FROM '+TEST_TABLE,
            function selectCb(err, results, fields) {
                if (err) {
                    debugger;
                    throw err;
                }

                if(results)
                {
                    for(var i = 0; i < results.length; i++)
                    {
                        console.log("%d\t%s\t%s", results[i].id, results[i].username, results[i].password);
                    }
                }
                client.end();
                callback();
            }
        );
    }
}

module.exports = DBUtil;