import TestAgent from "supertest/lib/agent";
import {createTestServerTestlib} from "../_test_lib/createTestServer.testlib";
import {redirectRoutes} from "../../src/routes/redirect.routes";
import {GetLongUrl} from "../../src/domain/actions/GetLongUrl";
import {ShortUrlNotFoundError} from "../../src/domain/errors/ShortUrlNotFoundError";

describe('Redirect Routes Test', () => {

    let testServer: TestAgent
    let getLongUrl: GetLongUrl
    let GetLongUrlMock: jest.Mock<GetLongUrl> = <jest.Mock<GetLongUrl>>GetLongUrl

    beforeEach(() => {
        getLongUrl = new GetLongUrlMock()
        testServer = createTestServerTestlib([redirectRoutes(getLongUrl)])

        jest.spyOn(getLongUrl, "execute").mockImplementation((hash) => new Promise((resolve, reject) => {
            if (hash === "0") resolve("https://youtube.com")
            else reject(new ShortUrlNotFoundError(hash))
        }))
    })

    test("Should return 404 if hash is not associated to a link", async () => {
        const result = await testServer.get("/l/abc")

        expect(result.status).toBe(404);
    })

    test("Should redirect", async () => {
        const result = await testServer.get("/l/0")

        expect(result.status).toBe(302);
    })
})
