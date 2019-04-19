import { NoteModel } from 'src/app/models/note.model';

import { NoteActions, NoteActionTypes } from './note.actions';

export interface NoteState {
  list: NoteModel[];
  focusedOn: NoteModel;
  lastInsertedId: number;
  lastEditedId: number;
}

export const initialState: NoteState = {
  list: [],
  focusedOn: null,
  lastInsertedId: null,
  lastEditedId: null,
};

export function reducer(state = initialState, action: NoteActions): NoteState {
  switch (action.type) {
    case NoteActionTypes.LoadNoteActionsPending:
      return {
        ...state,
        list: state.list.concat([
          ...Array(action.payload.to - action.payload.from - state.list.length).fill({ loading: true }),
        ]),
      };
    case NoteActionTypes.LoadNoteActionsOk:
      return {
        ...state,
        list: action.payload.list,
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
    default:
      return state;
  }
}
