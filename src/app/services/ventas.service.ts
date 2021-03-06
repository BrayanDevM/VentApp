import { EventEmitter, Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UsuariosService } from './usuarios.service';

@Injectable({
  providedIn: 'root',
})
export class VentasService {
  usuarioId: string;
  ventasColecction: AngularFirestoreCollection<Venta>;
  ventas!: Observable<Venta[]>;

  ventaNueva$ = new EventEmitter<Venta>();
  ventaEliminada$ = new EventEmitter<string>();
  ventaEditada$ = new EventEmitter<Venta>();

  constructor(
    private usuarios$: UsuariosService,
    private db: AngularFirestore,
    private _snackBar: MatSnackBar
  ) {
    // declaraciones
    this.usuarioId = this.usuarios$.usuario.uid;
    this.ventasColecction = this.db
      .collection('Ventas')
      .doc(`user.${this.usuarioId}`)
      .collection<Venta>('Registros', (ref) => ref.orderBy('fecha', 'desc'));

    // this.guardarVentasLocales();
  }

  obtenerVentas() {
    return this.ventasColecction
      .snapshotChanges()
      .pipe(
        map((actions) => actions.map((a) => a.payload.doc.data() as Venta))
      );
  }

  guardarVenta(
    venta: Venta,
    ventaId: string | undefined = undefined
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        !ventaId ? (venta.id = this.db.createId()) : null;
        const result = await this.ventasColecction.doc(venta.id).set(venta);
        resolve(result);
      } catch (err) {
        reject(err);
      }
    });
  }

  eliminarVenta(id: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.ventasColecction.doc(id).delete();
        resolve(result);
      } catch (err) {
        reject(err);
      }
    });
  }

  eliminarDocumentoFirestore() {
    this.ventasColecction.ref.onSnapshot((snap) => {
      snap.forEach((doc) => {
        doc.ref.delete();
      });
    });

    this._snackBar.open('Registros de ventas eliminados', 'Entendido', {
      duration: 5000,
    });
  }
}

export interface Venta {
  id: string;
  producto: string;
  precio: number;
  recargoNocturno: number;
  utilidad: number;
  cantidad: number;
  utilidadTotal: number;
  cliente: string;
  paga: boolean;
  fecha: any;
  totalVenta: number;
}
