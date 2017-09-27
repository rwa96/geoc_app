import { Component } from '@angular/core';
import { NavParams, ModalController } from 'ionic-angular';
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
		private navParams: NavParams,
		private modalCtrl: ModalController,
		private storage: PuzzleStoreProvider,
		private translate: TranslateService
	){}

	ionViewDidLoad(){
		this.newTitleIsValid = true;
		this.title = this.navParams.get("name");
		this.newTitle = this.title;
		this.oldTitle = this.title;
	}

	ionViewWillEnter(){
		this.goals = this.storage.getGoals(this.title)
			.map<GoalItem>((g: Goal) => {return {goal: g, selected: false}});
		this.puzzleNames = this.storage.getPuzzleNames();
	}

	ionViewWillLeave(){
		this.storage.setPuzzle(this.oldTitle, {
			name: this.title,
			goals: this.goals.map<Goal>(gi => gi.goal)
		});
		this.storage.saveAll();
	}

	private uploadPuzzle(){
		console.log(JSON.stringify(this.goals));
		//TODO
	}

	private selectGoal(goalItem: GoalItem){
		if(this.deleteMode){
			goalItem.selected = !goalItem.selected;
		}else{
			const intent: GoalIntent = {valid: true, goal: goalItem.goal};
			const callback = (data: GoalIntent) => {
				if(data.valid){
					this.goals.find(
						(gi: GoalItem) => gi.goal.ind === data.goal.ind
					).goal = data.goal;
				}
			};

			const editModal = this.modalCtrl.create(NewGoalModalPage, intent);
			editModal.onDidDismiss(callback.bind(this));
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
		const intent: GoalIntent = {valid: false};
		const callback = (data: GoalIntent) => {
			if(data.valid){
				data.goal.ind = this.goals.length;
				const item: GoalItem = {goal: data.goal, selected:false};
				this.goals.push(item);
			}
		};

		const createModal = this.modalCtrl.create(NewGoalModalPage, intent);
		createModal.onDidDismiss(callback.bind(this));
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

export interface GoalIntent {
	valid: boolean;
	goal?: Goal;
}
