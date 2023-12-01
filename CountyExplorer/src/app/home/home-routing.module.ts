import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { CountyPage } from '../county/county.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'county',
    component: CountyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
