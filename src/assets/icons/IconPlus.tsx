interface IconPlusProps {
  className?: string;
}

const IconPlus = ({ className }: IconPlusProps) => {
  return (
    <div
      className={className}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg
        width="25"
        height="25"
        viewBox="0 0 25 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M21.875 12.5V19.7917C21.875 20.3442 21.6555 20.8741 21.2648 21.2648C20.8741 21.6555 20.3442 21.875 19.7917 21.875H5.20833C4.6558 21.875 4.12589 21.6555 3.73519 21.2648C3.34449 20.8741 3.125 20.3442 3.125 19.7917V5.20833C3.125 4.6558 3.34449 4.12589 3.73519 3.73519C4.12589 3.34449 4.6558 3.125 5.20833 3.125H12.5"
          stroke="#A9A9B0"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.668 5.20801H22.918"
          stroke="#A9A9B0"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M19.793 2.08301V8.33301"
          stroke="#A9A9B0"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.3763 11.4587C10.5269 11.4587 11.4596 10.5259 11.4596 9.37533C11.4596 8.22473 10.5269 7.29199 9.3763 7.29199C8.22571 7.29199 7.29297 8.22473 7.29297 9.37533C7.29297 10.5259 8.22571 11.4587 9.3763 11.4587Z"
          stroke="#A9A9B0"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M21.875 15.6253L18.6604 12.4108C18.2697 12.0202 17.7399 11.8008 17.1875 11.8008C16.6351 11.8008 16.1053 12.0202 15.7146 12.4108L6.25 21.8753"
          stroke="#A9A9B0"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default IconPlus;
