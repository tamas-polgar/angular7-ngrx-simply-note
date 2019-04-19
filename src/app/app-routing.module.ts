import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'note', loadChildren: () => import('./modules/note/note.module').then(m => m.NoteModule) },
  {
    path: '',
    redirectTo: 'note',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
