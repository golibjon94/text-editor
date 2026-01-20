import { Component, input, output, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Editor } from 'ngx-editor';
import { NgbDropdownModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-mock-toolbar',
  standalone: true,
  imports: [CommonModule, NgbDropdownModule, NgbTooltipModule],
  templateUrl: './mock-toolbar.component.html',
  styleUrls: ['./mock-toolbar.component.scss']
})
export class MockToolbarComponent {
  editor = input.required<Editor>();

  activeTab = 'Home';
  tabs = ['File', 'Home', 'Insert', 'Layout', 'References', 'Review', 'View', 'Help'];

  fontSizes = ['8pt', '9pt', '10pt', '11pt', '12pt', '14pt', '16pt', '18pt', '20pt', '22pt', '24pt', '26pt', '28pt', '36pt', '48pt', '72pt'];
  fontFamilies = [
    'Arial',
    'Calibri',
    'Cambria',
    'Courier New',
    'Georgia',
    'Impact',
    'Segoe UI',
    'Tahoma',
    'Times New Roman',
    'Trebuchet MS',
    'Verdana'
  ];

  currentFontSize = '12pt';
  currentFontFamily = 'Arial';

  constructor() {
    effect((onCleanup) => {
      const editor = this.editor();
      if (!editor) return;

      const sub = editor.update.subscribe((viewUpdate: any) => {
        this.updateToolbarState(viewUpdate.state);
      });

      onCleanup(() => sub.unsubscribe());
    });
  }

  updateToolbarState(state: any) {
    const { selection } = state;
    const { $from } = selection;

    // Get marks at cursor
    const marks = $from.marks();

    const fontFamilyMark = marks.find((m: any) => m.type.name === 'font_family');
    this.currentFontFamily = fontFamilyMark ? fontFamilyMark.attrs.family : 'Arial';

    const fontSizeMark = marks.find((m: any) => m.type.name === 'font_size');
    this.currentFontSize = fontSizeMark ? fontSizeMark.attrs.size : '12pt';
  }

  execute(command: string, value?: any): void {
    // In a real ngx-editor setup, we'd use the editor commands
    // For this mock toolbar, we'll trigger the editor's internal commands if possible
    // or just emit actions if we were building a fully custom one.
    // ngx-editor usually has its own toolbar, but the requirement is a mock toolbar component.

    switch(command) {
      case 'bold': this.editor().commands.toggleBold().exec(); break;
      case 'italic': this.editor().commands.toggleItalics().exec(); break;
      case 'underline': this.editor().commands.toggleUnderline().exec(); break;
      case 'strike': this.editor().commands.toggleStrike().exec(); break;
      case 'bullet_list': this.editor().commands.toggleBulletList().exec(); break;
      case 'ordered_list': this.editor().commands.toggleOrderedList().exec(); break;
      case 'align_left': this.editor().commands.align('left').exec(); break;
      case 'align_center': this.editor().commands.align('center').exec(); break;
      case 'align_right': this.editor().commands.align('right').exec(); break;
      case 'align_justify': this.editor().commands.align('justify').exec(); break;
      case 'undo': (this.editor() as any).commands.undo().exec(); break;
      case 'redo': (this.editor() as any).commands.redo().exec(); break;
      case 'indent': this.editor().commands.indent().exec(); break;
      case 'outdent': this.editor().commands.outdent().exec(); break;
    }
    this.editor().view.focus();
  }

  insertLink(): void {
    const url = prompt('Enter URL', 'https://');
    if (url) {
      this.editor().commands.insertLink(url, { href: url }).exec();
    }
  }

  insertImage(): void {
    const url = prompt('Enter Image URL', 'https://picsum.photos/200/300');
    if (url) {
       this.editor().commands.insertImage(url).exec();
    }
  }

  setFontSize(size: string): void {
    this.currentFontSize = size;
    const view = this.editor().view;
    const { state } = view;
    const { schema } = state;
    const { from, to } = state.selection;

    const markType = schema.marks['font_size'];
    if (!markType) return;

    const tr = state.tr;
    if (from === to) {
      tr.addStoredMark(markType.create({ size }));
    } else {
      tr.addMark(from, to, markType.create({ size }));
    }
    view.dispatch(tr);
    view.focus();
  }

  setFontFamily(family: string): void {
    this.currentFontFamily = family;
    const view = this.editor().view;
    const { state } = view;
    const { schema } = state;
    const { from, to } = state.selection;

    const markType = schema.marks['font_family'];
    if (!markType) return;

    const tr = state.tr;
    if (from === to) {
      tr.addStoredMark(markType.create({ family }));
    } else {
      tr.addMark(from, to, markType.create({ family }));
    }
    view.dispatch(tr);
    view.focus();
  }

  setTextColor(color: string): void {
    this.editor().commands.textColor(color).exec();
  }

  setBackgroundColor(color: string): void {
    this.editor().commands.backgroundColor(color).exec();
  }

  setLayout(mode: 'portrait' | 'landscape'): void {
    alert(`Layout changed to ${mode}`);
  }

  toggleRule(): void {
    alert('Ruler toggled');
  }

  zoom(level: number): void {
    alert(`Zoom set to ${level}%`);
  }

  showHelp(): void {
    alert('Word-like Editor Help\n\nUse tabs to navigate through functions.');
  }
}
