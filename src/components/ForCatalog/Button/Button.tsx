import Link from "next/link";
import style from "./button.module.scss";
import cn from "classnames";

type Props = {
  title: string;
  onClick: () => void;
  type?: "button" | "submit";
  action?: "button" | "link";
  styleName?: string;
  href?: string;
};

export default function Button({
  title,
  type = "button",
  onClick,
  styleName,
  action = "button",
  href = "",
}: Props) {
  return action === "button" ? (
    <button
      onClick={onClick}
      type={type}
      className={cn([styleName], style.button)}
    >
      {title}
    </button>
  ) : (
    <Link
      href={href}
      onClick={onClick}
      type={type}
      className={cn([styleName], style.button)}
    >
      {title}
    </Link>
  );
}
