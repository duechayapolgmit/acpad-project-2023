import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TabsComponent } from './tabs/tabs.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getStorage, provideStorage } from '@angular/fire/storage';

@NgModule({
  declarations: [AppComponent, TabsComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, provideFirebaseApp(() => 
    initializeApp({
      "projectId":"acpad-project-2023",
      "appId":"1:763863517408:web:ff1ee48385c96abe252885",
      "storageBucket":"acpad-project-2023.appspot.com",
      "apiKey":"AIzaSyAhTAuXMnhhQqnPLomru0Z16d1vKRgkrdk",
      "authDomain":"acpad-project-2023.firebaseapp.com",
      "messagingSenderId":"763863517408"})), 
    provideFirestore(() => getFirestore()), 
    provideDatabase(() => getDatabase()), 
    provideStorage(() => getStorage())],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
