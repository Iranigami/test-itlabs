export interface User {
  id: string;
  name: string;
  company: string;
  group: string;
  status: boolean;
}

export interface AppState {
  users: User[];
}

export const initialState: AppState = {
  users: [],
};
