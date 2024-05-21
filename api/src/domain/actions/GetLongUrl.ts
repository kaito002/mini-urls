import {UrlsRepository} from "../repositories/UrlsRepository";
import {ShortUrlNotFoundError} from "../errors/ShortUrlNotFoundError";

export class GetLongUrl {
    private urlsRepository: UrlsRepository;

    constructor(urlsRepository: UrlsRepository) {
        this.urlsRepository = urlsRepository;
    }

    async execute(hash: string): Promise<string> {
        const model = await this.urlsRepository.find(hash)

        if (model === null) return Promise.reject(new ShortUrlNotFoundError(hash))

        return model.longUrl
    }
}
