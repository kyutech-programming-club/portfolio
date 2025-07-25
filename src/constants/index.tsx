export const BASE_URL = import.meta.env.VITE_PUBLIC_URL || "";

export const PROJECTS = [
  {
    emoji: "👋",
    title: "ポートフォリオサイト",
    desc: "今表示しているこのサイト。シンプルな Web サイトを作成しながら、Reactの基本的な概念を学びました。",
    img: "/react-portfolio.png",
    githubUrl: "#",
  },
  {
    emoji: "💬",
    title: "名言ジェネレーター",
    desc: "このプロジェクトでは、useEffect フックを使ったデータフェッチと、その注意点について重点的に学習しました。",
    img: "/random-quote.png",
    githubUrl: "#",
  },
  {
    emoji: "✏️",
    title: "作業用メモアプリ",
    desc: "このプロジェクトでは、stateの配列やオブジェクトを、イミュータブルに扱うReactの作法を学習しました。",
    img: "/simple-memo.png",
    githubUrl: "#",
  },
  {
    emoji: "💰",
    title: "割り勘計算機",
    desc: "このプロジェクトでは、Zustandを使用して、グローバルに状態を管理する実装を学習しました。",
    img: "/warikan-culculator.png",
    githubUrl: "#",
  },
];

export const SOCIAL = {
  github: "#",
  twitter: "#",
  blog: "#",
};
