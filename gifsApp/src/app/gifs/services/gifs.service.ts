import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  // "providedIn: 'root'", permite que el servicio se pueda utilizar de manera global
  providedIn: 'root'
})
export class GifsService {

  private apiKey = 'TiBfuHB8rw9SX2H6i2432LxU2Q5hcZ1A';
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs'
  private _historial: string[] = [];

  public resultados: Gif[] = [];

  get historial(){
    return [...this._historial];
  }

  //Contiene un servicio importado del App.Module "HttpClient"
  constructor( private http: HttpClient ) {
    //Obtiene el localStorage de la busqueda y los resultados, cargandolos 
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
  }

  buscarGifs(query: string){

    //Restringe lo que se ingresa, solo agregando las busquedas en minusculas
    query = query.trim().toLocaleLowerCase();

    //El "includes", evalua si un elemento existe dentro de un array
    if(!this._historial.includes(query)){
      this._historial.unshift(query);
      // Sirve para limitar la lista hasta 10 elementos
      this._historial = this._historial.splice(0,10);
      
      //Guardar el local storage, guardando el objeto
      //"JSON.stringify", transforma un objeto en string
      localStorage.setItem('historial', JSON.stringify( this._historial )  );
    }

    //Permite ordenar la llama a la api y sus parametros. (Buena Práctica)
    const params = new HttpParams()
    .set('api_key', this.apiKey)
    .set('limit', 10)
    .set('q', query);


    //Nos conectamos a la api, mediante una petición HTTP
   this.http.get<SearchGifsResponse>(`${ this.servicioUrl }/search`, { params })
   .subscribe((resp) => {
     console.log(resp.data);
     this.resultados = resp.data;
     //Guardar el local storage, guardando el objeto de los resultados
     localStorage.setItem('resultados', JSON.stringify( this.resultados )  );
   })
    
  }
}
