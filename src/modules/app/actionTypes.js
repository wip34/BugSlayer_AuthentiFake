// Example to copy and paste from
import { defineAction } from 'redux-define';
import { NAME } from './constants';
import { CANCELLED, ERROR, PENDING, SUCCESS } from './stateConstants';

export const SET_ARROW_DIRECTION = defineAction('SET_ARROW_DIRECTION', [], NAME);

export const LOCAL_UPLOAD = defineAction(
  'LOCAL_UPLOAD',
  [CANCELLED, ERROR, PENDING, SUCCESS],
  NAME
);

export const LOCAL_DELETE = defineAction('LOCAL_DELETE', [], NAME);

export const LOCAL_RESET = defineAction('LOCAL_DELETE', [], NAME);

export const REMOTE_UPLOAD = defineAction(
  'REMOTE_UPLOAD',
  [CANCELLED, ERROR, PENDING, SUCCESS],
  NAME
);
