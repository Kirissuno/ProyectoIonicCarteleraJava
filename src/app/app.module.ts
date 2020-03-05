import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchGameComponent } from './others/search-game/search-game.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailsGameComponent } from './others/details-game/details-game.component';
import { ModalNewEditGameComponent } from './others/modal-new-edit-game/modal-new-edit-game.component';
import { RegisterComponent } from './others/register/register.component';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Tab3Page } from './tab3/tab3.page';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

@NgModule({
  declarations: [AppComponent, SearchGameComponent, DetailsGameComponent, ModalNewEditGameComponent, RegisterComponent],
  entryComponents: [ModalNewEditGameComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, FormsModule, ReactiveFormsModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    LocalNotifications,
    Tab3Page,
    EmailComposer
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
