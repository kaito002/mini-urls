import {Router, Request, Response} from "express";
import {CreateShortUrl} from "../domain/actions/CreateShortUrl";
import {GetLongUrl} from "../domain/actions/GetLongUrl";


export const getMiniUrlRoutes = (createShortUrl: CreateShortUrl): Router => {
    const router = Router()

    router.post("/api/v1/url", createMiniUrlRoute(createShortUrl))

    return router
}


const createMiniUrlRoute = (createShortUrl: CreateShortUrl) => (req: Request, res: Response) => {
    const longUrl = req.body.longUrl

    createShortUrl.execute(longUrl).then(result => {
        res.status(201).json(result)
    })
}
