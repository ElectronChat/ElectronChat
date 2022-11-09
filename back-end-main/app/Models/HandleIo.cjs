const { notify } = require("../routes/main");
const IoNotification = require("./IoNotification.cjs");
const NameGenerator = require("./NameGenerator")
let gen = new NameGenerator();
const message = require("./Message");

module.exports = class HandleIo{
    constructor(io)
    {
        this.mIo = io;
        this.usernames = {};
        this.userRooms = {};
        this.mIo.on('connection', async (socket) => {
            this.usernames[socket.id.toString()] = await gen.generateName();
            this.userRooms[socket.id.toString()] = socket.handshake.query.roomCode;
            console.log(this.usernames);
            socket.join(socket.handshake.query.roomCode);
            this.mSocket = socket;
            console.log(socket.id);

            try {
                Object.keys(this.usernames).forEach(element => {
                    if( this.userRooms[element] == socket.handshake.query.roomCode )
                    {
                        this.mIo.in(socket.handshake.query.roomCode).emit("user_join", this.usernames[element]);
                    }
                });
                
            } catch (error) {
                console.log(Object.keys(this.usernames));
            }
            this.listen(socket);
          });
        this.list = [];
    }

    listen(socket)
    {
        socket.on( "chat message", (msg) => {
                console.log(socket.user + ": " + msg);
                  this.mIo.in(socket.handshake.query.roomCode).emit("chat message", new message(this.usernames[socket.id], this.MessageRecieved(msg),socket.id));
                    console.log(socket.id);
                    console.log(new message(this.usernames[socket.id], this.MessageRecieved(msg),socket.id))
                });
        socket.on("room created", (id)=>{
            console.log(this.CreateRoom(id));
        });

        socket.on('disconnected', (id) => {
            console.log("disconnecting user");
            console.log(this.usernames);
            console.log(id);
            this.mIo.in(socket.handshake.query.roomCode).emit("user_disconnect", this.usernames[id]);
            delete this.usernames[id.toString()];
            console.log(this.usernames);
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