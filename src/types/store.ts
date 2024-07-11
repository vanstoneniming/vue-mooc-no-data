export interface UserState {
  state: object;
  token: string;
  userInfo: {
    id: number;
    name: string;
    username: string;
    email: string;
    nickname: string;
    avatar: string;
    points: number;
    experience: number;
  };
}
