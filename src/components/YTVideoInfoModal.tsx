import {formatDateYmd}            from "@/lib/dateFormat";
import {Messages}                 from "@/lib/i18n";
import {formatDuration}           from "@/lib/youTube";
import {YouTubeVideo}             from "@/types";
import {X}                        from "lucide-react"; // アイコンをインポート
import React, {useEffect, useRef} from "react";

/**
 * 動画情報モーダル
 */
const YTVideoInfoModal: React.FC<{
  video: YouTubeVideo;
  onClose: () => void;
  onTextSearch: (q: string) => void;
  labels: Messages;
}> = ({video, onClose, onTextSearch, labels}) => {
  const infoRef = useRef<HTMLDivElement>(null);

  // クリック外で閉じる
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (infoRef.current && !infoRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const durationText = formatDuration(video?.contentDetails.duration);
  const publishedDate = video?.snippet.publishedAt
    ? formatDateYmd(video.snippet.publishedAt)
    : "";

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
      <div
        ref={infoRef}
        className="overscroll-x-none bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100"
      >
        <div className="relative">
          <h2
            className="text-xl font-bold mb-4 text-gray-900 dark:text-white border-b pb-2 flex justify-between items-center">
            {labels.videoDetails}
            <button onClick={onClose} className="text-gray-500 hover:text-red-500">
              <X size={24}/>
            </button>
          </h2>

          <div className="mb-4">
            <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">
              {video?.snippet.title}
            </h3>
            {labels.channel}:
            <a href={`https://www.youtube.com/channel/${video?.snippet.channelId}`} target="_blank"
               rel="noopener noreferrer" className="hover:underline">
              {video?.snippet.channelTitle}
            </a>
          </div>

          <table className="w-full text-left text-sm mb-4">
            <tbody>
            <tr className="border-b border-gray-300 dark:border-gray-600">
              <td
                className="text-nowrap py-2 pr-4 font-semibold text-gray-700 dark:text-gray-300 w-1/4">{labels.publishedAt}</td>
              <td className="py-2 text-gray-900 dark:text-gray-100 w-3/4">{publishedDate}</td>
            </tr>
            <tr className="border-b border-gray-300 dark:border-gray-600">
              <td
                className="text-nowrap py-2 pr-4 font-semibold text-gray-700 dark:text-gray-300">{labels.duration}</td>
              <td className="py-2 text-gray-900 dark:text-gray-100">{durationText}</td>
            </tr>
            <tr>
              <td colSpan={2} className="py-2 text-gray-900 dark:text-gray-100 align-top">
                <div className="text-lg font-semibold mt-2 mb-1">{labels.description}</div>
                <div className="
                  max-h-32
                  overflow-y-auto
                  overflow-x-hidden   /* 横方向にはみ出した分は隠す */
                  whitespace-pre-wrap /* 改行維持＋通常の折り返し */
                  break-all         /* 長いURLなども途中で折り返す */
                  text-sm border p-2 rounded-md
                  bg-gray-50 dark:bg-gray-700">
                  {video?.snippet.description}
                </div>
              </td>
            </tr>
            {video?.snippet.tags && video?.snippet.tags.length > 0 && (
              <tr>
                <td colSpan={2} className="py-2 text-gray-900 dark:text-gray-100 align-top">
                  <div className="text-lg font-semibold mt-2 mb-1">{labels.tags}</div>
                  <div className="text-xs max-h-32 overflow-y-auto whitespace-pre-wrap flex flex-wrap gap-2 pr-2">
                    {video?.snippet.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                        onClick={() => {
                          onTextSearch(tag);
                          onClose();
                        }}
                      >
                          {tag}
                        </span>
                    ))}
                  </div>
                </td>
              </tr>
            )}
            </tbody>
          </table>

          <button
            className="mt-4 w-full px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none transition-colors"
            onClick={onClose}
          >
            {labels.close}
          </button>
        </div>
      </div>
    </div>
  );
};


export default YTVideoInfoModal;
