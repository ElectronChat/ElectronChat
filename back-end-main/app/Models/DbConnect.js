
class DbConnector{
    constructor(inter)
    {
        this.mInterface = inter;
    }
    getPort()
    {
        return this.mInterface.getPort();
    }

    getIp()
    {
        return this.mInterface.getIp();
    }

    getAllMsgs(roomID)
    {
        return this.mInterface.getAllQueries(roomID);

    }

    getMsg(msgID)
    {
        return null;
    }

    sendMsg(msg)
    {
        this.mInterface.submitQuery(msg, "hello_world", "James");
    }

    deleteMsg(msg)
    {
        this.mInterface.deleteQuery(msg);
    }
}
// exports class DbConnector to be used by other .js files 
module.exports = DbConnector;
