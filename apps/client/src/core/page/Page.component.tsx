import React, { PropsWithChildren } from 'react';
import { CenteredSpinner, DefaultSpinner } from '@generatedata/core';
import Header from '../header/Header.container';
import Footer from '../footer/Footer.container';
import * as styles from './Page.scss';

export type PageProps = {
  localeFileLoaded: boolean;
  children: any;
};

const Page = ({ localeFileLoaded, children }: PropsWithChildren<PageProps>) => {
  const content = localeFileLoaded ? (
    <>
      <Header />
      <div className={styles.content}>{children}</div>
      <Footer />
    </>
  ) : (
    <CenteredSpinner>
      <DefaultSpinner />
    </CenteredSpinner>
  );

  return <div className={styles.page}>{content}</div>;
};

export default Page;
