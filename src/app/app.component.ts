import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';

import { HomePage } from '../pages/home/home';
import { PuzzleStoreProvider } from '../providers/puzzle-store/puzzle-store';

@Component({
	templateUrl: 'app.html',
	providers: [PuzzleStoreProvider]
})
export class Application{

	rootPage:any = HomePage;

	private defaultLang: string = "en";

	constructor(
		private platform: Platform,
		private statusBar: StatusBar,
		private splashScreen: SplashScreen,
		private translate: TranslateService
	){
		platform.ready().then(() => {
			statusBar.styleDefault();
			splashScreen.hide();
		});

		this.translate.setDefaultLang(this.defaultLang);
	}

}
