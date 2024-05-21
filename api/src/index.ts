import promBundle from "express-prom-bundle"
import pino from "pino";
import logger from "pino-http"
import {createServer} from "./server";
import {getMiniUrlRoutes} from "./routes/miniurl.routes";
import {ActionsProvider} from "./providers/actions.provider";
import {redirectRoutes} from "./routes/redirect.routes";

const metricsMiddleware = promBundle({includeMethod: true})

const server = createServer([
    getMiniUrlRoutes(
        ActionsProvider.createShortUrl(),
    ),
    redirectRoutes(
        ActionsProvider.getLongUrl()
    )
])

server.use(logger({
    logger: pino()
}))

server.use(metricsMiddleware)

server.listen(process.env.PORT, () => {
    console.log(`Server is running on port ::${process.env.PORT}`)
})
