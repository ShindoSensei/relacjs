import React from 'react'

export class Message extends React.Component {
  constructor () {
    super()
    this.state = {
      disableMessage: true,
      typedMessage: ''
    }
  }

  submitMessage (e) {
    e.preventDefault()
    let msgWithUser = this.props.userName + ': ' + this.state.typedMessage
    this.props.sendMsg(msgWithUser) // to send to parent to render on own screen
    this.props.socket.emit('chat', this.state.typedMessage)// to send to other users
    this.setState({
      typedMessage: ''
    })
  }

  typeFunc (e) {
    this.setState({
      typedMessage: e.target.value
    })
  }

  allowMsg () {
    this.setState({
      disableMessage: false
    })
    this.messageInput.focus() // using ref special attribute
  }

  componentDidMount () {
    // listening for 'welcome' event from server
    this.props.socket.on('welcome', this.allowMsg.bind(this))
  }

  // this.props.sendMsg(valueofinputmessage)

  render () {
    return (
      <form onSubmit={this.submitMessage.bind(this)} id='messageForm' className={this.state.display}>
        <fieldset>
          <input
            type='text'
            ref={(input) => { this.messageInput = input }}
            value={this.state.typedMessage}
            onChange={this.typeFunc.bind(this)}
            placeholder='Your message here'
            required
            disabled={this.state.disableMessage}
            className='messageBox'
            />
          <button className='btn btn-success btn-m' disabled={this.state.disableMessage}>
            Send
          </button>
        </fieldset>
      </form>
    )
  }
}

Message.propTypes = {
  socket: React.PropTypes.object,
  userName: React.PropTypes.string,
  sendMsg: React.PropTypes.func
}
