import {siteConfig} from "@/site";
import {X}          from "lucide-react";
import React        from "react"; // アイコンをインポート

type Props = {
  menuOpen: boolean
  onClick?: () => void; // ✅ クリック時にジャンルを渡せる
};

const Menu: React.FC<Props> = ({menuOpen, onClick}) => {

  return (
    <div className="relative">
      <button
        onClick={onClick}
        className="text-2xl p-2 text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 rounded-full bg-white dark:bg-gray-800 shadow-md transition-colors"
        title="メニュー"
      >
        ☰
      </button>
      {menuOpen && (
        <div
          className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl z-50 p-4 transition-opacity duration-300 animate-fade-in">
          <div className="text-right mb-2">
            <button onClick={onClick} className="text-gray-500 hover:text-red-500">
              <X size={20}/>
            </button>
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white border-b pb-2 mb-2">関連リンク</h3>
          <ul className="space-y-2 text-sm">
            {siteConfig.menuItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    block max-w-full p-0 rounded-lg
                    text-gray-700 dark:text-gray-300
                    hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors
                    whitespace-nowrap overflow-hidden text-ellipsis"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Menu;
