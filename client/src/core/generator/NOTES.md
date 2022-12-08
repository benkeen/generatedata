## Generator notes

A few notes on how the current generator code works with the web workers so I can keep it straight in my head. 

**DataTypeWorker**

1. core/generationPanel/Engine.component.tsx
   - uses both dataTypeWorker and exportTypeWorker to generate the actual data. No in-between, just churns through them
   passing off work from response of dataTypeWorker to exportTypeWorker.
   - also providing pause, continue and set speed options. All done through dataTypeWorker. Weird.
2. core/generationPanel/ActivityPanel.component.tsx
   - allows aborting the process. 
   - uses dataTypeWorker to abort it. Again, weird. 
3. core/generationPanel/GenerationSettings.component.tsx
   - aborts process on close.
4. store/generator/generator.actions.ts
   - Refresh panel action. This _separately_ calls dataTypeWorker to generate the data and persist in the store.
   - it does some clever/dense stuff to figure out what's changed, then pass that into the dataTypeWorker so it
   keeps the existing unchanged data.

**ExportTypeWorker**

1. CodeMirrorWrapper.component.tsx
   - used in the previous panel for actually generating the preview string based on the stored preview data.


**Backend code**

- The backend code won't need 2 separate pieces for the data type + export type parts. It'll always be treating the 
generation as a single action.
- It also won't need the additional complexities of the preview panel stuff, but that can just be ignored.

### Notes 

Having a separate dataTypeWorker and exportTypeWorker makes sense for the preview panel, which is what I initially
wrote it for. But for the actual code generation it feels super clunky. Singling out the dataTypeWorker to cancel/pause/continue/set
speed on the whole generation process is totally weird and hard to make sense of. Wouldn't be hard to just wrap an 
interface over this part... but keep the two separate for use elsewhere...

Now that we're moving the bulk of the web workers into separate, runtime-free modules (web workers + node), the actual
workers are super small. Combine into the single `generator.worker.ts` as originally planned and offer a more complex
`action` interface to allow either interacting with the individual actions (data types, export types) or the general
generation interface. I kinda like this...

Note that this still means nested web workers. Whoah! https://bugs.webkit.org/show_bug.cgi?id=22723 - maybe
Safari now supports it.

*** Need to reconcile "template" with what we want to pass as the BE code interface.
