import {ShortUrlDto} from "../domain/dtos/ShortUrlDto";
import {UrlsRepository} from "../domain/repositories/UrlsRepository";
import {DocumentClient} from "aws-sdk/clients/dynamodb";
import {ShortUrlModel} from "../domain/models/ShortUrlModel";

const PK_KEY_PREFIX = "short#"
const SK_KEY_PREFIX = "long#"

export class DynamoDBUrlsRepository implements UrlsRepository {
    private dynamodbClient: DocumentClient
    private tableName: string

    constructor(dynamodbClient: DocumentClient, tableName: string) {
        this.dynamodbClient = dynamodbClient;
        this.tableName = tableName;
    }

    save(shortUrlModel: ShortUrlModel): Promise<void> {
        return this.dynamodbClient.put({
            TableName: this.tableName,
            Item: {
                "PK": createPk(shortUrlModel.hash),
                "SK": createSk(shortUrlModel.longUrl),
            }
        }).promise().then()
    }

    async find(hash: string): Promise<ShortUrlModel | null> {
        const result = await this.dynamodbClient.query({
            TableName: this.tableName,
            KeyConditionExpression: "PK = :pk",
            ExpressionAttributeValues: {
                ":pk": createPk(hash)
            }
        }).promise()

        if (result.Count === 0) return null

        const item =  result.Items![0]

        return {
            hash: hash,
            longUrl: item["SK"].toString().replace(SK_KEY_PREFIX, ""),
        }
    }
}

const createPk = (shortUrl: string) => `${PK_KEY_PREFIX}${shortUrl}`
const createSk = (longUrl: string) => `${SK_KEY_PREFIX}${longUrl}`
