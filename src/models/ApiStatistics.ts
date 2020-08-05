import { User } from "./User";
import { UserRole } from "../enums/UserRole";
import { Pair } from "./Pair";

export class ApiStatistics{
    public TotalUserCount: number;
    public UsersByRole: Pair<UserRole, number>[];
    public LatestUser: User;
    public Activity: number[];
    public RegisteredUsers: Pair<string, number>[];
    public Translators: Pair<string, string>[];
    public TotalSongsPlayed: number;
    public TotalXp: number;
    public CommunityLevel: number = 0;
    public CommunityXpLeft: number = 0;

    constructor(totalUserCount: number, usersByRole: Pair<UserRole, number>[], latestUser: User, activity: number[], registeredUsers: Pair<string, number>[], translators: Pair<string, string>[], totalSongsPlayed: number, totalXp: number){
        this.TotalUserCount = totalUserCount;
        this.UsersByRole = usersByRole;
        this.LatestUser = latestUser;
        this.Activity = activity;
        this.RegisteredUsers = registeredUsers;
        this.Translators = translators;
        this.TotalSongsPlayed = totalSongsPlayed;
        this.TotalXp = totalXp;
    }

    public async CalculateCommunityLevel(): Promise<unknown>{
        return new Promise((resolve) => {
            let xpNeeded = User.XpNeededForNextLevel(this.CommunityLevel);
            let xp = this.TotalXp;

            while(xp > xpNeeded){
                this.CommunityLevel++;

                xp = xp - xpNeeded == 0
                    ? 0
                    : xp - xpNeeded;

                xpNeeded = User.XpNeededForNextLevel(this.CommunityLevel);
            }

            this.CommunityXpLeft = xpNeeded - xp;

            resolve();
        })
    }

    public FillEmptyActivity(): void{
        if(this.Activity.length == 12) return;

        for(let i = this.Activity.length; i < 12; i++){
            this.Activity[i] = 0;
        }
    }
}