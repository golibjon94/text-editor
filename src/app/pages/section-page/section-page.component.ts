import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-section-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mt-5 pt-5 text-center">
      <div class="card shadow-sm p-5">
        <h1>Section {{sectionNumber}}</h1>
        <p class="lead text-muted">Hozircha bu sahifa bo'sh. Keyinchalik bu yerga boshqa demolar qo'shiladi.</p>
        <div class="mt-4">
          <i class="bi bi-tools display-1 text-primary"></i>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container { min-height: 70vh; }
    .card { border-radius: 15px; border: none; }
  `]
})
export class SectionPageComponent {
  sectionNumber: string = '';

  constructor() {
    // URL orqali qaysi section ekanligini aniqlash mumkin,
    // lekin hozircha oddiy komponent sifatida ishlatamiz yoki routerdan olamiz.
    const path = window.location.pathname;
    if (path.includes('section-2')) this.sectionNumber = '2';
    else if (path.includes('section-3')) this.sectionNumber = '3';
    else this.sectionNumber = 'X';
  }
}
