import { createSelector } from '@ngrx/store';

import { NoteState } from './note.reducer';

export const selectNoteState = (state: any) => state.note as NoteState;

export const selectNoteStateList = createSelector(
  selectNoteState,
  (state: NoteState) => state.list,
);

export const selectNoteStateListLength = createSelector(
  selectNoteState,
  (state: NoteState) => state.list.length,
);

export const selectNoteStateLastInsertedId = createSelector(
  selectNoteState,
  (state: NoteState) => state.lastInsertedId,
);

export const selectNoteStateFocusedOn = createSelector(
  selectNoteState,
  (state: NoteState) => state.focusedOn,
);

export const selectNoteStateLastEditedId = createSelector(
  selectNoteState,
  (state: NoteState) => state.lastEditedId,
);
