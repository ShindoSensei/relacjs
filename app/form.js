import React from 'react'

export class Form extends React.Component {
  constructor () {
    super()
    this.state = {
      user: {name: ''},
      disableUserForm: false,
      focus: true,
      display: ''
    }
    console.log(this.state.user.name)
  }

  changeFunc (e) {
    this.setState({
      user: {name: e.target.value}
    })
  }

  submitFunc (event) {
    // prevent default behaviour otherwise post action will be done
    console.log(this.state.user.name)
    event.preventDefault()
    this.props.setName(this.state.user.name)
    this.setState({
      disableUserForm: true,
      display: 'hidden'
    })
    this.props.socket.emit('join', this.state.user)
  }

  render () {
    return (
      <form onSubmit={this.submitFunc.bind(this)} className={this.state.display}>
        <fieldset>
          <input
            type='text'
            value={this.state.user.name}
            onChange={this.changeFunc.bind(this)}
            placeholder='Your name here'
            required autoFocus={this.state.focus}
            disabled={this.state.disableUserForm}
            />
          <button className='btn btn-success btn-xs' disabled={this.state.disableUserForm}>
              Join
            </button>
        </fieldset>
      </form>
    )
  }
}

Form.propTypes = {
  socket: React.PropTypes.object,
  setName: React.PropTypes.func
}
