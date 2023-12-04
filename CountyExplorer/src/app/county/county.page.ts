import { Component, OnInit } from '@angular/core';
import { County, DatabaseService } from '../services/database.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-county',
  templateUrl: './county.page.html',
  styleUrls: ['./county.page.scss'],
})
export class CountyPage implements OnInit {

  county: any = undefined;
  image: any = null;

  constructor(private database: DatabaseService, private storage: StorageService) { }

  ngOnInit() {
    let countyName = "galway";
    this.database.readCounties().subscribe(
      value => {
        this.county = value.find(county => county.name.toLowerCase() == countyName.toLowerCase());
      }
    );
    this.storage.getImage(countyName).then( (res) => { 
      this.image = res });
  }

}