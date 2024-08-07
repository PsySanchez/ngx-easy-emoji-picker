import { Component, EventEmitter, Output } from "@angular/core";
import { EmojiPickerService } from "./emoji-picker.service";

@Component({
  selector: "emoji-picker",
  standalone: true,
  imports: [],
  templateUrl: "./emoji-picker.component.html",
  styleUrl: "./emoji-picker.component.scss",
})
export class EmojiPicker {
  emojiList: Array<Emoji> = [];
  displayedEmojiList: Array<Emoji> = [];

  @Output() selectedEmoji: any = new EventEmitter<string>();

  emojiCategories = [
    { name: "smileys and people", icon: "😀" },
    { name: "food and drink", icon: "🍔" },
    { name: "activities", icon: "⚽" },
    { name: "travel and places", icon: "🚗" },
    { name: "objects", icon: "📦" },
    { name: "symbols", icon: "❤️" },
    { name: "flags", icon: "🏳️" },
  ];

  constructor(private _eps: EmojiPickerService) {}

  ngOnInit() {
    this._eps.getEmojis().subscribe((res: any) => {
      this.emojiList = res.map((emoji: any) => {
        return {
          category: emoji.category,
          group: emoji.group,
          htmlCode: emoji.htmlCode[0],
          name: emoji.name,
          unicode: emoji.unicode[0],
        };
      });

      this.displayedEmojiList = this.emojiList.slice(0, 100);
    });
  }

  selectEmoji(emoji: any) {
    this.selectedEmoji.next(emoji.htmlCode);
  }

  filterByCategory(category: string) {
    this.displayedEmojiList = this.emojiList.filter((emoji) =>
      emoji.category.includes(category)
    );
    this._scrollToTop();
  }

  private _scrollToTop() {
    const emojiWrapper = document.querySelector(".emoji-wrapper");

    if (emojiWrapper) {
      emojiWrapper.scrollTo(0, 0);
    }
  }
}

type Emoji = {
  category: string;
  group: string;
  htmlCode: Array<string>;
  name: string;
  unicode: Array<string>;
};
