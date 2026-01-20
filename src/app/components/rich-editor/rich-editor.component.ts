import { Component, OnDestroy, OnInit, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Editor, NgxEditorModule, toHTML } from 'ngx-editor';
import { MockToolbarComponent } from '../mock-toolbar/mock-toolbar.component';

@Component({
  selector: 'app-rich-editor',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxEditorModule, MockToolbarComponent],
  templateUrl: './rich-editor.component.html',
  styleUrls: ['./rich-editor.component.scss']
})
export class RichEditorComponent implements OnInit, OnDestroy {
  editor: Editor;

  // Angular Signal for state
  editorContent = signal<string>('');

  // Mock content
  private readonly initialContent = `
    <h2>Welcome to the Rich Text Editor</h2>
    <p>This is a <b>Word-like</b> editor built with <i>Angular 20</i>, <i>Signals</i>, and <i>ngx-editor</i>.</p>
    <ul>
      <li>Standalone components</li>
      <li>Signals for state management</li>
      <li>ng-bootstrap for UI elements</li>
    </ul>
    <p>Try out the toolbar features above!</p>
  `;

  constructor() {
    this.editor = new Editor();
    this.editorContent.set(this.initialContent);

    // Update signal when editor content changes
    this.editor.valueChanges.subscribe(value => {
       // value is a Prosemirror Node, we convert to HTML string
       const html = toHTML(value);
       this.editorContent.set(html);
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
