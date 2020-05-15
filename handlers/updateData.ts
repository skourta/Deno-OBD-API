import { Request, Response } from "https://deno.land/x/oak/mod.ts";
import { updateData } from "../services/data.ts";

export default async ({
  params,
  request,
  response,
}: {
  params: any;
  request: Request;
  response: Response;
}) => {
  const userId = params.id;

  if (!userId) {
    response.status = 400;
    response.body = { msg: "Invalid id" };
    return;
  }

  if (!request.hasBody) {
    response.status = 400;
    response.body = { msg: "Invalid data" };
    return;
  }

  const {
    value: { speed, distance, fuel },
  } = await request.body();

  await updateData(userId, { speed, distance, fuel });

  response.body = { msg: "Data updated" };
};
