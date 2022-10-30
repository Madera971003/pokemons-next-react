// Dependencies
import Image from 'next/image';
import { useRouter } from 'next/router';

// Styles
import styles from './styles.module.scss';

export const Header = (): JSX.Element => {
  const router = useRouter();
  const handleClick = (): void => {
    router.reload();
  };
  return (
    <div className={styles.header}>
      <Image
        className={styles.header__logo}
        src="/pokemon.png"
        alt="pokemon logo"
        width={240}
        height={100}
        onClick={handleClick}
      />
    </div>
  );
};
