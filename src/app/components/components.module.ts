import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavegacionComponent } from './navegacion/navegacion.component';

const componentes = [NavegacionComponent];

@NgModule({
  declarations: [...componentes],
  imports: [CommonModule],
  exports: [...componentes],
})
export class ComponentsModule {}
