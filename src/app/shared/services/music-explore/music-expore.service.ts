import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  filter,
  forkJoin,
  Observable,
  shareReplay,
  switchMap,
} from 'rxjs';
import { Album, Artist, DeezerChartResponse, DeezerSearchResponse, Track } from '../../models/music-explore.models';

@Injectable({
  providedIn: 'root',
})
export class MusicExploreService {
  private http = inject(HttpClient);
  private exploreMusicApiUrl = '/deezer-api/chart';
  private allSearchEndPoint = '/deezer-api/search';
  private cache$?: Observable<DeezerChartResponse>;
  private searchSubject = new BehaviorSubject<string>('');

  search$ = this.searchSubject.pipe(
    debounceTime(400),
    distinctUntilChanged(),
    filter((query) => query.length > 0),
    switchMap((query) =>
      this.http.get<DeezerChartResponse>(`${this.allSearchEndPoint}?q=${query}`),
    ),
  );

  getExploreData(): Observable<DeezerChartResponse> {
    if (!this.cache$) {
      this.cache$ = this.http
        .get<DeezerChartResponse>(this.exploreMusicApiUrl)
        .pipe(shareReplay(1));
    }
    return this.cache$;
  }

  getAllInformationSearch(query: string) {
    this.searchSubject.next(query);
  }

  searchAll(query: string): Observable<DeezerSearchResponse> {
    return forkJoin({
      tracks: this.http.get<{data: Track[]}>(`/deezer-api/search/track?q=${query}`),
      artists: this.http.get<{data: Artist[]}>(`/deezer-api/search/artist?q=${query}`),
      albums: this.http.get<{data: Album[]}>(`/deezer-api/search/album?q=${query}`),
    });
  }

  clearCache() {
    this.cache$ = undefined;
  }
}
