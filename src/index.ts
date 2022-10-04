import express from "express";
import { commandsMap } from "./commands";
import formatURL from "./formatURL";
import { populateURL } from "./populateURL";
const app = express();
const port = 80;

const GOOGLE = "google.com";

app.get("/go", (req, res) => {
  type RequestParams = {
    query: string;
  };
  const q = (req.query as RequestParams).query ?? "";
  let [command, ...params] = q.split(" ");
  let urlTemplates = commandsMap[command] ?? [];
  if (!Array.isArray(urlTemplates)) {
    urlTemplates = [urlTemplates];
  }
  params = params || [];
  const url = populateURL(urlTemplates, params);
  res.redirect(formatURL(url ?? GOOGLE));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
