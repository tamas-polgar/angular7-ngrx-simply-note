import { Action } from '@ngrx/store';
import { NoteModel } from 'src/app/models/note.model';

export enum NoteActionTypes {
  LoadNoteAction = '[NoteActions] Load Notes',
  LoadNoteActionsOk = '[NoteActions] Load Notes success',

  AddNoteAction = '[NoteActions] Add note',
  AddNoteActionOk = '[NoteActions] Add note success',

  EditNoteAction = '[NoteActions] Edit note',
  EditNoteActionOk = '[NoteActions] Edit note success',

  DeleteNoteAction = '[NoteActions] Delete note',
  DeleteNoteActionOk = '[NoteActions] Delete note success',

  LoadOneNoteAction = '[NoteActions] Load one Note',
  LoadOneNoteActionsOk = '[NoteActions] Load one Note success',
  LoadOneNoteActionsKo = '[NoteActions] Load one Note failed',
}

export class LoadNotesAction implements Action {
  readonly type = NoteActionTypes.LoadNoteAction;

  constructor(public payload: { from: number; to: number }) {}
}

export class LoadNotesActionOk implements Action {
  readonly type = NoteActionTypes.LoadNoteActionsOk;

  constructor(public payload: { list: NoteModel[]; reachedEnd?: boolean }) {}
}

export class AddNoteAction implements Action {
  readonly type = NoteActionTypes.AddNoteAction;

  constructor(public payload: { note: NoteModel }) {}
}

export class AddNoteActionOk implements Action {
  readonly type = NoteActionTypes.AddNoteActionOk;

  constructor(public payload: { note: NoteModel }) {}
}

export class EditNoteAction implements Action {
  readonly type = NoteActionTypes.EditNoteAction;

  constructor(public payload: { note: NoteModel }) {}
}

export class EditNoteActionOk implements Action {
  readonly type = NoteActionTypes.EditNoteActionOk;

  constructor(public payload: { note: NoteModel }) {}
}

export class DeleteNoteAction implements Action {
  readonly type = NoteActionTypes.DeleteNoteAction;

  constructor(public payload: { note: NoteModel }) {}
}

export class DeleteNoteActionOk implements Action {
  readonly type = NoteActionTypes.DeleteNoteActionOk;

  constructor(public payload: { list: NoteModel[] }) {}
}

export class LoadOneNoteAction implements Action {
  readonly type = NoteActionTypes.LoadOneNoteAction;

  constructor(public payload: { id: number }) {}
}

export class LoadOneNoteActionOk implements Action {
  readonly type = NoteActionTypes.LoadOneNoteActionsOk;

  constructor(public payload: { note: NoteModel }) {}
}

export class LoadOneNoteActionKo implements Action {
  readonly type = NoteActionTypes.LoadOneNoteActionsKo;
}

export type NoteActions =
  | LoadNotesAction
  | LoadNotesActionOk
  | AddNoteAction
  | AddNoteActionOk
  | EditNoteAction
  | EditNoteActionOk
  | DeleteNoteAction
  | DeleteNoteActionOk
  | LoadOneNoteAction
  | LoadOneNoteActionOk
  | LoadOneNoteActionKo;
