import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cart } from '../models/cart';

@Injectable({
  providedIn: 'root'
})
export class ShopCartService {

  private baseURL = "http://localhost:8080/cart";

  constructor(private http : HttpClient) { }

  getUserCart(user : string): Observable<Cart[]>{
    return this.http.get<Cart[]>(`${this.baseURL}/${user}`);
  }

  addGame(user: string, game : string): Observable<any>{
    return this.http.post(`${this.baseURL}/${user}`, game)
  }

  oneMore(user:string, game : string): Observable<any>{
    return this.http.post(`${this.baseURL}/more/${game}/${user}`, game)
  }

  oneLess(user:string, game : string): Observable<any>{ 
    return this.http.post(`${this.baseURL}/less/${game}/${user}`, game)
  }

  removeGame(user:string, game : string): Observable<any>{
    return this.http.delete(`${this.baseURL}/${user}/${game}`);
  }

  getByGameAndUser(user:string, game:string): Observable<any>{
    return this.http.get(`${this.baseURL}/${user}/${game}`);
  }

}
