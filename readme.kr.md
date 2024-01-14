# sqlDoc

SQLDoc은 Database와 관련된 문서를 효과적으로 생성하고 관리하는게 목표입니다.
이를 통해서 거대한 Database에 대한 하나의 직관적인 Insight와 커뮤니케이션에서 오는 문제를 해결하고자 합니다.

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
