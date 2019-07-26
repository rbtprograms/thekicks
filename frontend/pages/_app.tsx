import App, { Container } from 'next/app';
import Page from '../components/Page';
import { GlobalStyle, theme } from '../components/styles/GlobalStyles';
import { ThemeProvider } from 'styled-components';
import { ApolloProvider } from 'react-apollo';
import withData from '../lib/withData';

interface Props {
  apollo: any;
}

class MyApp extends App<Props> {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {
      query: null,
    };
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    pageProps.query = ctx.query;
    return { pageProps };
  }

  render() {
    const { Component, apollo, pageProps } = this.props;

    return (
      <Container>
        <ApolloProvider client={apollo}>
          <GlobalStyle />
          <ThemeProvider theme={theme}>
            <Page>
              <Component {...pageProps} />
            </Page>
          </ThemeProvider>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withData(MyApp);
