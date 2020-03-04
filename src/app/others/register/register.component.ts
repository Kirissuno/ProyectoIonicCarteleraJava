import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UserServiceService } from 'src/app/services/user-service.service';
import { User } from 'src/app/models/user';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  constructor(private _location: Location, private userService: UserServiceService, private toastCtrl: ToastController) { }

  ngOnInit() { }


  registrar(form) {
    let user = new User();
    user.usuario = form.value.usuario;
    user.contrasena = form.value.contrasena;
    user.rol = 'user';

    this.userService.getUser(user.usuario).subscribe(data => {
      if (data != null) {
        this.toastCtrl.create({
          animated: true,
          duration: 2000,
          position: 'top',
          message: 'Nombre de usuario ya en uso',
        }).then(toastEl =>
          toastEl.present()
        )
      } else {
        this.userService.addUser(user).subscribe(data => {
          this.toastCtrl.create({
            animated: true,
            duration: 2000,
            position: 'top',
            message: 'Usuario creado correctamente',
          }).then(toastEl =>
            toastEl.present()
          )
          setTimeout(() => {
            this._location.back();
          }, 2000)
        })
      }

    })




  }

  goBack() {
    this._location.back();
  }
}
