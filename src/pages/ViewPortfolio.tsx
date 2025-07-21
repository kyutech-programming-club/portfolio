import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";

const ViewPortfolio = () => {
  const { id } = useParams(); // URLからIDを取得
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

  if (loading) return <p>読み込み中...</p>;

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "2rem" }}>
      <h1>{name}さんのポートフォリオ</h1>

      {imageUrl && (
        <div style={{ marginBottom: "2rem", textAlign: "center" }}>
          <img
            src={imageUrl}
            alt={`${name}さんの画像`}
            style={{
              maxWidth: "100%",
              height: "auto",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            }}
          />
        </div>
      )}

      <p>{bio}</p>
    </div>
  );
};

export default ViewPortfolio;
