
import Link from "next/link";
import styles from "./Button.css";

const Button = ({
  children,
  variant = "primary",
  className = "",
  href,
  ...props
}) => {
  const buttonClass = `btn ${variant} ${className}`.trim();

  if (href) {
    return (
      <Link href={href} className={buttonClass} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={buttonClass} {...props}>
      {children}
    </button>
  );
};

export default Button;
