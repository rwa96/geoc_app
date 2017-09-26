import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { AlertController, Alert } from 'ionic-angular';

import { DetailsPage } from '../details/details';
import { PuzzleStoreProvider , Goal, Puzzle } from '../../providers/puzzle-store/puzzle-store';


@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage{

	private puzzles: Array<PuzzleItem> = [];

	private deleteMode: boolean = false;

	constructor(
		private navCtrl: NavController,
		private alertCtrl: AlertController,
		private translate: TranslateService,
		private storage: PuzzleStoreProvider
	){}

	ionViewDidEnter(){
		this.puzzles = this.storage.getPuzzleNames().map<PuzzleItem>((nm: string) => {
			return {name: nm, selected: false};
		});
	}

	ionViewWillUnload(){
		this.storage.saveAll();
	}

	private selectPuzzle(puzzle: PuzzleItem){
		if(this.deleteMode){
			puzzle.selected = !puzzle.selected;
		}else{
			this.navCtrl.push(DetailsPage, {name: puzzle.name});
		}
	}

	private deletePuzzles(){
		if(this.deleteMode){
			let removeVals: Array<string> = this.puzzles
				.filter((p: PuzzleItem) => p.selected)
				.map<string>((p: PuzzleItem) => p.name);

			this.storage.removePuzzles(removeVals);

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
		if(!this.puzzles.some(p => p.name === nm)){
			this.storage.setPuzzle(nm, {name: nm, goals: []});
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
