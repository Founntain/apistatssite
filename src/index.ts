import { Api } from "./classes/Api";
import { PieChart } from "./classes/PieChart";
import { LineChart} from "./classes/LineChart"
import * as $ from 'jquery';
import * as moment from 'moment';
import { Profile } from "./classes/Profile";
import * as Chart from "chart.js";
import { UserRole } from "./enums/UserRole";
import { ApiStatistics } from "./models/ApiStatistics";
import { CountUp} from "countup.js";

export var apiStats: ApiStatistics;

$(document).ready(() => {

    Chart.defaults.global.defaultFontFamily = 'Montserrat';

    var activityCanvas: HTMLCanvasElement = <HTMLCanvasElement> $("#activityCanvas")[0];
    var registeredUserCanvas: HTMLCanvasElement = <HTMLCanvasElement> $("#registeredUserCanvas")[0];
    
    Api.ApiCall("statistics", "getApiStatistics").done((result) => {
        let stats = Api.ParseApiStatistics(result);

        stats.LatestUser = Api.ParseUser(stats.LatestUser);
        stats.UsersByRole = Api.ParsePairs<UserRole, number>(stats.UsersByRole);
        stats.RegisteredUsers = Api.ParsePairs<string, number>(stats.RegisteredUsers);
        stats.Translators = Api.ParsePairs<string, string>(stats.Translators);
        stats.FillEmptyActivity();

        apiStats = stats;

        new CountUp("totalUsers", stats.TotalUserCount, {
            duration: 1
        }).start();

        new CountUp("totalSongs", stats.TotalSongsPlayed, {
            duration: 1
        }).start();

        new CountUp("totalXp", stats.TotalXp, {
            duration: 1
        }).start();

        new CountUp("totalTranslators", stats.Translators.length - 1, {
            duration: 1
        }).start();
        
        stats.CalculateCommunityLevel().then(() =>{
            new CountUp("communityLevel", stats.CommunityLevel, {
                duration: 1
            }).start();

            new CountUp("xpForNextCommuntityLevel", stats.CommunityXpLeft, {
                duration: 1
            }).start();
        });

        //Newest User Panel
        let newestUser = stats.LatestUser;

        Api.ApiCallWithParameters("osuplayeruser", "hasUserProfilePicture", {Name: newestUser.Name}).done((result: boolean) => {
            $("#newestUserImage").attr('src', "https://server.founntain.de/api/Users/ProfilePictures/" + (result ? newestUser.Name : "default_profile_picture") + ".png");
        });

        $("#newestUserName").html(newestUser.Name + " | Level " + newestUser.Level);
        $("#newestUserJoinDate").html(moment(newestUser.JoinDate).format("dddd, MMMM Do YYYY"));
        $("#newestUserDescription").html(newestUser.Description.length == 0 ? newestUser.Name + " has no description :(" : newestUser.Description);

        let div = $(document.createElement('div')).html("code and design by founntain").addClass("centeredContainer");

        $("#page").append(div);

        //Activity chart
        $("#activityTitle").html("Activity in " + moment().year());

        let activityChart = new LineChart("Activity in " + moment().year(), [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'], [
                [255, 99, 132],
                [54, 162, 235],
                [255, 206, 86],
                [75, 192, 192],
                [153, 102, 25],
                [255, 159, 64],
                [116, 255, 64],
                [57, 69, 255],
                [255, 64, 64],
                [246, 255, 64],
                [255, 64, 162],
                [64, 255, 246]
        ], stats.Activity, activityCanvas, "# of songs played", [0, 255, 138]);
    
        activityChart.Draw();

        //Registered Chart User
        $("#registeredUsersTitle").html("Registered users in " + moment().year());

        let registeredUserChartData: number[] = [];

        for(const data of stats.RegisteredUsers){
            registeredUserChartData.push(data.Item2);
        }

        let registeredUserChart = new LineChart("Registered useres in " + moment().year(), [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'], [
                [255, 99, 132],
                [54, 162, 235],
                [255, 206, 86],
                [75, 192, 192],
                [153, 102, 25],
                [255, 159, 64],
                [116, 255, 64],
                [57, 69, 255],
                [255, 64, 64],
                [246, 255, 64],
                [255, 64, 162],
                [64, 255, 246]
        ], registeredUserChartData, registeredUserCanvas, "# of registered users", [0, 200, 250]);
    
        registeredUserChart.Draw();

        //Language Table

        let table = $("#languageTable");

        for(const translator of stats.Translators){

            if(translator.Item1 == "English")
                continue;

            let tr = $(document.createElement('tr'));

            tr.append($(document.createElement('td')).html(translator.Item1));
            tr.append($(document.createElement('td')).html(translator.Item2));

            table.append(tr);
        }
    })


    //Load profile cards
    Api.ApiCall("osuplayeruser", "getUsersWithData").done((result) => {
        let users = Api.ParseUsers(result);
        let userCount = 1;
        
        for(const user of users){

            Profile.LoadProfileCard(user, userCount);

            userCount++;
        }

        let div = $(document.createElement('div')).html("code and design by founntain").addClass("centeredContainer");

        $("#page").append(div);
    });
});
