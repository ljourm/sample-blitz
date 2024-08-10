/* eslint-disable @typescript-eslint/no-explicit-any */

import { Ctx } from "blitz";

export default async function logout(_: any, ctx: Ctx) {
  return await ctx.session.$revoke();
}
