import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable()
export class UtilsService {

  public static LOGIN:string = "login";
  public static REGISTER:string = "register";
  public static CITATION:string = "citation";

  private messages$:Subject<string> = new Subject();
  private dialog$:Subject<string> = new Subject();
  constructor() { }

  onMessage():Observable<string>
  {
    return this.messages$;
  }

  pushMessage(msg:string):void
  {
    this.messages$.next(msg);
  }

  onDialog():Observable<string>
  {
    return this.dialog$;
  }

  openDialog(dialog:string):void
  {
    this.dialog$.next(dialog);
  }

  public static handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
