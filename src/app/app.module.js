var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { config } from '../environments/firebase.config';
import 'hammerjs';
import { AppComponent } from './app.component';
import { CitationFormComponent } from './components/forms/citation-form/citation-form.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginFormComponent } from './components/forms/login-form/login-form.component';
import { UtilsService } from './services/utils.service';
import { RegisterFormComponent } from './components/forms/register-form/register-form.component';
import { TagInputComponent } from './components/forms/tag-input/tag-input.component';
import { CitationComponent } from './components/citation/citation.component';
import { CitationRankComponent } from './components/citation-rank.component';
import { CitationNavigationComponent } from './components/citation-navigation.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from 'angularfire2';
import { UserService } from './services/user.service';
import { CitationService } from './services/citation.service';
import { CitationListComponent } from './components/citation-list/citation-list.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { UserCitationsPageComponent } from './pages/profile-page/user-citations-page/user-citations-page.component';
import { FavouritesPageComponent } from './pages/profile-page/favourites-page/favourites-page.component';
import { ProfileInfoComponent } from './components/profile-info/profile-info.component';
import { CitationFormContainerComponent } from './components/citation-form-container/citation-form-container.component';
import { Citation2Service } from './services/citation2.service';
import { TagPageComponent } from './pages/tag-page/tag-page.component';
import { AuthGuard } from './guards/AuthGuard';
export var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
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
                CitationFormContainerComponent,
                TagPageComponent,
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
                UserService,
                CitationService,
                Citation2Service,
                AuthGuard
            ],
            entryComponents: [LoginFormComponent, RegisterFormComponent],
            bootstrap: [AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=app.module.js.map