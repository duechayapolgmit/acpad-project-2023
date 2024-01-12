import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
// User page (formerly Settings Page)
export class SettingsPage implements OnInit {

  menuType: string = 'overlay';
  
  constructor() { }

  ngOnInit() {
  }

}
