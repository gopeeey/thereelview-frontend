
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/theme';
import Container from '../layout/container';
import { DefaultSeo } from 'next-seo';
import Head from 'next/head';


export default function App({ Component, pageProps }) {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <Head>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <DefaultSeo
          title="The Reel View"
          openGraph={{
            type: 'website',
            locale: 'en_IE',
            url: 'https://thereelview.com/',
            site_name: 'The Reel View',
          }}
        />
        <Component {...pageProps} />
      </Container>
    </ThemeProvider>


  )
}
