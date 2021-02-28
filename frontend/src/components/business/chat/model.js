export class MessageModel {
  author = '';
  recipient = '';
  text = '';
  constructor({ author, recipient, text }) {
    this.author = author;
    this.recipient = recipient;
    this.text = text;
  }
}
