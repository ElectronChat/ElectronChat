class SqlInterface{
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

    getAllQueries(roomID)
    {
        // sql stuff
        return null;
    }

    getQuery(msgID)
    {
        return null;
    }

    submitQuery(msg)
    {
        return null;
    }

    deleteQuery(msg)
    {
        return null;
    }
}
// exports class DbConnector to be used by other .js files 
module.exports = SqlInterface;
