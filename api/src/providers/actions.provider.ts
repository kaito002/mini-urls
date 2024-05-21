import {CreateShortUrl} from "../domain/actions/CreateShortUrl";
import {ServicesProvider} from "./services.provider";
import {RepositoriesProvider} from "./repositories.provider";
import {GetLongUrl} from "../domain/actions/GetLongUrl";

export class ActionsProvider {
    static _createShortUrl: CreateShortUrl | null = null
    static _getLongUrl: GetLongUrl | null = null

    static createShortUrl(): CreateShortUrl {
        if (ActionsProvider._createShortUrl === null) {
            ActionsProvider._createShortUrl = new CreateShortUrl(process.env.BASE_URL!,
                ServicesProvider.idGeneratorService(),
                ServicesProvider.base62Converter(),
                RepositoriesProvider.urlsRepository()
            )
        }

        return ActionsProvider._createShortUrl
    }

    static getLongUrl(): GetLongUrl {
        if (ActionsProvider._getLongUrl === null) {
            ActionsProvider._getLongUrl = new GetLongUrl(RepositoriesProvider.urlsRepository())
        }

        return ActionsProvider._getLongUrl!
    }
}
