import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AjustesService {
  ajustes: Ajustes = {
    tema: 'Claro',
    temaUrl: '',
    horaRecargoNoctInicio: 23,
    horaRecargoNoctFin: 6,
  };

  constructor(@Inject(DOCUMENT) private doc$: any) {
    this.cargarLS();
    this.aplicarTema();
  }

  obtenerAjustes() {
    return this.ajustes;
  }

  editarAjustes(ajustes: Ajustes) {
    this.ajustes = ajustes;
    this.almacenarEnLS();
    this.aplicarTema();
  }

  aplicarTema(tema: string | undefined = undefined) {
    this.doc$.body.className = '';
    tema ? (this.ajustes.tema = tema) : null;
    document.body.classList.add(this.ajustes.tema);
  }

  almacenarEnLS() {
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
  }

  cargarLS() {
    if (localStorage.getItem('ajustes')) {
      this.ajustes = JSON.parse(localStorage.getItem('ajustes') + '');
    }
  }
}

export interface Ajustes {
  tema: string;
  temaUrl: string;
  horaRecargoNoctInicio: number;
  horaRecargoNoctFin: number;
}
