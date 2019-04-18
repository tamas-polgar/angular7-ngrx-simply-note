import { NoteModel } from 'src/app/models/note.model';

import { NoteActions, NoteActionTypes } from './note.actions';

export interface NoteState {
  list: NoteModel[];
}

export const initialState: NoteState = {
  list: [],
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
    default:
      return state;
  }
}
