import { Component, OnInit} from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent implements OnInit {

  loginStatus: boolean = false;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getLoginStatus().subscribe(res => {
      console.log(res); 
      this.loginStatus = res;
    });
  }

}
