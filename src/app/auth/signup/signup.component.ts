import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../auth.service';
import {UserService} from '../../user/user.service';
import {User} from '../../user/user.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css', '../../angular-material.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  signupError = '';

  constructor(private router: Router,
              private authService: AuthService,
              private userService: UserService) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });
  }

  onSubmit() {
    this.signupError = '';

    if (this.signupForm.valid) {
      const name = this.signupForm.value['name'];
      const email = this.signupForm.value['email'];
      const password = this.signupForm.value['password'];

      this.authService.signUpWithEmailAndPassword(email, password)
        .then((value => {
            const user = new User(value.uid, name, value.email);

            this.userService.createUser(user);
            this.signupForm.reset();

            // TODO mandar para a próxima página
            this.router.navigate(['after-signup', user.id]);
          }),
          reason => {
            this.signupError = reason.code;
          });
    }
  }

}
