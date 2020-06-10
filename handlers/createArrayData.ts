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
    value: values,
  } = await request.body();
  console.log(values);
  for (let index = 0; index < values.length; index++) {
    const element = values[index];
    await createData(element);
  }
  // values.forEach(async (element: any) => {
  //   await createData(element);
  // });

  // const userId = await createData({ speed, distance, fuel });

  response.body = { msg: "Data created" };
};
