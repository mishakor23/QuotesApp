import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomePageComponent} from './pages/home-page/home-page.component';
import {ProfilePageComponent} from './pages/profile-page/profile-page.component';
import {UserCitationsPageComponent} from './pages/profile-page/user-citations-page/user-citations-page.component';
import {FavouritesPageComponent} from './pages/profile-page/favourites-page/favourites-page.component';
import {TagPageComponent} from './pages/tag-page/tag-page.component';
import {AuthGuard} from './guards/AuthGuard';
import {UserPageComponent} from './pages/user-page/user-page.component';
import {FeedPageComponent} from './pages/feed-page/feed-page.component';
import {LoginPageComponent} from './pages/login-page/login-page.component';

const routes: Routes = [

  { path: '', component: HomePageComponent },
  { path: 'login', component: LoginPageComponent},
  { path: 'feed', component: FeedPageComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfilePageComponent, canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'citations', pathMatch: 'full' },
      { path: 'citations', component: UserCitationsPageComponent },
      { path: 'favourites', component: FavouritesPageComponent }
    ]
  },
  { path: 'user/:id', component: UserPageComponent },
  { path: 'tag/:id', component: TagPageComponent},
  { path: '**', redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
