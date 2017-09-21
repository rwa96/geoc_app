var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
var PuzzleStoreProvider = (function () {
    function PuzzleStoreProvider(storage) {
        this.storage = storage;
    }
    PuzzleStoreProvider.prototype.storageReady = function (callback) {
        this.storage.ready().then(callback).catch(function (e) { return console.log("Not ready!\n", e); });
    };
    PuzzleStoreProvider.prototype.getPuzzleNames = function (callback) {
        var _this = this;
        this.storageReady(function () {
            _this.storage.keys().then(function (names) { return callback(names); })
                .catch(function (e) { return console.log("getPuzzleNames()\n", e); });
        });
    };
    PuzzleStoreProvider.prototype.removePuzzles = function (names) {
        var _this = this;
        this.storageReady(function () {
            names.forEach(function (name) {
                _this.storage.remove(name)
                    .catch(function (e) { return console.log("removePuzzles(", names, ")\n", e); });
            });
        });
    };
    PuzzleStoreProvider.prototype.addPuzzle = function (name) {
        var _this = this;
        this.storageReady(function () {
            _this.storage.set(name, [])
                .catch(function (e) { return console.log("addPuzzle(", name, ")\n", e); });
        });
    };
    PuzzleStoreProvider.prototype.getGoals = function (puzzleName, callback) {
        var _this = this;
        this.storageReady(function () {
            _this.storage.get(puzzleName).then(function (goals) { return callback(goals); })
                .catch(function (e) { return console.log("getGoals(", puzzleName, ")\n", e); });
        });
    };
    PuzzleStoreProvider.prototype.setPuzzle = function (puzzleName, goals) {
        var _this = this;
        this.storageReady(function () {
            _this.storage.set(puzzleName, goals)
                .catch(function (e) { return console.log("setPuzzle(", puzzleName, ")\n", e); });
        });
    };
    return PuzzleStoreProvider;
}());
PuzzleStoreProvider = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Storage])
], PuzzleStoreProvider);
export { PuzzleStoreProvider };
//# sourceMappingURL=puzzle-store.js.map