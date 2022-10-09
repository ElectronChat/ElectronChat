class DbConnector{
    constructor(port,ip)
    {
        this.port = port;
        this.IP = ip;
    }
    getPort()
    {
        return this.port;
    }

    getIp()
    {
        return this.IP;
    }

    getAllMsgs(roomID)
    {
        // sql stuff
        return null;
    }

    getMsg(msgID)
    {
        return null;
    }

    sendMsg(msg)
    {
        return null;
    }

    deleteMsg(msg)
    {
        return null;
    }
}
// exports class DbConnector to be used by other .js files 
module.exports = DbConnector;
