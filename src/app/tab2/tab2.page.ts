import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { UserServiceService } from '../services/user-service.service';
import { ToastController } from '@ionic/angular';
import { User } from '../models/user';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  logged : boolean;
  user : User;

  constructor(private loginService: LoginService, private userService:UserServiceService, private router : Router, private toastCtrl : ToastController) {
    this.logged = false;
  }

  toRegister(){
    this.router.navigate(["/registrar"]);
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if(this.loginService.logged == true){
      this.user = this.loginService.user;
    }
  }

  login(form){
    this.loginService.logIn(form.value.usuario).subscribe( data => {
      if(data.contrasena == form.value.contrasena){
        this.loginService.logged = true;
        this.loginService.user = data;
        this.logged = true;
        this.user = data;
      }else{
        this.toastCtrl.create({
          animated: true,
          duration: 2000,
          position: 'top',
          message: 'Usuario o Contraseña incorrect@',
        }).then(toastEl =>
          toastEl.present()
        )
      }
    })
    
  }

  logOut(){
    location.reload();
  }

}
