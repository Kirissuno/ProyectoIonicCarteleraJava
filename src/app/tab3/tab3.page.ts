import { Component } from '@angular/core';
import { Cart } from '../models/cart';
import { ShopCartService } from '../services/shop-cart.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { VideogameServiceService } from '../services/videogame-service.service';
import { User } from '../models/user';
import { LoginService } from '../services/login.service';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  articulos : Cart[];
  loggedUser : User;
  isLogged : boolean = false;
  stringArticulos : string;

  constructor(
    private cartService : ShopCartService,
    private videogameService : VideogameServiceService,
    private _location : Location,
    private loginService :LoginService,
    private localNotifications: LocalNotifications,
    private emailComposer: EmailComposer
  ) {
    this.articulos = [];
  }

  ngOnInit(): void {
    this.articulos = [];
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.isLogged = this.loginService.logged;
    
    if(this.isLogged){
      this.loggedUser = this.loginService.user;

      this.cartService.getUserCart(this.loggedUser.usuario).subscribe( data => {
           
        data.forEach(item => {
          let articulo = new Cart();
          articulo.usuario = item.usuario;
          articulo.videojuego = item.videojuego;
          articulo.cantidad = item.cantidad;
          this.articulos.push(articulo);

          this.stringArticulos = "";
          this.articulos.forEach(item => {
            this.stringArticulos += item.videojuego+" ";
          });

        }); 
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

  refresh(){
    this.articulos = [];
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.isLogged = this.loginService.logged;
    
    if(this.isLogged){
      this.loggedUser = this.loginService.user;

      this.cartService.getUserCart(this.loggedUser.usuario).subscribe( data => {
           
        data.forEach(item => {
          let articulo = new Cart();
          articulo.usuario = item.usuario;
          articulo.videojuego = item.videojuego;
          articulo.cantidad = item.cantidad;
          this.articulos.push(articulo)

          this.stringArticulos = "";
          this.articulos.forEach(item => {
            this.stringArticulos += item.videojuego+" ";
          });
        }); 
      })    
    }  
  }

  hacerPedido(){
    this.articulos.forEach(element => {
      this.stringArticulos += " "+element;
    });
    this.localNotifications.schedule({
      title: `Pedido realizado correctamente`,
      text: `Tu pedido de ${this.stringArticulos} se ha realizado correctamente.`
    });

    this.sendMail();
  }

  sendMail(){
    let email = {
      to: 'arfilip.1h@gmail.com',
      subject: 'Compra',
      body: `El usuario ${this.loggedUser.usuario} ha comprado ${this.stringArticulos}`,
      isHtml: true
    }

    this.emailComposer.open(email);    
  }

}
