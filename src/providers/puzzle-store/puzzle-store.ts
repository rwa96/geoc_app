import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';


@Injectable()
export class PuzzleStoreProvider {

	constructor(private storage: Storage){}

	private storageReady(callback: () => void){
		this.storage.ready().then(callback).catch(e => console.log(e));
	}

	public getPuzzleNames(callback: (names: Array<string>) => void){
		this.storageReady(() => {
			this.storage.keys().then((names: Array<string>) => callback(names))
			.catch((e) => {
				console.log(e);
				callback([]);
			});
		});
	}

	public removePuzzles(names: Array<string>){
		this.storageReady(() => {
			names.forEach((name: string) => {
				this.storage.remove(name)
				.catch(e => console.log(e));
			});
		});
	}

	public addPuzzle(name: string){
		this.storageReady(() => {
			this.storage.set(name, [])
			.catch(e => console.log(e));
		});
	}

	public getGoals(puzzleName: string, callback: (goals: Array<Goal>) => void){
		this.storageReady(() => {
			this.storage.get(puzzleName).then((goals: Array<Goal>) => callback(goals))
			.catch((e) => {
				console.log(e);
				callback([]);
			});
		});
	}

	public setPuzzle(puzzleName: string, goals: Array<Goal>){
		this.storageReady(() => {
			this.storage.set(puzzleName, goals)
			.catch(e => console.log(e));
		});
	}

}

export interface Goal{
	ind: number;
	lat: number;
	lng: number;
	passwd: Array<number>;
}
