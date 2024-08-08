import { Injectable } from "@angular/core";

import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class EmojiPickerService {
  emojis: any;
  constructor(private _http: HttpClient) {}

  getEmojis() {
    if (this.emojis) {
      return new Observable((observer) => {
        observer.next(this.emojis);
        observer.complete();
      });
    }

    return this._http
      .get("https://storage.googleapis.com/ngx-easy-emoji-picker/emojis.json")
      .pipe(
        map((res: any) => {
          this.emojis = res;
          return this.emojis;
        })
      );
  }
}
