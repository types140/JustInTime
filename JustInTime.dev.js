// ==UserScript==
// @name         JustInTime
// @version      1.0.1
// @author       Allure149
// @include      *://www.leitstellenspiel.de/missions/*
// @grant        none
// ==/UserScript==
/* global $ */

(function() {
    'use strict';

    const mission_id = $("#mission_reply_mission_id").val();
    let mission_time = $(".mission_header_info").find("#mission_countdown_" + mission_id).text().split(":").map(function(x){ return parseInt(x,10) });
    let mission_secs = (mission_time.length == 2) ? (mission_time[0] * 60) + mission_time[1] : (mission_time[0] * 3600) + (mission_time[1] * 60) + mission_time[2];

    console.log("mission_id: " + mission_id);
    console.log("mission_time: " + mission_time);
    console.log("mission_secs: " + mission_secs);

    const car_ids = ["30", "32"]; // HLF20, FuStW
    let vehicle_type_id = 0;
    let car_secs = 0;
    let found = false;
    let state = "";
    let time_remain = 0;

    if(isNaN(mission_secs)) {
        console.log("Einsatz noch nicht gestartet. Wird abgebrochen ...");
        return false;
    }

    $("#vehicle_show_table_body_all > tr").each(function(){
        vehicle_type_id = $(this).find("td:nth-child(3)").attr("vehicle_type_id");
        car_secs = $(this).find("td:nth-child(4)").attr("timevalue");

        console.log("car_secs: " + car_secs);
        console.log("vehicle_type_id: " + vehicle_type_id);

        found = false;
        $.each(car_ids, function(i,e){
            if(e == vehicle_type_id) {
                if(mission_secs - car_secs > 60) {
                    state = "success";
                } else if(mission_secs - car_secs <= 60) {
                    state = "warning";
                } else {
                    state = "danger";
                }

                found = true;
                return false;
            } else {
                state = "warning";
            }
        });

        if(found) return false;
    });

    time_remain = mission_secs - car_secs;
    console.log("time_remain: " + time_remain);
    missionCountdown(time_remain, 'remaining');
    $("#missionH1").after("<div id='mission_countdown_remaining' class='alert alert-" + state + "' style='float:right; padding: 2px 5px; margin:0'></div>");

})();
