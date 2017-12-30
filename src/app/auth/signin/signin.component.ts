import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm}  from '@angular/forms'
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signInForm: FormGroup;
  errors: string;
  constructor(private _authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.signInForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', Validators.required)
    })
  }

  onSignin() {
    if (this.signInForm.invalid) {
      return;
    }

    const { email, password } = this.signInForm.value;
    this._authService.signInUser(email, password)
      .subscribe(
        data => {
          console.log('login response is:', data)
          localStorage.setItem('token', data.token)
          this.router.navigate(['/']) },
        error => {
          const err = JSON.parse(error._body)
          console.log("parsed error:", err)
          this.errors = err.message },
      )
  }

  isFieldInvalid(field: string) { // {6}
    return (
      (!this.signInForm.get(field).valid && this.signInForm.get(field).touched) ||
      (this.signInForm.get(field).untouched)
    );
  }

}
