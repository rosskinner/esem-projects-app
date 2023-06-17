import Document, { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

class Layout extends Document {
  static async getInitialProps (ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render () {
    return (
      <Html lang='en'>
        <Head />
        
      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-HDWHVM1K5L" strategy="afterInteractive"></Script>
      <Script strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
  
          gtag('config', 'G-HDWHVM1K5L');
        `
        }
        
      </Script>
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
