import {SongInfo} from "@/types";
import React      from "react";

const MusicServiceLinks = ({ isSingingVideo, songInfo, videoID }: { isSingingVideo:boolean, songInfo?: SongInfo, videoID?: string }) => {
  if (!songInfo) return null;
  return <>
    {(isSingingVideo || songInfo.YouTubeMusic) && (
      <a
        href={isSingingVideo
          ? `https://music.youtube.com/watch?v=${videoID}`
          : songInfo.YouTubeMusic}
        target="_blank"
        rel="noopener noreferrer"
        className="ml-4 text-red-500 hover:text-red-700 dark:hover:text-red-300"
      >
        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b0/YouTube_Music_icon_2024.svg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original"
             alt="YouTube Music" width="24"/>
      </a>
    )}

    {songInfo.AppleMusic && (
      <a
        href={songInfo.AppleMusic}
        target="_blank"
        rel="noopener noreferrer"
        className="ml-4 text-blue-500 hover:text-blue-700 dark:hover:text-blue-300"
      >
        <img src="https://upload.wikimedia.org/wikipedia/commons/f/f8/Apple_Music_icon_iOS_26.svg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original"
             alt="Apple Music" width="24"/>
      </a>
    )}
    {songInfo.Spotify && (
      <a
        href={songInfo.Spotify}
        target="_blank"
        rel="noopener noreferrer"
        className="ml-4 text-green-500 hover:text-green-700 dark:hover:text-green-300"
      >
        <img src="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original"
             alt="Spotify" width="24"/>
      </a>
    )}
    {songInfo.LineMusic && (
      <a
        href={songInfo.LineMusic}
        target="_blank"
        rel="noopener noreferrer"
        className="ml-4 text-blue-500 hover:text-blue-700 dark:hover:text-blue-300"
      >
        <img src="https://upload.wikimedia.org/wikipedia/commons/9/92/LINE_APP_Logo.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original"
             alt="Line Music" width="24"/>
      </a>
    )}
    {songInfo.AmazonMusic && (
      <a
        href={songInfo.AmazonMusic}
        target="_blank"
        rel="noopener noreferrer"
        className="ml-2 text-orange-500 hover:text-orange-700 dark:hover:text-orange-300"
      >
        <img src="https://upload.wikimedia.org/wikipedia/commons/5/5f/Amazonmusic.logo.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original"
             alt="Amazon Music" width="48"/>
      </a>
    )}
</>
}

export default MusicServiceLinks;