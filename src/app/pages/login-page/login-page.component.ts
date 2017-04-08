import { Component, OnInit } from '@angular/core';
import {EmailPasswordCredentials} from 'angularfire2/auth';
import {AuthService} from '../../services/auth.service';
import {UtilsService} from '../../services/utils.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  returnUrl: string;

  constructor(private authService:AuthService,
              private utilsService:UtilsService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit(data:EmailPasswordCredentials)
  {

    this.authService.loginWithEmail(data).then(() => {
      console.log(this.returnUrl);
      this.utilsService.pushMessage("Logged in successfully");
      this.router.navigate([this.returnUrl]);
    }).catch( (err) => {
      this.utilsService.pushMessage(err.message);
    });
  }

}
