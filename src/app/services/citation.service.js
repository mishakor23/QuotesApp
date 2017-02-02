var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Citation } from "../models/citation";
import 'rxjs/Rx';
import { Observable, Subject } from 'rxjs/Rx';
import { AngularFire } from 'angularfire2';
import { UserService } from './user.service';
import { Ratings } from '../models/ratings';
export var CitationService = (function () {
    function CitationService(af, userService) {
        this.af = af;
        this.userService = userService;
        //TODO refactor to CitationNavigationService
        //stream of next ids to be loaded once nextStream emits
        this.nextInOrderId$ = new Subject();
        //when on next is called emits new value
        this.indexStream$ = new Subject();
        //current citation from the one-by-one
        this.currentCitation$ = new Observable();
        this.citCache = [];
        this.curIndex = 0;
    }
    CitationService.prototype.getCitationsByTag = function (tag, limit) {
        var _this = this;
        if (limit === void 0) { limit = 10; }
        this.tagCitations$ = this.af.database.list("/citations_by_tags/" + tag, {
            query: {
                limitToFirst: limit
            }
        }).map(function (cits) {
            return cits.map(function (cit) { return cit.$key; });
        }).switchMap(function (ids) {
            return _this.getCitationsByIds(ids);
        }).publishReplay(1).refCount();
        return this.tagCitations$;
    };
    CitationService.prototype.getAllCitations = function (limit) {
        var _this = this;
        if (limit === void 0) { limit = 100; }
        if (!this.allCitations$) {
            this.allCitations$ = this.af.database.list("/citations/", {
                query: {
                    limitToFirst: limit
                }
            }).map(function (cits) {
                return cits.map(function (cit) {
                    return Citation.unpack(cit);
                });
            }).switchMap(function (cits) {
                return cits.length === 0
                    ?
                        Observable.of(cits)
                    :
                        Observable.combineLatest(cits.map(function (cit) {
                            return _this.getRatings(cit);
                        }));
            }).map(function (cits) {
                return cits.sort(function (cit1, cit2) { return (cit1.date_published < cit2.date_published) ? 1 : -1; });
            }).publishReplay(1).refCount();
        }
        return this.allCitations$;
    };
    CitationService.prototype.nextCitation = function () {
        this.curIndex++;
        this.indexStream$.next(this.curIndex);
    };
    CitationService.prototype.prevCitation = function () {
        this.curIndex--;
        this.indexStream$.next(this.curIndex);
    };
    CitationService.prototype.getCurrentCitation = function () {
        var _this = this;
        if (this.citCache.length > 0 && this.curIndex < this.citCache.length) {
            //console.log("Cache "+this.curIndex);
            return Observable.of(this.citCache[this.curIndex]);
        }
        //console.log("Loading "+this.curIndex);
        return this.indexStream$
            .switchMap(function () { return _this.getAllCitations(); })
            .map(function (cits) {
            _this.citCache = _this.citCache.concat(cits);
            var index = _this.curIndex;
            if (index < 0)
                index = 0;
            if (index >= cits.length)
                index = cits.length - 1;
            _this.curIndex = index;
            return cits[index];
        });
    };
    CitationService.prototype.getPrevCitation = function (id) {
        var _this = this;
        if (id === void 0) { id = ""; }
        this.curIndex--;
        return this.getAllCitations().map(function (cits) { return cits[_this.curIndex]; });
    };
    CitationService.prototype.getCitationById = function (id) {
        var _this = this;
        return this.af.database.object('/citations/' + id).map(function (res) {
            return res.json();
        }, function (err) {
            _this.handleError(err);
        });
    };
    CitationService.prototype.getFeed = function () {
        var userId = this.userService.getCurrentUserInfo().id;
        return this.af.database.list('/feeds', {
            query: {
                orderByChild: 'user',
                equalTo: userId
            }
        });
    };
    CitationService.prototype.getUserFavourites = function (userId) {
        var _this = this;
        if (userId === void 0) { userId = ""; }
        if (!this.userFavourites$) {
            this.userFavourites$ = this.af.database.list('/ranks_by_user/' + userId, {
                query: {
                    limitToFirst: 50
                }
            }).map(function (ranks) {
                return ranks.filter(function (rank) { return rank.$value === true; }); //likes only
            }).map(function (likes) {
                return likes.map(function (like) { return like.$key; });
            }).switchMap(function (ids) {
                return _this.getCitationsByIds(ids);
            }).publishReplay(1).refCount();
        }
        return this.userFavourites$;
    };
    CitationService.prototype.getCitationsByIds = function (ids) {
        var _this = this;
        return ids.length === 0 ?
            Observable.of([]) :
            Observable.combineLatest(ids.map(function (id) { return _this.af.database.object("/citations/" + id); }))
                .map(function (cits) {
                return cits.map(function (cit) { return Citation.unpack(cit); });
            }).switchMap(function (cits) {
                return cits.length === 0
                    ?
                        Observable.of(cits)
                    :
                        Observable.combineLatest(cits.map(function (cit) {
                            return _this.getRatings(cit);
                        }));
            });
    };
    //get ratings for the specified citation
    CitationService.prototype.getRatings = function (cit) {
        return this.af.database.object("/ranks_by_citation/" + cit.id).map(function (obj) {
            return Object.assign(cit, { ratings: Ratings.unpack(obj) });
        });
    };
    CitationService.prototype.getUserCitations = function (userId) {
        var _this = this;
        if (userId === void 0) { userId = ""; }
        if (!this.userCitations$) {
            this.userCitations$ = this.af.database.list('/citations', {
                query: {
                    orderByChild: 'user/id',
                    equalTo: userId
                }
            }).map(function (cits) {
                //console.log("User citations: "+userId);
                //console.log(cits);
                return cits.map(function (cit) { return Citation.unpack(cit); });
            }).switchMap(function (cits) {
                return cits.length === 0
                    ?
                        Observable.of(cits)
                    :
                        Observable.combineLatest(cits.map(function (cit) {
                            return _this.getRatings(cit);
                        }));
            }).publishReplay().refCount();
        }
        return this.userCitations$;
    };
    CitationService.prototype.likeCitation = function (cit) {
        var user = this.userService.getCurrentUserInfo();
        var rankType = cit.ratings.isLikedBy(user.id) ? "none" : "like";
        this.rankByUser(user.id, cit.id, rankType).catch(function (err) {
            throw new Error("Couldn't record rank by user " + err);
        });
    };
    //remove like and put dislike
    CitationService.prototype.dislikeCitation = function (cit) {
        var user = this.userService.getCurrentUserInfo();
        var rankType = cit.ratings.isDislikedBy(user.id) ? "none" : "dislike";
        this.rankByUser(user.id, cit.id, rankType).catch(function (err) {
            throw new Error("Couldn't record rank by user " + err);
        });
    };
    CitationService.prototype.rankByUser = function (userId, citId, type) {
        var rankByUserObj = this.af.database.object("/ranks_by_user/" + userId + "/" + citId).$ref;
        var rankByCitObj = this.af.database.object("/ranks_by_citation/" + citId + "/" + userId).$ref;
        if (type === "none") {
            console.log("REMOVE");
            console.log(citId + " " + userId);
            var p1 = rankByUserObj.remove();
            var p2 = rankByCitObj.remove();
            return Promise.all([p1, p2]);
        }
        else {
            console.log("LIKE");
            console.log(citId + " " + userId);
            var p1 = rankByUserObj.set((type === "like"));
            var p2 = rankByCitObj.set((type === "like"));
            return Promise.all([p1, p2]);
        }
    };
    CitationService.prototype.addCitation = function (data) {
        var _this = this;
        var user = this.userService.getCurrentUserInfo();
        var authCitation = new Citation(data.text, data.author, data.tags, user);
        var citList = this.af.database.list("/citations/");
        var p = citList.push(Citation.pack(authCitation)).then(function (cit) {
            console.log("CREATED ", cit.key);
            data.tags.forEach(function (tag) {
                console.log("TAG", tag);
                _this.af.database.object("/citations_by_tags/" + tag + "/" + cit.key).$ref.set(true);
            });
            return cit;
        }).catch(function (err) {
            _this.handleError(err);
        });
        return Observable.fromPromise(p);
    };
    CitationService.prototype.deleteCitation = function (citation) {
        var _this = this;
        this.af.database.object("/citations/" + citation.id).remove();
        citation.tags.forEach(function (tag) {
            _this.af.database.object("/citations_by_tags/" + tag + "/" + citation.id).remove();
        });
        this.af.database.list("/ranks_by_citation/" + citation.id).forEach(function (ar) {
            console.log("Deleting " + ar);
            ar.forEach(function (obj) {
                _this.af.database.object("/ranks_by_user/" + obj.$key + "/" + citation.id).remove();
                console.log(obj);
            });
            _this.af.database.object("/ranks_by_citation/" + citation.id).remove();
        });
    };
    CitationService.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        //console.error("CitationService" + errMsg); // log to //console instead
        return Observable.throw(errMsg);
    };
    CitationService = __decorate([
        Injectable(), 
        __metadata('design:paramtypes', [AngularFire, UserService])
    ], CitationService);
    return CitationService;
}());
//# sourceMappingURL=citation.service.js.map