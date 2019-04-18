export interface NoteModel {
  id: number;
  title: string;
  description: string;
  content: string;
  createdAt: Date;
  editedAt: Date;
  loading?: boolean;
}
