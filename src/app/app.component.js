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
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';
import { HomePage } from '../pages/home/home';
import { PuzzleStoreProvider } from '../providers/puzzle-store/puzzle-store';
var Application = (function () {
    function Application(platform, statusBar, splashScreen, translate) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.translate = translate;
        this.rootPage = HomePage;
        this.defaultLang = "en";
        platform.ready().then(function () {
            statusBar.styleDefault();
            splashScreen.hide();
        });
        this.translate.setDefaultLang(this.defaultLang);
    }
    return Application;
}());
Application = __decorate([
    Component({
        templateUrl: 'app.html',
        providers: [PuzzleStoreProvider]
    }),
    __metadata("design:paramtypes", [Platform,
        StatusBar,
        SplashScreen,
        TranslateService])
], Application);
export { Application };
//# sourceMappingURL=app.component.js.map