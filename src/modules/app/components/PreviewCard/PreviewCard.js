import React, { Component } from 'react';
import { FiX, FiAlertCircle } from 'react-icons/fi';
import './PreviewCard.scss';

class PreviewCard extends Component {
  state = {};
  render() {
    let { index, deleteCard, file } = this.props;
    file = file.file;
    let fake = this.props.file.fake;
    return (
      <div className="app__preview-cell">
        <img className="app__preview-image" src={URL.createObjectURL(file)} alt="uploaded" />
        <FiX onClick={() => deleteCard(index)} className="app__preview-icon" />
        {fake ? <FiAlertCircle className="app__preview-warning" /> : null}
        <div className="app__preview-text">{file.name}</div>
      </div>
    );
  }
}

export default PreviewCard;
