import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SearchGameComponent } from './others/search-game/search-game.component';
import { DetailsGameComponent } from './others/details-game/details-game.component';
import { RegisterComponent } from './others/register/register.component';

const routes: Routes = [
  {path: '',loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)},
  {path: 'search', component: SearchGameComponent},
  {path: 'details/:titulo', component: DetailsGameComponent},
  {path: 'registrar', component: RegisterComponent}
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
