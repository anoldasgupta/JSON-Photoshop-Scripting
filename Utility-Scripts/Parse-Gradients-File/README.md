# Parse Gradients File

## Description

“Parse Gradients File” is a gradients utility script using the [JSON Action Manager](/JSON-Action-Manager) scripting library.

This stand-alone script written in JavaScript is used to parse a Photoshop gradients file (.grd) into a JSON text file containing a JSON array of gradient objects, each one in [Gradient Object Simplified Format](/JSON-Simplified-Formats/Gradient-Object-Simplified-Format), as expected by the function `jamHelpers.toGradientObject`.

From a technical point of view, it shows how to take advantage of the method `ActionDescriptor.fromStream` to decode a flattened (serialized) version of an ActionDescriptor object saved in a file.

The utility script [Generate Gradients File](/Utility-Scripts/Generate-Gradients-File) performs the reverse operation, i.e., converts a JSON text file, containing a JSON array of gradient objects in [Gradient Object Simplified Format](/JSON-Simplified-Formats/Gradient-Object-Simplified-Format), into a Photoshop gradients file (.grd).

Please refer to the [Photoshop Gradients File Format](/Documentation/gradients-file-format.html) document for detailed information about the structure of a gradients file.

## Example

**Parsed gradients file (Metals.json)**:

