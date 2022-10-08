import { commandsMap } from "./commands";

const RE = /(?<!\\)\{p(\d)?(\|.+?)?(?<!\\)\}/g;

export const populateURL = (urlTemplates: string[], params: string[]) => {
  const paramCountToTemplateIndexMap: { [count: number]: number } = {};
  urlTemplates.forEach((urlTemplate, index) => {
    const iter = urlTemplate.matchAll(RE);
    let minParams = 0;
    let maxParams = 0;
    while (1) {
      const { value, done } = iter.next();
      if (done) {
        break;
      }
      maxParams++;
      const [match, capture1, capture2] = value;
      if (capture2 === undefined) {
        minParams++;
      }
    }
    for (let i = minParams; i <= maxParams; i++) {
      paramCountToTemplateIndexMap[i] = index;
    }
  });

  while (params.length >= 0) {
    const index = paramCountToTemplateIndexMap[params.length];
    if (index !== undefined) {
      return solve(urlTemplates[index], params);
    }
    if (params.length === 0) {
      return null;
    }
    if (params.length == 1) {
      params = [];
    } else {
      params[params.length - 2] += " " + params[params.length - 1];
      params.pop();
    }
  }
};

function solve(urlTemplate: string, params: string[]) {
  return urlTemplate.replace(RE, (match, capture1, capture2, pos, inputStr) => {
    const paramIndex = Number(capture1 ?? "1");
    const defaultValue = capture2 ? capture2.slice(1) : "";
    return params[paramIndex - 1] ?? defaultValue;
  });
}
