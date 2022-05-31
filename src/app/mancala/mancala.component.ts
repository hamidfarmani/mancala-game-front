import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CreateGameDto, MancalaService } from '../mancala.service';
import { Board } from './board';

@Component({
  selector: 'app-mancala',
  templateUrl: './mancala.component.html',
  styleUrls: ['./mancala.component.css'],
})
export class MancalaComponent implements OnInit {
  mancalaBoard: Board | undefined;
  error: string | undefined;
  constructor(private service: MancalaService) {}

  ngOnInit(): void {}

  createGame(val: CreateGameDto) {
    this.error = undefined;

    this.service
      .createGame({
        firstPlayerName: val.firstPlayerName,
        secondPlayerName: val.secondPlayerName,
      })
      .subscribe((board) => {
        this.mancalaBoard = board;
      });
  }

  sow(selectedPit: number) {
    this.error = undefined;
    if (this.mancalaBoard == null) return;

    this.service.sow(selectedPit, this.mancalaBoard.uuid).subscribe({
      next: (board) => {
        this.mancalaBoard = board;
      },
      error: (err) => {
        console.log(err);
        if (err.httpStatus === 'BAD_REQUEST') this.error = err.message;
      },
    });
  }
}
