import axios, { type AxiosResponse } from "axios";
import type { Note, NoteTag } from "@/types/note";

const API_BASE_URL = "https://notehub-public.goit.study/api";
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

if (!TOKEN) {
  // Допоможе швидко зрозуміти проблему в dev
  // Не кидаємо помилку, щоб сторінка рендерилась, але попереджаємо
  console.warn("NEXT_PUBLIC_NOTEHUB_TOKEN is not set.");
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateNoteDto {
  title: string;
  content: string;
  tag: NoteTag;
}

const http = axios.create({
  baseURL: API_BASE_URL,
  headers: TOKEN ? { Authorization: `Bearer ${TOKEN}` } : undefined,
});

export async function fetchNotes(
  page: number,
  perPage: number,
  search = ""
): Promise<FetchNotesResponse> {
  const params: { page: number; perPage: number; search?: string } = {
    page,
    perPage,
  };
  if (search) params.search = search;

  const { data }: AxiosResponse<FetchNotesResponse> = await http.get("/notes", {
    params,
  });
  return data;
}

export async function createNote(dto: CreateNoteDto): Promise<Note> {
  const { data }: AxiosResponse<Note> = await http.post("/notes", dto);
  return data;
}

export async function deleteNote(id: number): Promise<Note> {
  const { data }: AxiosResponse<Note> = await http.delete(`/notes/${id}`);
  return data;
}

export async function fetchNoteById(id: number): Promise<Note> {
  const { data }: AxiosResponse<Note> = await http.get(`/notes/${id}`);
  return data;
}
