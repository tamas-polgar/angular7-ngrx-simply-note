import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from '../shared/shared.module';
import { NoteListComponent } from './note-list/note-list.component';
import { NoteSingleComponent } from './note-single/note-single.component';
import { NoteEffects } from './state/note.effects';
import * as fromNote from './state/note.reducer';

const routes: Routes = [
  { path: '', component: NoteListComponent },
  { path: ':id', component: NoteSingleComponent },
];

@NgModule({
  declarations: [NoteListComponent, NoteSingleComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    StoreModule.forFeature('note', fromNote.reducer),
    EffectsModule.forFeature([NoteEffects]),
  ],
})
export class NoteModule {}