```json
[
    {
        "name": "$$$/Presets/Gradients/Metals_grd/Brass=Brass",
        "gradientForm": "customStops",
        "interpolation": 4096,
        "colors":
        [
            {
                "color":
                {
                    "red": 235,
                    "green": 219.996108949416,
                    "blue": 35.0038910505837
                },
                "type": "userStop",
                "location": 0,
                "midpoint": 50
            },
            {
                "color":
                {
                    "red": 255,
                    "green": 251.996108949416,
                    "blue": 193.996108949416
                },
                "type": "userStop",
                "location": 1024,
                "midpoint": 50
            },
            {
                "color":
                {
                    "red": 233,
                    "green": 217,
                    "blue": 28
                },
                "type": "userStop",
                "location": 2048,
                "midpoint": 50
            },
            {
                "color":
                {
                    "red": 255,
                    "green": 251.996108949416,
                    "blue": 199.996108949416
                },
                "type": "userStop",
                "location": 3072,
                "midpoint": 50
            },
            {
                "color":
                {
                    "red": 233.996108949416,
                    "green": 215,
                    "blue": 32
                },
                "type": "userStop",
                "location": 4096,
                "midpoint": 50
            }
        ],
        "transparency":
        [
            {
                "opacity": 100,
                "location": 0,
                "midpoint": 50
            },
            {
                "opacity": 100,
                "location": 4096,
                "midpoint": 50
            }
        ]
    },
    {
        "name": "$$$/Presets/Gradients/Metals_grd/Gold=Gold",
        "gradientForm": "customStops",
        "interpolation": 4096,
        "colors":
        [
            {
                "color":
                {
                    "red": 255,
                    "green": 203.996108949416,
                    "blue": 60
                },
                "type": "userStop",
                "location": 0,
                "midpoint": 50
            },
            {
                "color":
                {
                    "red": 255,
                    "green": 245.996108949416,
                    "blue": 223.996108949416
                },
                "type": "userStop",
                "location": 1024,
                "midpoint": 50
            },
            {
                "color":
                {
                    "red": 255,
                    "green": 203,
                    "blue": 56
                },
                "type": "userStop",
                "location": 2048,
                "midpoint": 50
            },
            {
                "color":
                {
                    "red": 255,
                    "green": 247,
                    "blue": 229
                },
                "type": "userStop",
                "location": 3072,
                "midpoint": 50
            },
            {
                "color":
                {
                    "red": 255,
                    "green": 203,
                    "blue": 56
                },
                "type": "userStop",
                "location": 4096,
                "midpoint": 50
            }
        ],
        "transparency":
        [
            {
                "opacity": 100,
                "location": 0,
                "midpoint": 50
            },
            {
                "opacity": 100,
                "location": 4096,
                "midpoint": 50
            }
        ]
    },
    {
        "name": "$$$/Presets/Gradients/Metals_grd/Silver=Silver",
        "gradientForm": "customStops",
        "interpolation": 4096,
        "colors":
        [
            {
                "color":
                {
                    "red": 83.0038910505837,
                    "green": 91.0038910505837,
                    "blue": 94
                },
                "type": "userStop",
                "location": 0,
                "midpoint": 50
            },
            {
                "color":
                {
                    "red": 253.996108949416,
                    "green": 253.996108949416,
                    "blue": 253.996108949416
                },
                "type": "userStop",
                "location": 1024,
                "midpoint": 50
            },
            {
                "color":
                {
                    "red": 74,
                    "green": 81.0038910505837,
                    "blue": 84
                },
                "type": "userStop",
                "location": 2048,
                "midpoint": 50
            },
            {
                "color":
                {
                    "red": 253,
                    "green": 253,
                    "blue": 253
                },
                "type": "userStop",
                "location": 3072,
                "midpoint": 50
            },
            {
                "color":
                {
                    "red": 83.0038910505837,
                    "green": 91.0038910505837,
                    "blue": 94
                },
                "type": "userStop",
                "location": 4096,
                "midpoint": 50
            }
        ],
        "transparency":
        [
            {
                "opacity": 100,
                "location": 0,
                "midpoint": 50
            },
            {
                "opacity": 100,
                "location": 4096,
                "midpoint": 50
            }
        ]
    },
    {
        "name": "$$$/Presets/Gradients/Metals_grd/SteelBar=Steel Bar",
        "gradientForm": "customStops",
        "interpolation": 4096,
        "colors":
        [
            {
                "color":
                {
                    "hue": 0,
                    "saturation": 0,
                    "brightness": 0
                },
                "type": "userStop",
                "location": 0,
                "midpoint": 50
            },
            {
                "color":
                {
                    "red": 253.996108949416,
                    "green": 253.996108949416,
                    "blue": 253.996108949416
                },
                "type": "userStop",
                "location": 2867,
                "midpoint": 50
            },
            {
                "color":
                {
                    "red": 1.00389105058366,
                    "green": 1.00389105058366,
                    "blue": 1.00389105058366
                },
                "type": "userStop",
                "location": 4096,
                "midpoint": 50
            }
        ],
        "transparency":
        [
            {
                "opacity": 100,
                "location": 0,
                "midpoint": 50
            },
            {
                "opacity": 100,
                "location": 4096,
                "midpoint": 50
            }
        ]
    },
    {
        "name": "$$$/Presets/Gradients/Metals_grd/SteelBlue=Steel Blue",
        "gradientForm": "customStops",
        "interpolation": 4096,
        "colors":
        [
            {
                "color":
                {
                    "red": 30,
                    "green": 93.0038910505837,
                    "blue": 177.996108949416
                },
                "type": "userStop",
                "location": 0,
                "midpoint": 50
            },
            {
                "color":
                {
                    "red": 231,
                    "green": 233,
                    "blue": 243.996108949416
                },
                "type": "userStop",
                "location": 1024,
                "midpoint": 50
            },
            {
                "color":
                {
                    "red": 30,
                    "green": 93.0038910505837,
                    "blue": 177.996108949416
                },
                "type": "userStop",
                "location": 2048,
                "midpoint": 50
            },
            {
                "color":
                {
                    "red": 233,
                    "green": 235,
                    "blue": 243.996108949416
                },
                "type": "userStop",
                "location": 3072,
                "midpoint": 50
            },
            {
                "color":
                {
                    "red": 30,
                    "green": 93.0038910505837,
                    "blue": 177.996108949416
                },
                "type": "userStop",
                "location": 4096,
                "midpoint": 50
            }
        ],
        "transparency":
        [
            {
                "opacity": 100,
                "location": 0,
                "midpoint": 50
            },
            {
                "opacity": 100,
                "location": 4096,
                "midpoint": 50
            }
        ]
    }
]
```

![Preset Manager Gradients (Metals)](images/Preset-Manager-Gradients-Metals.png)

## Requirements

This script can be used in Adobe Photoshop CS3 or later. It has been successfully tested in CS4 on Mac OS X, but should be platform agnostic.

## Copyright

This Software is copyright © 2011-2015 by Michel MARIANI.

## License

This Software is licensed under the [GNU General Public License (GPL) v3](https://www.gnu.org/licenses/gpl.html).

## Download

[Download Zip File](/Downloads/Parse-Gradients-File-4.5.zip)

## Installation

Download the Zip file and unzip it.

Move the script to the `Presets/Scripts` folder in the default preset location of the Adobe Photoshop application. On next launch, the script will appear in the File>Automate submenu.
