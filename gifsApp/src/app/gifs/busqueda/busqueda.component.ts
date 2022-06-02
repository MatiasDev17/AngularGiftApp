import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
})
export class BusquedaComponent {

  //Buscará un elemento llamado "txtBuscar"
  @ViewChild('txtBuscar')
  /*El operador "!", en este caso,
   indica que el elemento "txtBuscar", jamaz será nulo*/
   txtBuscar!:ElementRef<HTMLInputElement>;

   //Se procese a injectar el historial, creado en el servicio
   constructor( private gifsService: GifsService){

   }

  buscar( ) {
    const valor = this.txtBuscar.nativeElement.value;

    if (valor.trim().length === 0){
      return;
    }
    
    //Metodo del servicio injectado
    this.gifsService.buscarGifs( valor );

    this.txtBuscar.nativeElement.value = "";
  }

}
