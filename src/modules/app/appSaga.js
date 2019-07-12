// eslint-disable-next-line
import { fork, all, put, takeEvery, delay } from 'redux-saga/effects';
// eslint-disable-next-line
import { REMOTE_UPLOAD, LOCAL_RESET, LOCAL_UPLOAD } from './actionTypes';

export function* saga() {
  yield takeEvery(REMOTE_UPLOAD.ACTION, remoteUpload);
  yield takeEvery(LOCAL_UPLOAD.ACTION, localUpload);
}

/**
 * Delays 1 second before decrementing the counter
 * @param {*} action
 */
export function* remoteUpload(action) {
  try {
    yield put({ type: LOCAL_RESET });
    const remoteLength = action.remoteFilesLength;
    const length = action.files.length;
    let forks = [];
    for (let i = 0; i < length; i++) {
      let file = action.files[i];
      let index = i + remoteLength;
      forks.push(fork(remoteUploadHelper, file, index));
    }
    yield all(forks);
  } catch (error) {
    yield put({ type: REMOTE_UPLOAD.ERROR });
  }
}

function* remoteUploadHelper(file, index) {
  try {
    yield put({ type: REMOTE_UPLOAD.PENDING, file, index });
    yield delay(500); // REPLACE THIS WITH API CALL
    // REPLACE fake: true with API CALL RETURN
    yield put({ type: REMOTE_UPLOAD.SUCCESS, file, index, fake: false });
  } catch {
    yield put({ type: REMOTE_UPLOAD.ERROR, file, index });
  }
}

/**
 * Delays 1 second before decrementing the counter
 * @param {*} action
 */
export function* localUpload(action) {
  try {
    console.log(action);
    const remoteLength = action.localFilesLength;
    const length = action.files.length;
    let forks = [];
    for (let i = 0; i < length; i++) {
      let file = action.files[i];
      let index = i + remoteLength;
      forks.push(fork(localUploadHelper, file, index));
    }
    yield all(forks);
  } catch (error) {
    yield put({ type: LOCAL_UPLOAD.ERROR });
  }
}

function* localUploadHelper(file, index) {
  try {
    yield put({ type: LOCAL_UPLOAD.PENDING, file, index });
    yield delay(500); // REPLACE THIS WITH API CALL
    // REPLACE fake: true with API CALL RETURN
    let fake = false;
    if (index === 2 || index === 3 || index === 5 || index === 8) fake = true;
    yield put({ type: LOCAL_UPLOAD.SUCCESS, file, index, fake });
  } catch {
    yield put({ type: LOCAL_UPLOAD.ERROR, file, index });
  }
}
