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
        this.puzzles = [];
    }
    PuzzleStoreProvider.prototype.loadAll = function () {
        var _this = this;
        this.storage.ready().then(function () {
            _this.storage.get("puzzles").then(function (ps) {
                if (Array.isArray(ps)) {
                    _this.puzzles = ps;
                }
            })
                .catch(function (e) { return console.log(e); });
        }).catch(function (e) { return console.log(e); });
    };
    PuzzleStoreProvider.prototype.getPuzzleNames = function () {
        return this.puzzles.map(function (p) { return p.name; });
    };
    PuzzleStoreProvider.prototype.removePuzzles = function (names) {
        this.puzzles = this.puzzles
            .filter(function (p) { return !names.some(function (n) { return n === p.name; }); });
    };
    PuzzleStoreProvider.prototype.addPuzzle = function (name) {
        this.puzzles.push({
            name: name,
            goals: []
        });
    };
    PuzzleStoreProvider.prototype.getGoals = function (puzzleName) {
        var puzzle = this.puzzles
            .find(function (p) { return p.name === puzzleName; });
        return puzzle === undefined ? [] : puzzle.goals;
    };
    PuzzleStoreProvider.prototype.setPuzzle = function (oldName, puzzle) {
        var oldPuzzle = this.puzzles
            .findIndex(function (p) { return p.name === oldName; });
        if (oldPuzzle !== -1) {
            this.puzzles.splice(oldPuzzle, 1, puzzle);
        }
        else {
            this.puzzles.push(puzzle);
        }
    };
    PuzzleStoreProvider.prototype.saveAll = function () {
        var _this = this;
        this.storage.ready().then(function () {
            _this.storage.set("puzzles", _this.puzzles)
                .catch(function (e) { return console.log(e); });
        }).catch(function (e) { return console.log(e); });
    };
    return PuzzleStoreProvider;
}());
PuzzleStoreProvider = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Storage])
], PuzzleStoreProvider);
export { PuzzleStoreProvider };
//# sourceMappingURL=puzzle-store.js.map