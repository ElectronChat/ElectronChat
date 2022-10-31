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
            this.usernames[socket.id] = await gen.generateName();
            this.userRooms[socket.id] = socket.handshake.query.roomCode;
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
                  this.mIo.in(socket.handshake.query.roomCode).emit("chat message", new message(this.usernames[socket.id], this.MessageRecieved(msg)));
                    console.log(socket.id);
                });
        socket.on("room created", (id)=>{
            console.log(this.CreateRoom(id));
        });

        this.mIo.on('disconnect', (socket) => {
            this.mIo.in(socket.handshake.query.roomCode).emit("user_disconnect", this.usernames[socket.id]);
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