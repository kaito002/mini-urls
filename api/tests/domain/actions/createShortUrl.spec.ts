import {CreateShortUrl} from "../../../src/domain/actions/CreateShortUrl";
import {IdGeneratorService} from "../../../src/domain/services/IdGeneratorService";
import {Base62Converter} from "../../../src/infrastructure/Base62Converter";
import {UrlsRepository} from "../../../src/domain/repositories/UrlsRepository";
import {ShortUrlDto} from "../../../src/domain/dtos/ShortUrlDto";
import {ShortUrlModel} from "../../../src/domain/models/ShortUrlModel";
import {_IdGeneratorServiceMock, _UrlsRepositoryMock} from "../../_test_lib/mockers.testlib";


describe("Create Short Url Tests", () => {

    let createShortUrl: CreateShortUrl;

    let base62Converter: Base62Converter
    let Base62ConverterMocker: jest.Mock<Base62Converter> = <jest.Mock<Base62Converter>>Base62Converter

    let idGeneratorService: IdGeneratorService
    let IdGeneratorServiceMocker: jest.Mock<_IdGeneratorServiceMock> = <jest.Mock<_IdGeneratorServiceMock>>_IdGeneratorServiceMock

    let urlsRepository: UrlsRepository
    let UrlsRepositoryMocker: jest.Mock<_UrlsRepositoryMock> = <jest.Mock<_UrlsRepositoryMock>>_UrlsRepositoryMock

    let savedShortUrlDto: ShortUrlModel | undefined

    beforeEach(() => {
        idGeneratorService = new IdGeneratorServiceMocker()
        base62Converter = new Base62ConverterMocker()
        urlsRepository = new UrlsRepositoryMocker()
        savedShortUrlDto = undefined

        createShortUrl = new CreateShortUrl("baseUrl.com", idGeneratorService, base62Converter, urlsRepository);

        jest.spyOn(idGeneratorService, "getNextId").mockImplementation(() => Promise.resolve(1))
        jest.spyOn(base62Converter, "convertFrom").mockImplementation(() => "abc")
        jest.spyOn(urlsRepository, "save").mockImplementation((shortUrlDto) => {
            savedShortUrlDto = shortUrlDto
            return Promise.resolve()
        })
    })

    test("should get next id", async () => {
        const longUrl = "longUrl"

        const result = await createShortUrl.execute(longUrl)

        expect(idGeneratorService.getNextId).toHaveBeenCalled()
    })

    test("should generate mini url", async () => {
        const longUrl = "longUrl"

        const result = await createShortUrl.execute(longUrl)

        expect(base62Converter.convertFrom).toHaveBeenCalled()
    })

    test("should save short url", async () => {
        const longUrl = "longUrl"

        const result = await createShortUrl.execute(longUrl)

        expect(result.shortUrl.endsWith(savedShortUrlDto!.hash)).toBeTruthy()
    })

    test("should return short url with baseUrl", async () => {
        const longUrl = "longUrl"

        const result = await createShortUrl.execute(longUrl)

        expect(result).toEqual({
            shortUrl: "baseUrl.com/abc",
            "longUrl": longUrl,
        })
    })
})
