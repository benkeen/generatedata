"use strict";(self.webpackChunkgeneratedata_doc=self.webpackChunkgeneratedata_doc||[]).push([[437],{3905:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return f}});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=r.createContext({}),c=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=c(e.components);return r.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),d=c(n),f=a,m=d["".concat(s,".").concat(f)]||d[f]||u[f]||o;return n?r.createElement(m,i(i({ref:t},p),{},{components:n})):r.createElement(m,i({ref:t},p))}));function f(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=d;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:a,i[1]=l;for(var c=2;c<o;c++)i[c]=n[c];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},8216:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return l},contentTitle:function(){return s},metadata:function(){return c},toc:function(){return p},default:function(){return d}});var r=n(7462),a=n(3366),o=(n(7294),n(3905)),i=["components"],l={sidebar_position:2,id:"prereqs",title:"1. Install prerequisites"},s="Prerequisites",c={unversionedId:"userdoc/installation/prereqs",id:"userdoc/installation/prereqs",isDocsHomePage:!1,title:"1. Install prerequisites",description:"Before we get to the installation, make sure you have the following prerequisites installed.",source:"@site/docs/userdoc/installation/prereqs.md",sourceDirName:"userdoc/installation",slug:"/userdoc/installation/prereqs",permalink:"/generatedata/userdoc/installation/prereqs",editUrl:"https://github.com/benkeen/generatedata/tree/docs/docs/userdoc/installation/prereqs.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2,id:"prereqs",title:"1. Install prerequisites"},sidebar:"userdoc",previous:{title:"Intro",permalink:"/generatedata/userdoc/installation/intro"},next:{title:"2. Customize settings",permalink:"/generatedata/userdoc/installation/settings"}},p=[],u={toc:p};function d(e){var t=e.components,n=(0,a.Z)(e,i);return(0,o.kt)("wrapper",(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"prerequisites"},"Prerequisites"),(0,o.kt)("p",null,"Before we get to the installation, make sure you have the following prerequisites installed."),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"You'll need at least 10-15GB free. I know. Docker is a real hog."),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("a",{parentName:"li",href:"https://docs.docker.com/desktop"},"Download and install Docker Desktop"),".")),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},(0,o.kt)("strong",{parentName:"p"},"What is Docker?"),'\nDocker is a popular platform for shipping and running self-contained applications. Rather than requiring you to install\nnumerous different tools and applications on your own machine and keep them up to date, Docker "containerizes" them and\nlets you forget about the details of an application. In our case, we\'ve dockerized a lot of the application, but\nnot all - hence the need to install the things here.')),(0,o.kt)("ol",{start:3},(0,o.kt)("li",{parentName:"ol"},"Download the latest version of generatedata. For this, if you're a developer you can either ",(0,o.kt)("inlineCode",{parentName:"li"},"git clone")," ",(0,o.kt)("a",{parentName:"li",href:"https://github.com/benkeen/generatedata"},"the repo"),"\nand check out the current ",(0,o.kt)("inlineCode",{parentName:"li"},"master")," branch, or download the ",(0,o.kt)("a",{parentName:"li",href:"https://github.com/benkeen/generatedata/releases"},"latest official version"),".\nMaster is generally stable, but it's not guaranteed - so downloading the latest zip/tar is probably your safest bet."),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("a",{parentName:"li",href:"https://nodejs.org/en"},"Install node"),"."),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("a",{parentName:"li",href:"https://github.com/nvm-sh/nvm"},"Install nvm"),"."),(0,o.kt)("li",{parentName:"ol"},"Install yarn: ",(0,o.kt)("inlineCode",{parentName:"li"},"npm install --global yarn"))),(0,o.kt)("p",null,"And that's it! Now let's customize the app to work exactly how you want."))}d.isMDXComponent=!0}}]);