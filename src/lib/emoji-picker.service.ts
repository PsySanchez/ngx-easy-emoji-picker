import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmojiPickerService {
  constructor(private _http: HttpClient) {}

  getEmojis() {
    return this._http.get('https://api.github.com/emojis');
  }
}
