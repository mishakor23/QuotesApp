/**
 * Created by baunov on 14/10/16.
 */
import * as _ from "lodash";
import {UserBasicInfo} from './userBasicInfo';
export class User
{

  constructor(public id = "",
              public username = "",
              public email = "",
              public rank = 0,
              public subscribers: string[] = []
  ){
    //this._id = String(User.curId);
    //User.curId++;
  }

  public static pack(user:User):Object
  {
    return _.pick(user, ["username", "email", "rank", "subscribers"]);
  }

  public static unpack(data:Object):Object
  {
    let subs = [];
    if(data["subscribers"])
    {
      for (const key of Object.keys(data["subscribers"])) {
        subs.push(key);
      }
    }
    return new User(data["$key"], data["username"], data["email"], data["rank"], subs);
  }

  public getBasicInfo():UserBasicInfo
  {
    return new UserBasicInfo(this.id, this.username, this.email);
  }
}
