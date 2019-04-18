import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-note-single',
  templateUrl: './note-single.component.html',
  styleUrls: ['./note-single.component.less'],
})
export class NoteSingleComponent implements OnInit {
  isLoading = false;

  constructor(private readonly store: Store<any>, private readonly router: Router) {}

  ngOnInit() {}

  save(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }

  goBack() {
    this.router.navigateByUrl('');
  }
}
