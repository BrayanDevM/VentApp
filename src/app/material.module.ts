import { NgModule } from '@angular/core';

// Componentes
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const materialComponents = [
  MatRippleModule,
  MatIconModule,
  MatButtonModule,
  MatDialogModule,
  MatInputModule,
  MatSelectModule,
  MatFormFieldModule,
  MatSlideToggleModule,
  MatChipsModule,
  MatSnackBarModule,
  MatMenuModule,
  MatListModule,
  MatDividerModule,
  MatProgressSpinnerModule,
];

@NgModule({
  declarations: [],
  imports: [...materialComponents],
  exports: [...materialComponents],
})
export class MaterialModule {}
