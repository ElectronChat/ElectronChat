const { notify } = require("../routes/main");
const IoNotification = require("./IoNotification.cjs");
const NameGenerator = require("./NameGenerator")
let gen = new NameGenerator();
const message = require("./Message");

module.exports = class HandleIo{
    constructor(io)
    {
        this.mIo = io;
        this.user = "";
        this.mIo.on('connection', async (socket) => {
            this.user = await gen.generateName();
            socket.join(socket.handshake.query.roomCode);
            this.mSocket = socket;
            this.mIo.in(this.mSocket.handshake.query.roomCode).emit("user_join", this.user);
            this.listen();
          });
        this.list = [];
    }

    listen()
    {
        this.mSocket.on( "chat message", (msg) => {
                  this.mIo.in(this.mSocket.handshake.query.roomCode).emit("chat message", new message(this.user, this.MessageRecieved(msg)));
                });
        this.mSocket.on("room created", (id)=>{
            console.log(this.CreateRoom(id));
        });

        this.mIo.on('disconnect', (socket) => {
            this.mIo.in(this.mSocket.handshake.query.roomCode).emit("user_disconnect", this.user);
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