import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorLayoutComponent } from '../../components/editor-layout/editor-layout.component';

@Component({
  selector: 'app-word-page',
  standalone: true,
  imports: [CommonModule, EditorLayoutComponent],
  template: `<app-editor-layout></app-editor-layout>`,
  styles: []
})
export class WordPageComponent {}
