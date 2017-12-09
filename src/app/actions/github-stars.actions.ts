import { Action } from '@ngrx/store';
import { GithubStar } from '../models/github-star';

export const STAR_LOAD = '[Star] Load';
export const STAR_LOADING = '[Star] Loading';

export class StarsLoad implements Action {
  readonly type = STAR_LOAD;
  constructor(public payload: GithubStar[]) {}
}

export class StarsLoading implements Action {
  readonly type = STAR_LOADING;
  constructor(public payload: string) {}
}

export type All = StarsLoad | StarsLoading;
