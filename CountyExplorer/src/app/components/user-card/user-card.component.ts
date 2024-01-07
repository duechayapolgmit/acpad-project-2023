import { Component, OnInit} from '@angular/core';
import { Auth, user } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent implements OnInit {

  user$ = user(this.auth);
  userAuthSubscription: Subscription;
  userDataSubscription: Subscription;

  username : string | null | undefined = "";
  userEmail: string | null | undefined = "";
  
  constructor(private auth: Auth, private authService: AuthService, private userService: UsersService) { 
    this.userAuthSubscription = this.user$.subscribe((aUser) => {
      this.userEmail = aUser?.email;
    })
    this.userDataSubscription = this.userService.getUsers().subscribe((
      value => {
        if (value.length != 0) {
          this.username = value.find(user => user.email == this.userEmail)?.username;
        } else {
          this.username = null;
        }
      }
    ))
  }

  ngOnInit() {
  }

  signOut(){
    this.authService.logout();
  }

}
