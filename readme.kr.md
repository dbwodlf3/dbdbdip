# dbdbdip

코드 작성을 하면서, DB 문서 작성도 같이!

## Installation

```bash
```

## Usage

generate the documentation from `mytable.sql`, `myprocedure.sql` into `doc/`.

```bash
npm run start:server:watch
npm run build:client:watch

sqldoc -i mytable.sql myprocedure.sql -o doc/
```
