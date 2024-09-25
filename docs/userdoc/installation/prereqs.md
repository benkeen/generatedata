---
sidebar_position: 2
id: prereqs
title: 1. Install prerequisites
---

# Prerequisites

Before we get to the installation, make sure you have the following prerequisites installed.

1. You'll need at least 10-15GB free. I know. Docker is a real hog.
2. [Download and install Docker Desktop](https://docs.docker.com/desktop).

> **What is Docker?**
Docker is a popular platform for shipping and running self-contained applications. Rather than requiring you to install
numerous different tools and applications on your own machine and keep them up to date, Docker "containerizes" them and
lets you forget about the details of an application. In our case, we've dockerized a lot of the application, but 
not all - hence the need to install the things here.

3. Download the latest version of generatedata. For this, `git clone` [the repo](https://github.com/benkeen/generatedata)
and check out the current `master` branch. The master branch is generally stable, but if you have any trouble that isn't
documented here, raise an issue on github describing your problem.
5. [Install node](https://nodejs.org/en).
6. [Install nvm](https://github.com/nvm-sh/nvm).
7. Install yarn: `npm install --global yarn`

And that's it! Now let's customize the app to work exactly how you want.
