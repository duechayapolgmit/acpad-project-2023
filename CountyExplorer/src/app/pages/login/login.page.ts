import { Location } from '@angular/common';
import { Component} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { UserCardComponent } from 'src/app/components/user-card/user-card.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
// Log-in page for the user system
export class LoginPage {

  credentials = this.fb.nonNullable.group({
    email: ['test@test.com', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  constructor(private fb: FormBuilder, private location: Location, private authService: AuthService,
    private loadingController: LoadingController, private alertController: AlertController,
    private userCardComponent: UserCardComponent) { }

  // Get methods for fields
  get email() { return this.credentials.controls.email; }
  get password() { return this.credentials.controls.password; }

  // Log-in
  async login() {
    // Loading overlay
    const loading = await this.loadingController.create();
    await loading.present();

    const user = await this.authService.login(this.credentials.getRawValue());
    await loading.dismiss();

    if (user) {
      this.userCardComponent.ngOnInit(); // refresh the user card component
      this.location.back();
    } else {
        const alert = await this.alertController.create({header: 'Log-in failed', message: 'Please try again', buttons: ['OK']});
        await alert.present();
    }
  }

}
