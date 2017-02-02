/**
 * Created by baunov on 06/01/17.
 */
import {UserBasicInfo} from './userBasicInfo';

export class Ratings
{
  //public static curId = 0;

  //TODO store likes and dislikes

  public likes:Set<string> = new Set();
  public dislikes:Set<string> = new Set();


  constructor(likesAr = ["dummy"], dislikesAr = ["dummy"])
  {
    likesAr.forEach((like) => {
      this.likes.add(like);
    });
    dislikesAr.forEach((dislike) => {
      this.dislikes.add(dislike);
    });
  }

  public getRank():number
  {
    return this.likes.size - this.dislikes.size;
  }

  public isLikedBy(userId:string):boolean
  {
    return this.likes.has(userId);
  }

  public isDislikedBy(userId:string):boolean
  {
    return this.dislikes.has(userId);
  }

  public isRatedBy(userId:string):boolean
  {
    return this.isLikedBy(userId) || this.isDislikedBy(userId);
  }

  //remove like, put dislike
  public dislike(user:UserBasicInfo)
  {
    if(this.dislikes.has(user.id))
    {
      this.unvote(user);
      return;
    }
    this.likes.delete(user.id);
    this.dislikes.add(user.id);
  }

  public like(user:UserBasicInfo)
  {
    if(this.likes.has(user.id))
    {
      this.unvote(user);
      return;
    }
    this.dislikes.delete(user.id);
    this.likes.add(user.id);
  }

  public unvote(user:UserBasicInfo)
  {
    this.likes.delete(user.id);
    this.dislikes.delete(user.id);
  }

  public static pack(rating:Ratings):Object
  {
    let obj:Object = {};

    rating.likes.forEach(like => {
      obj[like] = true;
    });
    rating.dislikes.forEach(dislike => {
      obj[dislike] = false;
    });

    return obj;
  }

  /*public static unpack(obj:Object):Ratings
  {
    if(!obj) return new Ratings();
    let likes:UserBasicInfo[] = obj["likes"];
    let dislikes:UserBasicInfo[] = obj["dislikes"];
    return new Ratings(likes, dislikes);
  }*/

  public static unpack(obj:Object):Ratings
  {
    //console.log("OBJECT");
    //console.log(obj);
    let ratings = new Ratings();
    if(!obj) return ratings;

    for (const key of Object.keys(obj)) {
      if(obj[key] == true)
      {
        ratings.likes.add(key);
      }
      else if(obj[key] === false){
        ratings.dislikes.add(key);
      }
    }
    return ratings;
  }

}
