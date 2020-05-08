import {filter, map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Subject, Subscription} from 'rxjs';


interface Message {
  type: string;
  payload: any;
}

type MessageCallback = (payload: any) => void;

@Injectable({
  providedIn: 'root',
})
export class BroadcastMessageService {
  private handler = new Subject<Message>();

  broadcast(type: string, payload: any) {
    this.handler.next({type, payload});
  }

  subscribe(type: string, callback: MessageCallback): Subscription {
    return this.handler.pipe(
      filter(message => message.type === type),
      map(message => message.payload),)
      .subscribe(callback);
  }
}
