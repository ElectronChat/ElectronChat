const { notify } = require("../routes/main");
const IoNotification = require("./IoNotification.cjs");

module.exports = class HandleIo{
    constructor(io)
    {
        this.mIo = io;
        this.mIo.on('connection', (socket) => {
            this.mSocket = socket;
            console.log(this.UserJoin("a user"));
            this.listen();
          });
        this.list = [];
    }

    listen()
    {
        this.mSocket.on( "chat message", (msg) => {
                  console.log(this.MessageRecieved(msg));
                  this.mIo.emit("chat message", this.MessageRecieved(msg));
                });
        this.mSocket.on("room created", (id)=>{
            console.log(this.CreateRoom(id));
        });
    }

    CreateRoom (id)
    {
        return this.notify(new IoNotification("CREATEROOM", id));
    }

    UserJoin( user )
    {
        this.list.push(user);
        return this.notify(new IoNotification("USERJOIN", user));
    }

    MessageRecieved(message)
    {
       return this.notify(new IoNotification("NEWMESSAGE", message));
    }

    notify(notification)
    {
        return notification.GetMessage();
       
    } 
}