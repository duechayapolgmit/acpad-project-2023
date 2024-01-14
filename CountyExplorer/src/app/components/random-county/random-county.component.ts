import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { randomInt } from 'crypto';
import { County, DatabaseService } from 'src/app/services/database.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'random-county',
  templateUrl: './random-county.component.html',
  styleUrls: ['./random-county.component.scss'],
  standalone: true,
  imports: [IonicModule, RouterLink]
})
export class RandomCountyComponent  implements OnInit {

  countyName: any = "";
  image: any = null;

  constructor(private database: DatabaseService, private router: Router, private storage: StorageService) { 
    // Gets the county
    this.database.getCounties().subscribe(counties => {
      this.countyName = counties[Math.floor(Math.random() * counties.length)].name

      // Gets the image
      this.storage.getImage(this.countyName).then( (res) => { 
        // From: https://stackoverflow.com/questions/23150333/html5-javascript-dataurl-to-blob-blob-to-dataurl
        let urlCreator = window.URL || window.webkitURL;
        let imageUrl = urlCreator.createObjectURL(res);
        this.image = imageUrl;
      });
      
    })
  }

  ngOnInit() {}

  // Go to county specified
  goCounty(countyName: string){
    this.router.navigate(["/county", countyName.toLowerCase()])
  }

}
