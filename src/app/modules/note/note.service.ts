import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { NoteModel } from 'src/app/models/note.model';

const SIMPLYNOTE_NOTE_LIST = 'SIMPLYNOTE_NOTE_LIST';

@Injectable()
export class NoteService {
  constructor() {}

  private rand() {
    return Math.ceil(Math.random() * 1000);
  }

  getAll(from: number, to: number): Observable<NoteModel[]> {
    return Observable.create((obs: Observer<NoteModel[]>) => {
      let list = JSON.parse(localStorage.getItem(SIMPLYNOTE_NOTE_LIST)) as NoteModel[];
      list = list ? list.slice(from, to) : [];
      setTimeout(() => {
        obs.next(list);
      }, this.rand());
    });
  }

  getOne(id: number): Observable<NoteModel> {
    return Observable.create((obs: Observer<NoteModel>) => {
      const list = (JSON.parse(localStorage.getItem(SIMPLYNOTE_NOTE_LIST)) as NoteModel[]) || [];
      const note = list.filter(n => n.id == id)[0];
      setTimeout(() => {
        if (note) {
          obs.next(note);
        } else {
          obs.error('Not Found');
        }
      }, this.rand());
    });
  }

  post(note: NoteModel): Observable<NoteModel> {
    return Observable.create((obs: Observer<NoteModel>) => {
      const storedList = (JSON.parse(localStorage.getItem(SIMPLYNOTE_NOTE_LIST)) as any[]) || [];
      storedList.push(note);
      localStorage.setItem(SIMPLYNOTE_NOTE_LIST, JSON.stringify(storedList));
      setTimeout(() => {
        obs.next(note);
      }, this.rand());
    });
  }

  put(note: NoteModel): Observable<NoteModel> {
    const noteCloned: NoteModel = { ...note };
    return Observable.create((obs: Observer<NoteModel>) => {
      const storedList = (JSON.parse(localStorage.getItem(SIMPLYNOTE_NOTE_LIST)) as NoteModel[]) || [];
      const newList = [];
      for (const n of storedList) {
        if (n.id == noteCloned.id) {
          noteCloned.createdAt = n.createdAt;
          newList.push(noteCloned);
        } else {
          newList.push(n);
        }
      }
      localStorage.setItem(SIMPLYNOTE_NOTE_LIST, JSON.stringify(newList));
      setTimeout(() => {
        obs.next(noteCloned);
      }, this.rand());
    });
  }

  delete(note: NoteModel): Observable<NoteModel[]> {
    return Observable.create((obs: Observer<NoteModel[]>) => {
      const list = (JSON.parse(localStorage.getItem(SIMPLYNOTE_NOTE_LIST)) as NoteModel[]) || [];
      const newList = list.filter(n => n.id != note.id);
      localStorage.setItem(SIMPLYNOTE_NOTE_LIST, JSON.stringify(newList));
      setTimeout(() => {
        if (newList) {
          obs.next(newList);
        } else {
          obs.error('Not Found');
        }
      }, this.rand());
    });
  }
}
