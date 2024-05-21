import {Request, Response, Router} from "express";
import {GetLongUrl} from "../domain/actions/GetLongUrl";


export const redirectRoutes = (getLongUrl: GetLongUrl): Router => {
    const router = Router();

    router.get("/l/:shortUrl", getLongUrlRoute(getLongUrl))

    return router
}


const getLongUrlRoute = (getLongUrl: GetLongUrl) => (req: Request, res: Response) => {
    const shortUrl = req.params["shortUrl"]

    getLongUrl.execute(shortUrl).then(result => {
        res.status(302).redirect(result)
    }).catch(error => {
        res.status(404).send("link not found")
    })
}
