export const exampleStrings = `
CREATE DATABASE SqldocExampleDatabase DEFAULT CHARACTER SET = 'utf8' COLLATE= 'utf8_general_ci';
use SqldocExampleDatabase;

/**
 * @table [InnoDB] User
 * This table is user Table.
 * This table is only for user. Never use in another service.
 * Only Read. but Only write in User Service.
 *
 * @tableColumn {BIGINT UNSIGNED} [PRIMARY KEY, AUTO_INCREMENT]		id 
 * This is just for clustred index. don't use for relation.
 * later this database will be sharded.
 *
 * @tableColumn {TINYINT UNSIGNED} [DEFAULT=0] 						type
 * 0 is Anonymous user.
 * 1 is Authenticated user.
 * 2 is Admin.
 * 3 is Super Admin.
 * @tableColumn {DATETIME} [DEFAULT=CURRENT_TIMESTAMP] 				joinDate
 * Just signed date.
 * @tableColumn {VARCHAR(64)} [UNIQUE, NOT NULL]			 		userEmail
 * For resetting password.
 * @tableColumn {VARCHAR(24)} [UNIQUE, NOT NULL] 					username 
 * For login.
 * @tableColumn {VARCHAR(24)} [NOT NULL] 							nickname
 * For exposing to other.
 * @tableColumn {VARCHAR(24)} [UNIQUE, NOT NULL] 					password
 * This column is stored as encrypted value.
*/
CREATE TABLE \`User\`(
	\`id\` BIGINT(24) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
	\`type\`   		TINYINT UNSIGNED NOT NULL DEFAULT 0,
	\`joinDate\` 		DATETIME DEFAULT CURRENT_TIMESTAMP,
	\`userEmail\` 	VARCHAR(64) UNIQUE NOT NULL
	\`username\` 		VARCHAR(24) UNIQUE NOT NULL,
	\`nickname\`		VARCHAR(24) NOT NULL,
	\`password\`		VARCHAR(64) NOT NULL,
) ENGINE = InnoDB;

/**
 * @table [InnoDB] Page
 * This is for storing content written by User.
 *
 * @tableColumn {BIGINT UNSIGNED} [PRIMARY KEY, AUTO_INCREMENT]		id 
 * This is just for clustred index. don't use for relation.
 * later this database will be sharded.
 * use userId with createDate instead of this.
 * @tableColumn {BIGINT UNSIGNED} [FOREIGN KEY]						userId
 * @tableColumn {DATETIME} [DEFAULT=CURRENT_TIMESTAMP] 				text
 * @tableColumn {VARCHAR(24)} [UNIQUE, NOT NULL] 					createDate
*/
CREATE TABLE \`Page\`(
	\`id\` 			BIGINT(24) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
	\`userId\`		BIGINT(24) UNSIGNED,
	\`title\`			VARCHAR(24) NOT NULL,
	\`text\`			TEXT default NULL,
	\`createDate\` 	DATETIME DEFAULT CURRENT_TIMESTAMP

	CONSTRAINT \`FK_Page_User\`
		FOREIGN KEY(\`userId\`) REFERENCES User(\`id\`)
	ON DELETE CASCADE
) ENGINE = InnoDB;
`;
