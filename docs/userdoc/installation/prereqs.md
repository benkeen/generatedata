---
sidebar_position: 2
id: prereqs
title: 1. Install Pre-reqs
---

# Prerequisites

Before we get to the installation, make sure you have the following pre-requisites installed.

1. You'll need at least 10-15GB free. I know. Docker is a real hog.
2. [Download and install Docker Desktop](https://docs.docker.com/desktop).

> **What is Docker?**
Docker is a popular platform for shipping and running self-contained applications. Rather than requiring you to install
numerous different tools and applications on your own machine and keep them up to date, Docker "containerizes" them and
lets you forget about the details of an application. In our case, we've dockerized a fair amount of the application, but 
not all - hence the need to install the. 


3. Download the latest version of generatedata. For this, if you're a developer you can either `git clone` the repo and
check out the current master branch, or download the [latest official version](https://github.com/benkeen/generatedata/releases). 
Master is generally stable, but it's not guaranteed - so downloading the latest zip/tar is probably your best bet. 
5. [Install node](https://nodejs.org/en).
6. [Install nvm](https://github.com/nvm-sh/nvm).
6. Install yarn: `npm install --global yarn`

And that's it! Now let's customize the app to work exactly how you want.
