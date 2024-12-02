import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DialogRegisterService {

  public onAccept = new EventEmitter<void>();
  constructor() { }
}
