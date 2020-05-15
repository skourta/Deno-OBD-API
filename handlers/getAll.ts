import { Response } from "https://deno.land/x/oak/mod.ts";
import { getAll } from "../services/data.ts";

export default async ({ response }: { response: Response }) => {
  response.body = await getAll();
};
