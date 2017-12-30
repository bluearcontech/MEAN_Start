import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { matchOtherValidator } from './match-other-validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;
  signUpError: Object;
  errors: string;
  constructor(private _authService: AuthService,  private router: Router) { }

  ngOnInit() {
    this.signUpForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', Validators.required),
      'confirmPassword': new FormControl('', [Validators.required, matchOtherValidator('password')])
    })
  }

  onSignUp() {
    const { email, password } = this.signUpForm.value;
    this._authService.signUpUser(email, password)
      .subscribe(
        data => {
          this.router.navigate(['/']) },
        error =>  {
          const err = JSON.parse(error._body)
          this.errors = err.message },
      )
  }

}
