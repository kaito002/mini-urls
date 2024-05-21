import {GetLongUrl} from "../../../src/domain/actions/GetLongUrl";
import {UrlsRepository} from "../../../src/domain/repositories/UrlsRepository";
import {_UrlsRepositoryMock} from "../../_test_lib/mockers.testlib";
import spyOn = jest.spyOn;
import {ShortUrlNotFoundError} from "../../../src/domain/errors/ShortUrlNotFoundError";

describe('Get Long Url Test', () => {

    let getLongUrl: GetLongUrl;

    let UrlsRepositoryMocker: jest.Mock<_UrlsRepositoryMock> = <jest.Mock<_UrlsRepositoryMock>>_UrlsRepositoryMock
    let urlsRepository: UrlsRepository

    beforeEach(() => {
        urlsRepository = new UrlsRepositoryMocker()
        getLongUrl = new GetLongUrl(urlsRepository)

        spyOn(urlsRepository, "find").mockImplementation((hash) => {
            if (hash === "0") return Promise.resolve({
                hash, longUrl: "longUrl"
            })
            return Promise.resolve(null)
        })
    })

    test("should return long url", async () => {
        const hash = "0"

        const result = await getLongUrl.execute(hash)

        expect(result).toEqual("longUrl")
    })

    test("should return error", async () => {
        const hash = "1"

        await expect(getLongUrl.execute(hash)).rejects.toThrow()
    })
})
