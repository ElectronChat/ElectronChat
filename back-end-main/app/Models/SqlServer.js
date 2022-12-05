const mysql = require('mysql');

const con = mysql.createConnection({
    host: "electronchat.c6oq2teq1gq9.us-east-1.rds.amazonaws.com",
    user: "Big_Chungus",
    password: "thehello123",
    database: "ElectronChatDb",
    port:3306
});


class SqlServer {

    connect() {
        con.connect(function (error) {
            if (error) throw error;
            console.log("SQL Connected!");
        });
    }

    PutinTable(table, user, message, room) {
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

    DropTable(name) {
        const sql = "DROP Table " + name;
        con.query(sql, function (error, result) {
            console.log("Table Deleted");
        });
    }


    DeleteAll(table) {
        const sql = "DELETE FROM " + table;
        con.query(sql, function (error, result) {
            console.log("All Messages deleted");
        })
    }

    getRoomMessages(Room) {
        return new Promise((resolve, reject) => {
            let sql = "SELECT user, message, room FROM ChatRoom WHERE room = '" + Room + "' ";
            con.query(sql, function (error, result) {
           return error ? reject(error) : resolve(result);
        })
        });
    }

     getUserMessages(name) {
        return new Promise((resolve, reject) => {
            let sql = "SELECT user, message, room FROM ChatRoom WHERE user = '" + name + "' ";
            con.query(sql, function (error, result) {
                return error ? reject(error) : resolve(result);
            })
        });
    }

    DeleteRoomMessages(Room) {
        let sql = "DELETE FROM ChatRoom WHERE room = '" + Room + "' ";
        con.query(sql, function (error, result) {
            console.log(result);
        })
    }

    DeleteUserMessages(name) {
        let sql = "DELETE FROM ChatRoom WHERE user = '" + name + "' ";
        con.query(sql, function (error, result) {
            console.log(result);
        })
    }

}
module.exports = SqlServer;
