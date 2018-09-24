import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {User} from 'firebase/app';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private user: User;

  constructor(private router: Router,
              private authService: AuthService) { }

  ngOnInit() {
    this.authService.getAuthenticatedUser()
      .subscribe(value => {
        this.user = value;
      });
  }

  goToSignup() {
    this.router.navigate(['/signup']);
  }

}
