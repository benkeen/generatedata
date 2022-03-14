---
sidebar_position: 2
id: prereqs
title: 1. Install Pre-reqs
---

# Prerequisites

:::caution
Even though we're using Docker, the script isn't fully dockerized yet. So the installation process *does* require installing
a number of additional scripts on your machine besides just Docker. If anyone's interested in helping improve this I'd love to
hear from you! Working with Docker makes me want to stick my head in the toilet and flush. Chime in on github issues 
or reach out to me at ben.keen@gmail.com.  
:::

1. You'll need at least 10-15GB free. I know. Docker is a real hog.  
2. [Download and install Docker Desktop](https://docs.docker.com/desktop).

:::info
**What is Docker?**
Docker is a popular platform for shipping and running self-contained applications. Rather than requiring you to install
numerous different tools and applications on your own machine and keep them up to date, Docker "containerizes" them and
lets you forget about the details of an application. 
:::

3. Download the [latest version of generatedata](https://github.com/benkeen/generatedata/releases). 
4. [Install node](https://nodejs.org/en). 
5. [Install nvm](https://github.com/nvm-sh/nvm).

:::info
NVM stands for **Node Version Manager**. It lets you run any version of node you want. In the generatedata repo there's a
file that specifies the right node version. You can run a single command with nvm so that it's using the right versino.    
:::
 
- Open up `Terminal`.
- Follow the instructions here.

6. Install yarn.
```
npm install --global yarn
```


And that's it! Now let's install it.
