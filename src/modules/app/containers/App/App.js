import React, { Component } from 'react';
import './App.scss';
import { connect } from 'react-redux';
import { localUpload, localDelete, setArrowDirection, remoteUpload } from '../../actions';
import { getLocalFiles, getRemoteFiles, getArrowDirection } from '../../selectors';
import LeftSide from '../Left/Left';
import RightSide from '../Right/Right';

class App extends Component {
  state = {};

  render() {
    return (
      <div className="app">
        <div className="app__left-side">
          <LeftSide
            localFiles={this.props.localFiles}
            localUpload={this.props.localUpload}
            localDelete={this.props.localDelete}
            arrowDirection={this.props.arrowDirection}
            setArrowDirection={this.props.setArrowDirection}
            remoteUpload={this.props.remoteUpload}
            remoteFiles={this.props.remoteFiles}
          />
        </div>
        <div className="app__right-side">
          <RightSide remoteFiles={this.props.remoteFiles} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    localFiles: getLocalFiles(state),
    remoteFiles: getRemoteFiles(state),
    arrowDirection: getArrowDirection(state)
  };
}

export default connect(
  mapStateToProps,
  { localUpload, localDelete, setArrowDirection, remoteUpload }
)(App);
