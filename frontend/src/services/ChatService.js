import io from 'socket.io-client';
export default class ChatService {
  socket;
  me;
  gotName;
  gotNamePromise = new Promise((res)=>{
    this.gotName = res;
  });
  constructor(url) {
    this.socket = io(url, {
      reconnection: true
    });
    this.socket.on('disconnect', () => {
      console.log(this.socket.id);
    });
    this.socket.on('connect', () => {
      console.log('Socket connected');
    });
    this.socket.on('connect_error', i => {
      console.log(i);
    });
  }

  named(){
    return this.gotNamePromise;
  }

  getMe() {
    return this.me;
  }

  getDialog(recipient) {
    // eslint-disable-next-line no-unused-vars
    return new Promise((res, rej) => {
      this.socket.emit('dialog', [this.me.name, recipient], dialog => {
        console.log({ dialog });
        res(dialog);
      });
    });
  }

  sendMessage({ text, recipient }) {
    const message = {
      author: this.me.name,
      recipient,
      text,
      timestamp: Date.now()
    };
    this.socket.emit('message', message);
  }


  subscribeOnMessages(sub) {
      this.socket.on(this.me.name, message => {
        if (
          message.recipient === this.me.name || 
          message.author === this.me.name 
        ) {
          console.log("got message "+this.me.name)
          sub(message);
        }
      });
    
  }

  getUsers() {
    // eslint-disable-next-line no-unused-vars
    return new Promise((res, rej) => {
      this.socket.emit('users', null, ({ users, user }) => {
        console.log('Users:', users);

        this.users = users.filter(u => u.name != user.name);
        this.me = user;
        this.gotName();
        console.log({ user });
        res(this.users);
      });
    });
  }

  async subscribeOnUsers(sub) {
    this.socket.on('users', users => {
      if (this.me) {
        sub(users.filter(u => u.name != this.me.name));
      }
    });
    return await this.getUsers();
  }
}
