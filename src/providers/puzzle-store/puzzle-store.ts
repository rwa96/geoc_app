import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';


@Injectable()
export class PuzzleStoreProvider {

	constructor(private storage: Storage){}

	private storageReady(callback: () => void){
		this.storage.ready().then(callback).catch(e => console.log("Not ready!\n", e));
	}

	public getPuzzleNames(callback: (names: Array<string>) => void){
		this.storageReady(() => {
			this.storage.keys().then((names: Array<string>) => callback(names))
			.catch(e => console.log("getPuzzleNames()\n", e));
		});
	}

	public removePuzzles(names: Array<string>){
		this.storageReady(() => {
			names.forEach((name: string) => {
				this.storage.remove(name)
				.catch(e => console.log("removePuzzles(", names, ")\n", e));
			});
		});
	}

	public addPuzzle(name: string){
		this.storageReady(() => {
			this.storage.set(name, [])
			.catch(e => console.log("addPuzzle(", name, ")\n", e));
		});
	}

	public getGoals(puzzleName: string, callback: (goals: Array<Goal>) => void){
		this.storageReady(() => {
			this.storage.get(puzzleName).then((goals: Array<Goal>) => callback(goals))
			.catch(e => console.log("getGoals(", puzzleName, ")\n", e));
		});
	}

	public setPuzzle(puzzleName: string, goals: Array<Goal>){
		this.storageReady(() => {
			this.storage.set(puzzleName, goals)
			.catch(e => console.log("setPuzzle(", puzzleName, ")\n", e));
		});
	}

}

export interface Goal{
	ind: number;
	lat: number;
	lng: number;
	passwd: Array<number>;
}
