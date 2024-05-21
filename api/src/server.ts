import Express, {Router} from "express";
import dotenv from "dotenv";

dotenv.config();

export const createServer = (routers: Router[]) => {
    const app = Express()

    app.use(Express.json())
    app.use(Express.urlencoded({extended: true}))

    for (const router of routers) {
        app.use(router)
    }

    return app
}
