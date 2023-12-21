import { Component, OnInit } from '@angular/core';
import { County, DatabaseService } from '../services/database.service';
import { StorageService } from '../services/storage.service';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-county',
  templateUrl: './county.page.html',
  styleUrls: ['./county.page.scss'],
})
export class CountyPage implements OnInit {

  county: any = {
    name: "Loading"
  };
  countyName: string = "";
  image: any = null;
  private routeSub: any;

  constructor(private database: DatabaseService, private storage: StorageService, private route: ActivatedRoute) { }

  ngOnInit() {
    // Get county name from route
    this.countyName = "";
    this.routeSub = this.route.params.subscribe(params => {
      this.countyName = params['county'];
    });

    // Get data from Firestore
    this.database.getCounties().subscribe(
      value => {
        if (value.length != 0){
          this.county = value.find(county => county.name.toLowerCase() == this.countyName.toLowerCase());
        } else {
          this.county = {
            name: "Loading"
          };
        }
      }
    );
    this.storage.getImage(this.countyName).then( (res) => { 
      let urlCreator = window.URL || window.webkitURL;
      let imageUrl = urlCreator.createObjectURL(res);
      this.image = imageUrl });
  }

  ngOnDestroy(){
    this.routeSub.unsubscribe();
  }

}