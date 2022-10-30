// Dependencies
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html>
        <Head>
          <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <link rel="shortcut icon" href="./pokebolaIcon.ico" />
          <title>Pokémon</title>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
