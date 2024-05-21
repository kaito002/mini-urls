
export interface IdGeneratorService {
    getNextId(): Promise<number>
}
