import { Action } from '@ngrx/store';
import { GithubRepo } from '../models/github-repo';

export const STAR_LOAD = '[Star] Load';
export const STAR_LOADING = '[Star] Loading';

export class StarsLoad implements Action {
  readonly type = STAR_LOAD;
  constructor(public payload: GithubRepo[]) {}
}

export class StarsLoading implements Action {
  readonly type = STAR_LOADING;
  constructor(public payload: string) {}
}

export type All = StarsLoad | StarsLoading;
