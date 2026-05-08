import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'releaseYear', standalone: true })
export class ReleaseYearPipe implements PipeTransform {
  transform(date: string): string {
    return new Date(date).getFullYear().toString();
  }
}