import { Injectable } from '@angular/core';
import {Citation} from "../models/citation";
import 'rxjs/Rx';
import {Observable} from 'rxjs/Rx';
import {User} from "../models/user";
import {AngularFire} from 'angularfire2';
import {AuthService} from './auth.service';
import {UserBasicInfo} from '../models/userBasicInfo';
import {Ratings} from '../models/ratings';
import {CitationData} from '../models/citationData';

@Injectable()
export class CitationService {

  //TODO refactor to CitationNavigationService
  //stream of next ids to be loaded once nextStream emits

  private allCitations$:Observable<Citation[]>;
  private userCitations$:Observable<Citation[]>;
  private userFavourites$:Observable<Citation[]>;

  private tagCitations$:Observable<Citation[]>;

  private feedCitations$:Observable<Citation[]>;

  private lastUserId:string = "none";

  constructor(private af:AngularFire) {

  }

  public getCitationsByTag(tag:string, limit:number = 10):Observable<Citation[]>
  {
    this.tagCitations$ = this.af.database.list(`/citations_by_tags/${tag}`, {
      query: {
        limitToFirst: limit
      }
    }).map( (cits:any[]) => {
      return cits.map(cit => cit.$key)
    }).switchMap((ids: string[]) => {
      return this.getCitationsByIds(ids);
    }).publishReplay(1).refCount();
    return this.tagCitations$;
  }

  public getAllCitations(limit:number = 100):Observable<Citation[]>
  {
    if(!this.allCitations$)
    {
      this.allCitations$ = this.af.database.list("/citations/", {
        query: {
          limitToFirst: limit
        }
      }).map( (cits) => {
        return cits.map(cit => {
          return Citation.unpack(cit);
        })
      }).switchMap( (cits:Citation[]) => {
        return cits.length === 0
          ?
          Observable.of(cits)
          :
          Observable.combineLatest(cits.map(cit => {
            return this.getRatings(cit);
          }));
      }).map((cits:Citation[]) => {
        return cits.sort((cit1, cit2) => (cit1.date_published < cit2.date_published)?1:-1);
      }).publishReplay(1).refCount();
    }
    return this.allCitations$;
  }

  getCitationById(id:string):Observable<Citation>
  {
    return this.af.database.object('/citations/'+id).map( (data) => {
      return data as Citation;
    }, (err) => {
      this.handleError(err);
    });
  }

  getFeed():Observable<Citation[]>
  {
    if(!AuthService.AUTH_USER) return;
    if(!this.feedCitations$)
    {
      this.feedCitations$ = this.af.database.list(`/feeds/${AuthService.AUTH_USER.id}`)
          .do(console.log)
          .map(objs => {
            return objs.map(obj => obj.$key)
          }).switchMap( (ids) => {
            return this.getCitationsByIds(ids);
          }).map((cits:Citation[]) => {
            return cits.sort((cit1, cit2) => (cit1.date_published < cit2.date_published)?1:-1);
          }).publishReplay(1).refCount();
    }

    return this.feedCitations$;

  }

  getUserFavourites(userId = ""):Observable<Citation[]>
  {
    if(!this.userFavourites$)
    {
      this.userFavourites$ = this.af.database.list('/ranks_by_user/'+userId, {
        query: {
          limitToFirst: 50
        }
      }).map((ranks: any[]) => {
          return ranks.filter((rank) => rank.$value === true); //likes only
        }
      ).map( (likes:any[]) => {
        return likes.map(like => like.$key)
      }).switchMap((ids: string[]) => {
        return this.getCitationsByIds(ids);
      }).publishReplay(1).refCount()
    }
    return this.userFavourites$;
  }

  getCitationsByIds(ids:string[]):Observable<Citation[]>
  {
    return ids.length === 0 ?
      Observable.of([]) :
      Observable.combineLatest(
        ids.map(id => this.af.database.object("/citations/" + id)))
        .map( (cits) => {
      return cits.map(cit => Citation.unpack(cit));
    }).switchMap( (cits:Citation[]) => {
        return cits.length === 0
          ?
          Observable.of(cits)
          :
          Observable.combineLatest(cits.map(cit => {
            return this.getRatings(cit);
          }));
    });

  }

  //get ratings for the specified citation
  getRatings(cit:Citation):Observable<Citation>
  {
    return this.af.database.object("/ranks_by_citation/"+ cit.id).map((obj) => {

      return Object.assign(cit, {ratings: Ratings.unpack(obj)});
    });

  }

