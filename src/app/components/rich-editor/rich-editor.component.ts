import { Component, OnDestroy, OnInit, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Editor, NgxEditorModule, toHTML } from 'ngx-editor';
import { MockToolbarComponent } from '../mock-toolbar/mock-toolbar.component';
import schema from '../../custom-schema';

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
    <h2 style="text-align: center"><span style="font-family: Times New Roman">Welcome to the Rich Text Editor</span></h2>
    <p style="text-align: center"><span style="font-size: 14pt">This is a <b>Word-like</b> editor built with <i>Angular 20</i>, <i>Signals</i>, and <i>ngx-editor</i>.</span></p>
    <p>Try out the toolbar features above! You can now change <b>font sizes</b> and <b>font families</b> just like in Microsoft Word.</p>
    <ul>
      <li><span style="font-family: Courier New">Standalone components</span></li>
      <li><span style="color: blue">Signals for state management</span></li>
      <li><span style="background-color: yellow">ng-bootstrap for UI elements</span></li>
    </ul>
  `;

  constructor() {
    this.editor = new Editor({
      schema: schema
    });
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
