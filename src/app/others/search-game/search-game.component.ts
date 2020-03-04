import { Component, OnInit } from '@angular/core';
import { Videogame } from 'src/app/models/videogame';
import { VideogameServiceService } from 'src/app/services/videogame-service.service';
import { Router } from '@angular/router';



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

  constructor(
    private videogameService : VideogameServiceService,
    private router : Router,
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
    
  }

  sinStock(){

  }

}
