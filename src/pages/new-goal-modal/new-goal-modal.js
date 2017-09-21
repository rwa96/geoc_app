var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
var NewGoalModalPage = NewGoalModalPage_1 = (function () {
    function NewGoalModalPage(navParams, translate, view) {
        this.navParams = navParams;
        this.translate = translate;
        this.view = view;
        this.latLngField = "";
        this.passwdField = "";
        this.validCoords = false;
        this.validPasswd = false;
        this.validGoal = false;
        this.goal = {
            lat: 0,
            lng: 0,
            ind: -1,
            passwd: [0, 0, 0, 0]
        };
    }
    NewGoalModalPage.prototype.ionicViewDidLoad = function () {
        this.goal = this.navParams.get("goal");
        if (this.goal !== undefined) {
            this.validGoal = true;
            this.validCoords = true;
            this.validPasswd = true;
            this.latLngField = this.goal.lat + ", " + this.goal.lng;
            this.passwdField = this.goal.passwd.map(function (d) {
                return NewGoalModalPage_1.hexDigits[d];
            }).join("");
        }
    };
    NewGoalModalPage.prototype.checkCoordInput = function () {
        if (this.latLngField !== null) {
            var latLngMatches = this.latLngField.match(NewGoalModalPage_1.coordRegEx);
            if (latLngMatches !== null && latLngMatches.length === 2) {
                this.goal.lat = parseFloat(latLngMatches[0]);
                this.goal.lng = parseFloat(latLngMatches[1]);
                this.validCoords = true;
            }
            else {
                this.validCoords = false;
            }
        }
        else {
            this.validCoords = false;
        }
        this.validGoal = this.validCoords && this.validPasswd;
    };
    NewGoalModalPage.prototype.checkPasswdInput = function () {
        if (this.passwdField !== null) {
            if (this.passwdField.search(NewGoalModalPage_1.passwdRegEx) === 0) {
                var passwdStr = this.passwdField.toLowerCase();
                for (var pos = 0; pos < passwdStr.length; pos++) {
                    this.goal.passwd[pos] = NewGoalModalPage_1.hexDigits.indexOf(passwdStr.charAt(pos));
                }
                this.validPasswd = true;
            }
            else {
                this.validPasswd = false;
            }
        }
        else {
            this.validPasswd = false;
        }
        this.validGoal = this.validCoords && this.validPasswd;
    };
    NewGoalModalPage.prototype.saveGoal = function () {
        this.view.dismiss({ goal: this.goal });
    };
    return NewGoalModalPage;
}());
NewGoalModalPage.coordRegEx = /[\+\-]?(([1-9][0-9]+)|[0-9])(\.[0-9]+)?/g;
NewGoalModalPage.passwdRegEx = /^[0-9a-f]{4}$/ig;
NewGoalModalPage.hexDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
NewGoalModalPage = NewGoalModalPage_1 = __decorate([
    Component({
        selector: 'page-new-goal-modal',
        templateUrl: 'new-goal-modal.html',
    }),
    __metadata("design:paramtypes", [NavParams,
        TranslateService,
        ViewController])
], NewGoalModalPage);
export { NewGoalModalPage };
var NewGoalModalPage_1;
//# sourceMappingURL=new-goal-modal.js.map