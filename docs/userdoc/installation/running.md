---
id: running
---

# Running

1. Make a copy the `.env.default` file in the root folder and call it `.env`. This file defines all of your settings
for the application. Then, update the contents of that file for whatever you want. See the information on the 
[settings page](./settings) about all the available options.  

:::tip
Depending on your operating system, you may not see that file because it starts with a period. You may need to use 
Terminal/a command prompt to see it. If you're using Mac, you can open up terminal, go to the folder and run the
following command: `cp .env.default .env`
:::
 
2. run `yarn startApp`

:::caution
This can take a **very** long time! This command is doing a whole slew of things: it's download images for node,
maria DB and nginx; it's building the frontend JS code according 

So just wait. And wait. And wait. It generally takes about 10 minutes on my machine. When you finally see this 
message output to the terminal, you'll be good to go.
::: 

At this point, the application has started. Load up `http://localhost:[PORT]` in your web
browser. The `[PORT]` part will be whatever value you entered for the `GD_WEB_SERVER_PORT` setting
in your `.env` file.

### Shutting down 

In case anything goes wrong or you just want to free up space, just cancel the running process in your command line
(`CTRL-C` generally does it), then run: `yarn cleanApp`. 

:::tip
This command does NOT wipe out your database. So if you'd been using the application and saved some data sets / created
users, running the `yarn cleanApp` command won't clear that out. This is just a command to shut down Docker, delete 
downloaded images and generally free up memory.
:::

### Starting afresh

As noted in the [Settings](./settings) page, some of the settings are only used once when the application is first
created. So if you've found you've misconfigured something and want to set it all up again, just do the following:

1. Shut down the application as described in the section above. 
2. Delete the contents of the `...` folder, leaving only the `nodelete.txt` file. That folder is created when it's first
installed and houses the database. 
3. Make whatever edits to your `.env` file.
4. Run `yarn startApp`.


