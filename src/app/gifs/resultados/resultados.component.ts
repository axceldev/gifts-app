import { Component } from '@angular/core';
import { Data } from '../interfaces/gifs.interfaces';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styles: [
  ]
})
export class ResultadosComponent {

  public get resultados(): Data[] {
    return this.gifsService.resultados;
  }

  constructor(private gifsService: GifsService) { }

}
