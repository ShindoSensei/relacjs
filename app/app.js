/* global io */
import React from 'react'
import ReactDOM from 'react-dom'
import {StatusLabel} from './statuslabel'
import {Form} from './form'
import {Chat} from './chat'

const socket = io(window.location.host)

class App extends React.Component {
  constructor () {
    super()
    this.state = {
      userName: '',
      connectedNames: ''
    }
  }

  setName (name) {
    this.setState({
      userName: name
    })
  }

  displayUsers (connections) {
    var names = ''
    for (var i = 0; i < connections.length; i++) {
      if (connections[i].user) {
        if (i > 0 & names !== '') {
          names += ', '
        }
        names += connections[i].user.name
      }
    }
    this.setState({
      connectedNames: names
    })
  }
  componentDidMount () {
    socket.on('online', this.displayUsers.bind(this))
  }
  // socket.on('online', function (connections) {
  //   var names = ''
  //   console.log('Connections: ', connections)
  //   for (var i = 0; i < connections.length; ++i) {
  //     if (connections[i].user) {
  //       if (i > 0) {
  //         if (i === connections.length - 1) names += ' and '
  //         else names += ', '
  //       }
  //       names += connections[i].user.name
  //     }
  //   }
  //   $('#connected').text(names)
  // })

  render () {
    return (
      <div className='container'>
        <h1>Relac.js<StatusLabel socket={socket} /></h1>
        <main className='panel panel-default'>
          <div className='panel-heading'>
            <div>Connected: </div>
            <div><b>{this.state.connectedNames}</b></div>
            <br />
            <Form socket={socket} setName={this.setName.bind(this)} />
          </div>
          <section className='panel-body'>
            <Chat socket={socket} user={this.state.userName} />
          </section>
        </main>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
