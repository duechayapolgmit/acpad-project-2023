import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { FavouritesListComponent } from 'src/app/components/favourites-list/favourites-list.component';
import { RandomCountyComponent } from 'src/app/components/random-county/random-county.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    FavouritesListComponent,
    RandomCountyComponent
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
