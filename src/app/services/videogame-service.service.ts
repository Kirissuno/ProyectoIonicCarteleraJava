import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Videogame } from '../models/videogame';

@Injectable({
  providedIn: 'root'
})
export class VideogameServiceService {

  private URLBase : string = "http://localhost:8080/game";

  constructor( private http : HttpClient) { }

  getAllGames(): Observable<any>{
    return this.http.get(`${this.URLBase}s`);
  }

  getByTitle(title : string): Observable<any>{
    return this.http.get(`${this.URLBase}s/title/${title}`)
  }

  getGamesByCompany(company : string): Observable<any>{
    return this.http.get(`${this.URLBase}s/director/${company}`)
  }

  getUpcommingGames(): Observable<any>{
    return this.http.get(`${this.URLBase}s/upcomming`);
  }

  addGame(game:Videogame): Observable<any>{
    return this.http.post(`${this.URLBase}s`, game);
  }

  modifyGame(title: string, game:Videogame): Observable<any>{
    return this.http.put(`${this.URLBase}/${title}`, game);
  }

  getLastGames(): Observable<any>{
    return this.http.get(`${this.URLBase}s/last`);
  }

  deleteGame(title) : Observable<any>{
    return this.http.delete(`${this.URLBase}/${title}`)
  }
}
