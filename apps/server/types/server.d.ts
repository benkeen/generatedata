export interface RequestContext {
  req: any;
  res: any;
  token: string;
  user: {
    accountId?: number;
    email?: string;
    [key: string]: any;
  };
}
