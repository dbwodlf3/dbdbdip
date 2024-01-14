# sqlDoc

Hello Sql doc

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
