/**
 * Github - 库作者数据模型
 */
export class GithubOwner {
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
  type: GithubOwnerType | string;
  site_admin: boolean;
}

export type GithubOwnerType = 'Organization' | 'User';
