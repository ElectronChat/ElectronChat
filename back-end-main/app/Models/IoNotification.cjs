

module.exports = class IoNotification
{
    constructor (notificationType, object)
    {
        this.notificationType = notificationType;
        this.object = object;
    }

    GetMessage()
    {
        if (this.notificationType === "NEWMESSAGE")
        {
            return "Message: " + this.object;
        }
        else if ( this.notificationType === "USERJOIN" )
        {
            return this.object + " Joined the room!";
        }
        else if ( this.notificationType == "CREATEROOM")
        {
            return this.object + " : Room Created!";
        }
        else
        {
            return "error";
        }
    }
}