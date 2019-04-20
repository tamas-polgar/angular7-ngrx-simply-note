import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'note',
    loadChildren: './modules/note/note.module#NoteModule',
  },
  {
    path: '',
    redirectTo: 'note',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'note',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
