import { Component, OnInit } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { DatabaseService } from 'src/app/services/database.service';
import { FavouritesService } from 'src/app/services/favourites.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'favourites-list',
  templateUrl: './favourites-list.component.html',
  styleUrls: ['./favourites-list.component.scss'],
})
export class FavouritesListComponent implements OnInit {

  user$ = user(this.auth);
  userSubscription: Subscription;

  userEmail: string | null | undefined = "";

  counties: any[] = [];
  favouriteCounties: any[] = [];
  favouriteCountiesDetails: any[] = [];
  
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

  ngOnInit() {
    
  }

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
      console.log(this.favouriteCountiesDetails)
      })
  }

  // Get the images of the county
  getImages(): any[] {
    let newCounties : any[] = [];

      this.favouriteCountiesDetails.forEach(county => {
        this.storage.getImage(county.name).then( (res) => { 
          let urlCreator = window.URL || window.webkitURL;
          let imageUrl = urlCreator.createObjectURL(res);
          county.imageURL = imageUrl;
          newCounties.push(county)
        });
      });
    return newCounties;
  }

  goCounty(countyName: string){
    this.router.navigate(["/county", countyName.toLowerCase()])
  }

}
