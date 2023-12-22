import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CountyPageRoutingModule } from './county-routing.module';

import { CountyPage } from './county.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CountyPageRoutingModule
  ],
  declarations: [CountyPage]
})
export class CountyPageModule {}
