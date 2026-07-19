import clsx from "clsx";

import styles from "./card.module.css";

type Props = {
  className?: string;
} & React.PropsWithChildren;

const Card: React.FC<Props> = ({ children, className }) => (
  <div className={clsx("border border-primary-400", styles.card, className)}>
    {children}
  </div>
);

export default Card;
