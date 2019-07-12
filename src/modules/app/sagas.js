import { all } from 'redux-saga/effects';
import { saga as appSaga } from './appSaga';
// single entry point to start all Sagas at once
export default function* saga() {
  yield all([appSaga()]);
}
