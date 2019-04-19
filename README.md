# FileTransferClient
Transfer files to other devices

## How it works
Currently, the process goes as follows:
1. device A uploads a file to the server (this server can be self-hosted)
2. device A receives a key from the server and generates a QR code
3. device B scans this QR code or enters the key directly in the input field 
and downloads the file from the server

Sharing files directly without a server in between might be added in the future.

## Supported devices
This app was mainly designed for android phones, but I have included 
the necessary plugins and code for this to work on IOS too. 
The only problem is that I currently don't have any IOS devices to test, so feel free to contribute.

## FAQ
**Where are files stored?**

On android, downloaded files are stored in internal storage in a directory called `FileTransfer`.

## Links
[FileTransferServer](https://github.com/sleeyax/FileTransferServer)
