import { Api } from "./Api";
import * as $ from 'jquery';
import { User } from "../models/User";
import * as moment from 'moment';
import { PieChart } from "./PieChart";

export class Profile{
    static LoadProfileCard(user: User, number: number){
        let container = $(document.createElement('div')).addClass(number % 2 == 0 ? "profileContainer" : "profileContainerOdd");
        
        let row = $(document.createElement('div')).addClass("row");

        let imageCol = $(document.createElement('div')).addClass(["col-md-3", "center-block", "text-center"]);

        Api.ApiCallWithParameters("osuplayeruser", "hasUserProfilePicture", {Name: user.Name}).done((result: boolean) => {
            let image = $(document.createElement('img')).addClass(["profilePicture", "img-fluid"])
            
            .attr("src", "https://server.founntain.de/api/Users/ProfilePictures/" + (result ? user.Name : "default_profile_picture") + ".png");
            imageCol.append(image);
        });
        

        let infoCol = $(document.createElement('div')).addClass("col-md-9");
        
        let profileInfoRow = $(document.createElement('div')).addClass("profileInfoContainer");
        
        let h1 = $(document.createElement("h1")).html(user.Name + " | Level " + user.Level);
        let h2 = $(document.createElement("h2")).html("Joined " + moment(user.JoinDate).format("dddd, MMMM Do YYYY"));
        
        // let canvas = $(document.createElement('canvas')).addClass("xpPieChart");

        // let chart = new PieChart("XpChart", ["Current XP", "XP needed"], [ 
        //     [199, 0, 57],
        //     [100, 100, 100]
        // ], [user.Xp, user.XpNeededForNextLevel()], <HTMLCanvasElement> canvas[0], false, false, "64");
        
        
        profileInfoRow.append([h1, h2]);
        // profileInfoRow.append([h1, h2, canvas]);
        
        let descriptionRow = $(document.createElement("div")).addClass(["row", "profileDescriptionContainer"]);
        let p = $(document.createElement("p")).html(user.Description.length == 0 ? user.Name + " has no description :(" : user.Description);
        
        descriptionRow.append(p);
        
        infoCol.append([profileInfoRow, descriptionRow]);
        
        row.append([imageCol, infoCol]);
        
        container.append(row);
        
        $("#page").append(container);
        // chart.Draw();
    }
}