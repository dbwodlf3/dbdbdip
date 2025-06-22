/**
 * @collection Book
 * Represents a book in the video store.
 * This interface defines the structure of a book document in the database.
 * @field _id [UNIQUE]
 * Book Identifier
 * @field userId [FOREIGN KEY]
 * The ID of the user who owns the book
 * @field language
 * The language of the book
 * @field title
 * The title of the book
 * @field description
 * A brief description of the book
 * @field bookCover
 * The URL of the book cover image
 * @field isDeleted
 * Indicates whether the book is deleted
 * @field isPrivate
 * Indicates whether the book is private
 * @field createdAt
 * The date and time when the book was created
 */
interface BookSchema {
    _id: number;
    userId: number;
    language: string;
    title: string;
    description: string;
    bookCover: string;
    isDeleted: boolean;
    isPrivate: boolean;
    createdAt: Date;
}

/**
 * @collection Page
 * Represents a page in a book.
 * This interface defines the structure of a page document in the database.
 * @field _id [UNIQUE]
 * Page Identifier
 * @field bookId [FOREIGN KEY]
 * The ID of the book to which this page belongs
 * @field userId [FOREIGN KEY]
 * The ID of the user who owns the page
 * @field title
 * The title of the page
 * @field content
 * The content of the page
 * @field isDeleted
 * Indicates whether the page is deleted
 * @field createdAt
 * The date and time when the page was created
 * @field updatedAt
 * The date and time when the page was last updated
 * @field publishedAt
 * The date and time when the page was published
 */
interface PageSchema {
    _id: number;
    bookId: number;
    userId: number;
    
    title: string;
    content: string;
    isDeleted: boolean;

    createdAt: Date;
    updatedAt: Date;
    publishedAt: Date;
}