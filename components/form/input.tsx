import clsx from "clsx";

import styles from "./input.module.css";

type Props = React.InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<Props> = ({ className, ...props }) => (
  <input
    {...props}
    className={clsx(
      "border-2 border-primary-400 px-3 py-1 w-full bg-white focus:outline-none transition-all duration-200",
      styles.control,
      className
    )}
  />
);

export default Input;
