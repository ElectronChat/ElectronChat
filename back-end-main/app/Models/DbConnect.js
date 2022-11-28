

//! @class DbConnector
//! @brief Class for storing messages in a database. 
class DbConnector{

    // method: DbConnector constructor
    // @brief constructor where you pass a database object that impliments the interface object: sqlInterface
    // @params[in] inter : sqlInterface 
    constructor(inter)
    {
        this.mInterface = inter;
    }

    // method: getPort
    // @brief retrieve the port that the sql server is listening on.
    // @return port 
    getPort()
    {
        return this.mInterface.getPort();
    }

    // method: getIp
    // @brief retrieve the ip that the sql server is listening on.
    // @return ip
    getIp()
    {
        return this.mInterface.getIp();
    }

    // method: getAllMsgs
    // @brief retrieve all the messages that belong to a given room
    // @return messages
    getAllMsgs(roomID)
    {
        return this.mInterface.getAllQueries(roomID);

    }

    // method: getAllMsgs
    // @brief retrieve message given a messageId
    // @param[in] msgID
    // @return message
    getMsg(msgID)
    {
        return null;
    }

    // method: sendMsg
    // @brief store message sent
    // @param[in] msg
    sendMsg(msg)
    {
        this.mInterface.submitQuery(msg, "hello_world", "James");
    }

    // method: deleteMsg
    // @brief Delete a specific message
    // @param[in] msg
    deleteMsg(msg)
    {
        this.mInterface.deleteQuery(msg);
    }
}
// exports class DbConnector to be used by other .js files 
module.exports = DbConnector;
