import { Component, OnInit } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FavouritesService } from 'src/app/services/favourites.service';

@Component({
  selector: 'favourites-list',
  templateUrl: './favourites-list.component.html',
  styleUrls: ['./favourites-list.component.scss'],
})
export class FavouritesListComponent  implements OnInit {

  user$ = user(this.auth);
  userSubscription: Subscription;

  userEmail: string | null | undefined = "";

  favouriteCounties: any[] = [];
  
  constructor(private favouritesService: FavouritesService, private router: Router, private auth: Auth) { 
    this.userSubscription = this.user$.subscribe((aUser) => {
      this.userEmail = aUser?.email;
    })
    this.favouritesService.getFavourites().subscribe(value => this.favouriteCounties = value);
  }

  ngOnInit() {
  }


  goCounty(countyName: string){
    this.router.navigate(["/county", countyName.toLowerCase()])
  }

}
