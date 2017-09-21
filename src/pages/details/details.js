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
        this.newTitleIsValid = true;
    }
    DetailsPage.prototype.ionViewDidLoad = function () {
        this.title = this.navParams.get("name");
        this.newTitle = this.title;
        this.oldTitle = this.title;
    };
    DetailsPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.storage.getGoals(this.title, function (goals) {
            _this.goals = goals.map(function (g) { return { goal: g, selected: false }; });
        });
        this.storage.getPuzzleNames(function (names) { return _this.puzzleNames = names; });
    };
    DetailsPage.prototype.ionViewDidLeave = function () {
        this.storage.setPuzzle(this.title, this.goals.map(function (gi) { return gi.goal; }));
    };
    DetailsPage.prototype.uploadPuzzle = function () {
        this.storage.setPuzzle(this.title, this.goals.map(function (gi) { return gi.goal; }));
        //TODO
    };
    DetailsPage.prototype.selectGoal = function (goal) {
        var _this = this;
        if (this.deleteMode) {
            goal.selected = !goal.selected;
        }
        else {
            var editModal = this.modalCtrl.create(NewGoalModalPage, { goal: goal });
            console.log(goal);
            editModal.onDidDismiss(function (data) {
                if (data.goal !== undefined) {
                    _this.goals.find(function (gi) { return gi.goal.ind === data.goal.ind; }).goal = data.goal;
                }
            });
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
        var createModal = this.modalCtrl.create(NewGoalModalPage, { goal: undefined });
        console.log(createModal);
        createModal.onDidDismiss(function (data) {
            if (data.goal !== undefined) {
                data.goal.ind = _this.goals.length;
                _this.goals.push({ goal: data.goal, selected: false });
            }
        });
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