import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentServiceService {

  private URLBase : string = "http://localhost:8080/game/comment";
  private URLBases : string = "http://localhost:8080/games/comments";

  constructor( private http: HttpClient) { }

  getAllComments(): Observable<any>{
    return this.http.get(`${this.URLBases}`);
  }

  getByGameTitle(title : string): Observable<any>{
    return this.http.get(`${this.URLBase}s/${title}`)
  }

  getLast3Comments(): Observable<any>{
    return this.http.get(`${this.URLBases}/last3`);
  }

  addComment(comment:Comment): Observable<any>{
    return this.http.post(`${this.URLBases}`, comment)
  }

  deleteComment(commentID:number): Observable<any>{
    return this.http.delete(`${this.URLBase}/${commentID}`)
  }

}
