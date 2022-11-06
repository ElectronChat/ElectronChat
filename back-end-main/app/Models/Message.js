module.exports = class message
{
    constructor(name, message)
    {
        this.name = name;
        this.message = message;

    }

    getMessage() {return this.message};
    getName() {return this.name};
  
}
