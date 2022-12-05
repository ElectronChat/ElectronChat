
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
        return this.mInterface.getAllMsgs(roomID);

    }

    getMsg(msgID)
    {
        return null;
    }

    sendMsg(msg)
    {
        this.mInterface.sendMsg(msg, "hello_world", "James");
    }

    deleteMsg(msg)
    {
        this.mInterface.deleteMsg(msg);
    }
}
// exports class DbConnector to be used by other .js files 
module.exports = DbConnector;
