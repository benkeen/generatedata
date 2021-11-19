
import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
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
    component: ComponentCreator('/generatedata/','1d0'),
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
        path: '/generatedata/userdoc/history',
        component: ComponentCreator('/generatedata/userdoc/history','c4c'),
        exact: true,
        'sidebar': "userdoc"
      },
      {
        path: '/generatedata/userdoc/installation/intro',
        component: ComponentCreator('/generatedata/userdoc/installation/intro','e42'),
        exact: true,
        'sidebar': "userdoc"
      },
      {
        path: '/generatedata/userdoc/v3',
        component: ComponentCreator('/generatedata/userdoc/v3','86d'),
        exact: true,
        'sidebar': "userdoc"
      },
      {
        path: '/generatedata/userdoc/version-comparison',
        component: ComponentCreator('/generatedata/userdoc/version-comparison','d7f'),
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
