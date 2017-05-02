#  :japanese_goblin: Doshibu Add-On  :muscle:
This project allow me to discover the webExtension development.
Currenlty, this Addon deal like an HTTP Header Security Analysor.

The main and only variable checked has been discovered using the [**securityheaders.io**](https://securityheaders.io/).

##  :open_mouth: To use it  :ok_hand:
Open the Add-On manager and click on a button like "Load a temporary module".
It will open a file uploader, then you will just have to submit the manifest.json.

```
The manifest.json file is a JSON-formatted file, and it is the only file required for a WebExtension.
```

After what, you can change if you wish the `content_scripts` **`matches`** variable that specifies the URL patterns to be matched in order for the scripts to be loaded.
