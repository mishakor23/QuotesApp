/**
 * Created by baunov on 20/01/2017.
 */
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private userService: AuthService) {}

  canActivate() {
    return this.userService.isLoggedIn();
  }
}
