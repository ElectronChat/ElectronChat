class SqlInterface_mock{
    
    constructor(port,ip)
    {
        this.port = port;
        this.IP = ip;

        this.mMockMessages =  [
            ['John', 'Is anyone here?','hello_world','1'],
            ['James', 'Yeas','hello_world','2'],
            ['Noel', 'where?','hello_world','3'],
            ['Nopers', 'Highway 71','hello_world','4'],
            ['p1n', 'hello_world','No_world','5'],
            ['James', 'Highway 71?','hello_world','6'],
            ['dirt', 'Highway 71','hello_world','7'],
            ['p1', 'Highway 71...gotit','No_world','8'],
            ['Fluid', 'wtf is Highway 71','hello_world','9'],
            ['John', 'Highway 71...gotit','hello_world', '10'],
    
          ];

    }
    checkRoomID(roomID, index, something, desired )
    {
        return roomID[3] == Desired;   
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
        return this.mMockMessages.filter(item=>item[2].includes(roomID));
    }

    getMsg(msgID)
    {
        return this.mMockMessages.filter(item=>item[3].includes(msgID));
    }

    sendMsg(msg, room, user)
    {
        this.mMockMessages.push([user, msg, room, 1]);
    }

    deleteMsg(id)
    {
        this.mMockMessages =  this.mMockMessages.filter(item=>!item[3].includes(id));
    }
}
// exports class DbConnector to be used by other .js files 
module.exports = SqlInterface_mock;
