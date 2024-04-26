import { Component, OnDestroy, OnInit } from '@angular/core';
import { RxStompService } from '../rx-stomp.service';
import { Message } from '@stomp/stompjs';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit, OnDestroy {
  receivedMessages: string[] = [];
  //@ts-ignore
  private topicSubscription: Subscription;

  constructor(private rxStompService: RxStompService) {}

  ngOnInit() {
    this.topicSubscription = this.rxStompService
      .watch('/user/topic')
      .subscribe((message: Message) => {
        this.receivedMessages.push(message.body);
      });
  }

  ngOnDestroy() {
    this.topicSubscription.unsubscribe();
  }

  onSendMessage() {
    const toUsername = 'user1';
    const messageContent = 'hello';
    const fromUsername = 'user2';

    const message = {
      to: toUsername,
      message: messageContent,
      from: fromUsername
    };
    this.rxStompService.publish({ destination: '/app/chat', body: JSON.stringify(message) });
  }
}
