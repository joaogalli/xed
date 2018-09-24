import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../auth.service';
import {User} from 'firebase/app';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css', '../../angular-material.css']
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;
  signinError = '';
  loginDisabled = false;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.signinForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });
  }

  onSubmit() {
    this.loginDisabled = true;
    this.signinError = '';

    if (this.signinForm.valid) {
      const email = this.signinForm.value['email'];
      const password = this.signinForm.value['password'];

      this.authService.signInWithEmailAndPassword(email, password)
        .then(((value: User ) => {
            this.signinForm.reset();

            if (value) {
              // TODO login success
              console.info('LOGIN SUCCESS!');
            }

          }),
          reason => {
            console.error(reason);
            this.signinError = reason.code;
            this.loginDisabled = false;
          });
    }
  }

}
