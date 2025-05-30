import { Game } from "./Game";

export interface Player {
    id: number;
    games: Game [];
    username: string;}