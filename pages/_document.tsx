import Document, { Html, Head, Main, NextScript } from 'next/document'
import { GOOGLE_ANALYTICS_GA4, GOOGLE_ANALYTICS_UA } from '../configs/analytics'

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* Global Site Tag (gtag.js) - Google Analytics - UA */}
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_UA}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GOOGLE_ANALYTICS_UA}', {
                  page_path: window.location.pathname,
                });
                gtag('config', '${GOOGLE_ANALYTICS_GA4}', {
                  page_path: window.location.pathname,
                });
              `
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
