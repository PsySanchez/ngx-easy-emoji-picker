import { Injectable } from "@angular/core";

import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class EmojiPickerService {
  emojis: any;

  constructor() {
    this.loadEmojis();
  }

  async loadEmojis() {
    const emojiData = await import("../emojis.json");
    this.emojis = emojiData.default || emojiData;
  }

  getEmojis() {
    if (!this.emojis) {
      return new Observable((observer) => {
        this.loadEmojis().then(() => {
          observer.next(this.emojis);
          observer.complete();
        });
      });
    } else {
      return new Observable((observer) => {
        observer.next(this.emojis);
        observer.complete();
      });
    }
  }

  //   'https://emojihub.yurace.pro/api/all'
}
