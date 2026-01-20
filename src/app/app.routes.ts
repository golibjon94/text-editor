import { Routes } from '@angular/router';
import { WordPageComponent } from './pages/word-page/word-page.component';
import { SectionPageComponent } from './pages/section-page/section-page.component';
import { ImageResizerComponent } from './pages/image-resizer/image-resizer.component';

export const routes: Routes = [
  { path: '', redirectTo: 'word-demo', pathMatch: 'full' },
  { path: 'word-demo', component: WordPageComponent },
  { path: 'image-resizer', component: ImageResizerComponent },
  { path: 'section-3', component: SectionPageComponent },
  { path: '**', redirectTo: 'word-demo' }
];
