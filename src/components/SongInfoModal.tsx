import GenreBadge                 from "@/components/GenreBadge";
import OpEdBadge                  from "@/components/OpEdBadge";
import {Dictionary}               from "@/lib/i18n";
import {Song}                     from "@/types";
import {Search, X}                from "lucide-react"; // アイコンをインポート（lucide-reactを使用） // アイコンをインポート
import React, {useEffect, useRef} from "react";

/**
 * 曲情報モーダル
 */
const SongInfoModal: React.FC<{
  song: Song;
  onClose: () => void;
  onTextSearch: (q: string) => void;
  labels: Dictionary;
}> = ({song, onClose, onTextSearch, labels}) => {
  const infoRef = useRef<HTMLDivElement>(null);

  const handleSearch = (q: string) => {
    onTextSearch(q);
    onClose();
  };

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

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
      <div
        ref={infoRef}
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl w-full max-w-lg md:max-w-xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100"
      >
        <h2
          className="text-xl font-bold mb-4 text-gray-900 dark:text-white border-b pb-2 flex justify-between items-center">
          {labels.songDetails}
          <button onClick={onClose} className="text-gray-500 hover:text-red-500">
            <X size={24}/>
          </button>
        </h2>

        <table className="w-full text-left text-sm">
          <tbody>
          <tr className="border-b border-gray-300 dark:border-gray-600">
            <td
              className="text-nowrap py-2 pr-4 font-semibold text-gray-700 dark:text-gray-300 w-1/4">{labels.artist}</td>
            <td className="py-2 text-gray-900 dark:text-gray-100 font-bold w-3/4">{song.artist}</td>
          </tr>

          <tr className="border-b border-gray-300 dark:border-gray-600">
            <td
              className="text-nowrap py-2 pr-4 font-semibold text-gray-700 dark:text-gray-300 w-1/4">{labels.title}</td>
            <td className="py-2 text-gray-900 dark:text-gray-100 font-bold w-3/4">{song.title}</td>
          </tr>

          {song.info?.genre && (
            <tr className="border-b border-gray-300 dark:border-gray-600">
              <td className="text-nowrap py-2 pr-4 font-semibold text-gray-700 dark:text-gray-300">{labels.genre}</td>
              <td className="py-2 text-gray-900 dark:text-gray-100">
                <GenreBadge
                  genre={song.info.genre}
                  onClick={(g) => handleSearch("#" + g)}
                />
              </td>
            </tr>
          )}

          {song.info?.release && (
            <tr className="border-b border-gray-300 dark:border-gray-600">
              <td className="text-nowrap py-2 pr-4 font-semibold text-gray-700 dark:text-gray-300">{labels.release}</td>
              <td className="py-2 text-gray-900 dark:text-gray-100">{song.info.release}</td>
            </tr>
          )}

          {song.info?.work && (
            <tr className="border-b border-gray-300 dark:border-gray-600">
              <td className="text-nowrap py-2 pr-4 font-semibold text-gray-700 dark:text-gray-300">{labels.work}</td>
              <td className="py-2 text-gray-900 dark:text-gray-100">
                {song.info.work}
                <button
                  className="ml-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  onClick={() => handleSearch(song.info?.work || '')}
                >
                  <Search size={16}/>
                </button>
              </td>
            </tr>
          )}

          {song.info?.opEd && (
            <tr className="border-b border-gray-300 dark:border-gray-600">
              <td className="text-nowrap py-2 pr-4 font-semibold text-gray-700 dark:text-gray-300">{labels.opEd}</td>
              <td className="py-2 text-gray-900 dark:text-gray-100">
                <OpEdBadge
                  opEd={song.info.opEd}
                  onClick={(o) => handleSearch('#' + o)}
                />
              </td>
            </tr>
          )}

          {song.info?.lyricist && (
            <tr className="border-b border-gray-300 dark:border-gray-600">
              <td
                className="text-nowrap py-2 pr-4 font-semibold text-gray-700 dark:text-gray-300">{labels.lyricist}</td>
              <td className="py-2 text-gray-900 dark:text-gray-100">
                {song.info.lyricist}
                <button
                  className="ml-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  onClick={() => handleSearch(song.info?.lyricist || '')}
                >
                  <Search size={16}/>
                </button>
              </td>
            </tr>
          )}

          {song.info?.composer && (
            <tr className="border-b border-gray-300 dark:border-gray-600">
              <td
                className="text-nowrap py-2 pr-4 font-semibold text-gray-700 dark:text-gray-300">{labels.composer}</td>
              <td className="py-2 text-gray-900 dark:text-gray-100">
                {song.info.composer}
                <button
                  className="ml-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  onClick={() => handleSearch(song.info?.composer || '')}
                >
                  <Search size={16}/>
                </button>
              </td>
            </tr>
          )}

          {song.info?.arranger && (
            <tr className="border-b border-gray-300 dark:border-gray-600">
              <td
                className="text-nowrap py-2 pr-4 font-semibold text-gray-700 dark:text-gray-300">{labels.arranger}</td>
              <td className="py-2 text-gray-900 dark:text-gray-100">
                {song.info.arranger}
                <button
                  className="ml-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  onClick={() => handleSearch(song.info?.arranger || '')}
                >
                  <Search size={16}/>
                </button>
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
  );
};

export default SongInfoModal;
