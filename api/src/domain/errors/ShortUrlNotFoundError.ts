export class ShortUrlNotFoundError extends Error {
    constructor(shortUrl: string) {
        super(`URL not found for mini url -> ${shortUrl}`);
    }
}
