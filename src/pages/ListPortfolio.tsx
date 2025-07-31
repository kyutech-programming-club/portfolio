import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { useNavigate } from "react-router-dom";

interface Portfolio {
  id: string;
  name: string;
  bio: string;
  imageUrl?: string;
  createdAt: Timestamp; // 正しいTimestamp型
}

const ListPortfolio = () => {
  const navigate = useNavigate(); // フック呼び出し
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const q = query(
          collection(db, "portfolios"),
          orderBy("createdAt", "desc") // 新しい順に並び替え
        );

        const querySnapshot = await getDocs(q);

        const portfolioList: Portfolio[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(), // スプレッド演算子の活用
        })) as Portfolio[];

        setPortfolios(portfolioList);
      } catch (err) {
        console.error("データ取得エラー:", err);
        setError("データの取得に失敗しました");
      } finally {
        setLoading(false); // 必ずloadingを解除
      }
    };

    fetchPortfolios();
  }, []); // 空の依存配列 = コンポーネントマウント時のみ実行

  // 早期リターンパターン - 条件に応じた表示切り替え
  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <p style={{ color: "#666666", fontSize: "1.1rem" }}>読み込み中...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "2rem", color: "#dc3545" }}>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "1200px", // より広い最大幅
        margin: "0 auto",
        padding: "2rem 3rem", // 左右の余白を増やす
        width: "100%", // 幅を100%に設定
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "2rem",
          color: "#2c3e50", // 濃いダークブルーグレー
          fontSize: "2rem",
          fontWeight: "bold",
        }}
      >
        ポートフォリオ一覧
      </h1>

      {/* 配列が空の場合の処理 */}
      {portfolios.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "3rem",
            backgroundColor: "#f8f9fa",
            borderRadius: "8px",
            border: "2px dashed #dee2e6",
            margin: "0 auto",
            maxWidth: "500px",
          }}
        >
          <h3 style={{ color: "#495057", marginBottom: "1rem" }}>
            🎨 ポートフォリオがまだありません
          </h3>
          <p style={{ color: "#6c757d", marginBottom: "1.5rem" }}>
            最初のポートフォリオを作成して、あなたの作品を世界に発信しましょう！
          </p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)", // 固定3列
            gap: "3rem", // カード間の余白を広く
            marginBottom: "2rem",
            justifyContent: "center", // グリッド全体を中央揃え
            alignItems: "start", // 上揃え
            maxWidth: "1100px", // グリッド全体の最大幅
            margin: "0 auto 2rem auto", // 中央配置
            padding: "0 2rem", // 左右に余白
          }}
        >
          {/* 配列のmap()でリスト表示 - Reactの最重要パターン */}
          {portfolios.map((portfolio) => (
            <div
              key={portfolio.id} // key属性は必須！
              style={{
                border: "1px solid #ddd",
                borderRadius: "12px", // より丸みを帯びた角
                padding: "1.5rem", // 内側の余白を増やす
                backgroundColor: "#ffffff", // 純白の背景
                display: "flex",
                flexDirection: "column", // 縦方向に要素を配置
                height: "100%", // カードの高さを統一
                width: "100%", // カード幅を統一
                maxWidth: "320px", // 少し小さめの最大幅
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)", // より深い影
                transition: "all 0.3s ease", // スムーズなアニメーション
                margin: "0 auto", // カード自体も中央揃え
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
              }}
            >
              <h3
                style={{
                  color: "#333333", // 濃いグレー（黒に近い）
                  marginBottom: "1rem",
                  fontSize: "1.2rem",
                }}
              >
                {portfolio.name}さんのポートフォリオ
              </h3>

              {/* 条件付きレンダリング - 画像がある場合のみ表示 */}
              {portfolio.imageUrl && (
                <img
                  src={portfolio.imageUrl}
                  alt={`${portfolio.name}さんの画像`}
                  style={{
                    width: "100%", // カード幅に合わせる
                    height: "180px", // 少し高めの固定高さ
                    objectFit: "cover",
                    borderRadius: "8px",
                    marginBottom: "1.5rem", // 下の余白を増やす
                  }}
                />
              )}

              {/* 詳細ページへのリンク */}
              <p
                style={{
                  flexGrow: 1, // 残りの空間を占める
                  marginBottom: "1rem",
                  color: "#555555", // 読みやすいダークグレー
                  lineHeight: "1.5", // 行間を調整
                  fontSize: "0.95rem",
                }}
              >
                {portfolio.bio}
              </p>

              {/* ボタンエリア */}
              <div
                style={{
                  display: "flex",
                  gap: "0.5rem",
                  marginTop: "auto", // ボタンを下部に配置
                }}
              >
                <button
                  onClick={() => navigate(`/view/${portfolio.id}`)}
                  style={{
                    backgroundColor: "#007bff",
                    color: "white",
                    border: "none",
                    padding: "0.5rem 1rem",
                    borderRadius: "4px",
                    cursor: "pointer",
                    flex: 1, // ボタンの幅を均等に
                    fontSize: "0.9rem",
                  }}
                >
                  詳細を見る
                </button>

                <button
                  onClick={() => navigate(`/edit/${portfolio.id}`)}
                  style={{
                    backgroundColor: "#ffc107",
                    color: "black",
                    border: "none",
                    padding: "0.5rem 1rem",
                    borderRadius: "4px",
                    cursor: "pointer",
                    flex: 1, // ボタンの幅を均等に
                    fontSize: "0.9rem",
                  }}
                >
                  編集する
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 新規作成ボタン */}
      <div
        style={{
          marginTop: "3rem",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <button
          onClick={() => {
            navigate(`/edit`);
          }}
          style={{
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            padding: "1rem 2rem",
            borderRadius: "8px",
            fontSize: "1.1rem",
            cursor: "pointer",
            boxShadow: "0 4px 8px rgba(40, 167, 69, 0.3)",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow =
              "0 6px 12px rgba(40, 167, 69, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow =
              "0 4px 8px rgba(40, 167, 69, 0.3)";
          }}
        >
          ✨ 新しいポートフォリオを作成
        </button>
      </div>
    </div>
  );
};

export default ListPortfolio;
