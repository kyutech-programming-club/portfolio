import { BASE_URL } from "../constants"; // 追加

const About = () => {
  return (
    <section id="about" className="bg-white py-24">
  <div className="max-w-5xl mx-auto px-6 md:px-8">
    <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
      <div className="md:w-1/2 w-full flex justify-center">
        <img
          src={`${BASE_URL}/camp-coffee.jpg`}
          alt="Camp Coffee"
          className="rounded-lg shadow-md w-full max-w-sm h-auto object-cover"
        />
      </div>
      <div className="md:w-1/2 w-full space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold text-stone-800">About</h2>
        <p className="text-stone-600 text-lg leading-relaxed">
          私は、プログラミングを始めて約１年半となる、ビギナーの開発者です。
          <br />
          現在は、React、TypeScript、Tailwind CSS などを使用した、
          フロントエンド開発のスキルアップに、情熱を注いでいます。
        </p>
        <p className="text-stone-600 text-lg leading-relaxed">
          趣味は、キャンプです🏕️
        </p>
      </div>
    </div>
  </div>
</section>

  );
};

export default About;
