import {Component, OnInit} from '@angular/core';
import {UtilsService} from './services/utils.service';
import {MdSnackBarConfig} from '@angular/material/snack-bar/snack-bar-config';
import {MdSnackBar} from '@angular/material/snack-bar/snack-bar';
import {AuthService} from './services/auth.service';
import {UserBasicInfo} from './models/userBasicInfo';
import {Observable} from '../../node_modules/rxjs/Observable';
import {Router} from '@angular/router';
import {User} from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  private user$:Observable<User>;

  constructor(private utilsService:UtilsService,
              private snackBar:MdSnackBar,
              private authService:AuthService, private router:Router)
  {
  }

  ngOnInit(): void {
    this.user$ = this.authService.userStream$;
    this.utilsService.onMessage().subscribe((msg) => {
      this.showMessageBar(msg);
    });
  }

  onLogOut():void
  {
    this.authService.logout().then( () => {
      this.router.navigate(['/login']);
    });
  }

  private showMessageBar(msg:string):void
  {
    let config = new MdSnackBarConfig();
    config.duration = 1500;
    this.snackBar.open(msg, "", config);
  }
}
