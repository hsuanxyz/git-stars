
import * as GithubStarsActions from '../actions/github-stars.actions';
import { GithubStar } from '../models/github/github-star';

export type Action = GithubStarsActions.All;

const defaultState: GithubStar[] = [];

export function githubStarsReducer(state: GithubStar[] = defaultState, action: Action) {
  switch (action.type) {
    case GithubStarsActions.SET:
      return action.payload;
    default:
      return state;
  }
}
