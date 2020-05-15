import { Response, RouteParams } from "https://deno.land/x/oak/mod.ts";
import { deleteData, getData } from "../services/data.ts";

export default async ({
  params,
  response,
}: {
  params: RouteParams;
  response: Response;
}) => {
  const userId = params.id;

  if (!userId) {
    response.status = 400;
    response.body = { msg: "Invalid id" };
    return;
  }

  const foundUser = await getData(userId);
  if (!foundUser) {
    response.status = 404;
    response.body = { msg: `Data with ID ${userId} not found` };
    return;
  }

  await deleteData(userId);
  response.body = { msg: "Data deleted" };
};
