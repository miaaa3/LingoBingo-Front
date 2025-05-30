import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GameService } from 'src/app/Services/Game/game.service';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-game-lobby',
  templateUrl: './game-lobby.component.html',
  styleUrls: ['./game-lobby.component.css']
})
export class GameLobbyComponent implements OnInit, OnDestroy {
  joinedPlayers: string[] = [];
  gameCode!: string;
  gameId!: number; // if you get this from game details
  gameDetailsSubscription!: Subscription;
  playersSubscription!: Subscription;
  pollingSubscription!: Subscription;
  qrCodeUrl: string | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gameService: GameService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.gameCode = params['gameCode'];
      this.loadGameDetails();
      this.loadQRCode();
      this.startPlayersPolling();
    });
  }

  ngOnDestroy(): void {
    if (this.gameDetailsSubscription) this.gameDetailsSubscription.unsubscribe();
    if (this.playersSubscription) this.playersSubscription.unsubscribe();
    if (this.pollingSubscription) this.pollingSubscription.unsubscribe();
  }

  loadGameDetails() {
    this.gameDetailsSubscription = this.gameService.getGameByCode(this.gameCode).subscribe({
      next: (game) => {
        this.gameId = game.id;
        // Optionally update UI with other game info
      },
      error: (err) => {
        this.toastr.error('Failed to load game details');
        console.error('Game details error:', err);
      }
    });
  }

  startPlayersPolling() {
    // Poll every 5 seconds to refresh joined players list
    this.pollingSubscription = timer(0, 5000).subscribe(() => {
      this.gameService.getPlayersForGame(this.gameId).subscribe({
        next: (players) => {
          // Assuming players is an array of objects with username property
          this.joinedPlayers = players.map(p => p.username);
        },
        error: (err) => {
          console.error('Failed to fetch players:', err);
        }
      });
    });
  }

  loadQRCode(): void {
    this.gameService.getGameQRCode(this.gameCode).subscribe({
      next: (blob) => {
        this.qrCodeUrl = URL.createObjectURL(blob);
      },
      error: (err) => {
        console.error('Failed to load QR code', err);
      }
    });
  }

  startGame() {
    if (this.joinedPlayers.length >= 2) {
      this.gameService.startGame(this.gameId).subscribe({
        next: () => {
          this.toastr.success('Game started!');
          // Navigate to the actual game screen or update UI accordingly
          this.router.navigate(['/game', this.gameCode, 'play']);
        },
        error: (err) => {
          this.toastr.error('Failed to start the game.');
          console.error('Start game error:', err);
        }
      });
    } else {
      this.toastr.warning('At least 2 players are required to start the game.');
    }
  }
}
