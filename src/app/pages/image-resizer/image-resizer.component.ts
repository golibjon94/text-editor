import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-image-resizer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './image-resizer.component.html',
  styleUrls: ['./image-resizer.component.scss']
})
export class ImageResizerComponent {
  originalImage = signal<string | null>(null);
  resizedImageUrl = signal<string | null>(null);
  isDragging = signal<boolean>(false);
  originalFileName: string = 'image';

  width: number = 0;
  height: number = 0;
  originalWidth: number = 0;
  originalHeight: number = 0;
  aspectRatio: number = 1;
  maintainAspectRatio: boolean = true;

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.handleFile(file);
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(true);
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(false);
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(false);

    const file = event.dataTransfer?.files[0];
    if (file && file.type.startsWith('image/')) {
      this.handleFile(file);
    }
  }

  private handleFile(file: File) {
    this.originalFileName = file.name.split('.').slice(0, -1).join('.') || 'image';

    const reader = new FileReader();
    reader.onload = (e: any) => {
      const img = new Image();
      img.onload = () => {
        this.originalWidth = img.width;
        this.originalHeight = img.height;
        this.width = img.width;
        this.height = img.height;
        this.aspectRatio = img.width / img.height;
        this.originalImage.set(e.target.result);
        this.resizedImageUrl.set(null);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  reset() {
    this.originalImage.set(null);
    this.resizedImageUrl.set(null);
    this.width = 0;
    this.height = 0;
    this.originalWidth = 0;
    this.originalHeight = 0;
    this.originalFileName = 'image';
    this.isDragging.set(false);
  }

  onDimensionChange(type: 'width' | 'height') {
    if (!this.maintainAspectRatio) {
      // If we don't maintain aspect ratio, we still need to update it
      // in case the user turns it back on later with current dimensions
      if (this.width > 0 && this.height > 0) {
        this.aspectRatio = this.width / this.height;
      }
      return;
    }

    if (type === 'width') {
      this.height = Math.round(this.width / this.aspectRatio);
    } else {
      this.width = Math.round(this.height * this.aspectRatio);
    }
  }

  resizeImage() {
    if (!this.originalImage()) return;

    const canvas = document.createElement('canvas');
    canvas.width = this.width;
    canvas.height = this.height;

    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      ctx?.drawImage(img, 0, 0, this.width, this.height);
      this.resizedImageUrl.set(canvas.toDataURL('image/png'));
    };
    img.src = this.originalImage()!;
  }

  getDownloadFileName(): string {
    const w = Math.round(this.width);
    const h = Math.round(this.height);
    return `${this.originalFileName}_${w}x${h}.png`;
  }
}
