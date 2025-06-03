import { Component } from '@angular/core';

@Component({
  selector: 'app-join-game',
  templateUrl: './join-game.component.html',
  styleUrls: ['./join-game.component.css']
})
export class JoinGameComponent {
  gameCode: string = '';

  joinGame() {
    if (this.gameCode.trim()) {
      console.log("Joining game with code:", this.gameCode);
      // Tu peux ajouter la navigation ici vers la GameLobby
    } else {
      alert("Please enter a game code.");
    }
  }
}
