import { Component } from '@angular/core';

@Component({
  selector: 'app-game-lobby',
  templateUrl: './game-lobby.component.html',
  styleUrls: ['./game-lobby.component.css']
})
export class GameLobbyComponent {
  joinedPlayers: string[] = []; // start empty

  startGame() {
    if (this.joinedPlayers.length >= 2) {
      console.log('Game started!');
      // Your game start logic here
    } else {
      console.log('At least 2 players required to start the game.');
    }
  }
}

