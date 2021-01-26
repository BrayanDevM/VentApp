import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

const materialComponents = [MatRippleModule, MatIconModule, MatButtonModule];

@NgModule({
  declarations: [],
  imports: [BrowserAnimationsModule, ...materialComponents],
  exports: [...materialComponents],
})
export class MaterialModule {}
