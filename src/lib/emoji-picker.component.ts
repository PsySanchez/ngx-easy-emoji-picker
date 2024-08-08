import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";
import { EmojiPickerService } from "./emoji-picker.service";
import { Subscription } from "rxjs";

@Component({
  selector: "emoji-picker",
  standalone: true,
  imports: [],
  templateUrl: "./emoji-picker.component.html",
  styleUrl: "./emoji-picker.component.scss",
})
export class EmojiPicker implements OnChanges, OnInit, OnDestroy {
  @Input() width: string = "";
  @Input() height: string = "";

  @Output() selectedEmoji: any = new EventEmitter<string>();

  emojiList: Array<Emoji> = [];
  displayedEmojiList: Array<Emoji> = [];

  emojiCategories = [
    { name: "smileys and people", icon: "😀" },
    { name: "food and drink", icon: "🍔" },
    { name: "activities", icon: "⚽" },
    { name: "travel and places", icon: "🚗" },
    { name: "objects", icon: "📦" },
    { name: "symbols", icon: "❤️" },
    { name: "flags", icon: "🏳️" },
  ];

  style = {
    width: "230px",
    height: "350px",
  };

  private _subscription: Subscription = new Subscription();

  constructor(private _eps: EmojiPickerService) {}

  ngOnChanges() {
    this.style = {
      width: this.width,
      height: this.height,
    };
  }

  ngOnInit() {
    this._subscription.add(
      this._eps.getEmojis().subscribe((res: any) => {
        this.emojiList = res.map((emoji: any) => {
          return {
            category: emoji.category,
            htmlCode: emoji.htmlCode,
            name: emoji.name,
          };
        });

        this.filterByCategory("smileys and people");
      })
    );
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

  ngOnDestroy() {
    this.selectedEmoji.unsubscribe();
    this._subscription.unsubscribe();
  }
}

type Emoji = {
  category: string;
  htmlCode: Array<string>;
  name: string;
};
