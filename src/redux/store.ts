import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "./reducer";

const saveToLocalStorage = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("redux_state", serializedState);
  } catch (error) {
    console.error("Не удалось сохранить состояние в localStorage:", error);
  }
};

const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("redux_state");
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (error) {
    console.error("Не удалось загрузить состояние из localStorage:", error);
    return undefined;
  }
};

const preloadedState = loadFromLocalStorage();

export const store = configureStore({
  reducer,
  preloadedState,
});

store.subscribe(() => {
  const currentState = store.getState();
  saveToLocalStorage(currentState);
});
