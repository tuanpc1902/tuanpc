type TWrapperSession = {
  sessionName: string;
};

export default function WrapperSession({ sessionName }: TWrapperSession) {
  return (
    <>
      <div className="flex items-center">
        <label className="mr-[1rem] font-bold flex items-center justify-start cursor-pointer min-w-[8rem]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 mr-[0.5rem]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
            />
          </svg>
          {sessionName}
        </label>
        <div className="w-full border-solid bg-gradient-primary h-[0.1rem]"></div>
      </div>
    </>
  );
}
