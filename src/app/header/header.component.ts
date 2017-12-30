import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean;
  subscription: Subscription;

  constructor(private _authService: AuthService, private _router: Router) { }

  ngOnInit() {
    this.subscription = this._authService.isLoggedIn
      .subscribe(
      isLoggedIn => {
        this.isLoggedIn = isLoggedIn
      }
      )
  }

  onLogIn() {
    this._router.navigate(['/sign-in'])
  }

  onLogout() {
    this._authService.logout()
      .subscribe(
        result => {
          console.log('response:', result)
          if (result.status === 200) {
            this._router.navigate([''])
          }
        },
        error => { console.log('logout error:', error) },
      )
  }

  onSignUp() {
    this._router.navigate(['/sign-up'])
  }

}
