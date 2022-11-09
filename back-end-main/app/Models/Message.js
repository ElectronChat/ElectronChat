module.exports = class message
{
    constructor(name, message,socketId)
    {
        this.name = name;
        this.message = message;
        this.socketId = socketId;
    }

    getMessage() {return this.message};
    getName() {return this.name};
    getSocket(){return this.socketId};
  
}
