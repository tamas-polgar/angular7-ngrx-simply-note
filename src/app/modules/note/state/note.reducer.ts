import { NoteModel } from 'src/app/models/note.model';

import { NoteActions, NoteActionTypes } from './note.actions';

export interface NoteState {
  list: NoteModel[];
  focusedOn: NoteModel;
  lastInsertedId: number;
  lastEditedId: number;
  reachedEnd: boolean;
}

export const initialState: NoteState = {
  list: [],
  focusedOn: null,
  lastInsertedId: null,
  lastEditedId: null,
  reachedEnd: false,
};

export function reducer(state = initialState, action: NoteActions): NoteState {
  switch (action.type) {
    case NoteActionTypes.LoadNotesAction:
      return {
        ...state,
        list: state.list.concat([
          ...Array(action.payload.to - action.payload.from - state.list.length).fill({ loading: true }),
        ]),
      };
    case NoteActionTypes.LoadNotesActionsOk:
      return {
        ...state,
        list: action.payload.list,
        reachedEnd: action.payload.reachedEnd,
      };
    case NoteActionTypes.AddNoteActionOk:
      return {
        ...state,
        lastInsertedId: action.payload.note.id,
      };
    case NoteActionTypes.EditNoteActionOk:
      return {
        ...state,
        lastEditedId: action.payload.note.id,
      };
    case NoteActionTypes.LoadOneNoteActionsOk:
      return {
        ...state,
        lastInsertedId: null,
        focusedOn: action.payload.note,
      };
    case NoteActionTypes.LoadOneNoteActionsKo:
      return {
        ...state,
        focusedOn: undefined,
      };
    case NoteActionTypes.LoadOneNoteActionsKo:
      return {
        ...state,
        focusedOn: undefined,
      };
    case NoteActionTypes.DeleteNoteAction:
      const newList = state.list.map(n => ({
        ...n,
        loading: n.id == action.payload.note.id ? true : false,
      }));
      return {
        ...state,
        list: newList,
      };
    case NoteActionTypes.DeleteNoteActionOk:
      return {
        ...state,
        list: action.payload.list,
      };
    default:
      return state;
  }
}
