import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private baseURL = "http://localhost:8080/games/user";

  constructor(private http : HttpClient) { }

  getAllUsers(): Observable<any>{
    return this.http.get(`${this.baseURL}s`)
  }

  getUser(name : string) : Observable<any>{
    return this.http.get(`${this.baseURL}/${name}`)
  }

  updateRol(name, user): Observable<any>{
    return this.http.put(`${this.baseURL}/${name}`, user)
  }

  addUser(user: User): Observable<any>{
    return this.http.post(`${this.baseURL}s`, user)
  }

  deleteUser(user): Observable<any>{
    return this.http.delete(`${this.baseURL}s/${user}`)
  }

}
