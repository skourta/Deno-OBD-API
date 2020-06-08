import { DB_PATH } from "../config.ts";
import { Data } from "../models/data.ts";

export const fetchData = async (): Promise<Data[]> => {
  const data = await Deno.readFile(DB_PATH);
  const decoder = new TextDecoder();
  const decodedData = decoder.decode(data);

  return JSON.parse(decodedData);
};

export const persistData = async (data: Data[]): Promise<void> => {
  const encoder = new TextEncoder();
  await Deno.writeFile(DB_PATH, encoder.encode(JSON.stringify(data)));
};
