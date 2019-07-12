import { NAME } from './constants';

export const getLocalFiles = state => {
  const moduleName = NAME;
  const appState = state[moduleName];
  if (!appState) {
    return [];
  }

  return appState.localFiles;
};

export const getRemoteFiles = state => {
  const moduleName = NAME;
  const appState = state[moduleName];
  if (!appState) {
    return [];
  }

  return appState.remoteFiles;
};

export const getArrowDirection = state => {
  const moduleName = NAME;
  const appState = state[moduleName];
  if (!appState) {
    return [];
  }

  return appState.arrowDirection;
};
