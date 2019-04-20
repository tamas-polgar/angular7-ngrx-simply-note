import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { en_US, NgZorroAntdModule, NZ_I18N } from 'ng-zorro-antd';

@NgModule({
  declarations: [],
  imports: [CommonModule, ReactiveFormsModule, NgZorroAntdModule],

  providers: [{ provide: NZ_I18N, useValue: en_US }],
  exports: [NgZorroAntdModule, ReactiveFormsModule],
})
export class SharedModule {}
