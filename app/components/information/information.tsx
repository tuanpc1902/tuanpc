import styled from 'styled-components';
import { CodeBracketIcon, ContactIcon, GithubIcon } from '../icons/icons';

const StyleAvatar = styled.div``;

function Information() {
  return (
    <div className="py-20 select-none">
      <StyleAvatar className="flex items-center justify-center w-[12rem] h-[10rem] mx-auto mb-5 border-4 border-third bg-opacity-10 border-primary">
        <CodeBracketIcon
          width="4rem"
          height="4rem"
          className="code-bracket-icon animate-[pointer_1s_cubic-bezier(.075,.82,.165,1)_infinite]"
        />
      </StyleAvatar>
      <div className="max-w-xl mx-auto mb-10 text-3xl font-bold leading-snug text-center text-white lg:leading-relaxed lg:text-4xl">
        {/* I am a Java web programmer */} 1 2 3 4 5 6 7 8 9
      </div>
      <div className="flex flex-col justify-center gap-5 mb-10 sm:items-center sm:flex-row">
        <a
          href={process.env.PROFILE_GITHUB_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center gap-x-3 px-8 py-4 font-sans font-semibold tracking-wide text-white bg-slate-800 rounded-lg h-[60px] w-full sm:w-[230px] button-effect hover:text-white"
        >
          <GithubIcon className="github-icon" />
          View on Github
        </a>

        <a
          href={process.env.PROFILE_FB_URL}
          target="_blank"
          className="inline-flex items-center justify-center gap-x-3 px-8 py-4 font-sans font-semibold tracking-wide text-white bg-gradient-primary rounded-lg h-[60px] w-full sm:w-[230px] button-effect hover:text-white"
          rel="noreferrer"
        >
          <ContactIcon className="contact-icon" />
          <span>Contact me</span>
        </a>
      </div>
    </div>
  );
}
export default Information;
