import { UserRole } from "../enums/UserRole";

export class User{
    ID: string;
    Name: string;
    Description: string;
    Role: UserRole;
    JoinDate: string;
    Level: number;
    Xp: number;
    TotalXp: number;
    ProfilePicture: string;

    constructor(id: string, name: string, description: string, role: UserRole, joinDate: string, level: number, xp: number, totalXp: number, profilePicture: string){
        this.ID = id;
        this.Name = name;
        this.Description = description;
        this.Role = role;
        this.JoinDate = joinDate;
        this.Level = level;
        this.Xp = xp;
        this.TotalXp = totalXp;
        this.ProfilePicture = profilePicture;
    }

    XpNeededForNextLevel(): number{
        return Math.round(0.04 * (Math.pow(this.Level, 3)) + 0.8 * (Math.pow(this.Level, 2)) + 2 * this.Level);
    }

    public static XpNeededForNextLevel(level: number): number{
        return Math.round(0.04 * (Math.pow(level, 3)) + 0.8 * (Math.pow(level, 2)) + 2 * level);
    }
}