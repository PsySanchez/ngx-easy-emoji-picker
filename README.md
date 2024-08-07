## ngx-emoji-picker

![Example Image](https://github.com/PsySanchez/ngx-easy-image-drawing/blob/master/emoji-picker.png)

Angular library that provides a component for easily integrating emoji selection into your web applications. It offers a user-friendly interface for browsing and selecting emojis, which can be customized to match your application's design.

## Installation

```bash
npm install ngx-emoji-picker
```

## Usage

1.  Import

```typescript
import { EmojiPicker } from "ngx-emoji-picker";

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
import { EmojiPicker } from "ngx-emoji-picker";

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