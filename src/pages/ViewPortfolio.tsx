import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaArrowLeft, FaPencil } from "react-icons/fa6";

const ViewPortfolio = () => {
  const { id } = useParams(); // URLからIDを取得
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      if (!id) return;
      const docRef = doc(db, "portfolios", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setName(data.name);
        setBio(data.bio);
        setImageUrl(data.imageUrl || null);
      } else {
        alert("データが見つかりませんでした");
      }
      setLoading(false);
    };

    fetchPortfolio();
  }, [id]);

  if (loading) {
    return (
      <>
        <Header />
        <main className="pt-20 min-h-screen bg-stone-50">
          <div className="max-w-4xl mx-auto px-6 py-12">
            <div className="flex justify-center items-center h-64">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
                <p className="text-stone-600 text-lg">読み込み中...</p>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="pt-20 min-h-screen bg-stone-50">
        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* ナビゲーションボタン */}
          <div className="mb-8 flex justify-between items-center">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-stone-600 hover:text-emerald-600 transition-colors duration-200"
            >
              <FaArrowLeft className="w-4 h-4" />
              <span>一覧に戻る</span>
            </button>
            <button
              onClick={() => navigate(`/edit/${id}`)}
              className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
            >
              <FaPencil className="w-4 h-4" />
              <span>編集する</span>
            </button>
          </div>

          {/* メインコンテンツ */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* ヘッダー部分 */}
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 px-8 py-12 text-white text-center">
              <div className="mb-4">
                <div className="bg-white/20 backdrop-blur-sm text-4xl h-20 w-20 rounded-full flex justify-center items-center mx-auto">
                  👤
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                {name}さんのポートフォリオ
              </h1>
              <p className="text-emerald-100 text-lg">
                プロフィールと作品をご覧ください
              </p>
            </div>

            {/* コンテンツ部分 */}
            <div className="p-8">
              {imageUrl && (
                <div className="mb-8 text-center">
                  <div className="inline-block">
                    <img
                      src={imageUrl}
                      alt={`${name}さんの画像`}
                      className="max-w-md w-full h-auto rounded-lg shadow-lg object-cover"
                    />
                  </div>
                </div>
              )}

              <div className="prose prose-stone max-w-none">
                <h2 className="text-2xl font-semibold text-stone-800 mb-4 flex items-center gap-2">
                  <span className="text-emerald-600">📝</span>
                  自己紹介
                </h2>
                <div className="bg-stone-50 p-6 rounded-lg">
                  <p className="text-stone-700 text-lg leading-relaxed whitespace-pre-wrap">
                    {bio}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ViewPortfolio;
