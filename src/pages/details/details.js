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
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { NewGoalModalPage } from '../new-goal-modal/new-goal-modal';
import { PuzzleStoreProvider } from '../../providers/puzzle-store/puzzle-store';
var DetailsPage = (function () {
    function DetailsPage(navCtrl, navParams, modalCtrl, storage, translate) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.storage = storage;
        this.translate = translate;
        this.title = "";
        this.newTitle = "";
        this.oldTitle = "";
        this.newTitleIsValid = false;
        this.goals = [];
        this.puzzleNames = [];
        this.deleteMode = false;
    }
    DetailsPage.prototype.ionViewDidLoad = function () {
        this.newTitleIsValid = true;
        this.title = this.navParams.get("name");
        this.newTitle = this.title;
        this.oldTitle = this.title;
    };
    DetailsPage.prototype.ionViewWillEnter = function () {
        this.goals = this.storage.getGoals(this.title)
            .map(function (g) { return { goal: g, selected: false }; });
        this.puzzleNames = this.storage.getPuzzleNames();
    };
    DetailsPage.prototype.ionViewWillLeave = function () {
        this.storage.setPuzzle(this.oldTitle, {
            name: this.title,
            goals: this.goals.map(function (gi) { return gi.goal; })
        });
        this.storage.saveAll();
    };
    DetailsPage.prototype.uploadPuzzle = function () {
        console.log(JSON.stringify(this.goals));
        //TODO
    };
    DetailsPage.prototype.selectGoal = function (goalItem) {
        var _this = this;
        if (this.deleteMode) {
            goalItem.selected = !goalItem.selected;
        }
        else {
            var intent = { valid: true, goal: goalItem.goal };
            var callback = function (data) {
                if (data.valid) {
                    _this.goals.find(function (gi) { return gi.goal.ind === data.goal.ind; }).goal = data.goal;
                }
            };
            var editModal = this.modalCtrl.create(NewGoalModalPage, intent);
            editModal.onDidDismiss(callback.bind(this));
            editModal.present();
        }
    };
    DetailsPage.prototype.deleteGoals = function () {
        if (this.deleteMode) {
            this.goals = this.goals.filter(function (g) { return !g.selected; });
            this.goals.forEach(function (gi, i) { return gi.goal.ind = i; });
        }
        this.deleteMode = !this.deleteMode;
    };
    DetailsPage.prototype.createGoal = function () {
        var _this = this;
        var intent = { valid: false };
        var callback = function (data) {
            if (data.valid) {
                data.goal.ind = _this.goals.length;
                var item = { goal: data.goal, selected: false };
                _this.goals.push(item);
            }
        };
        var createModal = this.modalCtrl.create(NewGoalModalPage, intent);
        createModal.onDidDismiss(callback.bind(this));
        createModal.present();
    };
    DetailsPage.prototype.checkNewTitle = function () {
        var _this = this;
        this.newTitleIsValid = this.newTitle === this.oldTitle ||
            !this.puzzleNames.some(function (name) { return name === _this.newTitle; });
        if (this.newTitleIsValid) {
            this.title = this.newTitle;
        }
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
        ModalController,
        PuzzleStoreProvider,
        TranslateService])
], DetailsPage);
export { DetailsPage };
//# sourceMappingURL=details.js.map