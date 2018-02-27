/**
 * GitHub - 用户数据模型
 */
export class GithubUser {
  /**
   * 登录名(唯一)
   */
  login: string;
  id: number;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  /**
   * 用户名名
   */
  name: string;
  company: string;
  blog: string;
  location: string;
  email: object;
  hireable: boolean;
  bio: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

/**
 * 数据库- 用户模型
 */
export class DBGithubUser {
  user: GithubUser;
  id: number;
  insertTime: number;
}
