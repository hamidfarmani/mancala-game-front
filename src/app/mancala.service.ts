import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Board } from './mancala/board';

export interface CreateGameDto {
  firstPlayerName: string;
  secondPlayerName: string;
}

@Injectable({
  providedIn: 'root',
})
export class MancalaService {
  baseURL = 'http://localhost:8080/api/game';

  constructor(private http: HttpClient) {}

  public getBoard(uuid: string): Observable<Board> {
    return this.http.get<Board>(`${this.baseURL}/${uuid}`);
  }

  public createGame(mancalaBoard: CreateGameDto): Observable<Board> {
    return this.http.post<Board>(this.baseURL, mancalaBoard);
  }

  public sow(selectedPit: number, uuid: string): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    return this.http
      .put(
        `${this.baseURL}/${uuid}`,
        `{"selectedPit":${selectedPit}}`,
        httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  handleError(error: any) {
    let erorr = undefined;
    if (error.error instanceof ErrorEvent) {
      error = { message: `Error: ${error.error.message}` };
    } else {
      error = error.error;
    }
    return throwError(() => {
      return error;
    });
  }
}
