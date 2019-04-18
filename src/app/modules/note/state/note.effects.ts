import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, Observer } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { LoadNotesAction, LoadNotesActionOk, LoadNotesActionPending, NoteActionTypes } from './note.actions';

@Injectable()
export class NoteEffects {
  constructor(private actions$: Actions) {}

  @Effect()
  loadOK$: Observable<any> = this.actions$.pipe(
    ofType<LoadNotesActionPending>(NoteActionTypes.LoadNoteActionsPending),
    mergeMap(action => {
      return Observable.create((obs: Observer<any>) => {
        setTimeout(() => {
          const from = action.payload.from;
          const to = action.payload.to;
          const storedList = JSON.parse(localStorage.getItem('SIMPLYNOTE_NOTE_LIST')) as any[];
          obs.next(
            new LoadNotesActionOk({
              list: storedList ? storedList.slice(from, to) : [],
            }),
          );
        }, 250);
      });
    }),
  );

  @Effect()
  loadPending$: Observable<any> = this.actions$.pipe(
    ofType<LoadNotesAction>(NoteActionTypes.LoadNoteActions),
    map(action => {
      return new LoadNotesActionPending({ from: action.payload.from, to: action.payload.to });
    }),
  );
}
