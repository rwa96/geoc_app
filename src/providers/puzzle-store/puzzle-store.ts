import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';


@Injectable()
export class PuzzleStoreProvider {

	private static puzzles: Array<Puzzle> = [];

	constructor(private storage: Storage){
		this.storage.ready().then(() => {
			this.storage.get("puzzles").then((ps: Array<Puzzle>) => {
				PuzzleStoreProvider.puzzles = ps;
			}).catch(e => console.log(e));
		}).catch(e => console.log(e));
	}

	public getPuzzleNames(): Array<string>{
		return PuzzleStoreProvider.puzzles.map<string>((p: Puzzle) => p.name);
	}

	public removePuzzles(names: Array<string>){
		PuzzleStoreProvider.puzzles = PuzzleStoreProvider.puzzles
			.filter((p: Puzzle) => !names.some((n: string) => n === p.name));
	}

	public addPuzzle(name: string){
		PuzzleStoreProvider.puzzles.push({
			name: name,
			goals: []
		});
	}

	public getGoals(puzzleName: string): Array<Goal>{
		const puzzle: Puzzle = PuzzleStoreProvider.puzzles
			.find((p: Puzzle) => p.name === puzzleName);
		return puzzle === undefined ? [] : puzzle.goals;
	}

	public setPuzzle(oldName: string, puzzle: Puzzle){
		const oldPuzzle: number = PuzzleStoreProvider.puzzles
			.findIndex((p: Puzzle) => p.name === oldName);
		if(oldPuzzle !== -1){
			PuzzleStoreProvider.puzzles.splice(oldPuzzle, 1, puzzle);
		}else{
			PuzzleStoreProvider.puzzles.push(puzzle);
		}
	}

	public saveAll(){
		this.storage.ready().then(() => {
			this.storage.set("puzzles", PuzzleStoreProvider.puzzles)
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
