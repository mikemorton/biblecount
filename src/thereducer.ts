import { handleActions, Action } from 'redux-actions';
import { combineReducers } from 'redux';

import Actions = require('./actions');

enum TestStatus {
  beforeStart,
  started,
  finished
}

interface AppState {
  status: TestStatus;
  startTime: Date;
  secondsTaken: number;
}

const initialState:AppState = {
  status: TestStatus.beforeStart,
  startTime: null,
  secondsTaken: 0
};

var mainState =  handleActions<AppState>({
  [Actions.START_CLICKED]: (state, action) => {
    return {
      status: TestStatus.started,
      startTime: new Date(),
      secondsTaken: 0
    };
  },
  [Actions.DONE_CLICKED]: (state, action) => {
    return {
      status: TestStatus.finished,
      startTime: state.startTime,
      secondsTaken: (new Date().getTime() - state.startTime.getTime()) / 1000
    };
  },
  [Actions.RESET_CLICKED]: (state, action) => {
    return initialState;
  }
}, initialState);

const rootReducer = combineReducers({
  mainState: mainState
});

export { rootReducer, AppState, TestStatus };
