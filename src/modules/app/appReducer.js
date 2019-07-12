import {
  LOCAL_DELETE,
  LOCAL_UPLOAD,
  SET_ARROW_DIRECTION,
  REMOTE_UPLOAD,
  LOCAL_RESET
} from './actionTypes';

const initialState = {
  localFiles: [],
  remoteFiles: [],
  arrowDirection: true
};

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ARROW_DIRECTION:
      return { ...state, arrowDirection: action.value };
    case LOCAL_UPLOAD.SUCCESS:
      const local1 = [...state.localFiles];
      local1.push({ file: action.file, loading: false, fake: action.fake });
      return {
        ...state,
        localFiles: local1
      };
    case LOCAL_DELETE:
      return {
        ...state,
        localFiles: [
          ...state.localFiles.slice(0, action.index),
          ...state.localFiles.slice(action.index + 1)
        ]
      };
    case LOCAL_RESET:
      return {
        ...state,
        localFiles: []
      };
    case REMOTE_UPLOAD:
      let newRemoteFiles = [...state.remoteFiles, ...action.files];
      return {
        ...state,
        localFiles: [],
        remoteFiles: newRemoteFiles
      };
    default:
      return state;
  }
}
