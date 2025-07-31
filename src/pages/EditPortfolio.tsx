import React, { useState } from "react";
import { db, storage } from "../firebase/config";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";

const EditPortfolio = () => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // ページリロードを防ぐ

    if (isSubmitting) return; // 二重送信防止
    setIsSubmitting(true);

    console.log("フォーム送信開始");
    console.log("名前：", name);
    console.log("自己紹介：", bio);
    console.log("画像ファイル：", imageFile);

    try {
      let imageUrl = "";

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

      console.log("Firestore保存開始");
      const docRef = await addDoc(collection(db, "portfolios"), {
        name,
        bio,
        imageUrl,
        createdAt: Timestamp.now(),
      });

      console.log("保存完了!ドキュメントID：", docRef.id);
      alert("保存に成功しました!");

      // フォームをリセット
      setName("");
      setBio("");
      setImageFile(null);
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
    <div>
      <h1>ポートフォリオ作成</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>名前：</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>自己紹介：</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            required
          ></textarea>
        </div>

        <div>
          <label>画像アップロード：</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "保存中..." : "保存"}
        </button>
      </form>
    </div>
  );
};

export default EditPortfolio;