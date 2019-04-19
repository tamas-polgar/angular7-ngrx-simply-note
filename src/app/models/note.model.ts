export interface NoteModel {
  id: number;
  title: string;
  description: string;
  content: { blocks: any[]; time: number };
  createdAt: number;
  editedAt: number;
  loading?: boolean;
}
