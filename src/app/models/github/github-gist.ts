import { GithubOwner } from './github-owner';
import { GithubUser } from './github-user';

export class GithubGist {
  url: string;
  forks_url: string;
  commits_url: string;
  id: string;
  git_pull_url: string;
  git_push_url: string;
  html_url: string;
  files: GithubGistFiles;
  public: boolean;
  created_at: string;
  updated_at: string;
  description: string;
  comments: number;
  user: GithubUser;
  comments_url: string;
  owner: GithubOwner;
  truncated: boolean;
}

export class GithubGistFiles {
  [file: string]: GithubGistFile;
}

export class GithubGistFile {
  filename: string;
  language: string;
  raw_url: string;
  size: number;
  type: string;
}

