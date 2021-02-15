import { Component } from '@angular/core';
import { AjustesService } from './services/ajustes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private ajustes$: AjustesService) {}

  title = 'VentApp';
}
