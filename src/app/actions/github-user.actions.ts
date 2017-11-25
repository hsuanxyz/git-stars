import { Action } from '@ngrx/store';
import { GithubUser } from '../models/github/github-user';

export const SET = '[user] Set';

export class SetUser implements Action {
  readonly type = SET;
  constructor(public payload: GithubUser) {}
}

export type All = SetUser;
