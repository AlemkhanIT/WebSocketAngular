import { RxStompService } from './rx-stomp.service';
import { RxStompConfig } from '@stomp/rx-stomp';

export function rxStompServiceFactory() {
  const rxStomp = new RxStompService();
  rxStomp.configure({
    brokerURL: 'ws://localhost:8080/ws',
    connectHeaders: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyMiIsImlzcyI6ImFsZW1raGFuIiwicm9sZSI6IlJPTEVfVVNFUiIsImlhdCI6MTcxNDEyMTAwMiwiZXhwIjoxNzE0MjA3NDAyfQ.HKrZYFcKIqbMpYZjkrQsxCp4vx-nlniBpY4e_dQvNcc`
    },
    heartbeatIncoming: 0,
    heartbeatOutgoing: 20000,
    reconnectDelay: 200,
    debug: (msg: string): void => {
      console.log(new Date(), msg);
    },
  });
  rxStomp.activate();
  return rxStomp;
}
