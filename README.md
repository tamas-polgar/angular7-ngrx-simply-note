# SimplyNote

Simple app for taking notes

Using Angular & NgRx

## Demo

https://smply-note.web.app/

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.

## Code scaffolding

```

ng g store AppState --root --module app.module.ts

ng g action modules/note/state/note

ng g reducer modules/note/state/note --spec=false --flat=false --module modules/note/note.module.ts

ng g effect modules/note/state/note --spec=false --flat=false --module modules/note/note.module.ts

```

## Dependencies and config

```

npm i @ngrx/schematics --save-dev

npm install @ngrx/{store,effects,entity,store-devtools,router-store} --save

npm i --save-dev ngrx-store-freeze

```
