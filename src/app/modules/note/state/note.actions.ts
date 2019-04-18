import { Action } from '@ngrx/store';
import { NoteModel } from 'src/app/models/note.model';

export enum NoteActionTypes {
  LoadNoteActions = '[NoteActions] Load Notes',
  LoadNoteActionsOk = '[NoteActions] Load Notes success',
  LoadNoteActionsPending = '[NoteActions] Load Notes pending',
}

export class LoadNotesAction implements Action {
  readonly type = NoteActionTypes.LoadNoteActions;

  constructor(public payload: { from: number; to: number }) {}
}

export class LoadNotesActionPending implements Action {
  readonly type = NoteActionTypes.LoadNoteActionsPending;

  constructor(public payload: { from: number; to: number }) {}
}

export class LoadNotesActionOk implements Action {
  readonly type = NoteActionTypes.LoadNoteActionsOk;

  constructor(public payload: { list: NoteModel[] }) {}
}

export type NoteActions = LoadNotesAction | LoadNotesActionPending | LoadNotesActionOk;
