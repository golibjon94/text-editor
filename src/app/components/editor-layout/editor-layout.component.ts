import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RichEditorComponent } from '../rich-editor/rich-editor.component';

@Component({
  selector: 'app-editor-layout',
  standalone: true,
  imports: [CommonModule, RichEditorComponent],
  templateUrl: './editor-layout.component.html',
  styleUrls: ['./editor-layout.component.scss']
})
export class EditorLayoutComponent {}
