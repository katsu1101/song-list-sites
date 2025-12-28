import { linkUrl } from "./constants";

const extractHashtags = (text: string): string[] => text.match(/#[^\s#]+/gu) ?? [];
const countTag = (tags: string[], tag: string) => tags.filter((t) => t === tag).length;

describe("linkUrl regression: タグが二重化しない", () => {
  test("searchQueryあり: linkurlにタグが入らず、linkname側にだけ1回ずつ出る", () => {
    const generated = linkUrl("テスト");
    const url = new URL(generated);

    const linkurl = url.searchParams.get("linkurl");
    const linkname = url.searchParams.get("linkname");

    expect(linkurl).not.toBeNull();
    expect(linkname).not.toBeNull();

    // linkurl は「URLとしてparseできる」こと（タグや改行が混ざると壊れやすい）
    expect(() => new URL(linkurl!)).not.toThrow();

    // URL側にタグが混入していない（今回のバグ核）
    expect(extractHashtags(linkurl!)).toHaveLength(0);

    // 本文側のタグが重複していない
    const tags = extractHashtags(linkname!);
    expect(countTag(tags, "#戸定梨香ちゃんの歌リスト")).toBe(1);
    expect(countTag(tags, "#戸定梨香")).toBe(1);
    expect(countTag(tags, "#とじょりん")).toBe(1);
  });

  test("searchQueryなし: linkurlは素のURL、linknameのタグは重複しない", () => {
    const generated = linkUrl("");
    const url = new URL(generated);

    const linkurl = url.searchParams.get("linkurl");
    const linkname = url.searchParams.get("linkname");

    expect(linkurl).toBe("https://katsu1101.github.io/song-list-linca-tojou/");
    expect(extractHashtags(linkurl!)).toHaveLength(0);

    const tags = extractHashtags(linkname!);
    expect(countTag(tags, "#戸定梨香ちゃんの歌リスト")).toBe(1);
    expect(countTag(tags, "#戸定梨香")).toBe(1);
    expect(countTag(tags, "#とじょりん")).toBe(1);
  });
});
