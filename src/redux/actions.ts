// actions.ts
import { User } from './types';

export const addUser = (user: User) => ({
  type: 'ADD_USER',
  payload: user,
});

export const editUser = (user: User) => ({
  type: 'EDIT_USER',
  payload: user,
});

export const deleteUser = (userId: number) => ({
  type: 'DELETE_USER',
  payload: userId,
});