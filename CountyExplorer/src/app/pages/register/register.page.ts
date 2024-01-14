import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
// Register page for the user system
export class RegisterPage {

  // credentials validators and details
  credentials = this.fb.nonNullable.group({
    email: ['test@test.com', [Validators.required, Validators.email]],
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService,
    private loadingController: LoadingController, private alertController: AlertController) { }

  // Get methods for fields
  get email() { return this.credentials.controls.email; }
  get username() { return this.credentials.controls.username; }
  get password() { return this.credentials.controls.password; }

  // Register with the system
  async register() {
    const loading = await this.loadingController.create();
    await loading.present();

    const user = await this.authService.register( this.credentials.getRawValue());
    await loading.dismiss();

    if (user) {
      this.router.navigateByUrl('/user', {replaceUrl: true});
    }
    else {
      const alert = await this.alertController.create({header: 'Registration failed', message: 'Please try again', buttons: ['OK']});
      await alert.present();
    }
  }

}
