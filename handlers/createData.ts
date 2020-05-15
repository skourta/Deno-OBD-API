import { Request, Response } from "https://deno.land/x/oak/mod.ts";
import { createData } from "../services/data.ts";

export default async ({
  request,
  response,
}: {
  request: Request;
  response: Response;
}) => {
  if (!request.hasBody) {
    response.status = 400;
    response.body = { msg: "Invalid data" };
    return;
  }
  const {
    value: { speed, distance, fuel,date },
  } = await request.body();

  if (!speed || !distance || !fuel) {
    response.status = 422;
    response.body = {
      msg: "Incorrect data. Speed, Distance and Fuel are required",
    };
    return;
  }

  const userId = await createData({ speed, distance, fuel });

  response.body = { msg: "Data created", userId };
};
