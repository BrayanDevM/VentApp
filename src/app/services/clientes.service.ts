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
export class ClientesService {
  usuarioId: string;
  clientesColecction: AngularFirestoreCollection<Cliente>;
  clientes: Observable<Cliente>[] = [];

  constructor(
    private usuarios$: UsuariosService,
    private db: AngularFirestore,
    private _snackBar: MatSnackBar
  ) {
    // declaraciones
    this.usuarioId = this.usuarios$.usuario.uid;
    this.clientesColecction = this.db
      .collection('Clientes')
      .doc(`user.${this.usuarioId}`)
      .collection<Cliente>('Registros');

    // this.cargarLS();
  }

  obtenerClientes() {
    return this.clientesColecction
      .snapshotChanges()
      .pipe(
        map((actions) => actions.map((a) => a.payload.doc.data() as Cliente))
      );
  }

  guardarCliente(
    cliente: Cliente,
    clienteId: string | undefined = undefined
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        !clienteId ? (cliente.id = this.db.createId()) : null;
        const result = await this.clientesColecction
          .doc(cliente.id)
          .set(cliente);
        resolve(result);
      } catch (err) {
        reject(err);
      }
    });
  }

  eliminarCliente(id: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.clientesColecction.doc(id).delete();
        resolve(result);
      } catch (err) {
        reject(err);
      }
    });
  }

  eliminarDocumentoFirestore() {
    this.clientesColecction.ref.onSnapshot((snap) => {
      snap.forEach((doc) => {
        doc.ref.delete();
      });
    });

    this._snackBar.open('Registros de clientes eliminados', 'Entendido', {
      duration: 5000,
    });
  }
}

export interface Cliente {
  id: string;
  nombre: string;
  anotacion: string;
}
