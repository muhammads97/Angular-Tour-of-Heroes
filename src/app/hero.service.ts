import { Injectable } from '@angular/core';
import {hero} from './hero';
import { Observable, of } from 'rxjs';
import { MessagesService } from './messages.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class HeroService {
  
  private heroesUrl = 'api/heroes';
  constructor(
    private messagesService : MessagesService,
    private http: HttpClient
  ) { }
  getHeroes(): Observable<hero[]>{
    return this.http.get<hero[]>(this.heroesUrl).pipe(
      tap(heroes => this.log('fetched heroes')),
      catchError(this.handleError('getHeroes', []))
    );
  }
  getHero(id: number): Observable<hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<hero>(`getHero id=${id}`))
    );
  }
  updateHero (h: hero): Observable<any> {
    return this.http.put(this.heroesUrl, h, httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${h.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  addHero (h: hero): Observable<hero> {
    return this.http.post<hero>(this.heroesUrl, h, httpOptions).pipe(
      tap((h: hero) => this.log(`added hero w/ id=${h.id}`)),
      catchError(this.handleError<hero>('addHero'))
    );
  }
  deleteHero (h: hero): Observable<hero> {
    const url = `${this.heroesUrl}/${h.id}`;
    const id = h.id;
    return this.http.delete<hero>(url, httpOptions).pipe(
      tap((h: hero) => this.log(`deleted hero w/ id=${id}`)),
      catchError(this.handleError<hero>('deletHero'))
    );
  }
  private log(message: string) {
    this.messagesService.add(`HeroService: ${message}`);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
   
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
   
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
   
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
