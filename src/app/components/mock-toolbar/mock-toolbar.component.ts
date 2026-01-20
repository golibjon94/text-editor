import { Component, input, output } from '@angular/core';
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

  fontSizes = ['8pt', '10pt', '12pt', '14pt', '18pt', '24pt', '36pt'];

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
     // ngx-editor font size might need a plugin or specific schema,
     // for now we'll just show the UI interaction
     console.log('Set font size:', size);
  }

  setTextColor(color: string): void {
    this.editor().commands.textColor(color).exec();
  }

  setBackgroundColor(color: string): void {
    this.editor().commands.backgroundColor(color).exec();
  }
}
