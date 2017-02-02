var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { UserCitationsPageComponent } from './pages/profile-page/user-citations-page/user-citations-page.component';
import { FavouritesPageComponent } from './pages/profile-page/favourites-page/favourites-page.component';
import { TagPageComponent } from './pages/tag-page/tag-page.component';
import { AuthGuard } from './guards/AuthGuard';
var routes = [
    { path: '', component: HomePageComponent },
    { path: 'profile', component: ProfilePageComponent, canActivate: [AuthGuard],
        children: [
            { path: '', redirectTo: 'citations', pathMatch: 'full' },
            { path: 'citations', component: UserCitationsPageComponent },
            { path: 'favourites', component: FavouritesPageComponent }
        ]
    },
    { path: 'user/:id', component: AppComponent },
    { path: 'tag/:id', component: TagPageComponent }
];
export var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        NgModule({
            imports: [RouterModule.forRoot(routes)],
            exports: [RouterModule]
        }), 
        __metadata('design:paramtypes', [])
    ], AppRoutingModule);
    return AppRoutingModule;
}());
//# sourceMappingURL=app-routing.module.js.map