export interface Board {
    "uuid": string;
    "firstPlayerName": string;
    "secondPlayerName": string;
    "playerTurn": 1 | 2
    "statusEnum": "ONGOING" | "PLAYER1_WON" | "PLAYER2_WON" | "TIE",
    "pits": number[]
}