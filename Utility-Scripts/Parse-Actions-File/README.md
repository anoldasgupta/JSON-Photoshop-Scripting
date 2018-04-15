# Parse Actions File

## Description

“Parse Actions File” is an actions files utility script using the [JSON Action Manager](/JSON-Action-Manager) scripting library, and more specifically its module `jamActions`.

This stand-alone script written in JavaScript is used to parse a Photoshop actions file (.atn) or an actions palette file (Actions Palette.psp) into a JSON text file.

Please refer to the [Photoshop Actions File Format](/Documentation/actions-file-format.html) document for detailed information about the structure of an actions file.

## Example

**Parsed actions file (Commands.atn)**:

[Commands.json](Commands.json)

## Requirements

This script can be used in Adobe Photoshop CS2 or later. It has been successfully tested in CS4 on Mac OS X, but should be platform agnostic.

## Copyright

This Software is copyright © 2011-2016 by Michel MARIANI.

## License

This Software is licensed under the [GNU General Public License (GPL) v3](https://www.gnu.org/licenses/gpl.html).

## Download

[Download Zip File](/Downloads/Parse-Actions-File-2.2.zip)

## Installation

Download the Zip file and unzip it.

Move the script to the `Presets/Scripts` folder in the default preset location of the Adobe Photoshop application. On next launch, the script will get directly accessible from Photoshop’s File menu: in Photoshop CS or CS2, it will appear in the File>Scripts submenu, among all other scripts sorted by lexical order; from Photoshop CS3, it will appear grouped by category in the File>Automate submenu.

