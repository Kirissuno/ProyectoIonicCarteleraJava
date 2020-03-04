import { Component } from '@angular/core';
import { Videogame } from '../models/videogame';
import { VideogameServiceService } from '../services/videogame-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  upcomming : Videogame[];
  latest : Videogame[];

  constructor(private videogameService : VideogameServiceService, private router : Router) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.videogameService.getUpcommingGames().subscribe( data => {    
      this.upcomming = data;
    })

    this.videogameService.getLastGames().subscribe( data => {
      this.latest = data;
    })
  }

  goToSearch(){
    this.router.navigate(["/search"])
  }

  goToDetails(game: Videogame){
    console.log(game);
    
  }

}
