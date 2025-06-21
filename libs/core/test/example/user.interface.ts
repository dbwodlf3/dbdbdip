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