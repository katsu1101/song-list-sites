import * as fs                                                               from "fs";
import path                                                                            from "path";
import {fetchCsv, fetchVideos,  scrapeSongList} from "./lib/scraper";
import { loadEnvConfig }                                                               from "@next/env";

loadEnvConfig(process.cwd());

const site = "linca";
const dataVersionPath = path.join(process.cwd(), `public/${site}`, "data-version.json");

const updateDataVersion = () => {
  const timestamp = new Date().toISOString();
  fs.writeFileSync(dataVersionPath, JSON.stringify({version: timestamp}, null, 2));
  console.log(`✅ Data version updated: ${timestamp}`);
};

updateDataVersion();

async function generateJson() {

  // 歌リストデータをwebページから読み込む
  const [data1, data2, data3] = await Promise.all([
    scrapeSongList(process.env.SONG_LIST_URL1 ?? "", 1),
    scrapeSongList(process.env.SONG_LIST_URL2 ?? "", 2),
    scrapeSongList(process.env.SONG_LIST_URL3 ?? "", 3)
  ]);
  const songs = [...data1, ...data3, ...data2]

  // YouTubeの動画情報を取得
  const videoIds = [...new Set(songs.map(song => song.videoId))];
  const videos = await fetchVideos(videoIds)
  const data = {songs: songs, videos: videos};
  const filePath = path.join(process.cwd(), "public", site, "songs.json");
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  // 歌情報CSVを取得して保存
  const songList =
    await fetchCsv(process.env.SONG_LIST_SHEET_ID ?? "", process.env.SONG_LIST_GID ?? "0")
  fs.writeFileSync(path.join(process.cwd(), "public", "songinfo.csv"), songList);

  const streamingList =
    await fetchCsv(process.env.SONG_LIST_SHEET_ID ?? "", process.env.STREAMING_LIST_GID ?? "0")
  fs.writeFileSync(path.join(process.cwd(), "public", "streaming_list.csv"), streamingList);

  console.log("✅ songs.json has been generated!");
}

generateJson().catch(console.error);
