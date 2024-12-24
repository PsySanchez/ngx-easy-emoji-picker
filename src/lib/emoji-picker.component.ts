import {
  Component,
  input,
  OnChanges,
  OnDestroy,
  OnInit,
  output,
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
  width = input<string>("230px");
  height = input<string>("350px");
  showCategories = input<boolean>(true);
  selectedCategory = input<CategoriesType>("smileys and people");

  categoriesPosition = input<CategoriesPosition>("bottom");

  selectedEmoji = output<string>();

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
    emojiContainer: {
      flexDirection: "column",
    },
    emojiWrapper: {
      width: "230px",
      height: "350px",
    },
    emojiButtonsWrapper: {
      flexDirection: "row",
    },
  };

  private _subscription: Subscription = new Subscription();

  constructor(private _eps: EmojiPickerService) {}

  ngOnChanges() {
    this.style = {
      ...this.style,
      emojiWrapper: {
        width: this.width(),
        height: this.height(),
      },
    };

    this._setPositions(this.categoriesPosition());
  }

  ngOnInit() {
    this._getEmojis();
  }

  selectEmoji(emoji: any) {
    this.selectedEmoji.emit(emoji.htmlCode);
  }

  filterByCategory(category: string) {
    this.displayedEmojiList = this.emojiList.filter((emoji) =>
      emoji.category.includes(category)
    );
    this._scrollToTop();
  }

  private _getEmojis() {
    this._subscription.add(
      this._eps.getEmojis().subscribe((res: any) => {
        this.emojiList = res.map((emoji: any) => {
          return {
            category: emoji.category,
            htmlCode: emoji.htmlCode,
            name: emoji.name,
          };
        });

        const uniqueEmojis = Array.from(
          new Map(
            this.emojiList.map((emoji) => [
              emoji.htmlCode,
              { category: emoji.category, htmlCode: emoji.htmlCode },
            ])
          ).values()
        );

        console.log(
          "🚀 ~ EmojiPicker ~ this.emojiList=res.map ~ uniqueEmojis:",
          uniqueEmojis
        );

        this.filterByCategory(this.selectedCategory());
      })
    );
  }

  private _scrollToTop() {
    const emojiWrapper = document.querySelector(".emoji-wrapper");

    if (emojiWrapper) {
      emojiWrapper.scrollTo(0, 0);
    }
  }

  private _setPositions(position: string): void {
    switch (position) {
      case "top":
        this.style.emojiContainer.flexDirection = "column";
        this.style.emojiButtonsWrapper.flexDirection = "row";
        break;
      case "bottom":
        this.style.emojiContainer.flexDirection = "column-reverse";
        this.style.emojiButtonsWrapper.flexDirection = "row";
        break;
      case "left":
        this.style.emojiContainer.flexDirection = "row";
        this.style.emojiButtonsWrapper.flexDirection = "column";
        break;
      case "right":
        this.style.emojiContainer.flexDirection = "row-reverse";
        this.style.emojiButtonsWrapper.flexDirection = "column";
        break;
    }
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}

type Emoji = {
  category: string;
  htmlCode: Array<string>;
  name: string;
};

type CategoriesPosition = "top" | "bottom" | "left" | "right";

type CategoriesType =
  | "smileys and people"
  | "food and drink"
  | "activities"
  | "travel and places"
  | "objects"
  | "symbols"
  | "flags";
