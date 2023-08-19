import { create } from 'zustand';

export const useUserStore = create((set) => ({
  id: null,
  username: null,
  firstname: null,
  lastname: null,
  email: null,
  birthdate: null,
  setUser: (value) => set(state => ({
    id: value.id,
    username: value.username,
    firstname: value.firstname,
    lastname: value.lastname,
    email: value.email,
    birthdate: value.birthdate
  }))
}))