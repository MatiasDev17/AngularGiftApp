import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent  {

  //Esta propiedad servirá para realizar el "ngFor"
  get historial(){
    return this.gifsService.historial;
  }

  constructor( private gifsService: GifsService ) { }

  buscar( parametro: string ){
    this.gifsService.buscarGifs(parametro)
  }

}
