
import * as GithubStarsActions from '../actions/github-stars.actions';
import { GithubStar } from '../models/github-star';

export type Action = GithubStarsActions.All;

export interface StarsState {
  repo: GithubStar[];
  loading: boolean;
}

const defaultState: StarsState = {
  repo: [],
  loading: false
};

export function githubStarsReducer(state: StarsState = defaultState, action: Action) {
  switch (action.type) {
    case GithubStarsActions.STAR_LOADING:
      return {
        repo: [],
        loading: true
      };

    case GithubStarsActions.STAR_LOAD:
      return {
        repo: action.payload,
        loading: false
      };

    default:
      return state;
  }
}
