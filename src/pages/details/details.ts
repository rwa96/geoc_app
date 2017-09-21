import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { NewGoalModalPage } from '../new-goal-modal/new-goal-modal';
import { PuzzleStoreProvider , Goal } from '../../providers/puzzle-store/puzzle-store';


@Component({
	selector: 'page-details',
	templateUrl: 'details.html',
})
export class DetailsPage {

	private title: string = "";

	private newTitle: string = "";

	private oldTitle: string = "";

	private newTitleIsValid: boolean = false;

	private goals: Array<GoalItem> = [];

	private puzzleNames: Array<string> = [];

	private deleteMode: boolean = false;

	constructor(
		private navCtrl: NavController,
		private navParams: NavParams,
		private modalCtrl: ModalController,
		private storage: PuzzleStoreProvider,
		private translate: TranslateService
	){
		this.newTitleIsValid = true;
	}

	ionViewDidLoad(){
		this.title = this.navParams.get("name");
		this.newTitle = this.title;
		this.oldTitle = this.title;
	}

	ionViewDidEnter(){
		this.storage.getGoals(this.title, (goals: Array<Goal>) => {
			this.goals = goals.map<GoalItem>((g: Goal) => {return {goal: g, selected: false};});
		});
		this.storage.getPuzzleNames((names: Array<string>) => this.puzzleNames = names);
	}

	ionViewDidLeave(){
		this.storage.setPuzzle(
			this.title,
			this.goals.map<Goal>((gi: GoalItem) => gi.goal)
		);
	}

	private uploadPuzzle(){
		this.storage.setPuzzle(
			this.title,
			this.goals.map<Goal>((gi: GoalItem) => gi.goal)
		);
		//TODO
	}

	private selectGoal(goal: GoalItem){
		if(this.deleteMode){
			goal.selected = !goal.selected;
		}else{
			let editModal = this.modalCtrl.create(NewGoalModalPage, {goal: goal});
			console.log(goal);
			editModal.onDidDismiss((data: {goal: Goal}) => {
				if(data.goal !== undefined){
					this.goals.find(
						(gi: GoalItem) => gi.goal.ind === data.goal.ind
					).goal = data.goal;
				}
			});
			editModal.present();
		}
	}

	private deleteGoals(){
		if(this.deleteMode){
			this.goals = this.goals.filter(
				(g: GoalItem) => !g.selected
			);
			this.goals.forEach((gi: GoalItem, i: number) => gi.goal.ind = i);
		}

		this.deleteMode = !this.deleteMode;
	}

	private createGoal(){
		let createModal = this.modalCtrl.create(NewGoalModalPage, {goal: undefined});
		console.log(createModal);
		createModal.onDidDismiss((data: {goal: Goal}) => {
			if(data.goal !== undefined){
				data.goal.ind = this.goals.length;
				this.goals.push({goal: data.goal, selected: false});
			}
		});
		createModal.present();
	}

	private checkNewTitle(){
		this.newTitleIsValid = this.newTitle === this.oldTitle ||
			!this.puzzleNames.some((name: string) => name === this.newTitle);

		if(this.newTitleIsValid){
			this.title = this.newTitle;
		}
	}

}

export interface GoalItem {
	goal: Goal;
	selected: boolean;
}
