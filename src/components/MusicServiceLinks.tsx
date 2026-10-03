import {SongInfo, STREAMING_SERVICES, StreamingServiceKey} from "@/types";

export const MusicServiceLinks = ({
                                    isSingingVideo,
                                    songInfo,
                                    videoID,
                                  }: {
  isSingingVideo: boolean;
  songInfo?: SongInfo;
  videoID?: string;
}) => {
  if (!songInfo) return null;

  // マスタのエントリ一覧を取得
  const services = Object.entries(STREAMING_SERVICES) as [
    StreamingServiceKey,
    (typeof STREAMING_SERVICES)[StreamingServiceKey]
  ][];

  return (
    <div className="flex items-center">
      {services.map(([key, service]) => {
        // 1. 各サービスごとの URL 決定ロジック
        let url = songInfo.streaming?.[key];

        // YouTubeMusic の場合の特殊ルール処理
        if (key === "YouTubeMusic" && isSingingVideo && videoID) {
          url = `https://music.youtube.com/watch?v=${videoID}`;
        }

        // URLが存在しない場合は非表示（レンダリングしない）
        if (!url || service.icon === "") return null;

        return (
          <a
            key={key}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-3 hover:opacity-80 transition-opacity"
            title={service.title}
          >
            <img
              src={service.icon}
              alt={service.title}
              className="h-5 ml-1 object-contain"
            />
          </a>
        );
      })}
    </div>
  );
};