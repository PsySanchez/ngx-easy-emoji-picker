import { Injectable } from "@angular/core";

import { HttpClient } from "@angular/common/http";
import { from, map, Observable, of, tap } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class EmojiPickerService {
  emojis: any;
  constructor(private readonly _http: HttpClient) { }

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

  getEmojiFromJson(): Observable<any> {
    if (this.emojis) {
      return of(this.emojis);
    }

    return from(import('../emojis.json')).pipe(
      map(module => module.default || module),
      tap(data => this.emojis = data)
    );
  }

  async loadEmojis() {
    const emojiData = await import("../emojis.json");
    this.emojis = emojiData.default || emojiData;
  }
}