  getUserCitations(userId = ""):Observable<Citation[]>
  {
    if(!this.userCitations$ || userId !== this.lastUserId)
    {
      this.userCitations$ = this.af.database.list('/citations', {
        query: {
          orderByChild: 'user/id',
          equalTo: userId
        }
      }).map( (cits) => {
        //console.log("User citations: "+userId);
        //console.log(cits);
        return cits.map(cit => Citation.unpack(cit));
      }).switchMap( (cits:Citation[]) => {
        return cits.length === 0
          ?
          Observable.of(cits)
          :
          Observable.combineLatest(cits.map(cit => {
            return this.getRatings(cit);
          }));
      }).map((cits:Citation[]) => {
        return cits.sort((cit1, cit2) => (cit1.date_published < cit2.date_published)?1:-1);
      }).publishReplay().refCount();
      this.lastUserId = userId;
    }
    return this.userCitations$;
  }

  likeCitation(cit:Citation):void
  {
    let user:UserBasicInfo = AuthService.AUTH_USER;
    let rankType:string = cit.ratings.isLikedBy(user.id)?"none":"like";

    let deltaRank:number = 1;
    if(cit.ratings.isLikedBy(user.id)) deltaRank = -1;
    else if(cit.ratings.isDislikedBy(user.id)) deltaRank = 2;
    this.updateUserRank(cit.user.id, deltaRank);

    this.rankByUser(user.id, cit.id, rankType).catch(err => {
      throw new Error("Couldn't record rank by user "+err);
    });
  }

  //remove like and put dislike
  dislikeCitation(cit:Citation):void
  {
    let user:UserBasicInfo = AuthService.AUTH_USER;
    let rankType:string = cit.ratings.isDislikedBy(user.id)?"none":"dislike";

    let deltaRank:number = -1;
    if(cit.ratings.isLikedBy(user.id)) deltaRank = -2;
    else if(cit.ratings.isDislikedBy(user.id)) deltaRank = 1;
    this.updateUserRank(cit.user.id, deltaRank);

    this.rankByUser(user.id, cit.id, rankType).catch(err => {
      throw new Error("Couldn't record rank by user "+err);
    });
  }

  private rankByUser(userId:string, citId:string, type:string):firebase.Promise<any>
  {
    const rankByUserObj = this.af.database.object("/ranks_by_user/"+ userId+"/"+citId).$ref;
    const rankByCitObj = this.af.database.object("/ranks_by_citation/"+ citId+"/"+userId).$ref;
    if(type === "none")
    {
      //console.log("REMOVE");
      //console.log(citId + " " + userId);
      let p1 = rankByUserObj.remove();
      let p2 = rankByCitObj.remove();
      return Promise.all([p1, p2]);
    }
    else
    {
      //console.log("LIKE");
      //console.log(citId + " " + userId);
      let p1 = rankByUserObj.set( (type === "like") );
      let p2 = rankByCitObj.set( (type === "like") );
      return Promise.all([p1, p2]);
    }
  }

  private updateUserRank(userId:string, delta:number):firebase.Promise<any>
  {
    return this.af.database.object(`/users/${userId}`).$ref.transaction( (user:User) => {
      if(!user) return;
      user.rank += delta;
      return user;
    });
  }

  addCitation(data:CitationData):Observable<Citation> {
    let user:UserBasicInfo = AuthService.AUTH_USER.getBasicInfo();
    let authCitation: Citation = new Citation(data.text, data.author, data.tags, user);

    const citList = this.af.database.list("/citations/");


    let p:Promise<Citation> = citList.push(Citation.pack(authCitation)).then((cit) =>
    {

      //console.log("CREATED ", cit.key);
      this.publishToFeeds(AuthService.AUTH_USER.subscribers, cit.key);
      data.tags.forEach((tag:string) => {
        //console.log("TAG", tag);
        this.af.database.object(`/citations_by_tags/${tag}/${cit.key}`).$ref.set(true);
      });
      return cit;
    }).catch((err) => {
      this.handleError(err);
    });

    return Observable.fromPromise(p);

  }

  public publishToFeeds(subs:string[], citId:string):Promise<any>
  {
    return Promise.all([ subs.forEach( (id:string) => {
      return this.af.database.object(`/feeds/${id}/${citId}`).set(true);
    })]);
  }

  deleteCitation(citation:Citation):void
  {
    this.af.database.object("/citations/"+citation.id).remove();
    citation.tags.forEach(tag => {
      this.af.database.object(`/citations_by_tags/${tag}/${citation.id}`).remove();
    });


    AuthService.AUTH_USER.subscribers.forEach(subId => {
      this.af.database.object(`/feeds/${subId}/${citation.id}`).remove();
    });

    this.af.database.list("/ranks_by_citation/"+citation.id).forEach((ar:any[]) => {
      //console.log("Deleting "+ar);
      ar.forEach(obj => {
        this.af.database.object("/ranks_by_user/"+obj.$key+"/"+citation.id).remove();
        //console.log(obj);
      });
      this.af.database.object("/ranks_by_citation/"+citation.id).remove();
    });
  }



  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    //console.error("CitationService" + errMsg); // log to //console instead
    return Observable.throw(errMsg);
  }
}
