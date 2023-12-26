import { Component, OnInit } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'favourites-list',
  templateUrl: './favourites-list.component.html',
  styleUrls: ['./favourites-list.component.scss'],
})
export class FavouritesListComponent  implements OnInit {

  user$ = user(this.auth);
  userSubscription: Subscription;

  userEmail: string | null | undefined = "";
  
  constructor(private router: Router, private auth: Auth) { 
    this.userSubscription = this.user$.subscribe((aUser) => {
      this.userEmail = aUser?.email;
    })
  }

  ngOnInit() {
  }

  getCounties(){

  }

  goCounty(countyName: string){
    this.router.navigate(["/county", countyName.toLowerCase()])
  }

}
