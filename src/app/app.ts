import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top shadow-sm">
      <div class="container">
        <a class="navbar-brand d-flex align-items-center" routerLink="/">
          <i class="bi bi-cpu-fill me-2 text-info"></i>
          <span class="fw-bold">Alpomish AI Demo</span>
        </a>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <a class="nav-link px-3" routerLink="/word-demo" routerLinkActive="active">
                <i class="bi bi-file-earmark-word me-1"></i> Section 1 (Word)
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link px-3" routerLink="/image-resizer" routerLinkActive="active">
                <i class="bi bi-image me-1"></i> Image Resizer
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link px-3" routerLink="/section-3" routerLinkActive="active">
                <i class="bi bi-grid-1x2 me-1"></i> Section 3
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <main class="content-area pt-5">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    .content-area {
      min-height: 100vh;
      background-color: #f8f9fa;
    }
    .nav-link {
      transition: all 0.3s ease;
      font-weight: 500;
    }
    .nav-link.active {
      color: #0dcaf0 !important;
      border-bottom: 2px solid #0dcaf0;
    }
    .navbar-brand i {
      font-size: 1.5rem;
    }
  `]
})
export class App {}
