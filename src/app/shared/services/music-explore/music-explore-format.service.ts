import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MusicFormatService {
  formatDuration(seconds: number): string {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec.toString().padStart(2, '0')}`;
  }
}
