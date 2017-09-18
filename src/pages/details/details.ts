import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';


@Component({
	selector: 'page-details',
	templateUrl: 'details.html',
})
export class DetailsPage {

	private title: string;

	private goals: Array<Goal>;

	private deleteMode: boolean = false;

	constructor(
		private navCtrl: NavController,
		private navParams: NavParams,
		private translate: TranslateService
	){
		this.title = navParams.get("name");

		this.goals = new Array();
		for(let i: number = 0; i < 10; i++){
			this.goals.push({ind: i, lat: 0, lon: 0, passwd: [0, 1, 2, 3], selected: false, valid: false});
		}
	}

	private selectGoal(goal: Goal){
		if(this.deleteMode){
			goal.selected = !goal.selected;
		}else{
			/*this.navCtrl.push(DetailsPage, {
				name: puzzle.name,
				saved: true
			});*/
		}
	}

	private deleteGoals(){
		if(this.deleteMode){
			this.goals = this.goals.filter(
				(g: Goal) => !g.selected
			);
		}

		this.deleteMode = !this.deleteMode;
	}

	private createGoal(){
	}

}

interface Goal {
	ind: number;
	lat: number;
	lon: number;
	passwd: Array<number>;
	selected: boolean;
	valid: boolean;
}
