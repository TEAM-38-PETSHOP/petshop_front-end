const ArrowDownIcon = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <div
      style={{
        width: "15px",
        height: "16px",
        transition: "transform 0.3s ease",
        transform: `${isOpen ? "rotate(180deg)" : "rotate(0deg)"}`,
      }}
    >
      <svg
        width="15"
        height="16"
        viewBox="0 0 15 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.96967 10.9445C7.26256 11.2374 7.73744 11.2374 8.03033 10.9445L12.8033 6.17157C13.0962 5.87868 13.0962 5.40381 12.8033 5.11091C12.5104 4.81802 12.0355 4.81802 11.7426 5.11091L7.5 9.35355L3.25736 5.11091C2.96447 4.81802 2.48959 4.81802 2.1967 5.11091C1.90381 5.40381 1.90381 5.87868 2.1967 6.17157L6.96967 10.9445ZM6.75 9V10.4142H8.25V9H6.75Z"
          fill={`${isOpen ? "#FFFFFF" : "#35353B"}`}
        />
      </svg>
    </div>
  );
};

export default ArrowDownIcon;
