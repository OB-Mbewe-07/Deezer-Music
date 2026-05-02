import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { debounceTime, distinctUntilChanged, Observable, shareReplay, Subject, switchMap } from 'rxjs';
import { DeezerChartResponse } from '../../models/music-explore.models';

@Injectable({
  providedIn: 'root',
})
export class MusicExploreService {
  private http = inject(HttpClient);
  private exploreMusicApiUrl = '/deezer-api/chart';
  private searchSubject = new Subject<string>();
  private cache$?: Observable<DeezerChartResponse>;

  getExploreData(): Observable<DeezerChartResponse> {
    if (!this.cache$) {
      this.cache$ = this.http
        .get<DeezerChartResponse>(this.exploreMusicApiUrl)
        .pipe(shareReplay(1));
    }
    return this.cache$;
  }

  search$ = this.searchSubject.pipe(
    debounceTime(400),
    distinctUntilChanged(),
    switchMap((query) => this.http.get(`/deezer-api/search?q=${query}`)),
  );

  getAllInformationSearch(query: string) {
    this.searchSubject.next(query);
  }

  clearCache() {
    this.cache$ = undefined;
  }
}
