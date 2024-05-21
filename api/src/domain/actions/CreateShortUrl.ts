import {ShortUrlDto} from "../dtos/ShortUrlDto";
import {IdGeneratorService} from "../services/IdGeneratorService";
import {Base62Converter} from "../../infrastructure/Base62Converter";
import {UrlsRepository} from "../repositories/UrlsRepository";


export class CreateShortUrl {

    private readonly baseUrl: string;
    private idGeneratorService: IdGeneratorService;
    private Base62Converter: Base62Converter
    private urlsRepository: UrlsRepository;

    constructor(baseUrl: string, idGeneratorService: IdGeneratorService, base62Converter: Base62Converter, urlsRepository: UrlsRepository) {
        this.baseUrl = baseUrl;
        this.idGeneratorService = idGeneratorService;
        this.Base62Converter = base62Converter;
        this.urlsRepository = urlsRepository;
    }

    async execute(longUrl: string): Promise<ShortUrlDto> {

        const id = await this.idGeneratorService.getNextId()
        const hash = this.Base62Converter.convertFrom(id)

        const shortUrlDto = {
            shortUrl: `${this.baseUrl}/${hash}`,
            longUrl: longUrl,
        }


        return this.urlsRepository.save({hash, longUrl}).then(() => shortUrlDto)
    }
}
