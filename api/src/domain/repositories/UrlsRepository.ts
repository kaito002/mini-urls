import {ShortUrlDto} from "../dtos/ShortUrlDto";
import {ShortUrlModel} from "../models/ShortUrlModel";

export interface UrlsRepository {
    save(shortUrlDto: ShortUrlModel): Promise<void>;
    find(hash: string): Promise<ShortUrlModel | null>;
}
