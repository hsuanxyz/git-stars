import { Action } from '@ngrx/store';
import { GithubStar } from '../models/github-star';

export const SET = '[stars] Set';

export class SetStars implements Action {
  readonly type = SET;
  constructor(public payload: GithubStar[]) {}
}

export type All = SetStars;
