import React, { useState, useEffect } from "react";
import { db, storage } from "../firebase/config";
import {
  collection,
  addDoc,
  Timestamp,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate, useParams } from "react-router-dom";

const EditPortfolio = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // URLパラメータからIDを取得
  const isEditMode = Boolean(id); // IDがある場合は編集モード

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);

  // 編集モードの場合、既存データを読み込み
  useEffect(() => {
    if (isEditMode && id) {
      setLoading(true);
      const fetchPortfolio = async () => {
        try {
          const docRef = doc(db, "portfolios", id);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            setName(data.name || "");
            setBio(data.bio || "");
            setCurrentImageUrl(data.imageUrl || null);
          } else {
            alert("ポートフォリオが見つかりませんでした");
            navigate("/");
          }
        } catch (error) {
          console.error("データの取得に失敗しました:", error);
          alert("データの取得に失敗しました");
          navigate("/");
        } finally {
          setLoading(false);
        }
      };

      fetchPortfolio();
    }
  }, [isEditMode, id, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // ページリロードを防ぐ

    if (isSubmitting) return; // 二重送信防止
    setIsSubmitting(true);

    console.log("フォーム送信開始");
    console.log("モード:", isEditMode ? "編集" : "新規作成");
    console.log("名前：", name);
    console.log("自己紹介：", bio);
    console.log("画像ファイル：", imageFile);

    try {
      let imageUrl = currentImageUrl || ""; // 既存の画像URLを保持

      // 新しい画像がアップロードされた場合のみ処理
      if (imageFile) {
        console.log("画像アップロード開始");
        const storageRef = ref(
          storage,
          `images/${imageFile.name}_${Date.now()}`
        );
        const snapshot = await uploadBytes(storageRef, imageFile);
        imageUrl = await getDownloadURL(snapshot.ref);
        console.log("画像アップロード完了:", imageUrl);
      }

      if (isEditMode && id) {
        // 編集モード: 既存ドキュメントを更新
        console.log("Firestore更新開始");
        const docRef = doc(db, "portfolios", id);
        await updateDoc(docRef, {
          name,
          bio,
          imageUrl,
          updatedAt: Timestamp.now(),
        });
        console.log("更新完了!ドキュメントID：", id);
        alert("更新に成功しました!");
      } else {
        // 新規作成モード
        console.log("Firestore保存開始");
        const docRef = await addDoc(collection(db, "portfolios"), {
          name,
          bio,
          imageUrl,
          createdAt: Timestamp.now(),
        });
        console.log("保存完了!ドキュメントID：", docRef.id);
        alert("保存に成功しました!");
      }

      // 一覧ページに戻る
      navigate("/");
    } catch (error) {
      console.error("保存に失敗しました：", error);
      alert("保存に失敗しました: " + (error as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  return (
    <>
      <Header />
      <main className="pt-20 min-h-screen bg-stone-50">
        <div className="max-w-2xl mx-auto px-6 py-12">
          {loading ? (
            // ローディング状態
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="flex justify-center items-center h-64">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
                  <p className="text-stone-600 text-lg">
                    データを読み込み中...
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* ヘッダー部分 */}
              <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 px-8 py-8 text-white text-center">
                <h1 className="text-3xl font-bold">
                  {isEditMode ? "ポートフォリオ編集" : "ポートフォリオ作成"}
                </h1>
                <p className="text-emerald-100 mt-2">
                  {isEditMode
                    ? "情報を更新してください"
                    : "あなたの情報を入力してください"}
                </p>
              </div>

              {/* フォーム部分 */}
              <div className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      名前 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                      placeholder="あなたの名前を入力してください"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      自己紹介 <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors resize-none"
                      placeholder="あなたについて教えてください&#10;&#10;例：&#10;- 好きな技術&#10;- 趣味&#10;- 経験など"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      プロフィール画像
                    </label>

                    {/* 現在の画像を表示（編集モードの場合） */}
                    {isEditMode && currentImageUrl && (
                      <div className="mb-4">
                        <p className="text-sm text-stone-600 mb-2">
                          現在の画像:
                        </p>
                        <img
                          src={currentImageUrl}
                          alt="現在のプロフィール画像"
                          className="w-32 h-32 object-cover rounded-lg border-2 border-stone-200"
                        />
                      </div>
                    )}

                    <div className="border-2 border-dashed border-stone-300 rounded-lg p-6 text-center hover:border-emerald-400 transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full"
                        id="image-upload"
                      />
                      <p className="text-stone-500 text-sm mt-2">
                        {isEditMode
                          ? "新しい画像をアップロードすると現在の画像が置き換わります"
                          : "JPG、PNG、GIF形式の画像をアップロードできます"}
                      </p>
                    </div>
                  </div>

                  {/* ボタン部分 */}
                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => navigate("/")}
                      className="flex-1 py-3 px-6 border border-stone-300 text-stone-700 rounded-lg hover:bg-stone-50 transition-colors"
                    >
                      キャンセル
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`flex-1 py-3 px-6 rounded-lg font-medium transition-colors ${
                        isSubmitting
                          ? "bg-stone-400 text-white cursor-not-allowed"
                          : "bg-emerald-600 hover:bg-emerald-700 text-white"
                      }`}
                    >
                      {isSubmitting
                        ? isEditMode
                          ? "更新中..."
                          : "保存中..."
                        : isEditMode
                        ? "更新する"
                        : "保存する"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default EditPortfolio;
