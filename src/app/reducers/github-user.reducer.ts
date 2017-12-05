
import * as GithubUserActions from '../actions/github-user.actions';
import { GithubUser } from '../models/github-user';

export type Action = GithubUserActions.All;

const defaultUser: GithubUser = null;

export function githubUserReducer(state: GithubUser = defaultUser, action: Action) {
  switch (action.type) {
    case GithubUserActions.SET:
      return action.payload;
    default:
      return state;
  }
}
