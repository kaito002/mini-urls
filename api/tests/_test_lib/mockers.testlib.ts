import {IdGeneratorService} from "../../src/domain/services/IdGeneratorService";
import {UrlsRepository} from "../../src/domain/repositories/UrlsRepository";
import {ShortUrlModel} from "../../src/domain/models/ShortUrlModel";

export class _IdGeneratorServiceMock implements IdGeneratorService {
    getNextId(): Promise<number> {
        return Promise.resolve(1)
    }
}

export class _UrlsRepositoryMock implements UrlsRepository {
    find(hash: string): Promise<ShortUrlModel | null> {
        return Promise.resolve(null)
    }

    save(model: ShortUrlModel): Promise<void> {
        return Promise.resolve()
    }
}
