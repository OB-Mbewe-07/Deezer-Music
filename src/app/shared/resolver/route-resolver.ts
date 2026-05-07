import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { AlbumDetailsResponse } from '../models/music-explore.models';
import { MusicExploreService } from '../services/music-explore/music-expore.service';

export const albumResolver: ResolveFn<AlbumDetailsResponse> = (route) => {
  return inject(MusicExploreService).getAlbumById(Number(route.paramMap.get('id')));
};