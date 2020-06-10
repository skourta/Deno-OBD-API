import { Request, Response } from "https://deno.land/x/oak/mod.ts";
import { CryptoJS } from "../aes.js";

import { createData } from "../services/data.ts";

function decrypt(ciphertextStr: String) {
  var key = CryptoJS.enc.Utf8.parse("1234567890123456");
  var ciphertext = CryptoJS.enc.Base64.parse(ciphertextStr);

  // split IV and ciphertext
  var iv = ciphertext.clone();
  iv.sigBytes = 16;
  iv.clamp();
  ciphertext.words.splice(0, 4); // delete 4 words = 16 bytes
  ciphertext.sigBytes -= 16;

  // decryption
  var decrypted = CryptoJS.AES.decrypt({ ciphertext: ciphertext }, key, {
    iv: iv,
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
}

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
  console.log(decrypt(values.enc).replace(/'/g, '"'));
  let jsonArray = JSON.parse(decrypt(values.enc).replace(/'/g, '"'));
  for (let index = 0; index < jsonArray.length; index++) {
    const element = jsonArray[index];
    await createData(element);
  }
  //   for (let index = 0; index < values.length; index++) {
  //     const element = values[index];
  //     await createData(element);
  //   }
  // values.forEach(async (element: any) => {
  //   await createData(element);
  // });

  // const userId = await createData({ speed, distance, fuel });

  response.body = { msg: "Data received" };
};
