export type Locale = "ja" | "en";

export type Messages = {
  loading: string;
  searchPlaceholder: string;
  shareToX: string;
  menu: string;
  relatedLinks: string;
  noSearchResults: string;
  songInfo: string;
  videoInfo: string;
  songDetails: string;
  videoDetails: string;
  artist: string;
  title: string;
  genre: string;
  release: string;
  work: string;
  opEd: string;
  lyricist: string;
  composer: string;
  arranger: string;
  close: string;
  channel: string;
  publishedAt: string;
  duration: string;
  description: string;
  tags: string;
};

export const dictionaries: Record<Locale, Messages> = {
  ja: {
    loading: "Loading...",
    searchPlaceholder: "曲名・日付・動画タイトルで検索",
    shareToX: "検索結果をXでポスト！",
    menu: "メニュー",
    relatedLinks: "関連リンク",
    noSearchResults: "検索結果がありません",
    songInfo: "曲情報を表示",
    videoInfo: "動画情報を表示",
    songDetails: "曲の詳細情報",
    videoDetails: "動画の詳細情報",
    artist: "アーティスト",
    title: "曲名",
    genre: "ジャンル",
    release: "リリース",
    work: "作品名",
    opEd: "OP/ED区分",
    lyricist: "作詞",
    composer: "作曲",
    arranger: "編曲",
    close: "閉じる",
    channel: "チャンネル",
    publishedAt: "投稿日",
    duration: "動画時間",
    description: "概要",
    tags: "タグ",
  },
  en: {
    loading: "Loading...",
    searchPlaceholder: "Search by song title, date, or video title",
    shareToX: "Post search results to X!",
    menu: "Menu",
    relatedLinks: "Related Links",
    noSearchResults: "No results found",
    songInfo: "Show song info",
    videoInfo: "Show video info",
    songDetails: "Song Details",
    videoDetails: "Video Details",
    artist: "Artist",
    title: "Title",
    genre: "Genre",
    release: "Release",
    work: "Work",
    opEd: "OP/ED",
    lyricist: "Lyricist",
    composer: "Composer",
    arranger: "Arranger",
    close: "Close",
    channel: "Channel",
    publishedAt: "Published",
    duration: "Duration",
    description: "Description",
    tags: "Tags",
  },
};

export const detectLocale = (): Locale => {
  if (typeof navigator === "undefined") return "ja";
  return navigator.language.toLowerCase().startsWith("ja") ? "ja" : "en";
};
