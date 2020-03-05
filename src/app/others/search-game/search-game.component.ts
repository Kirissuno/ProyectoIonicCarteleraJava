import { Component, OnInit } from '@angular/core';
import { Videogame } from 'src/app/models/videogame';
import { VideogameServiceService } from 'src/app/services/videogame-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { ModalNewEditGameComponent } from '../modal-new-edit-game/modal-new-edit-game.component';
import { ShopCartService } from 'src/app/services/shop-cart.service';
import { LoginService } from 'src/app/services/login.service';
import { User } from 'src/app/models/user';



@Component({
  selector: 'app-search-game',
  templateUrl: './search-game.component.html',
  styleUrls: ['./search-game.component.scss'],
})
export class SearchGameComponent implements OnInit {
  videogames : Videogame[];
  gameToFilter : string;
  noResult : boolean = false;
  videogamesFiltered : Videogame[];
  loggedUser : User;
  isLogged : boolean = false;
  isAdmin : boolean = false;

  constructor(
    private videogameService : VideogameServiceService,
    private router : Router,
    private modalController: ModalController,
    private route : ActivatedRoute,
    private shoppingService : ShopCartService,
    private toastCtrl : ToastController,
    private loginService : LoginService
  ) {
    this.videogames = [];
    this.videogamesFiltered = [];
    this.noResult = false;
  }

  ngOnInit() {
    
    this.videogameService.getAllGames().subscribe( games => {
      this.videogames = games;
    })
    this.noResult = false;
    this.videogamesFiltered = [];
    this.isLogged = this.loginService.logged;
    if(this.isLogged){
      this.loggedUser = this.loginService.user;
      if(this.loggedUser.rol == 'admin'){
        this.isAdmin = true;
      }
    }
  }

  change(){    
    this.videogamesFiltered = [];
    //Comprobamos que el buscador no esté vacío, esté null o indefinido
    if(this.gameToFilter.trim() != "" || this.gameToFilter != null || this.gameToFilter != undefined){
      //cargamos todos los juegos de la base de datos
      this.videogameService.getAllGames().subscribe( games => {
        //por cada juego
        games.forEach(game => {
          //si su título o companía incluyen la cadena de texto que hemos introducido en el input
          if(game.titulo.trim().toLocaleLowerCase().includes(this.gameToFilter) || game.director.trim().toLocaleLowerCase().includes(this.gameToFilter) ){
            //se añadirá dicho videojuego al nuevo array de filtro
            this.videogamesFiltered.push(game);
          }
        });
        //si el array de filtro está vacío, entonces saldrá un mensaje controlado desde el HTML
        if(this.videogamesFiltered.length == 0){
          this.noResult = true;
          setTimeout(() => {
            this.noResult = false;
          }, 2000);
        }
      })
    }    
  }

  goToDetails(game: string){
    this.router.navigate(["/details", game])
  }

  goToCart(){
    this.router.navigate(["/tabs/tab3"]);
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalNewEditGameComponent,
      componentProps: {
        titulo: this.route.snapshot.params["titulo"]
      }
    });
    return await modal.present();
  }

  addToCart(game:Videogame){
    
    this.shoppingService.getByGameAndUser(this.loggedUser.usuario, game.titulo).subscribe( data=> {
      if(data == null || data == undefined){
        this.shoppingService.addGame(this.loggedUser.usuario, game.titulo).subscribe();
      }else{
        this.shoppingService.oneMore(this.loggedUser.usuario, game.titulo).subscribe();
      }
      this.toastCtrl.create({
        animated: true,
        duration: 2000,
        position: 'bottom',
        message: 'Videojuego añadido al carrito',
      }).then(toastEl =>
        toastEl.present()
      )
      setTimeout(() => {
        this.ngOnInit();
      }, 2000);
    } )

   
  }

  refresh(){
    this.videogameService.getAllGames().subscribe( games => {
      this.videogames = games;
    })
    this.noResult = false;
    this.videogamesFiltered = [];
    this.isLogged = this.loginService.logged;
    if(this.isLogged){
      this.loggedUser = this.loginService.user;
      if(this.loggedUser.rol == 'admin'){
        this.isAdmin = true;
      }
    }
  }

}
