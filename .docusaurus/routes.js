
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
    path: '/generatedata/index---old',
    component: ComponentCreator('/generatedata/index---old','f4c'),
    exact: true
  },
  {
    path: '/generatedata/markdown-page',
    component: ComponentCreator('/generatedata/markdown-page','9db'),
    exact: true
  },
  {
    path: '/generatedata/',
    component: ComponentCreator('/generatedata/','5d9'),
    routes: [
      {
        path: '/generatedata/',
        component: ComponentCreator('/generatedata/','e1f'),
        exact: true,
        'sidebar': "userdoc"
      },
      {
        path: '/generatedata/developerdoc/intro',
        component: ComponentCreator('/generatedata/developerdoc/intro','823'),
        exact: true,
        'sidebar': "developerdoc"
      },
      {
        path: '/generatedata/userdoc/about/history',
        component: ComponentCreator('/generatedata/userdoc/about/history','96e'),
        exact: true,
        'sidebar': "userdoc"
      },
      {
        path: '/generatedata/userdoc/about/v3',
        component: ComponentCreator('/generatedata/userdoc/about/v3','3ea'),
        exact: true,
        'sidebar': "userdoc"
      },
      {
        path: '/generatedata/userdoc/about/version-comparison',
        component: ComponentCreator('/generatedata/userdoc/about/version-comparison','5a3'),
        exact: true,
        'sidebar': "userdoc"
      },
      {
        path: '/generatedata/userdoc/about/website',
        component: ComponentCreator('/generatedata/userdoc/about/website','1d1'),
        exact: true,
        'sidebar': "userdoc"
      },
      {
        path: '/generatedata/userdoc/installation/intro',
        component: ComponentCreator('/generatedata/userdoc/installation/intro','e42'),
        exact: true,
        'sidebar': "userdoc"
      }
    ]
  },
  {
    path: '*',
    component: ComponentCreator('*')
  }
];
