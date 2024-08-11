import { AuthServerPlugin, PrismaStorage, simpleRolesIsAuthorized } from "@blitzjs/auth";
import { setupBlitzServer } from "@blitzjs/next";
import { RpcServerPlugin } from "@blitzjs/rpc";
import { BlitzLogger } from "blitz";
import { authConfig } from "./blitz-auth-config";
import db from "db";

const { api, getBlitzContext, useAuthenticatedBlitzContext, invoke } = setupBlitzServer({
  plugins: [
    AuthServerPlugin({
      ...authConfig,
      storage: PrismaStorage(db),
      isAuthorized: simpleRolesIsAuthorized,
    }),
    RpcServerPlugin({}),
  ],
  logger: BlitzLogger({}),
});

export { api, getBlitzContext, useAuthenticatedBlitzContext, invoke };
