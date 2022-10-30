// Dependencies
import { Grid } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

// Styles
import styles from './styles.module.scss';

export const Footer = (): JSX.Element => (
  <footer>
    <Grid container className={styles.footer}>
      <Grid item xs={12} sm={10} md={6} className={styles.footer__info}>
        <div>
          <p>
            Made by <strong>Abisai Antonio Madera</strong>
          </p>
        </div>
        <a
          href="https://github.com/Madera971003/pokemons-next-react"
          target="_blank"
          rel="noreferrer"
        >
          <GitHubIcon />
        </a>
      </Grid>
      <Grid item xs={12} sm={10} md={6} className={styles.footer__rights}>
        <div>
          <p>
            All <strong>Lefts</strong> reserved 2022 &#174;
          </p>
        </div>
      </Grid>
    </Grid>
  </footer>
);
