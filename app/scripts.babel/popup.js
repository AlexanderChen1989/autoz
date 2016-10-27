'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {autoResize: false, zoom: 100}
    const self = this
    chrome.storage.local.get(null, ({zoom, autoResize}) => {
      if (!zoom) {
        zoom = 100
      }
      self.setState({autoResize, zoom})
      chrome.browserAction.setBadgeText({text: autoResize ? 'ON' : ''});
    })
  }

  switchMe() {
    let {autoResize, zoom} = this.state
    autoResize = !autoResize
    const self = this
    chrome.storage.local.set({zoom, autoResize}, () => {
      self.setState({zoom, autoResize})
      chrome.browserAction.setBadgeText({text: autoResize ? 'ON' : ''});
    })
  }

  resetZoom() {
    let {zoom, autoResize} = this.state
    zoom = 100
    const self = this
    chrome.storage.local.set({zoom, autoResize}, () => {
      self.setState({zoom, autoResize})
    })
  }


  incrZoom() {
    let {zoom, autoResize} = this.state
    zoom += 10
    const self = this
    chrome.storage.local.set({zoom, autoResize}, () => {
      self.setState({zoom, autoResize})
    })
  }

  decrZoom() {
    let {zoom, autoResize} = this.state
    zoom -= 10
    const self = this
    chrome.storage.local.set({zoom, autoResize}, () => {
      self.setState({zoom, autoResize})
    })
  }


  render() {
    const {autoResize, zoom} = this.state
    if (autoResize) {
      chrome.tabs.executeScript({code: `document.body.parentElement.style.zoom = '${zoom}%'`})
    } else {
      chrome.tabs.executeScript({code: 'document.body.parentElement.style.zoom = \'100%\''})
    }

    return (
      <div>
        <div className="switch">
          <a className={autoResize ? 'on' : 'off'} onClick={() => this.switchMe()}>
            {autoResize ? 'No' : 'Off'}
          </a>
        </div>
        <h1>{zoom}%</h1>
        <div className="zoom">
          <button onClick={() => this.resetZoom()}>=</button>
          &nbsp;
          <button onClick={() => this.decrZoom()}>-</button>
          &nbsp;
          <button onClick={() => this.incrZoom()}>+</button>
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('popup')
)
