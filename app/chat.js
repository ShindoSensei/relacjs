import React from 'react'
import {Message} from './message.js'

export class Chat extends React.Component {
  constructor () {
    super()
    this.state = {
      messages: []
    }
  }

  displayMessage (msg) {
    this.setState({
      messages: this.state.messages.concat([msg])
    })
  }

  componentDidMount () {
    this.props.socket.on('welcome', this.displayMessage.bind(this))
    this.props.socket.on('joined', this.displayMessage.bind(this))
    this.props.socket.on('chat', this.displayMessage.bind(this))
    this.props.socket.on('left', this.displayMessage.bind(this))
  }

  render () {
    let messageItems = this.state.messages.map(function (msg, index) {
      return (<p key={index}>{msg}</p>)
    })
    return (
      <div>
        <div className='text-center chatWindow'>
          <div className='messageDis'>
            {messageItems}
          </div>
        </div>
        <div>
          <Message socket={this.props.socket} sendMsg={this.displayMessage.bind(this)} userName={this.props.user} />
        </div>
      </div>
    )
  }

}

Chat.propTypes = {
  socket: React.PropTypes.object,
  user: React.PropTypes.string
}
