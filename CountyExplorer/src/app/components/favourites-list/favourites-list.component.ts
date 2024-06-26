import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Subscription, filter } from 'rxjs';
import { DatabaseService } from 'src/app/services/database.service';
import { FavouritesService } from 'src/app/services/favourites.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'favourites-list',
  templateUrl: './favourites-list.component.html',
  styleUrls: ['./favourites-list.component.scss'],
  standalone: true,
  imports: [IonicModule, NgIf, NgFor]
})

// Standalone component for a favourites list in the Home Page
export class FavouritesListComponent {

  user$ = user(this.auth);
  userSubscription: Subscription;

  userEmail: string | null | undefined = "";

  counties: any[] = [];
  favouriteCounties: any[] = [];
  favouriteCountiesDetails: any[] = [];
  
  // Initialise subscriptions methods
  constructor(private database: DatabaseService, private storage: StorageService, private favouritesService: FavouritesService, 
              private router: Router, private auth: Auth) { 
    this.userSubscription = this.user$.subscribe((aUser) => {
      this.userEmail = aUser?.email;
    })
    this.favouritesService.getFavourites().subscribe(value => {
      this.favouriteCounties = value
      this.filterCounties();
  });
  }

  // Filter counties details from counties list based on favourites list
  filterCounties(){
    // Get names of favourite counties
    let countyNames: string[] = [];
    this.favouriteCounties.forEach(county => {
      countyNames.push(county.county);
    });
    
    // Filter counties from the main counties list
    this.database.getCounties().subscribe(counties => {
      this.favouriteCountiesDetails = [];
      countyNames.forEach(name => {
        this.favouriteCountiesDetails.push(counties.filter(county => county.name.toLowerCase().indexOf(name) > -1)[0]);
      });

      // Get images
      this.favouriteCountiesDetails = this.getImages();
      })
  }

  // Get the images of the county, by inserting the images into the original array
  getImages(): any[] {
    let newCounties : any[] = [];

      this.favouriteCountiesDetails.forEach(county => {
        this.storage.getImage(county.name).then( (res) => {
          // From: https://stackoverflow.com/questions/23150333/html5-javascript-dataurl-to-blob-blob-to-dataurl
          let urlCreator = window.URL || window.webkitURL;
          let imageUrl = urlCreator.createObjectURL(res);
          county.imageURL = imageUrl;
          newCounties.push(county)
        });
      });
    return newCounties;
  }

  // Go to county specified
  goCounty(countyName: string){
    this.router.navigate(["/county", countyName.toLowerCase()])
  }

}
