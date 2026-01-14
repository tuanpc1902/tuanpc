interface IconProps {
  width?: string;
  height?: string;
  className?: string;
}

export const LogoIcon = ({
  width = '2.4rem',
  height = '2.4rem',
  className,
}: IconProps) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
  >
    {/* Letter T - bold and modern */}
    <path
      d="M8 4h8v3h-3v11h-2V7H8V4z"
      fill="currentColor"
    />
    {/* Decorative accent */}
    <circle cx="12" cy="20" r="1.5" fill="currentColor" opacity="0.6" />
  </svg>
);

export const GithubIcon = ({
  width = '2.4rem',
  height = '2.4rem',
  className,
}: IconProps) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path
      d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
    ></path>
  </svg>
);

export const ContactIcon = ({
  width = '2.4rem',
  height = '2.4rem',
  className,
}: IconProps) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
  >
    <path
      d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"
      fill="#fff"
    ></path>
    <path
      d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"
      fill="#fff"
    ></path>
  </svg>
);

export const DownloadIcon = ({
  width = '2.4rem',
  height = '2.4rem',
  className,
}: IconProps) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
    />
  </svg>
);

export const ViewIcon = ({
  width = '2.4rem',
  height = '2.4rem',
  className,
}: IconProps) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
    />
  </svg>
);

export const CalendarIcon = ({
  width = '2.4rem',
  height = '2.4rem',
  className,
}: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    width={width}
    height={height}
  >
    <path d="M12.75 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM7.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM8.25 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM9.75 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM10.5 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM12.75 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM14.25 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
    <path
      fillRule="evenodd"
      d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z"
      clipRule="evenodd"
    />
  </svg>
);

export const HomeIcon = ({
  width = '2.4rem',
  height = '2.4rem',
  className = 'size-6',
}: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    width={width}
    height={height}
  >
    <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
    <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
  </svg>
);

export const SearchIcon = ({
  width = '2.4rem',
  height = '2.4rem',
  className,
}: IconProps) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
    />
  </svg>
);

export const SunIcon = ({
  width = '2.4rem',
  height = '2.4rem',
  className,
}: IconProps) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 3v2.25m6.364 2.25l-1.591 1.591M21 12h-2.25m-2.25 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
    />
  </svg>
);

export const MoonIcon = ({
  width = '2.4rem',
  height = '2.4rem',
  className,
}: IconProps) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
    />
  </svg>
);

export const LanguageIcon = ({
  width = '2.4rem',
  height = '2.4rem',
  className,
}: IconProps) => (
<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 viewBox="0 0 512.000000 512.000000" width={width}
 height={height}
 fill="currentColor"
 className={className}
 preserveAspectRatio="xMidYMid meet">

<g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
fill="currentColor" stroke="none">
<path d="M1835 4677 c-41 -19 -95 -74 -111 -114 -10 -22 -14 -76 -14 -163 l0
-130 -648 0 c-737 0 -720 2 -789 -73 -83 -90 -78 -216 13 -295 31 -28 61 -44
95 -51 34 -8 401 -11 1129 -11 650 0 1080 -4 1080 -9 0 -5 -24 -69 -54 -143
-98 -244 -226 -478 -376 -688 -81 -113 -230 -299 -240 -299 -22 1 -260 316
-351 465 -35 58 -77 127 -94 152 -87 134 -269 121 -336 -23 -28 -60 -24 -103
17 -184 50 -101 237 -377 338 -501 47 -58 98 -120 113 -139 l27 -33 -487 -482
c-518 -513 -507 -499 -507 -594 0 -70 51 -146 122 -183 46 -24 137 -25 181 -3
18 9 245 228 504 487 l473 471 237 -236 c246 -244 265 -258 343 -258 149 0
252 160 191 296 -12 27 -96 117 -250 269 -127 125 -231 231 -231 234 0 3 42
56 93 117 288 347 530 777 666 1187 l33 97 227 0 c226 0 227 0 280 26 129 65
156 232 54 336 -67 69 -57 68 -784 68 l-648 0 -3 143 c-3 138 -4 145 -30 183
-44 63 -90 88 -167 91 -41 2 -78 -2 -96 -10z"/>
<path d="M3667 2980 c-82 -21 -168 -84 -201 -148 -7 -15 -194 -509 -415 -1098
-277 -739 -401 -1084 -401 -1111 0 -51 36 -120 83 -157 74 -59 212 -42 268 34
13 17 69 151 124 298 l101 267 505 3 506 2 93 -247 c51 -137 100 -261 108
-278 68 -140 258 -155 347 -27 60 87 78 29 -374 1236 -385 1024 -407 1080
-448 1127 -74 81 -198 123 -296 99z m247 -1045 l164 -440 -341 -3 c-187 -1
-342 -1 -344 2 -3 2 266 731 333 900 10 25 -10 73 188 -459z"/>
</g>
</svg>
);

export const BellIcon = ({
  width = '2.4rem',
  height = '2.4rem',
  className,
}: IconProps) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
    />
  </svg>
);

export const CastIcon = ({
  width = '2.4rem',
  height = '2.4rem',
  className,
}: IconProps) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 17.25h1.007a3 3 0 0 0 2.599-1.5M9 17.25v1.125c0 1.125 0 1.688.220 2.163a3 3 0 0 0 1.606 1.606c.475.22 1.038.22 2.163.22h6.375c1.125 0 1.688 0 2.163-.22a3 3 0 0 0 1.606-1.606c.22-.475.22-1.038.22-2.163V6.375c0-1.125 0-1.688-.22-2.163a3 3 0 0 0-1.606-1.606C18.813 2.25 18.25 2.25 17.125 2.25H6.375c-1.125 0-1.688 0-2.163.22a3 3 0 0 0-1.606 1.606c-.22.475-.22 1.038-.22 2.163v1.125M9 12.75a3 3 0 0 1 3-3M9 12.75a6 6 0 0 1 6-6M9 12.75a9 9 0 0 1 9-9"
    />
  </svg>
);

export const StarAIcon = ({
  width = '2.4rem',
  height = '2.4rem',
  className,
}: IconProps) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
    />
    <text
      x="12"
      y="16"
      textAnchor="middle"
      fontSize="7"
      fontWeight="700"
      fill="currentColor"
      stroke="none"
      fontFamily="system-ui, -apple-system, sans-serif"
    >
      A
    </text>
  </svg>
);