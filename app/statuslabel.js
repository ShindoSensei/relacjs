import React from 'react'

export class StatusLabel extends React.Component {
  constructor () {
    super()
    this.state = {
      status: 'disconnected',
      labelClass: 'label label-danger'
    }
  }

  // On socket connect, change label to success and display connected
  connectStatus () {
    this.setState({
      status: 'connected',
      labelClass: 'label label-success'
    })
  }

  // On socket disconnect, change label to alert and display disconnected
  disconnectStatus () {
    this.setState({
      status: 'disconnected',
      labelClass: 'label label-danger'
    })
  }

  componentDidMount () {
    // console.log(this.props.socket)
    this.props.socket.on('connect', this.connectStatus.bind(this))
    this.props.socket.on('disconnect', this.disconnectStatus.bind(this))
  }

  render () {
    return (
      <span id='status' className={this.state.labelClass}>{this.state.status}</span>
    )
  }
}

StatusLabel.propTypes = {
  socket: React.PropTypes.object
}
