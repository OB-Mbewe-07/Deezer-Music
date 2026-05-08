import { Injectable } from '@angular/core';
import { openDB } from 'idb';
import { Playlist } from '../../models/favourite-music.models';
import { IDBPDatabase } from 'idb';

@Injectable({
  providedIn: 'root',
})
export class IndexedDbService {
  private readonly DB_NAME = 'not-spotify-app';
  private readonly STORE_NAME = 'playlists';
  private readonly VERSION = 1;

  private dbPromise = openDB(this.DB_NAME, this.VERSION, {
    upgrade(db : IDBPDatabase) {
      db.createObjectStore('playlists', { keyPath: 'id' });
    },
  });

  async getAll(): Promise<Playlist[]> {
    return (await this.dbPromise).getAll(this.STORE_NAME);
  }

  async save(playlist: Playlist): Promise<void> {
    await (await this.dbPromise).put(this.STORE_NAME, playlist);
  }

  async delete(id: string): Promise<void> {
    await (await this.dbPromise).delete(this.STORE_NAME, id);
  }

  async clearAll(): Promise<void> {
    await (await this.dbPromise).clear(this.STORE_NAME);
  }
}
