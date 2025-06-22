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

/**
 * @collection UserToken
 * Represents a token issued to a user for authentication.
 * This interface defines the structure of a user token document in the database.
 * @field _id [UNIQUE, FOREIGN KEY]
 * Token Identifier
 * @field userId [FOREIGN KEY]
 * The ID of the user to whom this token belongs
 * @field tokenType
 * The type of token (AccessToken or RefreshToken)
 * @field token
 * The actual token string
 * @field ipv4 [OPTIONAL]
 * The IPv4 address from which the token was issued
 * @field ipv6 [OPTIONAL]
 * The IPv6 address from which the token was issued 
 */
export interface UserTokenSchema {
    _id: number;
    userId: number;
    tokenType: "AccessToken" | "RefreshToken"; 
    token: string;

    ipv4?: string;
    ipv6?: string;

    createdAt: Date;
    expiresAt: Date;
}

/**
 * @collection UserTokenHistory
 * Represents the history of token issuance for a user.
 * This interface defines the structure of a user token history document in the database.
 * @field _id [UNIQUE, FOREIGN KEY]
 * History Identifier
 * @field userId [FOREIGN KEY]
 * The ID of the user to whom this token belongs
 * @field tokenId [FOREIGN KEY]
 * The ID of the token that was issued
 * @field action
 * The action performed (IssueAccessToken or IssueRefreshToken)
 * @field ipv4 [OPTIONAL]
 * The IPv4 address from which the token was issued
 * @field ipv6 [OPTIONAL]
 * The IPv6 address from which the token was issued 
 */
export interface UserTokenHistory {
    _id: number;
    userId: number;
    tokenId: number;

    action: "IssueAccessToken" | "IssueRefreshToken";

    ipv4?: string;
    ipv6?: string;

    createdAt: Date;
}
