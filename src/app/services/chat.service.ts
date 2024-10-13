import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import * as WebSocket from 'nativescript-websockets'

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket: WebSocket
  messages = new BehaviorSubject<string[]>([])

  constructor() {
    this.socket = new WebSocket('wss://your-websocket-server-url')
    this.socket.on('message', this.handleMessage.bind(this))
  }

  private handleMessage(message: string) {
    const currentMessages = this.messages.value
    this.messages.next([...currentMessages, message])
  }

  sendMessage(message: string) {
    this.socket.send(message)
  }
}