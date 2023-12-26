import { Component, OnInit} from '@angular/core';
import { Auth, user } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent implements OnInit {

  user$ = user(this.auth);
  userSubscription: Subscription;

  userEmail: string | null | undefined = "";
  
  constructor(private auth: Auth, private authService: AuthService) { 
    this.userSubscription = this.user$.subscribe((aUser) => {
      this.userEmail = aUser?.email;
    })
  }

  ngOnInit() {
  }

  signOut(){
    this.authService.logout();
  }

}
