import { createAction, props } from '@ngrx/store';
import { AppState } from './appstate';

export const setApiStatus = createAction(
  '[API] success of failure status',
  props<{ apiStatus: AppState }>()
);
