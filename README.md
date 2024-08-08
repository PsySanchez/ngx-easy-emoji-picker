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

**Mandatory module import HttpClientModule**

1.  Import

app.module.ts

```typescript
import { EmojiPicker } from "ngx-easy-emoji-picker";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  imports: [EmojiPicker, HttpClientModule],
})
export class AppModule {}
```

**For new version of angular**

app.config.ts

```typescript
import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";
import { provideHttpClient } from "@angular/common/http";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
  ],
};
```

2. Use it in your template

```html
<emoji-picker
  (selectedEmoji)="onEmojiSelected($event)"
  width="230px"
  height="350px"
  [showCategories]="true"
  selectedCategory="smileys and people"
  categoriesPosition="bottom"
>
</emoji-picker>
```

## Options

```markdown
| Option              | Type      | Mandatory | Description                                                                                                   |
| ------------------- | --------- | --------- | ------------------------------------------------------------------------------------------------------------- |
| height              | number    | false     | The height of the container holding the emojis in pixels. If not specified, a default height will be used.    |
| width               | number    | false     | The width of the container holding the emojis in pixels. If not specified, a default width will be used.      |
| showCategories      | boolean   | false     | Determines whether to display emoji categories. Set to `true` to show categories, `false` to hide them.       |
| selectedCategory    | string    | false     | The currently selected emoji category. This value is used to filter and display emojis accordingly.           |
| categoriesPosition  | string    | false     | Specifies the position of the emoji categories within the component (e.g., 'top', 'bottom', 'left', 'right'). |
```

## Categories

```markdown
    ["smileys and people", "food and drink", "activities", "travel and places", "objects",  "symbols", "flags"]
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
  title = "my-project";

  selectedEmoji = "";

  onEmojiSelected(emoji: string) {
    this.selectedEmoji = emoji;
  }
}
```

app.component.html

```html
<emoji-picker
  (selectedEmoji)="onEmojiSelected($event)"
  width="230px"
  height="350px"
  [showCategories]="true"
  selectedCategory="smileys and people"
  categoriesPosition="bottom"
>
</emoji-picker>

<span [innerHTML]="selectedEmoji"></span>
```
