import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { NoteListComponent } from './note-list/note-list.component';

const routes: Routes = [{ path: '', component: NoteListComponent }];

@NgModule({
  declarations: [NoteListComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class NoteModule {}
