// Dependencies
import { Grid } from '@mui/material';

// Styles
import styles from './styles.module.scss';

export const Footer = (): JSX.Element => (
  <footer>
    <Grid container className={styles.footer}>
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
