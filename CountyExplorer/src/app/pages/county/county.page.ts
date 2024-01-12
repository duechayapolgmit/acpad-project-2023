import { Component, OnInit } from '@angular/core';
import { County, DatabaseService } from '../../services/database.service';
import { StorageService } from '../../services/storage.service';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { FavouriteCounty, FavouritesService } from '../../services/favourites.service';

@Component({
  selector: 'app-county',
  templateUrl: './county.page.html',
  styleUrls: ['./county.page.scss'],
})
// Page for each county's details
export class CountyPage implements OnInit {

  county: any = {
    name: "Loading"
  };
  countyName: string = "";
  image: any = null;
  private routeSub: any;

  favourite: FavouriteCounty = {county: ''};
  favouriteExists: boolean = false;

  constructor(private database: DatabaseService, private favourites: FavouritesService, private storage: StorageService, private route: ActivatedRoute) { }

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

    // Get image
    this.image = this.storage.getImage(this.countyName).then( (res) => { 
      let urlCreator = window.URL || window.webkitURL;
      let imageUrl = urlCreator.createObjectURL(res);
      this.image = imageUrl });

    // Get favourite status
    this.favourites.getFavourites().subscribe(
      value => {
        const result = value.find(county => county.county.toLowerCase() == this.countyName.toLowerCase())
        if (result) {
          this.favourite = result;
          this.favouriteExists = true;
        }
      }
    )
  }

  // Toggle favourites for each county
  toggleFavourite(){
    if (this.favouriteExists) {
      this.favourites.removeFavourite(this.favourite);
      this.favouriteExists = false;
    } else {
      const newFavourite = {county: this.countyName}
      this.favourites.addFavourite(newFavourite);
      this.favourite = newFavourite;
      this.favouriteExists = true;
    }
  }

  // Unsubscribe from route when exit out
  ngOnDestroy(){
    this.routeSub.unsubscribe();
  }

}