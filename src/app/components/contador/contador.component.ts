import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-contador',
  templateUrl: './contador.component.html',
  styleUrls: ['./contador.component.css'],
})
export class ContadorComponent implements OnInit {
  @Input() numero = 0;
  @Input() color = 'green';
  @Input() descripcion = 'Descripción';

  constructor() {}

  ngOnInit(): void {}
}
