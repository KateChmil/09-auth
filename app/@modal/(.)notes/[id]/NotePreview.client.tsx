"use client";
import css from "./NotePreview.module.css";
import { useRouter } from 'next/navigation';
import { useQuery } from "@tanstack/react-query";
import { useParams } from 'next/navigation';
import { fetchNoteById } from "@/lib/api";
import NotePreviewModal from "@/components/NotePreviewModal/NotePreviewModal";

const NotePreview = () => {

     const router = useRouter();
  
  const close = () => router.back();
	const { id } = useParams<{ id: string }>();

  const { data: note, isLoading, error } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading, please wait...</p>;

  if (error || !note) return <p>Something went wrong.</p>;

  const formattedDate = note.updatedAt
    ? `Updated at: ${note.updatedAt}`
    : `Created at: ${note.createdAt}`;

    return (
      <NotePreviewModal>
   <div className={css.container}>
  <div className={css.item}>
    <div className={css.header}>
                  <h2>{note.title}</h2>
    </div>
                    <p className={css.content}>{note.content}</p>
                    <p className={css.tag}>{note.tag}</p>
              <p className={css.date}>{ formattedDate}</p>
                </div>
                <button onClick={close} className={css.backBtn}>Close</button>
            </div>
            </NotePreviewModal>
  );
};

export default NotePreview;
