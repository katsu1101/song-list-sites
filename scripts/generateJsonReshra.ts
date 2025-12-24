import path                                          from "path";
import { fetchVideos, scrapeSongListFromText } from "./lib/scraper";
import { Song }                                from "@/types";
import * as fs                                 from "fs";

const dataVersionPath = path.join(process.cwd(), "public", "data-version.json");

const updateDataVersion = () => {
  const timestamp = new Date().toISOString();
  fs.writeFileSync(dataVersionPath, JSON.stringify({ version: timestamp }, null, 2));
  console.log(`✅ Data version updated: ${timestamp}`);
};

updateDataVersion();

async function generateJsonReshra() {
  // 📝 もし songlist の元テキストファイルがあるなら、ここで読み込む
  // 例: data/songlist.txt に保存してある場合
  const textPath = path.join(process.cwd(), "data", "songlist1.txt");
  const rawText = fs.readFileSync(textPath, "utf-8");

  // 🧹 テキストからセトリ情報を抽出（既に作ってあるパーサー）
  const songs: Song[] = scrapeSongListFromText(rawText, 2);

  // 🎥 YouTube API で動画情報を取得
  const videoIds = [...new Set(songs.map((song) => song.videoId))];
  const videos = await fetchVideos(videoIds);

  const data = { songs, videos };

  // ✅ `public/songs.json` に保存
  const site = "reshra";
  const filePath = path.join(process.cwd(), `public/${site}`, "songs.json");
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  console.log("✅ songs.json has been generated!");
}

generateJsonReshra().catch(console.error);
