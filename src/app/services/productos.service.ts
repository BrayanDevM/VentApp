import { Injectable } from '@angular/core';
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
export class ProductosService {
  usuarioId: string;
  productosColecction: AngularFirestoreCollection<Producto>;
  productos: Observable<Producto>[] = [];

  constructor(
    private usuarios$: UsuariosService,
    private db: AngularFirestore
  ) {
    // declaraciones
    this.usuarioId = this.usuarios$.usuario.uid;
    this.productosColecction = this.db
      .collection('Productos')
      .doc(`user.${this.usuarioId}`)
      .collection<Producto>('Registros');

    // this.cargarLS();
  }

  obtenerProductos() {
    return this.productosColecction
      .snapshotChanges()
      .pipe(
        map((actions) => actions.map((a) => a.payload.doc.data() as Producto))
      );
  }

  guardarProducto(
    producto: Producto,
    productoId: string | undefined = undefined
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        !productoId ? (producto.id = this.db.createId()) : null;
        const result = await this.productosColecction
          .doc(producto.id)
          .set(producto);
        resolve(result);
      } catch (err) {
        reject(err);
      }
    });
  }

  async eliminarProducto(id: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.productosColecction.doc(id).delete();
        resolve(result);
      } catch (err) {
        reject(err);
      }
    });
  }
}

export interface Producto {
  id: string;
  nombre: string;
  precioVenta: number;
  precioCompra: number;
  recargoNocturno: number;
  img: string;
  stock: number;
}
