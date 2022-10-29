// Components
import { Header } from '../Header';
import { Footer } from '../Footer';

type Props = {
  children: JSX.Element;
};

export const Layout = ({ children }: Props): JSX.Element => (
  <>
    <Header />
    {children}
    <Footer />
  </>
);
