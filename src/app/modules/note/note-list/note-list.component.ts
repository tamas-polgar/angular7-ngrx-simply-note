import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NoteModel } from 'src/app/models/note.model';

import { DeleteNoteAction, LoadNotesAction } from '../state/note.actions';
import { selectNoteStateList, selectNoteStateReachedEnd } from '../state/note.selectors';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.less'],
})
export class NoteListComponent implements OnInit {
  loadingMore = false;
  list$: Observable<NoteModel[]>;
  isEnd$: Observable<boolean>;
  numRowsDisplayed = 0;
  numRowsPerPage = 5;

  constructor(private readonly store: Store<any>) {}

  ngOnInit(): void {
    this.initList();
  }

  initList() {
    this.isEnd$ = this.store.pipe(select(selectNoteStateReachedEnd));
    this.list$ = this.store.pipe(
      select(selectNoteStateList),
      tap(list => {
        this.loadingMore = false;
        this.numRowsDisplayed = list.length;
      }),
    );
    this.store.dispatch(new LoadNotesAction({ from: 0, to: this.numRowsPerPage }));
  }

  onLoadMore(): void {
    this.loadingMore = true;
    this.store.dispatch(
      new LoadNotesAction({ from: 0, to: this.numRowsDisplayed + this.numRowsPerPage }),
    );
  }

  delete(item: NoteModel): void {
    this.store.dispatch(new DeleteNoteAction({ note: item }));
  }
}
