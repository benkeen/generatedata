
import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/generatedata/__docusaurus/debug',
    component: ComponentCreator('/generatedata/__docusaurus/debug','f11'),
    exact: true
  },
  {
    path: '/generatedata/__docusaurus/debug/config',
    component: ComponentCreator('/generatedata/__docusaurus/debug/config','6a4'),
    exact: true
  },
  {
    path: '/generatedata/__docusaurus/debug/content',
    component: ComponentCreator('/generatedata/__docusaurus/debug/content','5b4'),
    exact: true
  },
  {
    path: '/generatedata/__docusaurus/debug/globalData',
    component: ComponentCreator('/generatedata/__docusaurus/debug/globalData','bc0'),
    exact: true
  },
  {
    path: '/generatedata/__docusaurus/debug/metadata',
    component: ComponentCreator('/generatedata/__docusaurus/debug/metadata','030'),
    exact: true
  },
  {
    path: '/generatedata/__docusaurus/debug/registry',
    component: ComponentCreator('/generatedata/__docusaurus/debug/registry','322'),
    exact: true
  },
  {
    path: '/generatedata/__docusaurus/debug/routes',
    component: ComponentCreator('/generatedata/__docusaurus/debug/routes','99d'),
    exact: true
  },
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
