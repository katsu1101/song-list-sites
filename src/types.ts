
/**
 * 歌データ
 */
export type Song = {
  artist?: string // アーティスト
  info?: SongInfo;      // 追加情報
  date: string;        // 日付（例: "2025/02/23"）
  title: string;       // 曲名
  url: string;         // YouTubeのURL
  videoId: string;     // YouTube動画ID
  timestamp: number;   // 開始時間（秒, 0 の場合は先頭）
  source: number;      // 取得元（1: 歌ってみた動画, 2: 配信）
  work: string;        // 作品名
  note: string;        // 注釈
};
export type SongsList = Song[];

/**
 * ジャンルの型定義
 * NOTE: 実際のアプリケーションでは、より柔軟な型を使うか、サーバーから取得することを検討
 */
export type Genre =
  | "オリジナル"
  | "J-POP"
  | "ドラえもん"
  | "アニソン"
  | "ボカロ"
  | "ディズニー"
  | "クリスマス"
  | "ガンダム"
  | "市民の歌";

export type Streaming = {
  title: string;        // 曲名
  YouTubeMusic?: string; // YouTube MusicのURL
  AppleMusic?: string;   // Apple MusicのURL
  Spotify?: string;      // SpotifyのURL
  LineMusic?: string;    // Line MusicのURL
  AmazonMusic?: string;  // Amazon MusicのURL
  Mora?: string;         // MoraのURL
  YouTube?: string;      // YouTubeのURL
  musicjp?: string;      // music.jpのURL
  mysound?: string;      // mysoundのURL
  OTOTOY?: string;       // OTOTOYのURL
  orimyu?: string;       // オリミュウストアのURL
  KKBOX?: string;        // KKBOXのURL
  uta573?: string;       // 着信★うた♪のURL
};

export interface StreamingServiceDetail {
  title: string;
  icon: string;
}

export const STREAMING_SERVICES = {
  YouTubeMusic: {
    title: "YouTube Music",
    icon: "https://upload.wikimedia.org/wikipedia/commons/d/d8/YouTubeMusic_Logo.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original"
  },
  AppleMusic: {
    title: "Apple Music",
    icon: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Apple_Music_icon.svg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original"
  },
  Spotify: {
    title: "Spotify",
    icon: "https://upload.wikimedia.org/wikipedia/commons/8/84/Spotify_icon.svg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original"
  },
  LineMusic: {
    title: "Line Music",
    icon: "https://upload.wikimedia.org/wikipedia/commons/9/92/LINE_APP_Logo.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original"
  },
  AmazonMusic: {
    title: "Amazon Music",
    icon: "https://upload.wikimedia.org/wikipedia/commons/3/39/Stacked_Amazon_Music_CharcoalOnCyan_Circle_RGB.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original"
  },
  Mora: {
    title: "Mora",
    icon: "https://upload.wikimedia.org/wikipedia/commons/9/91/Mora_%E3%83%A2%E3%83%BC%E3%83%A9.svg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original"
  },
  YouTube: {
    title: "YouTube",
    icon: "https://upload.wikimedia.org/wikipedia/commons/6/62/YouTube_social_white_square_%282024%29.svg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original"
  },
  musicjp: {
    title: "music.jp",
    icon: ""
  },
  mysound: {
    title: "mysound",
    icon: ""
  },
  OTOTOY: {
    title: "OTOTOY",
    icon: ""
  },
  orimyu: {
    title: "オリミュウストア",
    icon: ""
  },
  KKBOX: {
    title: "KKBOX",
    icon: "https://upload.wikimedia.org/wikipedia/commons/c/ca/KKBOX_logo.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original"
  },
  uta573: {
    title: "着信★うた♪",
    icon: ""
  }
} as const;

export type StreamingServiceKey = keyof typeof STREAMING_SERVICES;

/**
 * 曲情報
 */
export type SongInfo = {
  title: string;       // 曲名
  release?: string;    // リリース日
  album?: string;      // アルバム名
  genre?: Genre;      // ジャンル
  lyricist?: string;   // 作詞
  composer?: string;   // 作曲
  arranger?: string;   // 編曲
  work?: string;       // 作品名
  opEd?: string;       // OP/ED区分
  Length?: string;      // 曲の長さ
  streaming?: Partial<Record<StreamingServiceKey, string>>; // ストリーミングサービス情報
};

/**
 * YouTube API のレスポンスデータの型 (簡略化)
 */
export interface YouTubeVideo {
  id: string;
  snippet: {
    publishedAt: string;
    title: string;
    description: string;
    channelId: string; // チャンネルID
    channelTitle: string; // チャンネル名
    tags: string[];
    thumbnails: {
      default: { url: string };
      medium: { url: string };
      high: { url: string };
    };
  };
  contentDetails: {
    duration: string;
  };
  statistics: {
    viewCount: string;
    likeCount: string;
    commentCount: string;
  };
}
