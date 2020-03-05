import { Component, OnInit } from '@angular/core';
import { Videogame } from '../../models/videogame';
import { VideogameServiceService } from '../../services/videogame-service.service';
import { ActivatedRoute } from '@angular/router';
import { CommentServiceService } from 'src/app/services/comment-service.service';
import { Location } from '@angular/common';
import { ShopCartService } from 'src/app/services/shop-cart.service';
import { User } from 'src/app/models/user';
import { Comment } from 'src/app/models/comment';
import { ModalController, ToastController } from '@ionic/angular';
import { ModalNewEditGameComponent } from '../modal-new-edit-game/modal-new-edit-game.component';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-details-game',
  templateUrl: './details-game.component.html',
  styleUrls: ['./details-game.component.scss'],
})
export class DetailsGameComponent implements OnInit {

  videogame: Videogame = new Videogame();
  comments: Comment[] = [];
  titulo: string;
  isAdmin:boolean=false;
  isLogged : boolean = false;
  loggedUser : User;

  constructor(
    private videogameService: VideogameServiceService,
    private route: ActivatedRoute,
    private commentService: CommentServiceService,
    private _location: Location,
    private shoppingService: ShopCartService,
    private modalController: ModalController,
    private toastCtrl: ToastController,
    private loginService : LoginService,
  ) {

  }

  ngOnInit() {
    this.titulo = this.route.snapshot.params['titulo'];

    this.videogameService.getByTitle(this.titulo).subscribe(data => {
      this.videogame = data;
    })
    this.commentService.getByGameTitle(this.titulo).subscribe(data => {
      this.comments = data;
    })

    this.isLogged = this.loginService.logged;
    if(this.isLogged){
      this.loggedUser = this.loginService.user;
      if(this.loggedUser.rol == "admin"){
        this.isAdmin = true;
      }
    }
  }

  goBack() {
    this._location.back();
  }

  addToCart(game: Videogame) {
    this.shoppingService.getByGameAndUser(this.loggedUser.usuario, game.titulo).subscribe(data => {
      if (data == null || data == undefined) {
        this.shoppingService.addGame(this.loggedUser.usuario, game.titulo).subscribe();
      } else {
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
    })
  }

  deleteGame(game: Videogame) {
    this.videogameService.deleteGame(game.titulo).subscribe(() =>
      this._location.back()
    );
  }

  comentar(form){
    let comentarioStr = form.value.comentario;
    let comm = new Comment();
    comm.comentario = comentarioStr;
    comm.titulo = this.titulo;
    comm.usuario = this.loggedUser.usuario;
    
    this.commentService.addComment(comm).subscribe( data =>{
      this.toastCtrl.create({
        animated: true,
        duration: 2000,
        position: 'bottom',
        message: 'Comentario añadido correctamente',
      }).then(toastEl =>
        toastEl.present()
      )
      setTimeout(() => {
        this.ngOnInit();
      }, 2000);
    } );
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

  refresh(){
    this.titulo = this.route.snapshot.params['titulo'];

    this.videogameService.getByTitle(this.titulo).subscribe(data => {
      this.videogame = data;
    })
    this.commentService.getByGameTitle(this.titulo).subscribe(data => {
      this.comments = data;
    })

    this.isLogged = this.loginService.logged;
    if(this.isLogged){
      this.loggedUser = this.loginService.user;
      if(this.loggedUser.rol == "admin"){
        this.isAdmin = true;
      }
    }
  }

}
