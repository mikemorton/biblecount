import { createAction, Action } from 'redux-actions';

export const START_CLICKED = 'START_CLICKED';
export const DONE_CLICKED = 'DONE_CLICKED';
export const RESET_CLICKED = 'RESET_CLICKED';

export const startClicked = createAction(START_CLICKED);
export const doneClicked = createAction(DONE_CLICKED);
export const resetClicked = createAction(RESET_CLICKED);
