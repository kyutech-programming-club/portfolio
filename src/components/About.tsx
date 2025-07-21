import { BASE_URL } from "../constants"; // 追加

const About = () => {
  return (
    <section id="about" className="w-full bg-white">
      <div className="container mx-auto py-36 max-w-4xl flex items-center">
        <div className="w-1/2">
          <img
            src={`${BASE_URL}/camp-coffee.jpg`} // 追加
            alt="Camp Coffee"
            className="rounded-lg shadow-md"
          />
        </div>
        <div className="w-1/2 pl-6 space-y-8">
          <h2 className="text-5xl font-bold text-stone-800">About</h2>
          <p className="text-stone-500 leading-relaxed text-xl">
            私は、プログラミングを始めて約１年半となる、ビギナーの開発者です。
            <br />
            現在は、React、TypeScript、Tailwind CSS などを使用した、
            フロントエンド 開発のスキルアップに、情熱を注いでいます。
          </p>
          <p className="text-stone-500 leading-relaxed text-xl">
            趣味は、キャンプです🏕️
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
