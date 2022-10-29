// Dependencies
import Image from 'next/image';

// Images
import styles from './styles.module.scss';

export const Header = (): JSX.Element => {
  return (
    <div className={styles.header}>
      <Image
        className="header__logo"
        src="/pokemon.png"
        alt="pokemon logo"
        width={240}
        height={100}
      />
    </div>
  );
};
