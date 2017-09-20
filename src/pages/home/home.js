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
import { NavController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { AlertController } from 'ionic-angular';
import { DetailsPage } from '../details/details';
var HomePage = (function () {
    function HomePage(navCtrl, alertCtrl, translate) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.translate = translate;
        this.deleteMode = false;
        this.puzzles = [
            "test0",
            "test1",
            "test2",
            "test3"
        ].map(function (nm) { return { name: nm, selected: false }; });
    }
    HomePage.prototype.selectPuzzle = function (puzzle) {
        if (this.deleteMode) {
            puzzle.selected = !puzzle.selected;
        }
        else {
            this.navCtrl.push(DetailsPage, {
                name: puzzle.name,
                saved: true
            });
        }
    };
    HomePage.prototype.deletePuzzles = function () {
        if (this.deleteMode) {
            this.puzzles = this.puzzles.filter(function (p) { return !p.selected; });
        }
        this.deleteMode = !this.deleteMode;
    };
    HomePage.prototype.createPuzzle = function () {
        var _this = this;
        this.alertCtrl.create({
            title: this.translate.instant("home.newPuzzleAlert.title"),
            message: this.translate.instant("home.newPuzzleAlert.message"),
            inputs: [{
                    name: "name",
                    placeholder: this.translate.instant("home.newPuzzleAlert.placeholder")
                }],
            buttons: [
                this.translate.instant("home.newPuzzleAlert.cancel"),
                {
                    text: this.translate.instant("home.newPuzzleAlert.save"),
                    handler: function (data) { return _this.createPuzzleData(data.name); }
                }
            ]
        }).present();
    };
    HomePage.prototype.createPuzzleData = function (nm) {
        if (this.puzzles.find(function (p) { return p.name === nm; }) === undefined) {
            this.puzzles.push({ name: nm, selected: false });
        }
        else {
            this.alertCtrl.create({
                title: this.translate.instant("home.newPuzzleAlert.error"),
                message: this.translate.instant("home.newPuzzleAlert.errorMessage"),
                buttons: [this.translate.instant("home.newPuzzleAlert.errorDismiss")]
            }).present();
        }
    };
    return HomePage;
}());
HomePage = __decorate([
    Component({
        selector: 'page-home',
        templateUrl: 'home.html'
    }),
    __metadata("design:paramtypes", [NavController,
        AlertController,
        TranslateService])
], HomePage);
export { HomePage };
//# sourceMappingURL=home.js.map