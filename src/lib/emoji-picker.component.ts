import { Component } from '@angular/core';
import { EmojiPickerService } from './emoji-picker.service';
import { map } from 'rxjs';

@Component({
  selector: 'emoji-picker',
  standalone: true,
  imports: [],
  templateUrl: './emoji-picker.component.html',
  styleUrl: './emoji-picker.component.scss',
})
export class EmojiPicker {
  emojiList: { name: string; url: any }[] = [];
  displayedEmojiList: { name: string; url: any }[] = [];
  emojiGroup: { name: string; emojis: { name: string; url: any }[] }[] = [];

  emojiCategories = [
    { name: 'smiles', icon: '😀' },
    { name: 'foods', icon: '🍔' },
    { name: 'flags', icon: '🏳️' },
    { name: 'hearts', icon: '❤️' },
    { name: 'hands', icon: '👍' },
    { name: 'arrows', icon: '➡️' },
    { name: 'animals', icon: '🐶' },
    { name: 'clocks', icon: '🕒' },
  ];

  constructor(private _eps: EmojiPickerService) {}

  selectEmoji(emoji: any) {
    console.log(emoji);
  }

  ngOnInit() {
    this._scrollEventListner();

    this._eps.getEmojis().subscribe((res: any) => {
      this.emojiList = Object.keys(res).map((key) => {
        return {
          name: key,
          url: res[key],
        };
      });

      this.displayedEmojiList = this.emojiList.slice(0, 100);
    });
  }

  selectEmojiCategory(category: string) {
    this.displayedEmojiList = this.emojiList.filter((emoji) =>
      emoji.name.includes(category)
    );
  }

  private _scrollEventListner() {
    const emojiWrapper = document.querySelector('.emoji-wrapper');

    if (emojiWrapper) {
      emojiWrapper.addEventListener('scroll', () => {
        if (
          emojiWrapper.scrollTop + emojiWrapper.clientHeight >=
          emojiWrapper.scrollHeight
        ) {
          this.displayedEmojiList = this.displayedEmojiList.concat(
            this.emojiList.slice(
              this.displayedEmojiList.length,
              this.displayedEmojiList.length + 50
            )
          );
        }
      });
    }
  }

  private _filterByKeyword(emojiList: Array<Emoji>, keyword: string) {
    return emojiList.filter((emoji: Emoji) => emoji.name.includes(keyword));
  }
}

type Emoji = {
  name: string;
  url: string;
};
