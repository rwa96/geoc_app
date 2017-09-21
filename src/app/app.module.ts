import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';

import { Application } from './app.component';
import { HomePage } from '../pages/home/home';
import { DetailsPage } from '../pages/details/details';
import { NewGoalModalPage } from '../pages/new-goal-modal/new-goal-modal';
import { PuzzleStoreProvider } from '../providers/puzzle-store/puzzle-store';


export function createTranslateLoader(http: HttpClient){
	return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
	declarations: [
		Application,
		HomePage,
		DetailsPage,
		NewGoalModalPage,
	],
	imports: [
		HttpClientModule,
		BrowserModule,
		IonicModule.forRoot(Application),
		IonicStorageModule.forRoot(),
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: (createTranslateLoader),
				deps: [HttpClient]
			}
		})
	],
	bootstrap: [IonicApp],
	entryComponents: [
		Application,
		HomePage,
		DetailsPage,
		NewGoalModalPage
	],
	providers: [
		StatusBar,
		SplashScreen,
		{provide: ErrorHandler, useClass: IonicErrorHandler},
		PuzzleStoreProvider
	]
})
export class AppModule{}
