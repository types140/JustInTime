// ==UserScript==
// @name         JustInTime
// @version      1.0.1
// @author       Allure149
// @include      *://leitstellenspiel.de/*
// @include      *://www.leitstellenspiel.de/*
// @include      *://missionchief.co.uk/*
// @include      *://www.missionchief.co.uk/*
// @include      *://missionchief.com/*
// @include      *://www.missionchief.com/*
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

    const arrFahrzeugDatenFJ = [{id: 0, name: "Water Ladder", personal: 0},
                                {id: 1, name: "Light 4X4 Pump (L4P)", personal: 0},
                                {id: 2, name: "Aerial Appliance", personal: 0},
                                {id: 3, name: "Fire Officer", personal: 0},
                                {id: 4, name: "Rescue Support Unit (RSU)", personal: 0},
                                {id: 5, name: "Ambulance", personal: 2},
                                {id: 6, name: "Water Carrier", personal: 0},
                                {id: 7, name: "HazMat Unit", personal: 0},
                                {id: 8, name: "Incident response vehicle (IRV)", personal: 6},
                                {id: 9, name: "SAR helicopter", personal: 2},
                                {id: 10, name: "Rapid Response Vehicle", personal: 2},
                                {id: 11, name: "Police helicopter", personal: 6},
                                {id: 12, name: "Dog Support Unit (DSU)", personal: 6},
                                {id: 13, name: "Armed Response Vehicle (ARV)", personal: 6},
                                {id: 14, name: "Breathing Apparatus Support Unit (BASU)", personal: 0},
                                {id: 15, name: "Incident Command and Control Unit (ICCU)", personal: 0},
                                {id: 16, name: "Rescue Pump", personal: 0}];

    let text_saved, text_own_missions, text_after, text_represent, text_warning, text_check_cars, text_close, text_save, text_selection, text_event, text_federation, arrFahrzeugDaten;
    let text_timeframe, text_available_car, text_start_mission, text_involved, text_loading, text_hours, text_minutes, text_seconds, text_options, text_kilometers;

    if(I18n.locale == "de"){
        arrFahrzeugDaten = arrFahrzeugDatenDE;
        text_saved = "Gespeichert";
        text_own_missions = "Eigene Einsätze einbeziehen";
        text_after = "Ab";
        text_represent = "Sekunden darstellen als";
        text_warning = "Warnung";
        text_check_cars = "Folgende Fahrzeuge werden geprüft";
        text_close = "Schließen";
        text_save = "Speichern";
        text_selection = "Auswahl anzeigen";
        text_timeframe = "Zeitfenster überschritten";
        text_available_car = "Kein Fahrzeug verfügbar";
        text_start_mission = "Einsatz hat noch nicht begonnen";
        text_involved = "Bereits beteiligt";
        text_loading = "Lade";
        text_hours = "Std.";
        text_minutes = "Min.";
        text_seconds = "Sek.";
        text_options = "Optionen";
        text_event = "Event";
        text_federation = "Verband";
        text_kilometers = "km";
    } else if(I18n.locale == "en"){
        arrFahrzeugDaten = arrFahrzeugDatenEN;
        text_saved = "Saved";
        text_own_missions = "Invole owned missions";
        text_after = "After"
        text_represent = "seconds represent as";
        text_warning = "warning";
        text_check_cars = "The following cars will be checked";
        text_close = "close";
        text_save = "save";
        text_selection = "Show selection";
        text_timeframe = "Timeframe exceeded";
        text_available_car = "No car available";
        text_start_mission = "Mission didn't start yet";
        text_involved = "Already involved";
        text_loading = "Loading";
        text_hours = "H";
        text_minutes = "min.";
        text_seconds = "sec.";
        text_options = "options";
        text_event = "Event";
        text_federation = "Alliance";
        text_kilometers = "miles";
    } else if(I18n.locale == "fj"){
        arrFahrzeugDaten = arrFahrzeugDatenFJ;
        text_saved = "Saved";
        text_own_missions = "Invole owned missions";
        text_after = "After"
        text_represent = "seconds represent as";
        text_warning = "warning";
        text_check_cars = "The following cars will be checked";
        text_close = "close";
        text_save = "save";
        text_selection = "Show selection";
        text_timeframe = "Timeframe exceeded";
        text_available_car = "No car available";
        text_start_mission = "Mission didn't start yet";
        text_involved = "Already involved";
        text_loading = "Loading";
        text_hours = "H";
        text_minutes = "min.";
        text_seconds = "sec.";
        text_options = "options";
        text_event = "Event";
        text_federation = "Alliance";
        text_kilometers = "miles";
    }

    if (localStorage.getItem("jit_own_missions") === null) {
        localStorage.jit_own_missions = true; // eigene_einsaetze = false wenn ausschliesslich Verbandseinsaetze geprueft werden sollen
        localStorage.jit_car_ids = JSON.stringify(["1", "2"]);
        localStorage.jit_warning_time = "60";
    }

    let car_ids = JSON.parse(localStorage.jit_car_ids);
    let eigene_einsaetze = localStorage.jit_own_missions;
    let warning_time = parseInt(localStorage.jit_warning_time, 10);

    $("#group_max_distance").after(`<div>
    <button type="button" class="btn btn-default btn-xs" data-toggle="modal" data-target="#jit_options">JIT ` + text_options + `</button>
    <div class="modal fade" id="jit_options" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style="display: none;">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">JustInTime ` + text_options + `</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body" id="jit_body">
                    <div class="col-md-6">
                        <div class="checkbox-inline" id="jit_check_1" style="margin: 5px 0">
                            <input class="" type="checkbox" value="" id="jit_own_missions" name="jit_own_missions">
                            <label class="" for="jit_own_missions"> ` + text_own_missions + `?</label>
                        </div>
                        <div class="form-inline">
                            ` + text_after + `<input type="text" class="form-control input-sm" id="jit_textbox" style="margin: 0 5px; width: 50px" maxlength="4"/>` + text_represent + `<span class="alert alert-warning" style="padding: 2px 5px; margin:0 5px;">` + text_warning + `</span>.
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div id="jit_check_ids"><h4>` + text_check_cars + `:</h4> </div>
                    </div>
                    <hr class="float-left">
                    <div id="jit_show_checkboxes">` + text_selection + ` <div class="glyphicon glyphicon-chevron-down" id="jit_chevron"></div></div>
                    <div class="form-check jit_hide" id="jit_check_2">
                        <hr>
                        <ul id="jit_ids_ul" class="nav nav-list"></ul>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">` + text_close + `</button>
                        <button type="button" id="jit_save" class="btn btn-primary">` + text_save + `</button>
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
        $("#jit_ids_ul").append('<li><div class="btn-group-toggle" data-toggle="buttons"><label class="btn btn-info jit_group_toggle" id="jit_id_label' + e.id + '" for="jit_id_checkboxes' + e.id + '"><input type="checkbox" value="' + e.id + '" id="jit_id_checkboxes' + e.id + '" name="jit_ids[]" autocomplete="off"/> ' + e.name + '</label></div></li>');

        $.each(car_ids, function(i2,e2){
            if(i == e2) {
                $("#jit_id_checkboxes" + e2).prop("checked", true);
                $("#jit_id_label" + e2).toggleClass("btn-info btn-success").addClass("active");
                $("#jit_check_ids").append("<h5>" + e.name + "</h5>");
            }
        });
    });

    $('body').on("click", ".jit_group_toggle", function(e) {
        e.preventDefault();

        $(this).toggleClass('btn-info btn-success');

        let checkbox = $(this).children('input:first');
        let checked = checkbox.prop('checked');

        checkbox.prop('checked', !checked).removeClass("active");
    });

    if(eigene_einsaetze == "true") $("#jit_own_missions").prop("checked", true);
    else $("#jit_own_missions").prop("checked", false);

    $("#jit_textbox").val(warning_time);

    $("body").on("click", "#jit_save", function(){
        let checkbox_ids = [];
        $("input[name='jit_ids[]']").map(function(){
            if($(this).is(":checked")) checkbox_ids.push($(this).val());
        });

        localStorage.jit_own_missions = $("#jit_own_missions").is(":checked");
        localStorage.jit_car_ids = JSON.stringify(checkbox_ids);
        localStorage.jit_warning_time = $("#jit_textbox").val();

        $("#jit_body").children().addClass("jit_hide");
        $("#jit_body").addClass("text-center").html("<h1>" + text_saved + ".</h1>");

        setTimeout(function(){
            $("#jit_options").modal("toggle");
        }, 1500);

        location.reload();
    });

    const mission_verband = $("#missionH1").text().trim().startsWith("[" + text_federation + "]") ? true : false;
    const mission_event = $("#missionH1").text().trim().startsWith("[" + text_event + "]") ? true : false;
    const mission_id = $("#mission_reply_mission_id").val();
    let mission_time = $(".mission_header_info").find("#mission_countdown_" + mission_id).text().split(":").map(function(x){ return parseInt(x,10) });
    let mission_secs = (mission_time.length == 2) ? (mission_time[0] * 60) + mission_time[1] : (mission_time[0] * 3600) + (mission_time[1] * 60) + mission_time[2];
    let vehicle_type_id = 0; // aktuell gefiltertes Fahrzeug
    let car_id = 0; // != 0 wenn korrektes Fahrzeug gefunden wurde
    let car_secs = 0;
    let car_secs_temp = 0;
    let time_remain = 0;
    let end_text = "";
    let text_class = "";
    let counts = 0;

    if(eigene_einsaetze == "false" && !mission_verband && !mission_event) return false;

    function jit_main(){
        $(".vehicle_select_table_tr").each(function(){
            vehicle_type_id = $(this).find("td:nth-child(3)").attr("vehicle_type_id");

            if ($(this).find("td:nth-child(4)").text().indexOf(text_kilometers) >= 0) return true;
            car_secs_temp = $(this).find("td:nth-child(4)").text().replace(" " + text_hours + " ", ":").replace(" " + text_minutes + " ", ":").replace(" " + text_seconds, "").split(":").map(function(x){ return parseInt(x,10) });

            console.log("car_secs_temp.length: " + car_secs_temp.length);
            console.log("car_secs_temp ARRAY: " + car_secs_temp);
            console.log("calc it: " + (car_secs_temp[0] * 60) + " + " + car_secs_temp[1]);
            car_secs = (car_secs_temp.length == 3) ? (car_secs_temp[0] * 3600) + (car_secs_temp[1] * 60) + car_secs_temp[2] : (car_secs_temp.length == 2) ? (car_secs_temp[0] * 60) + car_secs_temp[1] : car_secs_temp[0];

            $.each(car_ids, function(i,e){
                if(e == vehicle_type_id) {
                    car_id = vehicle_type_id;
                    time_remain = mission_secs - car_secs;
                    return false;
                }
            });

            if(car_id != 0) {
                if(time_remain > warning_time) {
                    text_class = "alert-success";
                } else if(time_remain <= warning_time && time_remain > 0) {
                    text_class = "alert-warning";
                } else if(time_remain < 0){
                    text_class = "alert-danger";
                    end_text = text_timeframe + "!";
                }

                return false;
            } else {
                text_class = "alert-danger";
                end_text = text_available_car + "!";
            }
        });

        if(isNaN(mission_secs)) {
            text_class = "alert-info";
            end_text = text_start_mission + ".";
        }

        if($("#missionH1 > span").hasClass("glyphicon-user")) {
            text_class = "alert-info";
            end_text = text_involved + ".";
        }

        if(time_remain > 0 && end_text != text_involved + ".") missionCountdown(time_remain, 'remaining');
        else $("#mission_countdown_remaining").text(end_text);

        $("#mission_countdown_remaining").removeClass().addClass("alert " + text_class);
    }

    setTimeout(jit_main, 1000);

    $("body").on("click", ".calculateTime", function(){
        setTimeout(function(){
            jit_main(function(){ $("#mission_countdown_remaining").removeClass("alert-info"); $("#mission_countdown_remaining").addClass(text_class); });
        }, 1000);
    });

    $("#missionH1").after("<div id='mission_countdown_remaining' class='alert alert-info' style='float:right; padding: 2px 5px; margin:0'>" + text_loading + " ...</div>");
})();
