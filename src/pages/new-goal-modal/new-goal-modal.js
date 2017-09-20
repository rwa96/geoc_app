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
import { NavController, ViewController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
var NewGoalModalPage = NewGoalModalPage_1 = (function () {
    function NewGoalModalPage(navCtrl, translate, view) {
        this.navCtrl = navCtrl;
        this.translate = translate;
        this.view = view;
        this.validGoal = false;
    }
    NewGoalModalPage.prototype.checkCoordInput = function () {
        if (this.latLngField !== null) {
            var latLngMatches = this.latLngField.match(NewGoalModalPage_1.coordRegEx);
            if (latLngMatches !== null && latLngMatches.length === 2) {
                this.lat = parseFloat(latLngMatches[0]);
                this.lng = parseFloat(latLngMatches[1]);
                this.validGoal = true;
            }
            else {
                this.validGoal = false;
            }
        }
        else {
            this.validGoal = false;
        }
    };
    NewGoalModalPage.prototype.saveGoal = function () {
        //TODO
        this.view.dismiss();
    };
    return NewGoalModalPage;
}());
NewGoalModalPage.coordRegEx = /[\+\-]?(([1-9][0-9]+)|[0-9])(\.[0-9]+)?/g;
NewGoalModalPage = NewGoalModalPage_1 = __decorate([
    Component({
        selector: 'page-new-goal-modal',
        templateUrl: 'new-goal-modal.html',
    }),
    __metadata("design:paramtypes", [NavController,
        TranslateService,
        ViewController])
], NewGoalModalPage);
export { NewGoalModalPage };
var NewGoalModalPage_1;
//# sourceMappingURL=new-goal-modal.js.map