
import { nextServer } from './api';
import type { Note, NoteTag } from "../../types/note";
import { User } from "../../types/user";

const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;



export interface FetchNotesParams {
    search?: string;
    page?: number;
    perPage?: number;
    tag?: string;
}



export interface FetchNotesResponse {
    page: number;
    perPage: number
    notes: Note[];
    totalPages: number;
    
}

export const fetchNotes = async ({ search, page = 1, perPage=12, tag}:FetchNotesParams): Promise<FetchNotesResponse> => {
 const config = {
        params: {
            page,
            perPage,
         ...(search && { search }), 
        ...(tag && tag !== "All" ? { tag } : {})
    },
        headers: {
            Authorization: `Bearer ${myKey}`
        },
    }
    const response = await nextServer.get<FetchNotesResponse>(
        '/notes',
         config
    );

   

    return {
        page,
        perPage,
        notes: response.data.notes,
        totalPages: response.data.totalPages,
        
     };
        
}









export const createNote = async (note: {
    title: string;
    content: string;
    tag: NoteTag;
}): Promise<Note> => {
 const config = {
        headers: {
            Authorization: `Bearer ${myKey}`
        },
    }



    const response = await nextServer.post<Note>(
        '/notes',
        note,
         config
    );

    return response.data;
};


export const deleteNote = async (id: string): Promise<Note> => {
 const config = {
        headers: {
            Authorization: `Bearer ${myKey}`
        },
    }



    const response = await nextServer.delete<Note>(
        `/notes/${id}`,
         config
    );

    return response.data;
};


export const fetchNoteById = async (id: string): Promise<Note> => {
     const config = {
        headers: {
            Authorization: `Bearer ${myKey}`
        },
    }
  const response = await nextServer.get<Note>(
        `/notes/${id}`,
         config
    )
    return response.data;
}
























//new sign up

export type RegisterRequest = {
  email: string;
  password: string;
};


export const register = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>('/auth/register', data);
  return res.data;
};




// login-signin

export type LoginRequest = {
  email: string;
  password: string;
};

export const login = async (data: LoginRequest) => {
  const res = await nextServer.post<User>('/auth/login', data);
  return res.data;
};



//store 
type CheckSessionRequest = {
  success: boolean;
};

export const checkSession = async () => {
  const res = await nextServer.get<CheckSessionRequest>('/auth/session');
  return res.data.success;
};

//store 2
export const getMe = async () => {
  const { data } = await nextServer.get<User>('/users/me');
  return data;
};


//logout 
export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout')
};