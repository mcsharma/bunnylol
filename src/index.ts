import express from "express";
import { commandsMap } from "./commands";
import formatURL from "./formatURL";
import { populateURL } from "./populateURL";
const app = express();
const port = process.env.PORT || 80;

const GOOGLE = "google.com";

app.get("/", (req, res) => {
  res.send(
    "<h1>Welcome to Bunnylol, a smart browser bookmarking service!</h1> " +
      "<br/><br/>" +
      "To use Bunnylol add the following URL as your default search engine: <strong>https://lolbunny.herokuapp.com/go?query=%s</strong>"
  );
});

app.get("/go", (req, res) => {
  type RequestParams = {
    query: string;
  };
  const q = (req.query as RequestParams).query ?? "";
  let [command, ...params] = q.split(" ");
  let urlTemplates = commandsMap[command];
  if (urlTemplates === undefined) {
    urlTemplates = commandsMap.g;
    // Prepend the first keyword back in the params
    params = [command, ...params];
  }
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
