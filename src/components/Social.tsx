import { FaXTwitter, FaGithub, FaRegFileLines } from "react-icons/fa6";
import PropTypes from "prop-types";
import { SOCIAL } from "../constants";

const SocialLinkCard = ({ href, children }) => {
  return (
    <a
      className="flex items-center p-12 sm:p-16 rounded-2xl border border-stone-200 hover:bg-stone-50 text-stone-600 hover:text-stone-900"
      href={href}
    >
      {children}
    </a>
  );
};

SocialLinkCard.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

const SOCIAL_LINKS = [
  { href: SOCIAL.github, icon: FaGithub, label: "GitHub" },
  { href: SOCIAL.twitter, icon: FaXTwitter, label: "Twitter" },
  { href: SOCIAL.blog, icon: FaRegFileLines, label: "Blog" },
  //   追加
];

const Social = () => {
  return (
    <section id="social" className="py-24 bg-white">
      <div className="container mx-auto max-w-xl text-center space-y-8">
        <h2 className="text-5xl font-bold text-stone-800 ">Social</h2>
        <p className="text-stone-500 leading-relaxed text-xl">
          私は、主に下記の媒体で、活動の記録を更新しています。
          <br />
          そして、多くの開発者と繋がれることを、楽しみにしています🙌
        </p>
        <div className="flex justify-center space-x-2 sm:space-x-8">
          {SOCIAL_LINKS.map(({ href, icon: Icon, label }) => (
            <SocialLinkCard key={label} href={href}>
              <Icon className="w-16 h-16" />
            </SocialLinkCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Social;
