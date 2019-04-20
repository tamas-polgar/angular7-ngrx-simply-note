import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Checklist from '@editorjs/checklist';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Quote from '@editorjs/quote';
import SimpleImage from '@editorjs/simple-image';
import { select, Store } from '@ngrx/store';
import { NoteModel } from 'src/app/models/note.model';

import { AddNoteAction, EditNoteAction, LoadOneNoteAction } from '../state/note.actions';
import {
  selectNoteStateFocusedOn,
  selectNoteStateLastEditedId,
  selectNoteStateLastInsertedId,
} from '../state/note.selectors';

const NEW_NOTE_INIT = {
  time: Date.now(),
  blocks: [
    {
      type: 'header',
      data: {
        text: 'New note !',
        level: 2,
      },
    },
    {
      type: 'paragraph',
      data: {
        text: '...',
      },
    },
  ],
  version: '2.12.4',
};

@Component({
  selector: 'app-note-single',
  templateUrl: './note-single.component.html',
  styleUrls: ['./note-single.component.less'],
})
export class NoteSingleComponent implements OnInit {
  editor: EditorJS;
  noteFound = true;
  isLoading = false;
  isReady = false;
  title: string;
  description: string;
  editedNoteId = null;

  constructor(
    private readonly store: Store<any>,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.editedNoteId = this.route.snapshot.params.id || null;
    if (this.editedNoteId) {
      this.listenToEditedNote();
      this.store.dispatch(
        new LoadOneNoteAction({
          id: this.editedNoteId,
        }),
      );
      return;
    }
    this.initEditor();
  }

  listenToEditedNote() {
    this.store.pipe(select(selectNoteStateFocusedOn)).subscribe(note => {
      if (note) {
        this.initEditor(note.content as any);
      } else if (note === undefined) {
        this.noteFound = false;
      }
    });
  }

  initEditor(initialData = NEW_NOTE_INIT) {
    this.noteFound = true;
    setTimeout(() => {
      this.editor =
        this.editor ||
        new EditorJS({
          onReady: () => this.formChanged(),
          holderId: 'editor-context',
          onChange: () => this.formChanged(),
          autofocus: true,
          tools: {
            header: Header,
            list: List,
            checklist: Checklist,
            quote: Quote,
            image: SimpleImage,
          },
          data: initialData,
        });
    }, 250);
  }

  async save() {
    const editorContent = await this.editor.saver.save();
    this.isLoading = true;
    const note: NoteModel = {
      id: this.editedNoteId ? this.editedNoteId : editorContent.time,
      editedAt: this.editedNoteId ? editorContent.time : null,
      createdAt: this.editedNoteId ? undefined : editorContent.time,
      content: editorContent as any,
      description: this.description,
      title: this.title,
    };

    this.store
      .pipe(select(this.editedNoteId ? selectNoteStateLastEditedId : selectNoteStateLastInsertedId))
      .subscribe(id => {
        if (id == note.id) {
          this.savedOk(), this.goBack();
        }
      });

    this.store.dispatch(
      this.editedNoteId
        ? new EditNoteAction({ note: note as any })
        : new AddNoteAction({ note: note as any }),
    );
  }

  async formChanged() {
    this.isReady = true;
    this.title = this.description = '';
    const blocks = (await this.editor.saver.save()).blocks;
    for (const block of blocks) {
      if (block.type == 'header') {
        this.title = (block.data as any).text;
      } else if (block.type == 'paragraph') {
        this.description += ' ' + (block.data as any).text;
      }
    }
    if (this.description.length > 100) {
      this.description = this.description.slice(0, 100) + '...';
    }
  }

  savedOk() {
    this.isLoading = false;
  }

  goBack() {
    this.router.navigateByUrl('');
  }
}
