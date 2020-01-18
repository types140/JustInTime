// ==UserScript==
// @name         JustInTime
// @version      1.1.0
// @author       Allure149
// @include      *://leitstellenspiel.de/missions/*
// @include      *://www.leitstellenspiel.de/missions/*
// @include      *://missionchief.co.uk/missions/*
// @include      *://www.missionchief.co.uk/missions/*
// @include      *://missionchief.com/missions/*
// @include      *://www.missionchief.com/missions/*
// @updateURL    https://github.com/types140/JustInTime/raw/master/JustInTime.user.js
// @grant        none
// ==/UserScript==
/* global $ */

(function() {
    'use strict';

    $("head").append(`<style>
                              .jit_hide{
                                  display:none;
                              }

                              #jit_ids_ul {
                                  column-width: 160px;
                              }

                              .modal-body {
                                  position: relative;
                                  overflow-y: auto;
                                  padding: 15px;
                              }
                      </style>`);

    const arrFahrzeugDatenDE = [{ id: 0, name: "LF 20", personal: 9 },
                                { id: 1, name: "LF 10", personal: 9 },
                                { id: 2, name: "DLK 23", personal: 3 },
                                { id: 3, name: "ELW 1", personal: 3 },
                                { id: 4, name: "RW", personal: 3 },
                                { id: 5, name: "GW-Atemschutz", personal: 3 },
                                { id: 6, name: "LF 8/6", personal: 9 },
                                { id: 7, name: "LF 20/16", personal: 9 },
                                { id: 8, name: "LF 10/6", personal: 9 },
                                { id: 9, name: "LF 16-TS", personal: 9 },
                                { id: 10, name: "GW-Öl", personal: 3 },
                                { id: 11, name: "GW-L2-Wasser", personal: 3 },
                                { id: 12, name: "GW-Messtechnik", personal: 3 },
                                { id: 13, name: "SW 1000", personal: 3 },
                                { id: 14, name: "SW 2000", personal: 6 },
                                { id: 15, name: "SW 2000-Tr", personal: 3 },
                                { id: 16, name: "SW KatS", personal: 3 },
                                { id: 17, name: "TLF 2000", personal: 3 },
                                { id: 18, name: "TLF 3000", personal: 3 },
                                { id: 19, name: "TLF 8/8", personal: 3 },
                                { id: 20, name: "TLF 8/18", personal: 3 },
                                { id: 21, name: "TLF 16/24-Tr", personal: 3 },
                                { id: 22, name: "TLF 16/25", personal: 6 },
                                { id: 23, name: "TLF 16/45", personal: 3 },
                                { id: 24, name: "TLF 20/40", personal: 3 },
                                { id: 25, name: "TLF 20/40-SL", personal: 3 },
                                { id: 26, name: "TLF 16", personal: 3 },
                                { id: 27, name: "GW-Gefahrgut", personal: 3 },
                                { id: 28, name: "RTW", personal: 2 },
                                { id: 29, name: "NEF", personal: 2 },
                                { id: 30, name: "HLF 20", personal: 9 },
                                { id: 31, name: "RTH", personal: 1 },
                                { id: 32, name: "FuStW", personal: 2 },
                                { id: 33, name: "GW-Höhenrettung", personal: 9 },
                                { id: 34, name: "ELW 2", personal: 6 },
                                { id: 35, name: "leBefKw", personal: 3 },
                                { id: 36, name: "MTW", personal: 9 },
                                { id: 37, name: "TSF-W", personal: 6 },
                                { id: 38, name: "KTW", personal: 2 },
                                { id: 39, name: "GKW", personal: 9 },
                                { id: 40, name: "MTW-TZ", personal: 4 },
                                { id: 41, name: "MzKW", personal: 9 },
                                { id: 42, name: "LKW K9", personal: 3 },
                                { id: 43, name: "BRmG R", personal: 0 },
                                { id: 44, name: "Anh. DLE", personal: 0 },
                                { id: 45, name: "MLW 5", personal: 6 },
                                { id: 46, name: "WLF", personal: 3 },
                                { id: 47, name: "AB-Rüst", personal: 0 },
                                { id: 48, name: "AB-Atemschutz", personal: 0 },
                                { id: 49, name: "AB-Öl", personal: 0 },
                                { id: 50, name: "GruKw", personal: 9 },
                                { id: 51, name: "FüKw", personal: 3 },
                                { id: 52, name: "GefKw", personal: 2 },
                                { id: 53, name: "Dekon-P", personal: 6 },
                                { id: 54, name: "AB-Dekon-P", personal: 0 },
                                { id: 55, name: "KdoW-LNA", personal: 1 },
                                { id: 56, name: "KdoW-OrgL", personal: 1 },
                                { id: 57, name: "FwK", personal: 2 },
                                { id: 58, name: "KTW Typ B", personal: 2 },
                                { id: 59, name: "ELW 1 (SEG)", personal: 2 },
                                { id: 60, name: "GW-SAN", personal: 6 },
                                { id: 61, name: "Polizeihubschrauber", personal: 3 },
                                { id: 62, name: "AB-Schlauch", personal: 0 },
                                { id: 63, name: "GW-Taucher", personal: 2 },
                                { id: 64, name: "GW-Wasserrettung", personal: 6 },
                                { id: 65, name: "LKW 7 Lkr 19 tm", personal: 2 },
                                { id: 66, name: "Anh MzB", personal: 0 },
                                { id: 67, name: "Anh SchlB", personal: 0 },
                                { id: 68, name: "Anh MzAB", personal: 0 },
                                { id: 69, name: "Tauchkraftwagen", personal: 2 },
                                { id: 70, name: "MZB", personal: 0 },
                                { id: 71, name: "AB-MZB", personal: 0 },
                                { id: 72, name: "WaWe 10", personal: 5 },
                                { id: 73, name: "GRTW", personal: 6 },
                                { id: 74, name: "NAW", personal: 3 },
                                { id: 75, name: "FLF", personal: 3 },
                                { id: 76, name: "Rettungstreppe", personal: 2 },
                                { id: 77, name: "AB-Gefahrgut", personal: 0 },
                                { id: 78, name: "AB-Einsatzleitung", personal: 0 },
                                { id: 79, name: "SEK - ZF", personal: 4 },
                                { id: 80, name: "SEK - MTF", personal: 9 },
                                { id: 81, name: "MEK - ZF", personal: 4 },
                                { id: 82, name: "MEK - MTF", personal: 9 },
                                { id: 83, name: "GW-Werkfeuerwehr", personal: 9 },
                                { id: 84, name: "ULF mit Löscharm", personal: 3 },
                                { id: 85, name: "TM 50", personal: 3 },
                                { id: 86, name: "Turbolöscher", personal: 3 },
                                { id: 87, name: "TLF 4000", personal: 3},
                                { id: 88, name: "KLF", personal: 6},
                                { id: 89, name: "MLF", personal: 6},
                                { id: 90, name: "HLF 10", personal: 9}];

    const arrFahrzeugDatenEN = [{ id: 0, name: "Type 1 fire engine", personal: 6},
                                { id: 1, name: "Type 2 fire engine", personal: 3},
                                { id: 2, name: "Platform truck", personal: 3},
                                { id: 3, name: "Battalion Chief Unit", personal: 3},
                                { id: 4, name: "Heavy Rescue Vehicle", personal: 4},
                                { id: 5, name: "ALS Ambulance", personal: 2},
                                { id: 6, name: "Mobile air", personal: 3},
                                { id: 7, name: "Water Tanker", personal: 3},
                                { id: 8, name: "Utility unit", personal: 4},
                                { id: 9, name: "HazMat", personal: 6},
                                { id: 10, name: "Patrol Car", personal: 2},
                                { id: 11, name: "HEMS", personal: 1},
                                { id: 12, name: "Mobile command vehicle", personal: 6},
                                { id: 13, name: "Quint", personal: 6},
                                { id: 14, name: "Police helicopter", personal: 2},
                                { id: 15, name: "Fly-Car", personal: 1},
                                { id: 16, name: "SWAT Armoured Vehicle", personal: 6},
                                { id: 17, name: "ARFF Crash Tender", personal: 3},
                                { id: 18, name: "Rescue Engine", personal: 6},
                                { id: 19, name: "K-9 Unit", personal: 2},
                                { id: 20, name: "Mass Casualty Unit", personal: 6},
                                { id: 21, name: "Heavy Rescue + Boat", personal: 4},
                                { id: 22, name: "Boat Trailer", personal: 0},
                                { id: 23, name: "Police Motorcycle", personal: 1},
                                { id: 24, name: "Large Fireboat", personal: 0},
                                { id: 25, name: "Large Rescue Boat", personal: 0},
                                { id: 26, name: "SWAT SUV", personal: 4},
                                { id: 27, name: "BLS Ambulance", personal: 2},
                                { id: 28, name: "EMS Rescue", personal: 5},
                                { id: 29, name: "EMS Chief", personal: 1}];

    const arrFahrzeugDatenFJ = [{id: 0, name: "Water Ladder", personal: 9},
                                {id: 1, name: "Light 4X4 Pump (L4P)", personal: 5},
                                {id: 2, name: "Aerial Appliance", personal: 3},
                                {id: 3, name: "Fire Officer", personal: 3},
                                {id: 4, name: "Rescue Support Unit (RSU)", personal: 5},
                                {id: 5, name: "Ambulance", personal: 2},
                                {id: 6, name: "Water Carrier", personal: 3},
                                {id: 7, name: "HazMat Unit", personal: 6},
                                {id: 8, name: "Incident response vehicle (IRV)", personal: 2},
                                {id: 9, name: "SAR helicopter", personal: 2},
                                {id: 10, name: "Rapid Response Vehicle", personal: 2},
                                {id: 11, name: "Police helicopter", personal: 3},
                                {id: 12, name: "Dog Support Unit (DSU)", personal: 2},
                                {id: 13, name: "Armed Response Vehicle (ARV)", personal: 4},
                                {id: 14, name: "Breathing Apparatus Support Unit (BASU)", personal: 3},
                                {id: 15, name: "Incident Command and Control Unit (ICCU)", personal: 6},
                                {id: 16, name: "Rescue Pump", personal: 9}];

    let textSaved, textOwnMissions, textAfter, textRepresent, textWarning, textCheckCars, textClose, textSave, textSelection, textEvent, textFederation, arrFahrzeugDaten;
    let textTimeframe, textAvailableCar, textStartMission, textInvolved, textLoading, textHours, textMinutes, textSeconds, textOptions, textKilometers, textReachable;

    if(I18n.locale == "de"){
        arrFahrzeugDaten = arrFahrzeugDatenDE;
        textSaved = "Gespeichert";
        textOwnMissions = "Eigene Einsätze einbeziehen";
        textAfter = "Ab";
        textRepresent = "Sekunden darstellen als";
        textWarning = "Warnung";
        textCheckCars = "Folgende Fahrzeuge werden geprüft";
        textClose = "Schließen";
        textSave = "Speichern";
        textSelection = "Auswahl anzeigen";
        textTimeframe = "Zeitfenster überschritten";
        textAvailableCar = "Kein Fahrzeug verfügbar";
        textStartMission = "Einsatz hat noch nicht begonnen";
        textInvolved = "Bereits beteiligt";
        textLoading = "Lade";
        textHours = "Std.";
        textMinutes = "Min.";
        textSeconds = "Sek.";
        textOptions = "Optionen";
        textEvent = "Event";
        textFederation = "Verband";
        textKilometers = "km";
        textReachable = "Einsatz noch zu erreichen";
    } else if(I18n.locale == "en"){
        arrFahrzeugDaten = arrFahrzeugDatenEN;
        textSaved = "Saved";
        textOwnMissions = "Invole owned missions";
        textAfter = "After"
        textRepresent = "seconds represent as";
        textWarning = "warning";
        textCheckCars = "The following cars will be checked";
        textClose = "close";
        textSave = "save";
        textSelection = "Show selection";
        textTimeframe = "Timeframe exceeded";
        textAvailableCar = "No car available";
        textStartMission = "Mission didn't start yet";
        textInvolved = "Already involved";
        textLoading = "Loading";
        textHours = "H";
        textMinutes = "min.";
        textSeconds = "sec.";
        textOptions = "options";
        textEvent = "Event";
        textFederation = "Alliance";
        textKilometers = "miles";
        textReachable = "Mission is still reachable";
    } else if(I18n.locale == "en_GB"){
        arrFahrzeugDaten = arrFahrzeugDatenFJ;
        textSaved = "Saved";
        textOwnMissions = "Invole owned missions";
        textAfter = "After"
        textRepresent = "seconds represent as";
        textWarning = "warning";
        textCheckCars = "The following cars will be checked";
        textClose = "close";
        textSave = "save";
        textSelection = "Show selection";
        textTimeframe = "Timeframe exceeded";
        textAvailableCar = "No car available";
        textStartMission = "Mission didn't start yet";
        textInvolved = "Already involved";
        textLoading = "Loading";
        textHours = "H";
        textMinutes = "min.";
        textSeconds = "sec.";
        textOptions = "options";
        textEvent = "Event";
        textFederation = "Alliance";
        textKilometers = "miles";
        textReachable = "Mission is still reachable";
    }

    if (localStorage.getItem("jit_own_missions") === null) {
        localStorage.jit_own_missions = true;
        localStorage.jit_car_ids = JSON.stringify(["1", "2"]);
        localStorage.jit_warning_time = "60";
    }

    let carIds = JSON.parse(localStorage.jit_car_ids);
    let eigeneEinsaetze = localStorage.jit_own_missions;
    let warningTime = parseInt(localStorage.jit_warning_time, 10);

    $("#group_max_distance").after(`<div>
    <button type="button" class="btn btn-default btn-xs" data-toggle="modal" data-target="#jit_options">JIT ${textOptions}</button>
    <div class="modal fade" id="jit_options" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style="display: none;">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">JustInTime ${textOptions}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body" id="jit_body">
                    <div class="col-md-6">
                        <div class="checkbox-inline" id="jit_check_1" style="margin: 5px 0">
                            <input class="" type="checkbox" value="" id="jit_own_missions" name="jit_own_missions">
                            <label class="" for="jit_own_missions"> ${textOwnMissions}?</label>
                        </div>
                        <div class="form-inline">
                            ${textAfter}<input type="text" class="form-control input-sm" id="jit_textbox" style="margin: 0 5px; width: 50px" maxlength="4"/>${textRepresent}<span class="alert alert-warning" style="padding: 2px 5px; margin:0 5px;">${textWarning}</span>.
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div id="jit_check_ids"><h4>${textCheckCars}:</h4> </div>
                    </div>
                    <hr class="float-left">
                    <div id="jit_show_checkboxes">${textSelection} <div class="glyphicon glyphicon-chevron-down" id="jit_chevron"></div></div>
                    <div class="form-check jit_hide" id="jit_check_2">
                        <hr>
                        <ul id="jit_ids_ul" class="nav nav-list"></ul>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">${textClose}</button>
                        <button type="button" id="jit_save" class="btn btn-primary">${textSave}</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>`);

    $('#jit_show_checkboxes').click(function() {
        $('#jit_check_2').fadeToggle(700);
        $("#jit_chevron").toggleClass("glyphicon-chevron-down glyphicon-chevron-up");
    });

    $.each(arrFahrzeugDaten, function(i,e){
        $("#jit_ids_ul").append(`<li><div class="btn-group-toggle" data-toggle="buttons"><label class="btn btn-info jit_group_toggle" id="jit_id_label${e.id}" for="jit_id_checkboxes${e.id}"><input type="checkbox" value="${e.id}" id="jit_id_checkboxes${e.id}" name="jit_ids[]" autocomplete="off"/> ${e.name}</label></div></li>`);

        $.each(carIds, function(i2,e2){
            if(i == e2) {
                $("#jit_id_checkboxes" + e2).prop("checked", true);
                $("#jit_id_label" + e2).toggleClass("btn-info btn-success").addClass("active");
                $("#jit_check_ids").append("<h5>" + e.name + "</h5>");
            }
        });
    });

    $("body").on("click", ".jit_group_toggle", function(e) {
        e.preventDefault();

        $(this).toggleClass('btn-info btn-success');

        let checkbox = $(this).children('input:first');
        let checked = checkbox.prop('checked');

        checkbox.prop('checked', !checked).removeClass("active");
    });

    if(eigeneEinsaetze == "true") $("#jit_own_missions").prop("checked", true);
    else $("#jit_own_missions").prop("checked", false);

    $("#jit_textbox").val(warningTime);

    $("body").on("click", "#jit_save", function(){
        let checkbox_ids = [];
        $("input[name='jit_ids[]']").map(function(){
            if($(this).is(":checked")) checkbox_ids.push($(this).val());
        });

        localStorage.jit_own_missions = $("#jit_own_missions").is(":checked");
        localStorage.jit_car_ids = JSON.stringify(checkbox_ids);
        localStorage.jit_warning_time = $("#jit_textbox").val();

        $("#jit_body").children().addClass("jit_hide");
        $("#jit_body").addClass("text-center").html(`<h1>${textSaved}.</h1>`);

        setTimeout(function(){
            $("#jit_options").modal("toggle");
        }, 1500);

        location.reload();
    });

    const missionVerband = $("#missionH1").text().trim().startsWith("[" + textFederation + "]") ? true : false;
    const missionEvent = $("#missionH1").text().trim().startsWith("[" + textEvent + "]") ? true : false;
    const missionId = $("#mission_reply_mission_id").val();
    let missionTime = $(".mission_header_info").find("#mission_countdown_" + missionId).text().split(":").map(function(x){ return parseInt(x,10) });
    let missionSecs = (missionTime.length == 2) ? (missionTime[0] * 60) + missionTime[1] : (missionTime[0] * 3600) + (missionTime[1] * 60) + missionTime[2];
    let vehicleTypeId = 0; // aktuell gefiltertes Fahrzeug
    let carId = 0; // != 0 wenn korrektes Fahrzeug gefunden wurde
    let carSecs = 0;
    let carSecsTemp = 0;
    let timeRemain = 0;
    let endText = "";
    let textClass = "";
    let counts = 0;

    if(eigeneEinsaetze == "false" && !missionVerband && !missionEvent) return false;

    function jit_main(){
        $(".vehicle_select_table_tr").each(function(){
            vehicleTypeId = $(this).find("td:nth-child(3)").attr("vehicle_type_id");

            if ($(this).find("td:nth-child(4)").text().indexOf(textKilometers) >= 0) return true;
            carSecsTemp = $(this).find("td:nth-child(4)").text().replace(" " + textHours + " ", ":").replace(" " + textMinutes + " ", ":").replace(" " + textSeconds, "").split(":").map(function(x){ return parseInt(x,10) });

            carSecs = (carSecsTemp.length == 3) ? (carSecsTemp[0] * 3600) + (carSecsTemp[1] * 60) + carSecsTemp[2] : (carSecsTemp.length == 2) ? (carSecsTemp[0] * 60) + carSecsTemp[1] : carSecsTemp[0];

            $.each(carIds, function(i,e){
                if(e == vehicleTypeId) {
                    carId = vehicleTypeId;
                    timeRemain = missionSecs - carSecs;
                    return false;
                }
            });

            if(carId != 0) {
                if(timeRemain > warningTime) {
                    textClass = "alert-success";
                } else if(timeRemain <= warningTime && timeRemain > 0) {
                    textClass = "alert-warning";
                } else if(timeRemain < 0){
                    textClass = "alert-danger";
                    endText = textTimeframe + "!";
                }

                return false;
            } else {
                textClass = "alert-danger";
                endText = textAvailableCar + "!";
            }
        });

        if(isNaN(missionSecs)) {
            textClass = "alert-info";
            endText = textStartMission + ".";
        }

        if($('div[id^="mission_bar_"] >> .progress-bar').css("width") == 0 + "px"){
            textClass = "alert-info";
            endText = textReachable + ".";
        }

        let ownVehiclesOnDrive = $("#mission_vehicle_driving >> tr").find("td.hidden-xs >> a.btn-backalarm-ajax").length;
        let ownVehiclesAtMission = $("#mission_vehicle_at_mission").find(".btn-backalarm-ajax").length;

        if(ownVehiclesOnDrive + ownVehiclesAtMission > 0) {
            textClass = "alert-info";
            endText = textInvolved + ".";
        }

        if(timeRemain > 0 && endText != textInvolved + ".") missionCountdown(timeRemain, 'remaining');
        else $("#mission_countdown_remaining").text(endText);

        $("#mission_countdown_remaining").removeClass().addClass("alert " + textClass);
    }

    setTimeout(jit_main, 1000);

    $("body").on("click", ".calculateTime", function(){
        setTimeout(function(){
            jit_main(function(){ $("#mission_countdown_remaining").removeClass("alert-info"); $("#mission_countdown_remaining").addClass(textClass); });
        }, 1000);
    });

    $("#missionH1").after(`<div id='mission_countdown_remaining' class='alert alert-info' style='float:right; padding: 2px 5px; margin:0'>${textLoading} ...</div>`);
})();
