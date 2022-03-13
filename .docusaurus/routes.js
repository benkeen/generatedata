
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
    component: ComponentCreator('/generatedata/','1cb'),
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
        component: ComponentCreator('/generatedata/userdoc/about/history','050'),
        exact: true
      },
      {
        path: '/generatedata/userdoc/about/purpose',
        component: ComponentCreator('/generatedata/userdoc/about/purpose','18c'),
        exact: true,
        'sidebar': "userdoc"
      },
      {
        path: '/generatedata/userdoc/about/versionComparison',
        component: ComponentCreator('/generatedata/userdoc/about/versionComparison','610'),
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
      },
      {
        path: '/generatedata/userdoc/installation/prereqs',
        component: ComponentCreator('/generatedata/userdoc/installation/prereqs','45c'),
        exact: true,
        'sidebar': "userdoc"
      },
      {
        path: '/generatedata/userdoc/installation/running',
        component: ComponentCreator('/generatedata/userdoc/installation/running','000'),
        exact: true,
        'sidebar': "userdoc"
      },
      {
        path: '/generatedata/userdoc/v3',
        component: ComponentCreator('/generatedata/userdoc/v3','86d'),
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
