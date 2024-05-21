import {UrlsRepository} from "../domain/repositories/UrlsRepository";
import {DynamoDBUrlsRepository} from "../infrastructure/DynamoDBUrlsRepository";
import {DocumentClient} from "aws-sdk/clients/dynamodb";
import {Credentials} from "aws-sdk";

export class RepositoriesProvider {
    static _urlsRepository: UrlsRepository | null = null;

    static urlsRepository(): UrlsRepository {
        if (RepositoriesProvider._urlsRepository === null) {
            RepositoriesProvider._urlsRepository = new DynamoDBUrlsRepository(new DocumentClient({
                region: process.env.AWS_REGION,
                endpoint: process.env.DYNAMODB_URL,
                credentials: new Credentials({
                    accessKeyId: process.env.AWS_DYNAMO_ACCESS_KEY_ID!,
                    secretAccessKey: process.env.AWS_DYNAMO_SECRET_ACCESS_KEY!,
                })
            }), process.env.TABLE_NAME!);
        }

        return RepositoriesProvider._urlsRepository!;
    }
}
