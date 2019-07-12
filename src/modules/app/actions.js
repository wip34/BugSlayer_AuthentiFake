import { LOCAL_UPLOAD, LOCAL_DELETE, SET_ARROW_DIRECTION, REMOTE_UPLOAD } from './actionTypes';

export function localUpload(files, localFilesLength) {
  return {
    type: LOCAL_UPLOAD.ACTION,
    files,
    localFilesLength
  };
}

export function localDelete(index) {
  return {
    type: LOCAL_DELETE,
    index
  };
}

export function remoteUpload(files) {
  return {
    type: REMOTE_UPLOAD,
    files
  };
}

export function setArrowDirection(value) {
  return {
    type: SET_ARROW_DIRECTION,
    value
  };
}
