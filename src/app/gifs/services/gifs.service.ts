import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchGifsResponse, Data } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _apiKey: string = 'PVX642kCnE64PixukC9pbP3j6C5K3HVK';
  private _APIURL: string = 'https://api.giphy.com/v1/gifs/';
  private _search : string = this._APIURL + 'search';

  private _historial: string[] = [];

  public resultados: Data[] = []

  public get historial(): string[] {

    return [...this._historial];
  }

  constructor( private http: HttpClient ) {

    this._historial = JSON.parse( localStorage.getItem('historial')! ) || [];
    this.resultados = JSON.parse( localStorage.getItem('resultado')! ) || [];

  }

  public buscarGifs( query: string ): void {

    if(!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial = this._historial.slice(0,10);
      localStorage.setItem( 'historial', JSON.stringify( this._historial ) );
    }

    const params: HttpParams = new HttpParams()
    .set( 'api_key', this._apiKey )
    .set('q', query)
    .set('limit', '10');

    this.http.get<SearchGifsResponse>(`${this._search}`, { params })
          .subscribe( ( resp: SearchGifsResponse ) => {
              this.resultados = resp.data;
              localStorage.setItem('resultado', JSON.stringify( this.resultados ));
          })
  }


}
