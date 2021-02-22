import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';

// Rutas
import { RoutesModule } from './routes.module';

// Módulos independientes
import { MaterialModule } from './material.module';
import { ComponentsModule } from './components/components.module';
import { PagesModule } from './pages/pages.module';

// Firestore
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { InicioComponent } from './pages/inicio/inicio.component';
import { RegistroComponent } from './pages/registro/registro.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InicioComponent,
    RegistroComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    RoutesModule,
    MaterialModule,
    ComponentsModule,
    ReactiveFormsModule,
    PagesModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
