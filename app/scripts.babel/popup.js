'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {autoResize: false}
    const self = this
    chrome.storage.local.get('autoResize', ({autoResize}) => {
      self.setState({autoResize})
      chrome.browserAction.setBadgeText({text: autoResize? 'ON': ''});
    })
  }

  switchMe() {
    const autoResize = !this.state.autoResize
    const self = this
    chrome.storage.local.set({autoResize}, () => {
      self.setState({autoResize})
      chrome.browserAction.setBadgeText({text: autoResize? 'ON': ''});
    })
  }

  render() {
    const auto = this.state.autoResize
    const style = {color: auto? '#00FF00':'gray', fontSize: '3em'}
    return (
      <h1 style={style} onClick={() => this.switchMe()}>
        {auto? '🔴':'⚪'}
      </h1>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('popup')
)
