import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import {MaterialModule} from '@angular/material';
import {config} from '../environments/firebase.config';
import 'hammerjs';

import { AppComponent } from './app.component';
import { CitationFormComponent } from './components/forms/citation-form/citation-form.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import { LoginFormComponent } from './components/forms/login-form/login-form.component';
import {UtilsService} from './services/utils.service';
import { RegisterFormComponent } from './components/forms/register-form/register-form.component';
import { TagInputComponent } from './components/forms/tag-input/tag-input.component';
import { CitationComponent } from './components/citation/citation.component';
import {CitationRankComponent} from './components/citation-rank.component';
import {CitationNavigationComponent} from './components/citation-navigation.component';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';
import {AngularFireModule} from 'angularfire2';
import {AuthService} from './services/auth.service';
import {CitationService} from './services/citation.service';
import { CitationListComponent } from './components/citation-list/citation-list.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { UserCitationsPageComponent } from './pages/profile-page/user-citations-page/user-citations-page.component';
import { FavouritesPageComponent } from './pages/profile-page/favourites-page/favourites-page.component';
import { ProfileInfoComponent } from './components/profile-info/profile-info.component';
import { TagPageComponent } from './pages/tag-page/tag-page.component';
import {AuthGuard} from './guards/AuthGuard';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { DialogManagerDirective } from './components/dialog-manager.directive';
import { SubscribeComponent } from './components/subscribe/subscribe.component';
import {UsersService} from './services/users.service';
import { FeedPageComponent } from './pages/feed-page/feed-page.component';

@NgModule({
  declarations: [
    AppComponent,
    CitationFormComponent,
    LoginFormComponent,
    RegisterFormComponent,
    TagInputComponent,
    CitationComponent,
    CitationRankComponent,
    CitationNavigationComponent,
    CitationListComponent,
    HomePageComponent,
    ProfilePageComponent,
    UserCitationsPageComponent,
    FavouritesPageComponent,
    ProfileInfoComponent,
    TagPageComponent,
    UserPageComponent,
    DialogManagerDirective,
    SubscribeComponent,
    FeedPageComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule,
    AppRoutingModule,
    MaterialModule.forRoot(),
    FlexLayoutModule.forRoot(),
    AngularFireModule.initializeApp(config)
  ],
  providers: [
    UtilsService,
    AuthService,
    UsersService,
    CitationService,
    AuthGuard
  ],
  entryComponents: [LoginFormComponent, RegisterFormComponent, CitationFormComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
