import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { NewGoalModalPage } from '../new-goal-modal/new-goal-modal';


@Component({
	selector: 'page-details',
	templateUrl: 'details.html',
})
export class DetailsPage {

	private title: string;

	private newTitle: string;

	private newTitleIsValid: boolean;

	private goals: Array<GoalItem>;

	private deleteMode: boolean = false;

	constructor(
		private navCtrl: NavController,
		private navParams: NavParams,
		private modalCtrl: ModalController,
		private translate: TranslateService
	){
		this.title = navParams.get("name");
		this.newTitle = this.title;
		this.newTitleIsValid = true;

		this.goals = new Array();
		for(let i: number = 0; i < 10; i++){
			this.goals.push({ind: i, lat: 0, lon: 0, passwd: [0, 1, 2, 3], selected: false, valid: false});
		}
	}

	private selectGoal(goal: GoalItem){
		if(this.deleteMode){
			goal.selected = !goal.selected;
		}else{
			//TODO
		}
	}

	private deleteGoals(){
		if(this.deleteMode){
			this.goals = this.goals.filter(
				(g: GoalItem) => !g.selected
			);
		}

		this.deleteMode = !this.deleteMode;
	}

	private createGoal(){
		this.modalCtrl.create(NewGoalModalPage).present();
	}

	private checkNewTitle(){
		//TODO
		this.newTitleIsValid = this.newTitle != this.title;
	}

}

interface GoalItem {
	ind: number;
	lat: number;
	lon: number;
	passwd: Array<number>;
	selected: boolean;
	valid: boolean;
}
