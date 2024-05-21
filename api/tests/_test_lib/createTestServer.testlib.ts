import {Router} from "express";
import {createServer} from "../../src/server";
import TestAgent from "supertest/lib/agent";
import supertest from "supertest";

export const createTestServerTestlib = (routes: Router[]): TestAgent => {
    const server = createServer(routes)

    for (const route of routes) {
        server.use(route)
    }

    return supertest(server)
}
