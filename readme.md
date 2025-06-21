# dbdbdip

Comment Base Database Document Generator.

## Demo

## Installation

```bash
npm i --save-dev dbdbdip
```

## Usage

```bash
# generate the documentation from `mytable.sql`, `myprocedure.sql` into `docdoc/`.
npm dbdbdip -i mytable.sql myprocedure.sql -o docdoc
```

```bash
# generate the documentation from `*.db.ts` into `docdoc/`.
npm dbdbdip -i *.db.ts -o docdoc
```

### Typescript Interface
```ts
/**
 * @collection User
 * Represents a user in the system.
 * This interface defines the structure of a user document in the database.
 * @field _id [UNIQUE, FOREIGN KEY]
 * User Identifier
 * @field email [UNIQUE, INDEX]
 * User email address, this is used for login
 * @field password
 * User password
 * @field profile
 * User profile information
 */
export interface UserSchema {
    _id: number;
    email: string;
    password: string;
    /** 
     * @object Profile 
     * @field nickname
     * User nickname, this is used for display purposes
     * @field profileImage
     * User profile image URL, this is used for display purposes
    */
    profile: {
        nickname: string;
        profileImage?: string;
        /**
         * @object Address
         * This is just test.
         * @field street
         * User street address
         * @field city
         * User city
         * @field country
         * User country
         */
        address: {
            street: string;
            city: string;
            country: string;
        }
    };
    createdAt: Date;
}
```

### SQLFile 

```sql
use UserDatabase;

/**
 * @table [InnoDB] User
 * This table is user Table.
 * This table is only for user. Never use in another service.
 * Only Read. but Only write in User Service.
 *
 * @tableColumn {BIGINT UNSIGNED} [PRIMARY KEY, AUTO_INCREMENT]     id 
 * This is just for clustred index. don't use for relation.
 * later this database will be sharded.
 *
 * @tableColumn {TINYINT UNSIGNED} [DEFAULT=0]                      type
 * 0 is Anonymous user.
 * 1 is Authenticated user.
 * 2 is Admin.
 * 3 is Super Admin.
 * @tableColumn {DATETIME} [DEFAULT=CURRENT_TIMESTAMP]              joinDate
 * Just signed date.
 * @tableColumn {VARCHAR(64)} [UNIQUE, NOT NULL]                    userEmail
 * For resetting password.
 * @tableColumn {VARCHAR(24)} [UNIQUE, NOT NULL]                    username 
 * For login.
 * @tableColumn {VARCHAR(24)} [NOT NULL]                            nickname
 * For exposing to other.
 * @tableColumn {VARCHAR(24)} [UNIQUE, NOT NULL]                    password
 * This column is stored as encrypted value.
*/
CREATE TABLE `User`(
    `id` BIGINT(24) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    `type`   		TINYINT UNSIGNED NOT NULL DEFAULT 0,
    `joinDate` 		DATETIME DEFAULT CURRENT_TIMESTAMP,
    `userEmail` 	VARCHAR(64) UNIQUE NOT NULL
    `username` 		VARCHAR(24) UNIQUE NOT NULL,
    `nickname`		VARCHAR(24) NOT NULL,
    `password`		VARCHAR(64) NOT NULL,
) ENGINE = InnoDB;

/**
 * @table [InnoDB] Page
 * This is for storing content written by User.
 *
 * @tableColumn {BIGINT UNSIGNED} [PRIMARY KEY, AUTO_INCREMENT]     id 
 * This is just for clustred index. don't use for relation.
 * later this database will be sharded.
 * use userId with createDate instead of this.
 * @tableColumn {BIGINT UNSIGNED} [FOREIGN KEY]                     userId
 * @tableColumn {DATETIME} [DEFAULT=CURRENT_TIMESTAMP]              text
 * @tableColumn {VARCHAR(24)} [UNIQUE, NOT NULL]                    createDate
*/
CREATE TABLE `Page`(
    `id` 			BIGINT(24) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    `userId`		BIGINT(24) UNSIGNED,
    `title`			VARCHAR(24) NOT NULL,
    `text`			TEXT default NULL,
    `createDate` 	DATETIME DEFAULT CURRENT_TIMESTAMP

    CONSTRAINT `FK_Page_User`
        FOREIGN KEY(`userId`) REFERENCES User(`id`)
    ON DELETE CASCADE
) ENGINE = InnoDB;
```