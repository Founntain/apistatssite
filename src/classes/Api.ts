import * as $ from 'jquery';
import { User } from '../models/User';
import { Party } from '../models/Party';
import { Client } from '../models/Client';
import { Language } from '../models/Language';
import { ApiStatistics } from '../models/ApiStatistics';
import { Pair } from '../models/Pair';

export class Api{
    private static Localhost: boolean = false;
    private static Url: string = Api.Localhost ? "http://localhost:5000/api/" : "https://api.founntain.de/api/";

    constructor() { }

    static ApiCall(controller: string, action: string): JQuery.jqXHR {
        return $.ajax({
            url: this.Url + controller + "/" + action,
            dataType: "json",
            success: (result) => { return result}
        })
    }

    static ApiCallWithParameters(controller: string, action: string, object: any): JQuery.jqXHR {
        return $.ajax({
            url: this.Url + controller + "/" + action,
            data: object,
            dataType: "json",
            success: (result) => { return result }
        })
    }

    static ParseUser(obj: any): User{
        return new User(obj.id, obj.name, obj.description, obj.role, obj.joinDate, obj.level, obj.xp, obj.totalXp, obj.profilePicture)
    }

    static ParseUsers(objs: any): User[] {
        let output: User[] = [];

        for(const user of objs)
            output.push(new User(user.id, user.name, user.description, user.role, user.joinDate, user.level, user.xp, user.totalXp, user.profilePicture));

        return output;
    }

    static ParseClients(objs: any): Client[]{
        let output: Client[] = [];

        for(const client of objs)
            output.push(new Client(client.clientId, client.username, client.profilename));

        return output;
    }

    static ParseParties(objs: any): Party[]{
        let output: Party[] = [];

        for(const party of objs)
            output.push(new Party(party.partyId, party.creationDate, party.isPublic, party.song, party.songname, party.hostname, party.isPausedm, party.timestamp, party.speed, this.ParseClients(party.clients)));

        return output;
    }

    static ParseLanguages(objs: any): Language[]{
        let output: Language[] = [];

        for(const language of objs)
            output.push(new Language(language.languageName, this.ParseUser(language.creator), language.keyCount, language.cultureCode, language.languageData, language.forceUpload));
        
            return output;
    }

    static ParsePair<T, S>(obj: any): Pair<T, S>{
        return new Pair<T, S>(obj.item1, obj.item2);
    }

    static ParsePairs<T, S>(objs: any): Pair<T, S>[]{
        let output: Pair<T, S>[] = [];
        
        for(const obj of objs){
            output.push(Api.ParsePair<T, S>(obj));
        }

        return output;
    }

    static ParseApiStatistics(obj: any): ApiStatistics{
        let apiStatistics: ApiStatistics = new ApiStatistics(
            obj.totalUserCount,
            obj.usersByRole,
            obj.latestUser,
            obj.activity,
            obj.registeredUsers,
            obj.translators,
            obj.totalSongsPlayed,
            obj.totalXp
        );

        return apiStatistics;
    }
}