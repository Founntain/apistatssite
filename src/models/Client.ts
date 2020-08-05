export class Client{
    ClientId: string;
    Username: string;
    Profilename: string;

    constructor(clientId: string, username: string, profilename: string){
        this.ClientId = clientId;
        this.Username = username;
        this.Profilename = profilename;
    }
}