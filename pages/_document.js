import Document, { Html, Head, Main, NextScript } from 'next/document'

class Layout extends Document {
  static async getInitialProps (ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render () {
    return (
      <Html lang='en'>
        <Head />
        <body>
          <Main />
          <NextScript />
          {/* <script type='text/javascript' src='/hostedsubscribeform.min.js' /> */}

        </body>
      </Html>
    )
  }
}

export default Layout
