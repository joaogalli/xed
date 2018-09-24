import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {User} from 'firebase/app';
import {MediaMatcher} from '@angular/cdk/layout';
// import {MenuOption} from './model.menu/menuoption';
import {AuthService} from './auth.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'XED';
  dots = '';
  user: User;
  // menuOptions: MenuOption[];
  userSubscription: Subscription;

  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(private authService: AuthService,
              changeDetectorRef: ChangeDetectorRef,
              media: MediaMatcher,
              private router: Router) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.userSubscription = this.authService.getAuthenticatedUser().subscribe(
      (user: User) => {
        this.user = user;
        this.produceDots();
      },
      (error: any) => {
        this.user = null;
      }
    );

    // this.menuOptions = [
      // new MenuOption('Instituições', '/use-institution'),
      // new MenuOption('Usuários', '/user-form'),
      // new MenuOption('Cursos', '/courses'),
    // ];
  }

  produceDots() {
    this.dots = '';

    if (this.user) {
      const size = this.user.email.length | 0;

      for (let i = 0; i < size; i++) {
        this.dots += '.';
      }
    }
  }

  signOut() {
    this.authService.signOut();
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
