import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { NzMessageService } from 'ng-zorro-antd';
import { from, Observable } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { NoteService } from '../note.service';
import {
  AddNoteAction,
  AddNoteActionOk,
  DeleteNoteAction,
  DeleteNoteActionOk,
  EditNoteAction,
  EditNoteActionOk,
  LoadNotesAction,
  LoadNotesActionOk,
  LoadOneNoteAction,
  LoadOneNoteActionKo,
  LoadOneNoteActionOk,
  NoteActionTypes,
} from './note.actions';

@Injectable()
export class NoteEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly noteService: NoteService,
    private readonly msg: NzMessageService,
  ) {}

  @Effect()
  loadOK$: Observable<any> = this.actions$.pipe(
    ofType<LoadNotesAction>(NoteActionTypes.LoadNoteAction),
    mergeMap(action => {
      const fro = action.payload.from;
      const to = action.payload.to;
      return this.noteService.getAll(fro, to).pipe(
        map(list => {
          return new LoadNotesActionOk({
            list,
            reachedEnd: list.length < to ? true : false,
          });
        }),
      );
    }),
  );

  @Effect()
  addOk$: Observable<any> = this.actions$.pipe(
    ofType<AddNoteAction>(NoteActionTypes.AddNoteAction),
    mergeMap(action => {
      return this.noteService.post(action.payload.note).pipe(
        map(noteStored => {
          this.msg.success('Note saved successfully');
          return new AddNoteActionOk({ note: noteStored });
        }),
      );
    }),
  );

  @Effect()
  EditOk$: Observable<any> = this.actions$.pipe(
    ofType<EditNoteAction>(NoteActionTypes.EditNoteAction),
    mergeMap(action => {
      return this.noteService.put(action.payload.note).pipe(
        map(noteStored => {
          this.msg.success('Note edited successfully');
          return new EditNoteActionOk({ note: noteStored });
        }),
      );
    }),
  );

  @Effect()
  DeleteOk$: Observable<any> = this.actions$.pipe(
    ofType<DeleteNoteAction>(NoteActionTypes.DeleteNoteAction),
    mergeMap(action => {
      return this.noteService.delete(action.payload.note).pipe(
        map(newList => {
          this.msg.success('Note deleted successfully');
          return new DeleteNoteActionOk({ list: newList });
        }),
      );
    }),
  );

  @Effect()
  loadOneOK$: Observable<any> = this.actions$.pipe(
    ofType<LoadOneNoteAction>(NoteActionTypes.LoadOneNoteAction),
    mergeMap(action => {
      return this.noteService.getOne(action.payload.id).pipe(
        map(note => {
          return new LoadOneNoteActionOk({
            note,
          });
        }),
        catchError(err => {
          return from([new LoadOneNoteActionKo()]);
        }),
      );
    }),
  );
}
