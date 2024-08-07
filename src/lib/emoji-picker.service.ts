import { Injectable } from "@angular/core";

import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class EmojiPickerService {
  emojis: any;
  constructor(private _http: HttpClient) {}

  getEmojis() {
    return this._http.get(
      "https://storage.googleapis.com/ngx-easy-emoji-picker/emojis.json"
    );
  }
}
