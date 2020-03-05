import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { ToastController } from '@ionic/angular';
import { User } from '../models/user';
import { Tab3Page } from '../tab3/tab3.page';
import { ShopCartService } from '../services/shop-cart.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  logged : boolean;
  user : User;

  constructor(
    private loginService: LoginService,
    private router : Router,
    private toastCtrl : ToastController,
    private tab3 : Tab3Page,
    )
  {
    this.logged = false;
  }

  toRegister(){
    this.router.navigate(["/registrar"]);
  }

  ngOnInit(): void {
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
        
        this.tab3.ngOnInit()
        
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
