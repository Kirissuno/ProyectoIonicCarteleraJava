import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController, ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VideogameServiceService } from 'src/app/services/videogame-service.service';
import { Videogame } from 'src/app/models/videogame';

@Component({
  selector: 'app-modal-new-edit-game',
  templateUrl: './modal-new-edit-game.component.html',
  styleUrls: ['./modal-new-edit-game.component.scss'],
})
export class ModalNewEditGameComponent implements OnInit {

  form: FormGroup;
  director: string;
  titulo: string;
  descripcion: string;
  precio: number;
  urlImage: string;
  stock: number;
  fecha: Date;

  editar: boolean = false;

  constructor(private navParams: NavParams, private videogameService: VideogameServiceService, private modalController: ModalController, private formBuilder: FormBuilder, private toastCtrl: ToastController) {
    this.titulo = this.navParams.get('titulo');
    if (this.titulo != null || this.titulo != undefined) {
      this.editar = true;
      this.videogameService.getByTitle(this.titulo).subscribe(data => {
        this.director = data.director;
        this.descripcion = data.descripcion;
        this.precio = data.precio;
        this.urlImage = data.urlImage;
        this.stock = data.stock;
        this.fecha = data.fecha;
      });
    }
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      director: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      titulo: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      descripcion: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(255)]],
      precio: ['', [Validators.required, Validators.min(0)]],
      urlImage: ['', [Validators.required, Validators.minLength(10), Validators.pattern('(https?:\/\/.*\.(?:png|jpg))')]],
      stock: ['', [Validators.required, Validators.min(0)]],
      fecha: ['', [Validators.required]]
    })
  }

  dimiss() {
    this.modalController.dismiss({
      dismissed: true
    });
  }

  onSubmit() {
    let videogame = new Videogame();
    videogame.director = this.director.trim();
    videogame.titulo = this.titulo.trim();
    videogame.descripcion = this.descripcion.trim();
    videogame.precio = this.precio;
    videogame.fecha = this.fecha;
    videogame.stock = this.stock;
    videogame.urlImage = this.urlImage.trim();

    if (this.editar) {
      this.videogameService.modifyGame(this.titulo, videogame).subscribe(data => {        
        this.toastCtrl.create({
          animated: true,
          duration: 2000,
          position: 'top',
          message: 'Videojuego EDITADO correctamente',
        }).then(toastEl =>
          toastEl.present()
        )
        setTimeout(() => {
          this.dimiss();
        }, 2000);

      });
    } else {
      this.videogameService.addGame(videogame).subscribe( data =>{
        this.toastCtrl.create({
          animated: true,
          duration: 2000,
          position: 'top',
          message: 'Videojuego CREADO correctamente',
        }).then(toastEl =>
          toastEl.present()
        )
        setTimeout(() => {
          this.dimiss();
        }, 2000);
      } );
    }

  }

}
