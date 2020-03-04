import { Component, OnInit } from '@angular/core';
import { Videogame } from '../../models/videogame';
import { VideogameServiceService } from '../../services/videogame-service.service';
import { ActivatedRoute } from '@angular/router';
import { CommentServiceService } from 'src/app/services/comment-service.service';
import {Location} from '@angular/common';


@Component({
  selector: 'app-details-game',
  templateUrl: './details-game.component.html',
  styleUrls: ['./details-game.component.scss'],
})
export class DetailsGameComponent implements OnInit {

  videogame : Videogame = new Videogame();
  comments : Comment[] = [];
  titulo : string;

  constructor(
    private videogameService : VideogameServiceService,
    private route : ActivatedRoute,
    private commentService : CommentServiceService,
    private _location: Location
  ) {

  }

  ngOnInit() {
    this.titulo = this.route.snapshot.params['titulo'];
    
    this.videogameService.getByTitle(this.titulo).subscribe( data => {
      
      this.videogame = data;
    })

    this.commentService.getByGameTitle(this.titulo).subscribe( data => {
      this.comments = data;
    })
  }
  
  goBack(){
    this._location.back();
  }

}
