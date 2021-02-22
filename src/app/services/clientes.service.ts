import { EventEmitter, Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
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
    private db: AngularFirestore
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

  async eliminarCliente(id: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.clientesColecction.doc(id).delete();
        resolve(result);
      } catch (err) {
        reject(err);
      }
    });
  }
}

export interface Cliente {
  id: string;
  nombre: string;
  anotacion: string;
}
