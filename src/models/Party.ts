import { Client } from "./Client";

export class Party{
    PartyId: string;
    CreationDate: string;
    IsPublic: boolean;
    Song: string;
    Songname: string;
    Hostname: string;
    IsPaused: boolean;
    Timestamp: number;
    Speed: number;
    Clients: Client[];

    constructor(partyId: string, creationDate: string, isPublic: boolean, song: string, songname: string, hostname: string, isPaused: boolean, timestamp: number, speed: number, clients: Client[]){
        this.PartyId = partyId;
        this.CreationDate = creationDate;
        this.IsPublic = isPublic;
        this.Song = song;
        this.Songname = songname;
        this.Hostname = hostname;
        this.IsPaused = isPaused;
        this.Timestamp = timestamp;
        this.Speed = speed;
        this.Clients = clients;
    }
}