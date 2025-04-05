import { Action } from 'redux';
import { AppState, User, initialState } from './types';

enum Actions {
  ADD_USER = 'ADD_USER',
  EDIT_USER = 'EDIT_USER',
  DELETE_USER = 'DELETE_USER',
}

interface AddUserAction extends Action {
  type: typeof Actions.ADD_USER;
  payload: User;
}

interface EditUserAction extends Action {
  type: typeof Actions.EDIT_USER;
  payload: User;
}

interface DeleteUserAction extends Action {
  type: typeof Actions.DELETE_USER;
  payload: number;
}

type KnownActions = AddUserAction | EditUserAction | DeleteUserAction;

export const reducer = (state: AppState = initialState, action: KnownActions): AppState => {
  switch (action.type) {
    case Actions.ADD_USER:
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case Actions.EDIT_USER:
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        ),
      };
    case Actions.DELETE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
      };
    default:
      return state;
  }
};