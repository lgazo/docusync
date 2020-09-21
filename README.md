# Introduction

The reason this project was created is the lack of tools that help you to run Living Documentation ecosystem. Documentation gets obsolete, it is not checked as part of the code review or pull request process if it lives outside and thus developers stop following it over the time.

In large projects the documentation lives outside one central repository, it is managed by different tools and might not be stored as source code at all. For Product Owners, Technical Writers and other non-development stakeholders it is usually more comfortable to write it in visual-friendly tools although the resulting format is e.g. Markdown.

**Docusync** is the tool that helps you synchronize such documentation to the source code and include it as part of the code reviews or release process.

It holds the list of relevant and related documentation resources and downloads the content of the resources to the source code so it can be easily reviewed.

# Process

A developer that works on a feature is obliged to write corresponding documentation. He might cooperate with an architect or analyst who also created a documentation related to the feature. All of these resources belong to the source code.

The developer `adds resources` to the synchronization list continuously throughout the progress of his work.

Once the feature is done, e.g. when it is ready for a **pull request**, the developer `downloads` content of the resources. The content is stored in the repository. The pull request is created along with documentation changes.

The documentation gets reviewed, commented and changed accordingly. Hopefully at least one another person would read it.

# Installation

You can install it as a global module or locally.

```
npm i docusync
```

# Configuration

Configuration for the tool is read from `$HOME/.config/configstore/docusync.json`

```json
{
  "base": {
    "dir": "build"
  },
  "credentials": {
    "default": {
      "username": "abc",
      "password": "nbusr123"
    }
  }
  ,"sources": {
    "default": {
      "module": "xwiki",
      "url": "https://xwiki.org",
      "target": {
        "dir": "docs/xwiki"
      }
    }
  }
}
```

The field `base` is optional. If not defined then current working directory is used.

> [!NOTE] nr.1 only `default` source works at the moment

> [!NOTE] nr.2 only XWiki system is supported at the moment although the implementation is open for other types

# Run

**Docusync** can be ran in two modes:

* interactive
* cli

At the moment the focus is on `cli` mode.

## Add a resource

It is as easy as: `docusync addResource https://www.xwiki.org/xwiki/bin/view/Documentation/UserGuide`

Such call will add the resource to the synchronization file located in `.docusync.json` in the directory from which the tool is called.

## Download

Once you are ready to synchronize the content, execute: `docusync download`.

It will download the content based on the synchronization file `.docusync.json` into the `target.dir` directory of the configured system.

> [!NOTE] at the moment the tool expects the format of the content in XWiki is Markdown and therefore it creates Markdown files in corresponding structure

# Inspiration

* XWiki inspiration in https://github.com/PayEx/xwiki-sync

# Development

## Publish

* follows https://itnext.io/step-by-step-building-and-publishing-an-npm-typescript-package-44fe7164964c