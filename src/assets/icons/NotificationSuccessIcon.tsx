const NotificationSuccessIcon = () => {
  return (
    <div style={{ margin: "32px" }}>
      <svg
        width="64"
        height="64"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_b_17430_1498)">
          <rect
            width="24"
            height="24"
            rx="12"
            fill="#00c662"
            fillOpacity="0.1"
          />
          <rect
            x="0.1875"
            y="0.1875"
            width="23.625"
            height="23.625"
            rx="11.8125"
            stroke="#00c662"
            strokeWidth="0.375"
          />
          <rect x="3" y="3" width="18" height="18" rx="9" fill="#00c662" />
          <g clipPath="url(#clip0_17430_1498)">
            <path
              d="M14.25 9.75L10.125 13.875L8.25 12"
              stroke="white"
              strokeWidth="0.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M15.75 11.25L12.9375 14.0625L12.375 13.5"
              stroke="white"
              strokeWidth="0.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </g>
        <defs>
          <filter
            id="filter0_b_17430_1498"
            x="-37.5"
            y="-37.5"
            width="99"
            height="99"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feGaussianBlur in="BackgroundImageFix" stdDeviation="18.75" />
            <feComposite
              in2="SourceAlpha"
              operator="in"
              result="effect1_backgroundBlur_17430_1498"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_backgroundBlur_17430_1498"
              result="shape"
            />
          </filter>
          <clipPath id="clip0_17430_1498">
            <rect
              width="9"
              height="9"
              fill="white"
              transform="translate(7.5 7.5)"
            />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

export default NotificationSuccessIcon;
