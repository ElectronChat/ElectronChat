const mysql = require('mysql');

const con = mysql.createConnection({
    host: "sql9.freesqldatabase.com",
    user: "sql9559593",
    password: "q4Yj3P13ug",
    database: "sql9559593"
});

class SqlServer {

    connect() {
        con.connect(function (error) {
            if (error) throw error;
            console.log("SQL Connected!");
        });
    }

    PutinTable(table,user, message, room) {
       const sql = "INSERT INTO " + table + "(user,message,room) VALUES ('" + user + "','" + message + "','" + room + "')";
        con.query(sql, function (error, result) {
            console.log("Sql Injected");
        })
    }
    ShowDatabase(Db) {
        const sql = "SELECT * FROM " + Db;
        con.query(sql, function (error, result) {
            console.log(result);
        })
    }
    CreateTable(name) {
            const sql = "CREATE TABLE " + name + "(id INT AUTO_INCREMENT PRIMARY KEY, user VARCHAR(255), message VARCHAR(255), room VARCHAR(255))";
            con.query(sql, function (error, result) {
                if (error) throw error;
                console.log("Table created");
            });


        }

        DropTable(name){
            const sql = "DROP Table " + name;
            con.query(sql, function (error, result) {
                console.log("Table Deleted");
            });
        }


    DeleteAll(table){
        const sql = "DELETE FROM " + table;
        con.query(sql, function (error, result) {
                console.log("All Messages deleted");
            })
        }

    }

module.exports = SqlServer;
