import fastifyPlugin from "fastify-plugin";
import { DashboardRepository } from "../../application/repositories/dashboard.repository";

declare module "fastify" {
    interface FastifyInstance {
        repositories: {
            dashboard: DashboardRepository;
        };
    }
}

export const repositoryPlugin = fastifyPlugin(
    async (app) => {
        const dashboardRepository = new DashboardRepository();

        app.decorate('repositories', {
            dashboard: dashboardRepository
        });
    }
)