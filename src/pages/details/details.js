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
import { NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
var DetailsPage = (function () {
    function DetailsPage(navCtrl, navParams, translate) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.translate = translate;
        this.deleteMode = false;
        this.title = navParams.get("name");
        this.goals = new Array();
        for (var i = 0; i < 10; i++) {
            this.goals.push({ ind: i, lat: 0, lon: 0, passwd: [0, 1, 2, 3], selected: false, valid: false });
        }
    }
    DetailsPage.prototype.selectGoal = function (goal) {
        if (this.deleteMode) {
            goal.selected = !goal.selected;
        }
        else {
            /*this.navCtrl.push(DetailsPage, {
                name: puzzle.name,
                saved: true
            });*/
        }
    };
    DetailsPage.prototype.deleteGoals = function () {
        if (this.deleteMode) {
            this.goals = this.goals.filter(function (g) { return !g.selected; });
        }
        this.deleteMode = !this.deleteMode;
    };
    DetailsPage.prototype.createGoal = function () {
    };
    return DetailsPage;
}());
DetailsPage = __decorate([
    Component({
        selector: 'page-details',
        templateUrl: 'details.html',
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        TranslateService])
], DetailsPage);
export { DetailsPage };
//# sourceMappingURL=details.js.map