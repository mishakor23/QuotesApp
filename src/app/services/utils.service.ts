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
    return this.messages$.asObservable();
  }

  pushMessage(msg:string):void
  {
    this.messages$.next(msg);
  }

  onDialog():Observable<string>
  {
    return this.dialog$.asObservable();
  }

  openDialog(dialog:string):void
  {
    this.dialog$.next(dialog);
  }
}
