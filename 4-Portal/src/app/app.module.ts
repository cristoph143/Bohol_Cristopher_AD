import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './screens/home/home.component';
import { LoginComponent } from './screens/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './screens/register/register.component';
import { SharedModule } from './shared/shared.module';
import { ApiService } from './shared/api.service';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { UserComponent } from './user/user.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
// import { provideAuth,getAuth } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule, PERSISTENCE } from '@angular/fire/compat/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    DefaultLayoutComponent,
    NavbarComponent,
    FooterComponent,
    UserComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    // provideAuth(() => getAuth()),
    AngularFireModule.initializeApp(environment.firebase), AngularFireAuthModule, AngularFirestoreModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    // provideFirestore(() => getFirestore())
  ],
  providers: [/*ApiService*/ { provide: PERSISTENCE, useValue: 'session' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
