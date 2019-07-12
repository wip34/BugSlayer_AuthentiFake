import React, { Component } from 'react';
import './RemoteCard.scss';
import Loading from '../../../../svg/loading.svg';
import { FiAlertCircle } from 'react-icons/fi';
class RemoteCard extends Component {
  state = {
    expanded: false
  };

  handleClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    let { file, loading, fake } = this.props.obj;
    let fakeContent = null;

    if (!loading && fake) {
      let expandedClasses = [
        'app__remote-image_fake',
        'app__remote-image_fake-icon',
        'app__remote-image_fake-content'
      ];
      if (this.state.expanded)
        expandedClasses = [
          'app__remote-image_fake expanded',
          'app__remote-image_fake-icon expanded',
          'app__remote-image_fake-content expanded'
        ];
      fakeContent = (
        <React.Fragment>
          <div className={expandedClasses[0]}>
            <div className={expandedClasses[1]}>
              <FiAlertCircle onClick={() => this.handleClick()} />
            </div>
          </div>
        </React.Fragment>
      );
    }
    return (
      <div className="app__remote">
        <div className="app__remote-image">
          {loading ? (
            <img className="app__remote-image_loading" src={Loading} alt="Loading" />
          ) : (
            <img
              className="app__remote-image_loaded"
              src={URL.createObjectURL(file)}
              alt="Uploaded"
            />
          )}
          {fakeContent}
        </div>
        <div className="app__remote-footer">
          <div>{file.name}</div>
        </div>
      </div>
    );
  }
}

export default RemoteCard;
