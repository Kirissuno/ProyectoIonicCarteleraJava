import { Component } from '@angular/core';
import { Cart } from '../models/cart';
import { ShopCartService } from '../services/shop-cart.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { VideogameServiceService } from '../services/videogame-service.service';
import { User } from '../models/user';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  articulos : Cart[] = [];
  loggedUser : User;

  constructor(
    private cartService : ShopCartService,
    private videogameService : VideogameServiceService,
    private _location : Location,
    private loginService :LoginService
  ) {

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if(this.loginService.logged){
      this.loggedUser = this.loginService.user;
      console.log(this.loggedUser);
      
      this.cartService.getUserCart(this.loggedUser.usuario).subscribe( data => {      
        this.articulos = data;
      })
    }
    
    
  }

  goBack(){
    this._location.back();
  }

  oneLess(game:Cart){   

    this.cartService.oneLess(this.loggedUser.usuario, game.videojuego).subscribe( () => {
      this.ngOnInit();
    } );
    
  }

  oneMore(game:Cart){
    this.videogameService.getByTitle(game.videojuego).subscribe( juego =>{
      this.cartService.getByGameAndUser(this.loggedUser.usuario, game.videojuego).subscribe( data=> {
        if(juego.stock > data.cantidad ){
          this.cartService.oneMore(this.loggedUser.usuario, game.videojuego).subscribe( () => {
            this.ngOnInit();
          });
        }
      })
    })

    
  }

  removeGame(game:Cart){
    this.cartService.removeGame(this.loggedUser.usuario, game.videojuego).subscribe( () => {
      this.ngOnInit();
    } );
  }

}
