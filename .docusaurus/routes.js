
import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/generatedata/blog/archive',
    component: ComponentCreator('/generatedata/blog/archive','2a5'),
    exact: true
  },
  {
    path: '/generatedata/markdown-page',
    component: ComponentCreator('/generatedata/markdown-page','9db'),
    exact: true
  },
  {
    path: '/generatedata/docs',
    component: ComponentCreator('/generatedata/docs','192'),
    routes: [
      {
        path: '/generatedata/docs/intro',
        component: ComponentCreator('/generatedata/docs/intro','007'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/generatedata/docs/tutorial-basics/congratulations',
        component: ComponentCreator('/generatedata/docs/tutorial-basics/congratulations','f05'),
        exact: true,
        'sidebar': "tutorialSidebar"
      }
    ]
  },
  {
    path: '/generatedata/',
    component: ComponentCreator('/generatedata/','c70'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*')
  }
];
