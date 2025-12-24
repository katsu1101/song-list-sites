"use client";

import {ImageLogo}                    from "@/components/ImageLogo";
import {ImageX}                       from "@/components/ImageX";
import Menu                           from "@/components/Menu";
import {SessionVideos}                from "@/components/SessionVideos";
import {filterSongs, linkUrl}         from "@/lib/constants";
import {checkVersionAndUpdateCache}   from "@/lib/versionChecker";
import {siteConfig}                   from "@/site";
import {Song, SongInfo, YouTubeVideo} from "@/types";

import {useSearchParams}     from "next/navigation";
import Papa                  from "papaparse";
import {useEffect, useState} from "react";

const basePath = siteConfig.basePath;

export default function Home() {
  const searchParams = useSearchParams();
  const query = searchParams.get("s") || "";
  const [songs, setSongs] = useState<Song[]>([]);
  const [videos, setVideos] = useState<Record<string, YouTubeVideo>>({});
  const [searchQuery, setSearchQuery] = useState<string>(query);
  const [songInfoMap, setSongInfoMap] = useState<Record<string, SongInfo> | null>(null);
  const [isScrolled, setIsScrolled] = useState(false); // スクロールの位置
  const [isClient, setIsClient] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false)

  // ✅ クリック時に検索バーへジャンルをセット
  const handleGenreClick = (tag: string) => {
    setSearchQuery("#" + tag);
  };
  const handleTextSearch = (q: string) => {
    setSearchQuery(q);
  };

  const smoothScrollToTop = () => {
    const scrollStep = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > 0) {
        window.scrollTo(0, currentScroll - currentScroll / 5); // 速度調整
        requestAnimationFrame(scrollStep);
      }
    };
    requestAnimationFrame(scrollStep);
  };

  // 検索をリセット
  const handleResetSearch = () => {
    smoothScrollToTop(); // 🔝 なめらかにスクロール
    setSearchQuery(""); // 🔍 検索をリセット
  };

  useEffect(() => {
    // バージョンチェックを初期化処理として実行
    const checkVersion = async () => {
      await checkVersionAndUpdateCache();
    };
    checkVersion();
  }, []);

  useEffect(() => {
    const fetchSongInfo = async () => {
      try {
        const res = await fetch(`${basePath}/songinfo.csv`);
        const csvText = await res.text();
        const {data}: { data: SongInfo[] } = Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
        });

        const songInfoObj: Record<string, SongInfo> = {};
        data.forEach((info) => {
          songInfoObj[info.title] = info;
        });

        setSongInfoMap(songInfoObj);
      } catch (error) {
        console.error("Failed to load songinfo.csv:", error);
      }
    };

    fetchSongInfo();
  }, []);

  useEffect(() => {
    if (!songInfoMap) return;
    const fetchSongs = async () => {

      try {
        const res = await fetch(`${basePath}/${siteConfig.assetDir}/songs.json`);
        const data = await res.json();

        const sortedSongs = [...data.songs].sort((a: Song, b: Song) => {
          if (a.date !== b.date) {
            return b.date.localeCompare(a.date);
          }
          return (a.timestamp || 0) - (b.timestamp || 0);
        });
        const songsWithInfo = sortedSongs.map((song) => ({
          ...song,
          info: songInfoMap[song.title] || null,
        }));

        setSongs(songsWithInfo);
        setVideos(data.videos || {});
      } catch (error) {
        console.error("Failed to load songs.json:", error);
      }
    };

    fetchSongs();
  }, [songInfoMap]);

  useEffect(() => {
    setIsClient(true); // クライアント側でのみ `true` にする
    // クライアントサイドでのみ実行
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest(".menu-container")) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [menuOpen]);

  if (!isClient) {
    return <div>Loading...</div>; // SSR時に一旦「Loading...」を表示
  }

  return (
    <main className="max-w-4xl mx-auto p-4 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900">
      {/* 固定ヘッダー */}
      <div className="fixed top-0 left-0 w-full bg-white dark:bg-gray-900 shadow-md p-0">
        <div className="max-w-4xl mx-auto flex flex-col items-center transition-all">
          {/* タイトル（スクロール時に消える） */}
          {/* タイトルエリア（タイトルとメニューアイコンを横並びに） */}
          <div className={`flex items-center justify-between w-full px-4 pt-2  ${
            isScrolled ? "opacity-0 h-0" : "opacity-100 h-auto"
          }`}>
            <h1 className="text-2xl md:text-4xl font-bold whitespace-nowrap">
              {siteConfig.title}{/*戸定梨香ちゃんの歌リスト*/}
            </h1>
            {/* メニューアイコン */}
            <Menu menuOpen={menuOpen} onClick={() => setMenuOpen(!menuOpen)}/>
          </div>

          <div className="max-w-4xl mx-auto flex items-center w-full z-[998] p-0">
            {/*左上のアイコン */}
            <div className="mr-2 h-full p-1 cursor-pointer" onClick={handleResetSearch}>
              <ImageLogo/>
            </div>

            {/* 検索バー（中央配置） */}
            <div className="flex-1 relative pr-3">
              <input
                type="text"
                placeholder="曲名・日付・動画タイトルで検索"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-2 border border-gray-400 rounded-md
                dark:bg-gray-800 dark:text-gray-100"
              />
              {/* 検索リセットボタン（×ボタン） */}
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-100
                rounded-full w-6 h-6 flex items-center justify-center hover:bg-gray-400 dark:hover:bg-gray-600 transition"
                >
                  ✕
                </button>
              )}
            </div>
            <div>
              {/* AddToAny のシェアボタンコンテナ */}
              <div title="検索結果をXでポスト！">
                <a  href={linkUrl(searchQuery)} target="_blank">
                  <ImageX/>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SessionVideos
        filteredSongs={filterSongs(songs, videos, searchQuery)}
        videos={videos}
        handleTextSearch={handleTextSearch}
        handleGenreClick={handleGenreClick}
      />
    </main>
  );
}
