## ngx-easy-emoji-picker

![Example Image](https://github.com/PsySanchez/ngx-easy-emoji-picker/blob/master/src/emoji-picker.png)

An Angular library to easily pick and use emojis in your application.

## Description

This library provides a user-friendly emoji picker component that you can integrate into your Angular applications. It includes a comprehensive set of emojis that you can use for various purposes, such as in chat applications, comment sections, and more.

### Emoji Data Source

The emoji data used in this library is sourced from the [EmojiHub](https://github.com/cheatsnake/emojihub) project by cheatsnake. EmojiHub is an open-source project that provides a large collection of emojis categorized for easy access.

You can visit the EmojiHub GitHub repository for more information:
[https://github.com/cheatsnake/emojihub](https://github.com/cheatsnake/emojihub)

## Installation

```bash
npm install ngx-easy-emoji-picker
```

## Usage

1.  Import

```typescript
import { EmojiPicker } from "ngx-easy-emoji-picker";

@NgModule({
  imports: [EmojiPicker],
})
export class AppModule {}
```

2. Use it in your template

```html
<emoji-picker (selectedEmoji)="onEmojiSelect($event)"> </emoji-picker>
```

## Example

app.component.ts

```typescript
import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { EmojiPicker } from "ngx-easy-emoji-picker";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, EmojiPicker],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  title = 'my-project';

  selectedEmoji = '';

  onEmojiSelected(emoji: string) {
    this.selectedEmoji = emoji;
  }
}
```

app.component.html

```html
<emoji-picker (selectedEmoji)="onEmojiSelected($event)"> </emoji-picker>

<span [innerHTML]="selectedEmoji"></span>
```