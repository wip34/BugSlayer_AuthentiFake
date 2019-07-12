import React, { Component } from 'react';
import RemoteCard from '../../components/RemoteCard/RemoteCard';
import './Right.scss';
class RightSide extends Component {
  state = {};
  renderRemoteFiles = () => {
    return this.props.remoteFiles.map((obj, index) => {
      if (obj) {
        return <RemoteCard obj={obj} index={index} key={index} />;
      }
      return null;
    });
  };

  render() {
    return <div className="app__uploaded">{this.renderRemoteFiles()}</div>;
  }
}

export default RightSide;
