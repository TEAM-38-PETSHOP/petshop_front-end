const NotificationErrorIcon = () => {
  return (
    <div style={{ margin: "32px" }}>
      <svg
        width="64"
        height="64"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_b_16235_7268)">
          <rect
            width="64"
            height="64"
            rx="32"
            fill="#f43e34"
            fillOpacity="0.1"
          />
          <rect
            x="0.5"
            y="0.5"
            width="63"
            height="63"
            rx="31.5"
            stroke="#f43e34"
          />
          <rect x="8" y="8" width="48" height="48" rx="24" fill="#f43e34" />
          <path
            d="M40 24L24 40M24 24L40 40"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <filter
            id="filter0_b_16235_7268"
            x="-100"
            y="-100"
            width="264"
            height="264"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feGaussianBlur in="BackgroundImageFix" stdDeviation="50" />
            <feComposite
              in2="SourceAlpha"
              operator="in"
              result="effect1_backgroundBlur_16235_7268"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_backgroundBlur_16235_7268"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    </div>
  );
};

export default NotificationErrorIcon;
