import TestAgent from "supertest/lib/agent";
import {createTestServerTestlib} from "../_test_lib/createTestServer.testlib";
import {getMiniUrlRoutes} from "../../src/routes/miniurl.routes";
import {CreateShortUrl} from "../../src/domain/actions/CreateShortUrl";

describe("Mini Url Routes Tests", () => {

    let testServer: TestAgent
    let createShortUrl: CreateShortUrl
    let CreateShortUrlMock: jest.Mock<CreateShortUrl>

    beforeEach(() => {
        jest.mock("../../src/domain/actions/CreateShortUrl")
        CreateShortUrlMock = <jest.Mock<CreateShortUrl>>CreateShortUrl

        createShortUrl = new CreateShortUrlMock()
        testServer = createTestServerTestlib([getMiniUrlRoutes(createShortUrl)])

        jest.spyOn(createShortUrl, "execute").mockImplementation((_) => Promise.resolve({
            "shortUrl": "shortUrl",
            "longUrl": "https://wikipedia.com/long_url",
        }))
    })


    test("should create short url based on longUrl", async () => {


        const response = await testServer.post("/api/v1/url").send({
            longUrl: "https://wikipedia.com/long_url",
        })

        expect(response.status).toEqual(201)
        expect(response.body).toEqual({
            "shortUrl": "shortUrl",
            "longUrl": "https://wikipedia.com/long_url",
        })
    })

    test("should call action", async () => {
        const longUrl = "https://wikipedia.com/long_url"


        await testServer.post("/api/v1/url").send({
            longUrl: longUrl,
        })

        expect(createShortUrl.execute).toHaveBeenCalled()
    })
})
