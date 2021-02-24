import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmaComponent } from 'src/app/components/dialog-confirma/dialog-confirma.component';
import { Ajustes, AjustesService } from 'src/app/services/ajustes.service';
import { ClientesService } from 'src/app/services/clientes.service';
import { ProductosService } from 'src/app/services/productos.service';
import { VentasService } from 'src/app/services/ventas.service';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.component.html',
  styleUrls: ['./ajustes.component.css'],
})
export class AjustesComponent implements OnInit {
  formAjustes: FormGroup;
  ajustes: Ajustes;

  constructor(
    private fb: FormBuilder,
    private Ajustes$: AjustesService,
    private dialog: MatDialog,
    private ventas$: VentasService,
    private productos$: ProductosService,
    private clientes$: ClientesService
  ) {
    this.ajustes = this.Ajustes$.obtenerAjustes();

    this.formAjustes = this.fb.group({
      tema: [null],
      horaRecargoNoctInicio: [0, Validators.required],
      horaRecargoNoctFin: [0, Validators.required],
    });
  }

  ngOnInit(): void {
    this.cargarValores();
  }

  cargarValores() {
    this.formAjustes.patchValue({
      tema: this.ajustes.tema,
      horaRecargoNoctInicio: this.ajustes.horaRecargoNoctInicio,
      horaRecargoNoctFin: this.ajustes.horaRecargoNoctFin,
    });
  }

  guardarAjustes() {
    if (this.formAjustes.valid) {
      this.Ajustes$.editarAjustes(this.formAjustes.value);
    }
  }

  eliminarVentas() {
    const dialog = this.dialog.open(DialogConfirmaComponent, {
      data: {
        texto: `¿Eliminar todas las ventas?, esta acción no puede deshacerse.`,
      },
    });
    dialog.afterClosed().subscribe((confirma) => {
      if (confirma) {
        this.ventas$.eliminarDocumentoFirestore();
      }
    });
  }

  eliminarProductos() {
    const dialog = this.dialog.open(DialogConfirmaComponent, {
      data: {
        texto: `¿Eliminar todas los productos?, esta acción no puede deshacerse.`,
      },
    });
    dialog.afterClosed().subscribe((confirma) => {
      if (confirma) {
        this.productos$.eliminarDocumentoFirestore();
      }
    });
  }

  eliminarClientes() {
    const dialog = this.dialog.open(DialogConfirmaComponent, {
      data: {
        texto: `¿Eliminar todas los clientes?, esta acción no puede deshacerse.`,
      },
    });
    dialog.afterClosed().subscribe((confirma) => {
      if (confirma) {
        this.clientes$.eliminarDocumentoFirestore();
      }
    });
  }
}
