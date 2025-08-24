// lib/api/serverApi.ts

import { cookies } from 'next/headers';
import nextServer from './api';
import { User } from "../../types/user";
import type { Note } from "../../types/note";


export const checkServerSession = async () => {

  const cookieStore = await cookies();
  const res = await nextServer.get('/auth/session', {
    headers: {
   
      Cookie: cookieStore.toString(),
    },
  });
  return res;
};





export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};
























export interface FetchNotesParams{
   tag?: string;
    page?: number;
    perPage?: number;
    search?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async ({
   tag,
  page=1,
  perPage= 12,
  search,}:FetchNotesParams ): Promise<FetchNotesResponse> => {
  const cookieStore = await cookies();
  const response = await nextServer.get<FetchNotesResponse>("/notes", {
     params: {
          page,
          perPage,
          ...(search && { search }),
          ...(tag && tag !== "All" ? { tag } : {})
        },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return response.data;
};





export const fetchNoteById = async (id: string) => {
  const cookieStore = await cookies();

  const response = await nextServer.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
};