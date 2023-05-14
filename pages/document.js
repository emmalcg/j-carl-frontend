import Document, { Html, Head, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          <meta name="description" content="James Carl artist and sculptor" />
          <meta
            name="keywords"
            content="James Carl, sculpture, marble, artist, toronto artist, toronto sculpture, rubber band sculpture, marble sculpture, nicholas metivier gallery"
          />
          <meta property="og:title" content="James Carl" />
          <meta
            property="og:description"
            content="This is the archive portfolio website of artist and sculptor James Carl."
          />
          <meta property="og:url" content="https://www.carjam.ca/" />
        </Head>
        <body>
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument