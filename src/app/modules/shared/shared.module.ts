import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { en_US, NgZorroAntdModule, NZ_I18N, NzI18nModule } from 'ng-zorro-antd';

@NgModule({
  declarations: [],
  imports: [CommonModule, ReactiveFormsModule, NgZorroAntdModule, NzI18nModule],

  providers: [{ provide: NZ_I18N, useValue: en_US }],
  exports: [NgZorroAntdModule, NzI18nModule, ReactiveFormsModule],
})
export class SharedModule {}
