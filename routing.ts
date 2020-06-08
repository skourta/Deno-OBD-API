import { Router } from "https://deno.land/x/oak/mod.ts";

import getAll from "./handlers/getAll.ts";
import getDataDetails from "./handlers/getDataDetails.ts";
import createData from "./handlers/createData.ts";
import updateData from "./handlers/updateData.ts";
import deleteData from "./handlers/deleteData.ts";
import createdDummyData from "./handlers/createDummyData.ts";
import createArrayData from "./handlers/createArrayData.ts";

const router = new Router();

router
  .get("/data", getAll)
  .get("/data/:id", getDataDetails)
  .post("/data", createData)
  .post("/data/createDummy", createdDummyData)
  .post("/data/array", createArrayData)
  .put("/data/:id", updateData)
  .delete("/data/:id", deleteData);

export default router;
