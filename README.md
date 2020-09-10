# Configuration

Configuration for the tool is read from `$HOME/.config/configstore/docusync.json`

```
{
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

NOTE: only `default` source works at the moment

# Inspiration

* XWiki inspiration in https://github.com/PayEx/xwiki-sync