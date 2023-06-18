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
        

      <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TQPT3B8"
      height="0" width="0" style={{display: 'none', visibility: 'hidden'}}></iframe></noscript>

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
