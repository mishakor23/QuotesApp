import {User} from "./user";
import {UserBasicInfo} from './userBasicInfo';
import {Ratings} from './ratings';
import * as _ from "lodash";
/**
 * Created by baunov on 14/10/16.
 */
export class Citation
{
  //public static curId = 0;
  public id:string = "";
  public views = 0;

  constructor(public text:String = "",
              public author:String = "Unknown",
              public tags:Array<String> = [],
              public user:UserBasicInfo = new UserBasicInfo("Anonymous"),
              private _ratings:Ratings = new Ratings(),
              public date_published:number = Date.now())
  {
    //this._id = String(Citation.curId);
    //Citation.curId++;
  }


  public set ratings(val:Ratings)
  {
    if(!this._ratings) return;
    this._ratings = val;
  }

  public get ratings():Ratings{
    return this._ratings;
  }


  public static pack(cit:Citation):Object
  {
    return _.pick(cit, ["text", "author", "tags", "user", "date_published"]);
  }

  public static unpack(obj:Object):Citation
  {
    if(!obj || obj["user"] == null) return new Citation("Processing..");

    let user = new UserBasicInfo(obj["user"].id, obj["user"].username, obj["user"].email);
    let ratings = new Ratings();

    let cit = new Citation(
      obj["text"],
      obj["author"],
      obj["tags"],
      user,
      ratings,
      obj["date_published"]
    );

    cit.id = obj["$key"];
    //console.log(obj);
    return cit;
  }

}
