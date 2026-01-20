import { Component } from '@angular/core';
import { EditorLayoutComponent } from './components/editor-layout/editor-layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [EditorLayoutComponent],
  template: `<app-editor-layout></app-editor-layout>`,
  styles: []
})
export class App {}
