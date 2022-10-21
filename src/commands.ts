export const commandsMap: { [command: string]: string | string[] } = {
  g: "google.com/search?q={p}",
  yt: ["youtube.com", "youtube.com/search?q={p}"],
  w: ["en.wikipedia.org", "en.wikipedia.org/wiki/Special:Search?search={p}"],
  gh: "github.com",
};
