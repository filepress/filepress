# Ecosystem

This file documents how the ecosystem for filepress is set up. Mainly how *Frames* and *Themes* are handled.

## Frames

We find it logical to provide an ecosystem for Frames. This comes natural as Frames are an integral part of filepress. They are how you tell filepress what to do. Wanting to achieve an ease of use as well as this well accessible programmatic approach to handling filepress we strive to standardize Frames and how they are made available. Thus enabling us to have a CLI and later GUI that can find and install Frames a user wants to use. At the same time however we don't want to increase the things out there and rather build upon existing possibilities. As Frames are a Node module the thing that comes to mind to manage those is [npm](http://npmjs.org/). And everyone running filepress will have Node and thus npm installed.

Via npm it is possible to publish a package and have others depend on it. npm already provides all the mechanisms we would want like:
- finding Frames
- publishing Frames
- managing versions
- having a place to put Frames

Thus we use npm and establish a convention. Frames should be packages published to npm folling the namingscheme:

```
fp-frame-[name of frame]
```

Our CLI is capable of managing Frames that follow this namingscheme.

Frames should also include `filepress, frame` in their keywords.

## Themes

Themes are less obvious to cover under the core of filepress. After all Frames could choose to manage them however they want. And in reality they are free to do so. We however want to provide a "standard" way of handling themes. As it is possible for a Frame to have multiple themes working with it. Thus a standard for themes will enable us to also manage these for the user.

As themes are no Node modules we however choose to publish them using [GitHub](https://github.com/). It is the platform most developers are likely to use anyway and will be wanting to put there code on. We will also require these repositories to follow a namingscheme for us to be able to find them. They should be named:

```
fp-theme-[name of theme]
```
