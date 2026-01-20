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
    const { $from, $to } = selection;

    // Tanlangan matn ichidagi barcha belgilarni tekshirish (yoki kursor turgan joydagi)
    const marks = $from.marks();

    const fontFamilyMark = marks.find((m: any) => m.type.name === 'font_family');
    this.currentFontFamily = fontFamilyMark ? fontFamilyMark.attrs.family : 'Arial';

    const fontSizeMark = marks.find((m: any) => m.type.name === 'font_size');
    this.currentFontSize = fontSizeMark ? fontSizeMark.attrs.size : '12pt';
  }

  execute(command: string, value?: any): void {
    const editor = this.editor();
    if (!editor) return;

    const commands = editor.commands;

    switch(command) {
      case 'bold': commands.toggleBold().exec(); break;
      case 'italic': commands.toggleItalics().exec(); break;
      case 'underline': commands.toggleUnderline().exec(); break;
      case 'strike': commands.toggleStrike().exec(); break;
      case 'bullet_list': commands.toggleBulletList().exec(); break;
      case 'ordered_list': commands.toggleOrderedList().exec(); break;
      case 'align_left': commands.align('left').exec(); break;
      case 'align_center': commands.align('center').exec(); break;
      case 'align_right': commands.align('right').exec(); break;
      case 'align_justify': commands.align('justify').exec(); break;
      case 'undo': (commands as any).undo().exec(); break;
      case 'redo': (commands as any).redo().exec(); break;
      case 'indent': commands.indent().exec(); break;
      case 'outdent': commands.outdent().exec(); break;
    }
    editor.view.focus();
  }

  insertLink(): void {
    const editor = this.editor();
    const url = prompt('Enter URL', 'https://');
    if (url && editor) {
      editor.commands.insertLink(url, { href: url }).exec();
      editor.view.focus();
    }
  }

  insertImage(): void {
    const editor = this.editor();
    const url = prompt('Enter Image URL', 'https://picsum.photos/200/300');
    if (url && editor) {
      editor.commands.insertImage(url).exec();
      editor.view.focus();
    }
  }

  private applyMark(markName: string, attrs: any): void {
    const view = this.editor().view;
    const { state } = view;
    const { schema, tr, selection } = state;
    const { from, to } = selection;

    const markType = schema.marks[markName];
    if (!markType) return;

    if (from === to) {
      tr.addStoredMark(markType.create(attrs));
    } else {
      tr.addMark(from, to, markType.create(attrs));
    }
    view.dispatch(tr);
    view.focus();
  }

  setFontSize(size: string): void {
    this.currentFontSize = size;
    this.applyMark('font_size', { size });
  }

  setFontFamily(family: string): void {
    this.currentFontFamily = family;
    this.applyMark('font_family', { family });
  }

  setTextColor(color: string): void {
    const editor = this.editor();
    editor.commands.textColor(color).exec();
    editor.view.focus();
  }

  setBackgroundColor(color: string): void {
    const editor = this.editor();
    editor.commands.backgroundColor(color).exec();
    editor.view.focus();
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
