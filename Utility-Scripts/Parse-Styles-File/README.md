# Parse Styles File

## Description

“Parse Styles File” is a layer styles utility script using the [JSON Action Manager](/JSON-Action-Manager) scripting library, and more specifically its module `jamStyles`.

This stand-alone script written in JavaScript is used to parse a Photoshop styles file (.asl) or a styles palette (Styles.psp) into a JSON text file. It provides basic information about the embedded patterns associated with the set of styles, and makes use of the following simplified formats:

- [Document Mode Object Simplified Format](/JSON-Simplified-Formats/Document-Mode-Object-Simplified-Format)
- [Blending Options Object Simplified Format](/JSON-Simplified-Formats/Blending-Options-Object-Simplified-Format)
- [Layer Effects Object Simplified Format](/JSON-Simplified-Formats/Layer-Effects-Object-Simplified-Format)

From a technical point of view, it shows how to take advantage of the method `ActionDescriptor.fromStream` to decode flattened (serialized) versions of ActionDescriptor objects saved in a file.

## Example

**Parsed styles file (Abstract Styles.asl)**:

[Abstract Styles.json](Abstract%20Styles.json)

## Requirements

This script can be used in Adobe Photoshop CS3 or later. It has been successfully tested in CS4 on Mac OS X, but should be platform agnostic.

## Copyright

This Software is copyright © 2013-2015 by Michel MARIANI.

## License

This Software is licensed under the [GNU General Public License (GPL) v3](https://www.gnu.org/licenses/gpl.html).

## Download

[Download Zip File](/Downloads/Parse-Styles-File-2.1.zip)

## Installation

Download the Zip file and unzip it.

Move the script to the `Presets/Scripts` folder in the default preset location of the Adobe Photoshop application. On next launch, the script will appear in the File>Automate submenu.
