import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { AlertController } from 'ionic-angular';

import { DetailsPage } from '../details/details';


@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage{

	private puzzles: Array<PuzzleItem>;

	private deleteMode: boolean = false;

	constructor(
		private navCtrl: NavController,
		private alertCtrl: AlertController,
		private translate: TranslateService
	){
		this.puzzles = [
			"test0",
			"test1",
			"test2",
			"test3"
		].map<PuzzleItem>( (nm: string) => {return {name: nm, selected: false};});
	}

	private selectPuzzle(puzzle: PuzzleItem){
		if(this.deleteMode){
			puzzle.selected = !puzzle.selected;
		}else{
			this.navCtrl.push(DetailsPage, {
				name: puzzle.name,
				saved: true
			});
		}
	}

	private deletePuzzles(){
		if(this.deleteMode){
			this.puzzles = this.puzzles.filter(
				(p: PuzzleItem) => !p.selected
			);
		}

		this.deleteMode = !this.deleteMode;
	}

	private createPuzzle(){
		this.alertCtrl.create({
			title: this.translate.instant("home.newPuzzleAlert.title"),
			message: this.translate.instant("home.newPuzzleAlert.message"),
			inputs: [{
				name: "name",
				placeholder: this.translate.instant("home.newPuzzleAlert.placeholder")
			}],
			buttons: [
				this.translate.instant("home.newPuzzleAlert.cancel"),
				{
					text: this.translate.instant("home.newPuzzleAlert.save"),
					handler: data => this.createPuzzleData(data.name)
				}
			]
		}).present();
	}

	private createPuzzleData(nm: string){
		if(this.puzzles.find(p => p.name === nm) === undefined){
			this.puzzles.push({name: nm, selected: false});
		}else{
			this.alertCtrl.create({
				title: this.translate.instant("home.newPuzzleAlert.error"),
				message: this.translate.instant("home.newPuzzleAlert.errorMessage"),
				buttons: [this.translate.instant("home.newPuzzleAlert.errorDismiss")]
			}).present();
		}
	}

}

interface PuzzleItem {
	name: string;
	selected: boolean;
}
