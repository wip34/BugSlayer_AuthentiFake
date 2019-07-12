import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import '../App/App.scss';
import PreviewCard from '../../components/PreviewCard/PreviewCard';
import { FiChevronDown, FiChevronUp, FiAlertCircle } from 'react-icons/fi';
class LeftSide extends Component {
  state = {
    modal: false
  };

  handleSubmit = () => {
    this.setState({ modal: false });
    this.props.remoteUpload(this.props.localFiles);
  };

  renderCards = () => {
    let { localFiles } = this.props;
    return localFiles.map((file, index) => {
      if (file) {
        return <PreviewCard key={index} index={index} file={file} deleteCard={this.deleteCard} />;
      }
      return null;
    });
  };

  renderArrow = () => {
    let { localFiles } = this.props;
    if (localFiles.length > 10) {
      return (
        <div className="app__preview-arrow">
          {this.props.arrowDirection ? <FiChevronDown /> : <FiChevronUp />}
        </div>
      );
    }
    return null;
  };

  deleteCard = index => {
    this.props.localDelete(index);
  };

  render() {
    return (
      <React.Fragment>
        {this.state.modal ? (
          <div className="modal">
            <div className="modal__content-wrapper">
              <div className="modal__content">
                <div className="modal__header">Warning</div>
                <div className="modal__description">
                  You are uploading fake images, are you sure you want to continue?
                </div>
              </div>
              <div className="modal__choices">
                <div onClick={() => this.handleSubmit()} className="choice choice-left">
                  Yes
                </div>
                <div
                  onClick={() => this.setState({ modal: false })}
                  className="choice choice-right"
                >
                  No
                </div>
              </div>
            </div>
          </div>
        ) : null}
        <div className="app__header">AuthentiFake</div>
        <Dropzone
          accept=".jpeg,.jpg,.png"
          onDrop={acceptedFiles => this.props.localUpload(acceptedFiles, acceptedFiles.length)}
        >
          {({ getRootProps, getInputProps, isDragActive }) => (
            <div className="app__dropzone" {...getRootProps()}>
              <input {...getInputProps()} />
              {isDragActive ? (
                <div className="dropText">
                  <span>Drop files here...</span>
                </div>
              ) : (
                <div className="dropText">
                  <span>Drop files here, or click to select files to upload</span>
                </div>
              )}
            </div>
          )}
        </Dropzone>
        {this.props.localFiles.length ? (
          <div className="app__warning">
            <span>This icon </span>
            <FiAlertCircle className="warning" />
            <span> indicates that an image is fake. </span>
          </div>
        ) : null}
        <div className="app__preview-container">
          <div
            ref={node => {
              this.preview = node;
            }}
            className="app__preview"
          >
            {this.renderCards()}
          </div>
        </div>
        <div />
        <div className="app__preview-arrow-container">{this.renderArrow()}</div>
        {this.props.localFiles.length ? (
          <div className="app__upload">
            <div className="app__upload-button" onClick={() => this.setState({ modal: true })}>
              Upload
            </div>
          </div>
        ) : null}
      </React.Fragment>
    );
  }
}

export default LeftSide;
