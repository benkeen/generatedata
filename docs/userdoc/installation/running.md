---
sidebar_position: 4
id: running
title: 3. Run the app
---

# Run the app

Okay, now you've set up your `.env` configuration file, as described in the [settings page](./settings), let's 
start the app.

Run `yarn startApp` on the command line.

:::caution
This can take a **very** long time! This command is doing a whole slew of things: it's download images for node,
maria DB and nginx; it's building the frontend JS code according to whatever settings you entered in your `.env` file,
it's creating the localization files and creating the database for the first time.

So just wait. And wait. And wait. It generally takes about 10 minutes on my machine but it can take a lot longer.
::: 

At this point, the application has started. Load up `http://localhost:[PORT]` in your web browser. The `[PORT]` part
will be whatever value you entered for the `GD_WEB_SERVER_PORT` setting in your `.env` file. By default it'll be `9000`.


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


