// lib/api/clientApi.ts — для функцій, які викликаються у клієнтських компонентах.

// api
import { nextServer } from "@/lib/api/api";
// types
import { NewNote, Note, Tag } from "@/types/note";
import { User } from "@/types/user";

// type for parameters to /notes
export interface FetchNotesProprs {
  search?: string;
  tag?: Tag;
  page?: number;
  perPage?: number;
  sortBy?: "created" | "updated";
}

// type for response from /notes
export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

// fetch notes with optional filters
export async function fetchNotes(params: FetchNotesProprs = {}): Promise<FetchNotesResponse> {
  const { search, tag, page, perPage, sortBy } = params;
  const response = await nextServer.get<FetchNotesResponse>("/notes", {
    params: {
      search,
      tag,
      page,
      perPage,
      sortBy,
    },
  });
  return response.data;
}

// fetch note by id
export async function fetchNoteById(id: Note["id"]): Promise<Note> {
  const response = await nextServer.get<Note>(`/notes/${id}`);
  return response.data;
}

// delete note by id
export async function deleteNote(id: Note["id"]): Promise<Note> {
  const response = await nextServer.delete<Note>(`/notes/${id}`);
  return response.data;
}

// create new note
export async function createNote(newNote: NewNote): Promise<Note> {
  const response = await nextServer.post<Note>(`/notes`, newNote);
  return response.data;
}

// type for request to /auth/register
export interface RegisterRequest {
  email: string;
  password: string;
  userName: string;
}

// register user from client side
export const registerUser = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>("/auth/register", data);
  return res.data;
};

// type for request to /auth/login
export interface LoginRequest {
  email: string;
  password: string;
}

// login user from client side
export const loginUser = async (data: LoginRequest) => {
  const res = await nextServer.post<User>("/auth/login", data);
  return res.data;
};

// type for response from /auth/session
type CheckSessionRequest = {
  success: boolean;
};

// check if user is authenticated from client side
export const checkSession = async () => {
  const res = await nextServer.get<CheckSessionRequest>("/auth/session");
  return res.data.success;
};

// get current user info from client side
export const getMe = async () => {
  const { data } = await nextServer.get<User>("/users/me");
  return data;
};

// update user info from client side
export const setMe = async (username: string) => {
  const { data } = await nextServer.patch<User>("/users/me", {
    username: username,
  });
  return data;
};

// logout user from client side
export const logout = async (): Promise<void> => {
  await nextServer.post("/auth/logout");
};
