import React, { PropsWithChildren } from 'react';
import { CenteredSpinner, DefaultSpinner } from '@generatedata/core';
import Header from '../header/Header.container';
import Footer from '../footer/Footer.container';
import { useClasses } from './Page.styles';

export type PageProps = {
  localeFileLoaded: boolean;
  children: any;
};

const Page = ({ localeFileLoaded, children }: PropsWithChildren<PageProps>) => {
  const classNames = useClasses();

  const content = localeFileLoaded ? (
    <>
      <Header />
      <div className={classNames.content}>{children}</div>
      <Footer />
    </>
  ) : (
    <CenteredSpinner>
      <DefaultSpinner />
    </CenteredSpinner>
  );

  return <div className={classNames.page}>{content}</div>;
};

export default Page;
