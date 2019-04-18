import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { NzMessageService } from 'ng-zorro-antd';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NoteModel } from 'src/app/models/note.model';

import { LoadNotesAction } from '../state/note.actions';
import { selectNoteStateList } from '../state/note.selectors';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.less'],
})
export class NoteListComponent implements OnInit {
  initLoading = true;
  loadingMore = false;
  list$: Observable<NoteModel[]>;
  numRowsDisplayed = 0;
  numRowsPerPage = 5;
  reachedEnd = false;

  constructor(
    private readonly http: HttpClient,
    private readonly msg: NzMessageService,
    private readonly store: Store<any>,
  ) {}

  ngOnInit(): void {
    this.initList();
  }

  initList() {
    this.list$ = this.store.pipe(
      select(selectNoteStateList),
      tap(list => {
        this.initLoading = false;
        this.loadingMore = false;
        this.checkIfReachedEnd(list);
      }),
    );
    this.store.dispatch(new LoadNotesAction({ from: 0, to: this.numRowsPerPage }));
  }

  checkIfReachedEnd(list: NoteModel[]) {
    if (list.filter(item => item.loading).join() || list.length == 0) {
      return;
    }
    this.reachedEnd =
      this.numRowsDisplayed == list.length ? (this.msg.info('There is no more notes.'), true) : false;
    this.numRowsDisplayed = list.length;
  }

  onLoadMore(): void {
    this.loadingMore = true;
    this.store.dispatch(
      new LoadNotesAction({ from: 0, to: this.numRowsDisplayed + this.numRowsPerPage }),
    );
  }

  edit(item: any): void {
    this.msg.success(item.email);
  }
}
