import React from 'react';

const customFooterLinks: any[] = [];

// to keep things simple, a registered footer link should be wrapped in it's own <li>. That way it can
// supply any additional styling for the whole link externally.
export const registerCustomFooterLink = (link: any): void => {
  customFooterLinks.push(link);
};

export const getCustomFooterLinks = (): any[] => customFooterLinks.map((Link: any, index: number) => <Link key={index} />);
