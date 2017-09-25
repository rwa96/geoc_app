import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { GoalItem , GoalIntent } from '../details/details';
import { Goal } from '../../providers/puzzle-store/puzzle-store';


@Component({
	selector: 'page-new-goal-modal',
	templateUrl: 'new-goal-modal.html',
})
export class NewGoalModalPage {

	private static coordRegEx: RegExp = /[\+\-]?(([1-9][0-9]+)|[0-9])(\.[0-9]+)?/g;

	private static passwdRegEx: RegExp = /^[0-9a-f]{4}$/ig;

	private static hexDigits: Array<string> = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];

	private latLngField: string = "";

	private passwdField: string = "";

	private validCoords: boolean = false;

	private validPasswd: boolean = false;

	private validGoal: boolean = false;

	private goal: Goal = {
		lat: 0,
		lng: 0,
		ind: -1,
		passwd: [0, 0, 0, 0]
	};

	constructor(
		private navParams: NavParams,
		private translate: TranslateService,
		private view: ViewController
	){}

	ionViewDidLoad(){
		const intent: GoalIntent = this.navParams.data;
		if(intent.valid){
			this.goal = intent.goal;
			this.validGoal = true;
			this.validCoords = true;
			this.validPasswd = true;

			this.latLngField = this.goal.lat + ", " + this.goal.lng;
			this.passwdField = this.goal.passwd.map<string>(d => {
				return NewGoalModalPage.hexDigits[d];
			}).join("");
		}
	}

	private checkCoordInput(){
		let checkCoords: boolean = false;
		if(this.latLngField !== null){
			let latLngMatches = this.latLngField.match(NewGoalModalPage.coordRegEx);
			if(latLngMatches !== null && latLngMatches.length === 2){
				this.goal.lat = parseFloat(latLngMatches[0]);
				this.goal.lng = parseFloat(latLngMatches[1]);

				checkCoords = true;
			}
		}

		this.validCoords = checkCoords
		this.validGoal = this.validCoords && this.validPasswd;
	}

	private checkPasswdInput(){
		let checkPasswd: boolean = false;
		if(this.passwdField !== null){
			if(this.passwdField.search(NewGoalModalPage.passwdRegEx) === 0){
				let passwdStr = this.passwdField.toLowerCase();
				for(let pos = 0; pos < passwdStr.length; pos++){
					this.goal.passwd[pos] = NewGoalModalPage.hexDigits.indexOf(passwdStr.charAt(pos));
				}
				checkPasswd = true;
			}
		}

		this.validPasswd = checkPasswd;
		this.validGoal = this.validCoords && this.validPasswd;
	}

	private cancleModal(){
		const intent: GoalIntent = {valid: false};
		this.view.dismiss(intent);
	}

	private saveGoal(){
		const intent: GoalIntent = {valid: true, goal: this.goal};
		this.view.dismiss(intent);
	}

}
