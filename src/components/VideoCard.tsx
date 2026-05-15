import GenreBadge                           from "@/components/GenreBadge";
import OpEdBadge                            from "@/components/OpEdBadge";
import SongInfoModal                        from "@/components/SongInfoModal";
import YTVideoInfoModal                     from "@/components/YTVideoInfoModal";
import {Messages}                           from "@/lib/i18n";
import {Song, YouTubeVideo}                 from "@/types";
import {Info}                               from "lucide-react";
import Image                                from "next/image";
import React, {useEffect, useRef, useState} from "react";


/**
 * 動画カード
 */
const VideoCard: React.FC<{
  videoData: YouTubeVideo;
  songs: Song[];
  handleGenreClick: (tag: string) => void;
  handleTextSearch: (q: string) => void;
  labels: Messages;
}> = ({videoData, songs, handleGenreClick, handleTextSearch, labels}) => {

  const [openInfo, setOpenInfo] = useState<string | null>(null);
  const [openVideoInfo, setOpenVideoInfo] = useState(false);
  const infoRef = useRef<HTMLDivElement>(null);

  // クリック外で閉じる処理をSongInfoModalとVideoCardに集約
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (infoRef.current && !infoRef.current.contains(event.target as Node)) {
        setOpenInfo(null);
        setOpenVideoInfo(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!videoData) return null;

  // 動画が「歌ってみた」動画かどうかを判断 (source: 1 は歌ってみた動画)
  const isSingingVideo = songs.some(song => song.source === 1);

  const thumbnailUrl = videoData?.snippet?.thumbnails?.medium.url;
  const videoTitle = videoData?.snippet.title;

  return (
    <div
      ref={infoRef}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-4 flex flex-col md:flex-row gap-4"
    >
      <div className="w-full flex-shrink-0">
        <a
          href={`https://www.youtube.com/watch?v=${videoData?.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded-lg overflow-hidden group"
        >
          {thumbnailUrl ? <Image
            src={thumbnailUrl}
            alt={videoTitle}
            width={320}
            height={180}
            className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
            // loading="lazy"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = `https://placehold.co/320x180/6b7280/ffffff?text=No+Image`;
            }}
            priority
          /> : <></>}

          {/*<div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">*/}
          {/*  <span className="text-white text-3xl opacity-80">▶</span>*/}
          {/*</div>*/}
          {/*<div className="absolute bottom-1 right-1 bg-black bg-opacity-70 text-white text-xs px-1.5 py-0.5 rounded">*/}
          {/*  {formatDuration(videoData?.contentDetails.duration)}*/}
          {/*</div>*/}
        </a>
        {/*</div>*/}

        {/*<div className="flex-grow md:w-2/3">*/}
        <div className="flex justify-between items-start mb-2">
          <a
            href={`https://www.youtube.com/watch?v=${videoData?.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 line-clamp-2 transition-colors"
            title={videoTitle}
          >
            {videoTitle}
          </a>
          <button
            onClick={() => setOpenVideoInfo(true)}
            className="ml-2 p-1 text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
            title={labels.videoInfo}
          >
            <Info size={20}/>
          </button>
        </div>

        <ul className="space-y-2">
          {songs.map((song, index) => (
            <li
              key={song.timestamp || index}
              className={`text-base space-x-2 ${!isSingingVideo && index > 0 ? "border-t border-gray-200 dark:border-gray-700 pt-2" : ""}`}
            >
              <span className="flex items-center flex-wrap">
                {/* Info ボタン */}
                <button
                  className="mr-1 px-1 py-0.5 text-sm text-blue-600 dark:text-blue-400 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none transition-colors"
                  onClick={() => setOpenInfo(openInfo === song.title ? null : song.title)}
                  title={labels.songInfo}
                >
                  <Info size={18}/>
                </button>
                <a
                  href={`https://www.youtube.com/watch?v=${song.videoId}${song.timestamp ? `&t=${song.timestamp}s` : ""}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-gray-800 dark:text-gray-200 hover:underline hover:text-blue-500 dark:hover:text-blue-300 mr-2"
                >
                  {song.title}
                </a>

                <GenreBadge genre={song.info?.genre} onClick={handleGenreClick}/>
                <OpEdBadge opEd={song.info?.opEd || ""} onClick={handleGenreClick}/>

                {/*{songCountBadge} /!* 歌数バッジをここに配置 *!/*/}
              </span>

              {/* 歌の詳細情報（モーダル風） */}
              {openInfo === song.title && (
                <SongInfoModal
                  song={song}
                  onClose={() => setOpenInfo(null)}
                  onTextSearch={handleTextSearch}
                  labels={labels}
                />
              )}
            </li>
          ))}
        </ul>

        {/* 動画情報モーダル */}
        {openVideoInfo && (
          <YTVideoInfoModal
            video={videoData}
            onClose={() => setOpenVideoInfo(false)}
            onTextSearch={handleTextSearch}
            labels={labels}
          />
        )}
      </div>
    </div>
  );
};

export default VideoCard;