import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';


@Component({
	selector: 'page-new-goal-modal',
	templateUrl: 'new-goal-modal.html',
})
export class NewGoalModalPage {

	private static coordRegEx: RegExp = /[\+\-]?(([1-9][0-9]+)|[0-9])(\.[0-9]+)?/g;

	private lat: number;

	private lng: number;

	private latLngField: string;

	private validGoal: boolean = false;

	constructor(
		private navCtrl: NavController,
		private translate: TranslateService,
		private view: ViewController
	){}

	private checkCoordInput(){
		if(this.latLngField !== null){
			let latLngMatches = this.latLngField.match(NewGoalModalPage.coordRegEx);
			if(latLngMatches !== null && latLngMatches.length === 2){
				this.lat = parseFloat(latLngMatches[0]);
				this.lng = parseFloat(latLngMatches[1]);
				this.validGoal = true;
			}else{
				this.validGoal = false;
			}
		}else{
			this.validGoal = false;
		}
	}

	private saveGoal(){
		//TODO
		this.view.dismiss();
	}

}
