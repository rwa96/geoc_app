import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';


@Injectable()
export class PuzzleStoreProvider {

	private puzzles: Array<Puzzle> = [];

	constructor(private storage: Storage){}

	public loadAll(){
		this.storage.ready().then(() => {
			this.storage.get("puzzles").then((ps: Array<Puzzle>) => {
				if(Array.isArray(ps)){
					this.puzzles = ps;
				}
			})
			.catch(e => console.log(e));
		}).catch(e => console.log(e));
	}

	public getPuzzleNames(): Array<string>{
		return this.puzzles.map<string>((p: Puzzle) => p.name);
	}

	public removePuzzles(names: Array<string>){
		this.puzzles = this.puzzles
			.filter((p: Puzzle) => !names.some((n: string) => n === p.name));
	}

	public addPuzzle(name: string){
		this.puzzles.push({
			name: name,
			goals: []
		});
	}

	public getGoals(puzzleName: string): Array<Goal>{
		const puzzle: Puzzle = this.puzzles
			.find((p: Puzzle) => p.name === puzzleName);
		return puzzle === undefined ? [] : puzzle.goals;
	}

	public setPuzzle(oldName: string, puzzle: Puzzle){
		const oldPuzzle: number = this.puzzles
			.findIndex((p: Puzzle) => p.name === oldName);
		if(oldPuzzle !== -1){
			this.puzzles.splice(oldPuzzle, 1, puzzle);
		}else{
			this.puzzles.push(puzzle);
		}
	}

	public saveAll(){
		this.storage.ready().then(() => {
			this.storage.set("puzzles", this.puzzles)
			.catch(e => console.log(e));
		}).catch(e => console.log(e));
	}

}

export interface Puzzle{
	name: string;
	goals: Array<Goal>;
}

export interface Goal{
	ind: number;
	lat: number;
	lng: number;
	passwd: Array<number>;
}
