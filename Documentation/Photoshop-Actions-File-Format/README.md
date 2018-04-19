[[HTML version](actions-file-format.html)]

# Photoshop Actions File Format

- [Contents](#contents)
- [File format](#file-format)
    - [Actions palette file](#actions-palette-file)
    - [Actions palette file header](#actions-palette-file-header)
    - [Actions file](#actions-file)
    - [Actions file header](#actions-file-header)
    - [Action set](#action-set)
    - [Action](#action)
    - [Command](#command)
- [Action Manager format](#action-manager-format)
    - [Boolean](#boolean)
    - [Byte string](#byte-string)
    - [Class](#class)
    - [Double](#double)
    - [Enumerated](#enumerated)
    - [File alias](#file-alias)
    - [File path](#file-path)
    - [ID](#id)
    - [Identifier](#identifier)
    - [Index](#index)
    - [Item](#item)
    - [Key-item pair](#key-item-pair)
    - [Large integer](#large-integer)
    - [List](#list)
    - [Name](#name)
    - [Object](#object)
    - [Offset](#offset)
    - [Property](#property)
    - [Raw data](#raw-data)
    - [Reference](#reference)
    - [Reference item](#reference-item)
    - [Unicode string](#unicode-string)
    - [Unit double](#unit-double)
- [Object array format](#object-array-format)
    - [Object array](#object-array)
    - [Object array key-item pair](#object-array-key-item-pair)
    - [Unit doubles](#unit-doubles)
    - [Specific handling](#specific-handling)
- [Descriptor parsing](#descriptor-parsing)
- [Dialog mode](#dialog-mode)
    - [Decision table](#decision-table)
    - [Dialog recording options](#dialog-recording-options)
    - [Dialog playback options](#dialog-playback-options)
- [Parsing actions files](#parsing-actions-files)

## Contents

This document is intended to provide missing information about the format of Photoshop actions files. It complements and slightly corrects the original "official" information found in the [Actions](https://www.adobe.com/devnet-apps/photoshop/fileformatashtml/PhotoshopFileFormats.htm#50577411_pgfId-1059252) section (Additional File Formats) of the page [Adobe Photoshop File Formats Specification](https://www.adobe.com/devnet-apps/photoshop/fileformatashtml/PhotoshopFileFormats.htm).

**Note**: unless indicated otherwise, all multi-byte values, i.e., integer numbers (including C-style 4-character constants), floating-point (double) numbers, and Unicode characters are coded in [big-endian](https://en.wikipedia.org/wiki/Big-endian) format.

## File format

### Actions palette file

<table>
<tr>
<th>Name</th>
<th>Type</th>
<th>Kind</th>
<th>Description</th>
</tr>
<tr>
<td><code>Actions&nbsp;Palette.psp</code></td>
<td><code>'8BPF'</code></td>
<td>Actions&nbsp;palette file</td>
<td>Adobe Photoshop preferences file containing all the actions sets available in the Actions Palette.<br><strong>Warning</strong>: like most preferences files, the actions palette file is not updated in real-time: it is read by the application only once at start-up (launch) time and written back at shut-down (quit) time.</td>
</tr>
</table>

### Actions palette file header

<table>
<tr>
<th>Length&nbsp;(in&nbsp;bytes)</th>
<th>Description</th>
<th>Comments</th>
</tr>
<tr>
<td>4</td>
<td>Version (=&nbsp;16)</td>
<td>32-bit integer.</td>
</tr>
<tr>
<td>4</td>
<td>Number of action sets</td>
<td>32-bit integer.</td>
</tr>
<tr>
<td>Variable</td>
<td>Sequence of action sets</td>
<td>Each in <a href="#action-set">Action set</a> format.</td>
</tr>
</table>

### Actions file

<table>
<tr>
<th>Name</th>
<th>Type</th>
<th>Kind</th>
<th>Description</th>
</tr>
<tr>
<td><code>*.atn</code></td>
<td><code>'8BAC'</code></td>
<td>Actions file</td>
<td>Adobe Photoshop actions file containing a set of related actions; generally produced by saving an action set from the Actions Palette.</td>
</tr>
</table>

### Actions file header

<table>
<tr>
<th>Length&nbsp;(in&nbsp;bytes)</th>
<th>Description</th>
<th>Comments</th>
</tr>
<tr>
<td>4</td>
<td>Version (=&nbsp;16)</td>
<td>32-bit integer.</td>
</tr>
<tr>
<td>Variable</td>
<td>Action set</td>
<td><a href="#action-set">Action set</a> format.</td>
</tr>
</table>

### Action set

<table>
<tr>
<th>Length&nbsp;(in&nbsp;bytes)</th>
<th>Description</th>
<th>Comments</th>
</tr>
<tr>
<td>Variable</td>
<td>Action set name</td>
<td><a href="#unicode-string">Unicode string</a> format.</td>
</tr>
<tr>
<td>1</td>
<td>Expanded</td>
<td>Boolean; true if the action set is expanded in the Actions palette.</td>
</tr>
<tr>
<td>4</td>
<td>Number of actions</td>
<td>32-bit integer.</td>
</tr>
<tr>
<td>Variable</td>
<td>Sequence of actions</td>
<td>Each in <a href="#action">Action</a> format.</td>
</tr>
</table>

### Action

<table>
<tr>
<th>Length&nbsp;(in&nbsp;bytes)</th>
<th>Description</th>
<th>Comments</th>
</tr>
<tr>
<td>2</td>
<td>Function key number</td>
<td>16-bit integer; function key used as keyboard shortcut; 0 if not used.</td>
</tr>
<tr>
<td>1</td>
<td>Shift key</td>
<td>Boolean; true if shift key needed for keyboard shortcut.</td>
</tr>
<tr>
<td>1</td>
<td>Command/Control key</td>
<td>Boolean; true if command/control key needed for keyboard shortcut.</td>
</tr>
<tr>
<td>2</td>
<td>Color index</td>
<td>
16-bit integer; color values:
<ul>
<li>0 (None)</li>
<li>1 (Red)</li>
<li>2 (Orange)</li>
<li>3 (Yellow)</li>
<li>4 (Green)</li>
<li>5 (Blue)</li>
<li>6 (Violet)</li>
<li>7 (Gray)</li>
</ul>
</td>
</tr>
<tr>
<td>Variable</td>
<td>Action name</td>
<td><a href="#unicode-string">Unicode string</a> format.</td>
</tr>
<tr>
<td>1</td>
<td>Expanded</td>
<td>Boolean; true if the action is expanded in the Actions palette.</td>
</tr>
<tr>
<td>4</td>
<td>Number of commands</td>
<td>32-bit integer.</td>
</tr>
<tr>
<td>Variable</td>
<td>Sequence of commands</td>
<td>Each in <a href="#command">Command</a> format.</td>
</tr>
</table>

### Command
<table>
<tr>
<th>Length&nbsp;(in&nbsp;bytes)</th>
<th>Description</th>
<th>Comments</th>
</tr>
<tr>
<td>1</td>
<td>Expanded</td>
<td>Boolean; true if the command is expanded in the Actions palette.</td>
</tr>
<tr>
<td>1</td>
<td>Enabled</td>
<td>Boolean; true if the command is enabled.</td>
</tr>
<tr>
<td>1</td>
<td>With dialog</td>
<td>Boolean; true if dialogs should be displayed (cf. <a href="#dialog-mode">Dialog mode</a>).</td>
</tr>
<tr>
<td>1</td>
<td>Dialog options</td>
<td>8-bit integer; options for displaying dialogs (cf. <a href="#dialog-mode">Dialog mode</a>).</td>
</tr>
<tr>
<td>4</td>
<td>Event ID format selector</td>
<td>C-style 4-character constant: either <code>'long'</code> (CharID) or <code>'TEXT'</code> (StringID).</td>
</tr>
<tr>
<td>4 or variable</td>
<td>Event ID (CharID or StringID)</td>
<td>C-style 4-character constant if CharID; <a href="#byte-string">Byte string</a> format if StringID.</td>
</tr>
<tr>
<td>Variable</td>
<td>Dictionary name</td>
<td><a href="#byte-string">Byte string</a> format.</td>
</tr>
<tr>
<td>4</td>
<td>Has descriptor</td>
<td>32-bit integer; either 0 (no descriptor) or -1 (descriptor).</td>
</tr>
<tr>
<td>0 or variable</td>
<td>Descriptor</td>
<td><a href="#object">Object</a> format, if present.</td>
</tr>
</table>

## Action Manager format

### Boolean

<table>
<tr>
<th>Length&nbsp;(in&nbsp;bytes)</th>
<th>Description</th>
<th>Comments</th>
</tr>
<tr>
<td>1</td>
<td>Boolean value</td>
<td>8-bit integer.</td>
</tr>
</table>

### Byte string

<table>
<tr>
<th>Length&nbsp;(in&nbsp;bytes)</th>
<th>Description</th>
<th>Comments</th>
</tr>
<tr>
<td>4</td>
<td>Number of characters</td>
<td>32-bit integer.</td>
</tr>
<tr>
<td>Variable</td>
<td>String of characters</td>
<td>One byte per character.</td>
</tr>
</table>

### Class

<table>
<tr>
<th>Length&nbsp;(in&nbsp;bytes)</th>
<th>Description</th>
<th>Comments</th>
</tr>
<tr>
<td>Variable</td>
<td>Class name (usually empty)</td>
<td><a href="#unicode-string">Unicode string</a> format.</td>
</tr>
<tr>
<td>Variable</td>
<td>Class ID</td>
<td><a href="#id">ID</a> format.</td>
</tr>
</table>

### Double

<table>
<tr>
<th>Length&nbsp;(in&nbsp;bytes)</th>
<th>Description</th>
<th>Comments</th>
</tr>
<tr>
<td>8</td>
<td>Double</td>
<td>64-bit double.</td>
</tr>
</table>

### Enumerated

<table>
<tr>
<th>Length&nbsp;(in&nbsp;bytes)</th>
<th>Description</th>
<th>Comments</th>
</tr>
<tr>
<td>Variable</td>
<td>Enumerated type ID</td>
<td><a href="#id">ID</a> format.</td>
</tr>
<tr>
<td>Variable</td>
<td>Enumerated value ID</td>
<td><a href="#id">ID</a> format.</td>
</tr>
</table>

### File alias

<table>
<tr>
<th>Length&nbsp;(in&nbsp;bytes)</th>
<th>Description</th>
<th>Comments</th>
</tr>
<tr>
<td>4</td>
<td>Length (in bytes) of the alias structure</td>
<td>32-bit integer.</td>
</tr>
<tr>
<td>Variable</td>
<td>Alias structure</td>
<td>Opaque data used on Mac OS.</td>
</tr>
</table>

### File path

<table>
<tr>
<th>Length&nbsp;(in&nbsp;bytes)</th>
<th>Description</th>
<th>Comments</th>
</tr>
<tr>
<td>4</td>
<td>Length (in bytes) of the path structure</td>
<td>32-bit integer.</td>
</tr>
<tr>
<td>4</td>
<td>Unicode text signature (=&nbsp;<code>'utxt'</code>)</td>
<td>C-style 4-character constant, in <a href="http://en.wikipedia.org/wiki/Little-endian">little-endian</a> format.</td>
</tr>
<tr>
<td>4</td>
<td>Length (in bytes) of the path structure</td>
<td>32-bit integer, in <a href="http://en.wikipedia.org/wiki/Little-endian">little-endian</a> format.</td>
</tr>
<tr>
<td>4</td>
<td>Number of Unicode characters</td>
<td>32-bit integer, in <a href="http://en.wikipedia.org/wiki/Little-endian">little-endian</a> format.</td>
</tr>
<tr>
<td>Variable</td>
<td>String of Unicode characters</td>
<td>Two bytes per character, in <a href="http://en.wikipedia.org/wiki/Little-endian">little-endian</a> format; includes terminating null.</td>
</tr>
</table>

### ID

<table>
<tr>
<th>Length&nbsp;(in&nbsp;bytes)</th>
<th>Description</th>
<th>Comments</th>
</tr>
<tr>
<td>4</td>
<td>Length</td>
<td>32-bit integer; CharID if 0, StringID otherwise.</td>
</tr>
<tr>
<td>4 or variable</td>
<td>CharID or StringID</td>
<td>C-style 4-character constant if CharID; string of characters if StringID.</td>
</tr>
</table>

### Identifier

<table>
<tr>
<th>Length&nbsp;(in&nbsp;bytes)</th>
<th>Description</th>
<th>Comments</th>
</tr>
<tr>
<td>4</td>
<td>Identifier value</td>
<td>32-bit integer (unsigned).</td>
</tr>
</table>

### Index

<table>
<tr>
<th>Length&nbsp;(in&nbsp;bytes)</th>
<th>Description</th>
<th>Comments</th>
</tr>
<tr>
<td>4</td>
<td>Index value</td>
<td>32-bit integer (unsigned).</td>
</tr>
</table>

### Integer

<table>
<tr>
<th>Length&nbsp;(in&nbsp;bytes)</th>
<th>Description</th>
<th>Comments</th>
</tr>
<tr>
<td>4</td>
<td>Integer number</td>
<td>32-bit integer (signed).</td>
</tr>
</table>

### Item

<table>
<tr>
<th>Length&nbsp;(in&nbsp;bytes)</th>
<th>Description</th>
<th>Comments</th>
</tr>
<tr>
<td>4</td>
<td>Type</td>
<td>
C-style 4-character constant:
<ul>
<li><code>'bool'</code> (Boolean)</li>
<li><code>'type'</code> or <code>'GlbC'</code> (Class)</li>
<li><code>'doub'</code> (Double)</li>
<li><code>'enum'</code> (Enumerated)</li>
<li><code>'alis'</code> (File alias)</li>
<li><code>'Pth '</code> (File path)</li>
<li><code>'long'</code> (Integer)</li>
<li><code>'comp'</code> (Large integer)</li>
<li><code>'VlLs'</code> (List)</li>
<li><code>'Objc'</code> or <code>'GlbO'</code> (Object)</li>
<li><code>'tdta'</code> (Raw data)</li>
<li><code>'obj '</code> (Reference)</li>
<li><code>'TEXT'</code> (Unicode string)</li>
<li><code>'UntF'</code> (Unit double)</li>
</ul>
or:
<ul>
<li><code>'ObAr'</code> (Object array)</li>
</ul>
</td>
</tr>
<tr>
<td>Variable</td>
<td>Value</td>
<td>
Depending on type:
<ul>
<li><a href="#boolean">Boolean</a> format</li>
<li><a href="#class">Class</a> format</li>
<li><a href="#double">Double</a> format</li>
<li><a href="#enumerated">Enumerated</a> format</li>
<li><a href="#file-alias">File alias</a> format</li>
<li><a href="#file-path">File path</a> format</li>
<li><a href="#integer">Integer</a> format</li>
<li><a href="#large-integer">Large integer</a> format</li>
<li><a href="#list">List</a> format</li>
<li><a href="#object">Object</a> format</li>
<li><a href="#raw-data">Raw data</a> format</li>
<li><a href="#reference">Reference</a> format</li>
<li><a href="#unicode-string">Unicode string</a> format</li>
<li><a href="#unit-double">Unit double</a> format</li>
</ul>
or:
<ul>
<li><a href="#object-array">Object array</a> format (cf. <a href="#specific-handling">Specific handling</a>)</li>
</ul>
</td>
</tr>
</table>

### Key-item pair

<table>
<tr>
<th>Length&nbsp;(in&nbsp;bytes)</th>
<th>Description</th>
<th>Comments</th>
</tr>
<tr>
<td>Variable</td>
<td>Key ID</td>
<td><a href="#id">ID</a> format.</td>
</tr>
<tr>
<td>Variable</td>
<td>Item</td>
<td><a href="#item">Item</a> format.</td>
</tr>
</table>

### Large integer
<table>
<tr>
<th>Length&nbsp;(in&nbsp;bytes)</th>
<th>Description</th>
<th>Comments</th>
</tr>
<tr>
<td>8</td>
<td>Large integer number</td>
<td>64-bit integer (signed).</td>
</tr>
</table>

### List

<table>
<tr>
<th>Length&nbsp;(in&nbsp;bytes)</th>
<th>Description</th>
<th>Comments</th>
</tr>
<tr>
<td>4</td>
<td>Number of items in the list</td>
<td>32-bit integer.</td>
</tr>
<tr>
<td>Variable</td>
<td>Sequence of items</td>
<td>Each in <a href="#item">Item</a> format.</td>
</tr>
</table>

### Name

<table>
<tr>
<th>Length&nbsp;(in&nbsp;bytes)</th>
<th>Description</th>
<th>Comments</th>
</tr>
<tr>
<td>Variable</td>
<td>Name string</td>
<td><a href="#unicode-string">Unicode string</a> format.</td>
</tr>
</table>

### Object

<table>
<tr>
<th>Length&nbsp;(in&nbsp;bytes)</th>
<th>Description</th>
<th>Comments</th>
</tr>
<tr>
<td>Variable</td>
<td>Class</td>
<td><a href="#class">Class</a> format.</td>
</tr>
<tr>
<td>4</td>
<td>Number of items in the object</td>
<td>32-bit integer.</td>
</tr>
<tr>
<td>Variable</td>
<td>Sequence of key-item pairs</td>
<td>Each in <a href="#key-item-pair">Key-item pair</a> format.</td>
</tr>
</table>

### Offset

<table>
<tr>
<th>Length&nbsp;(in&nbsp;bytes)</th>
<th>Description</th>
<th>Comments</th>
</tr>
<tr>
<td>4</td>
<td>Offset value</td>
<td>32-bit integer (signed).</td>
</tr>
</table>

### Property

<table>
<tr>
<th>Length&nbsp;(in&nbsp;bytes)</th>
<th>Description</th>
<th>Comments</th>
</tr>
<tr>
<td>Variable</td>
<td>Key ID</td>
<td><a href="#id">ID</a> format.</td>
</tr>
</table>

### Raw data

<table>
<tr>
<th>Length&nbsp;(in&nbsp;bytes)</th>
<th>Description</th>
<th>Comments</th>
</tr>
<tr>
<td>4</td>
<td>Length (in bytes) of the raw data value</td>
<td>32-bit integer.</td>
</tr>
<tr>
<td>Variable</td>
<td>Raw data value</td>
<td>Sequence of bytes.</td>
</tr>
</table>

### Reference

<table>
<tr>
<th>Length&nbsp;(in&nbsp;bytes)</th>
<th>Description</th>
<th>Comments</th>
</tr>
<tr>
<td>4</td>
<td>Number of items in the reference</td>
<td>32-bit integer.</td>
</tr>
<tr>
<td>Variable</td>
<td>Sequence of reference items</td>
<td>Each in <a href="#reference-item">Reference item</a> format.</td>
</tr>
</table>

### Reference item

<table>
<tr>
<th>Length&nbsp;(in&nbsp;bytes)</th>
<th>Description</th>
<th>Comments</th>
</tr>
<tr>
<td>4</td>
<td>Form</td>
<td>
C-style 4-character constant:
<ul>
<li><code>'Clss'</code> (Class)</li>
<li><code>'Enmr'</code> (Enumerated)</li>
<li><code>'Idnt'</code> (Identifier)</li>
<li><code>'indx'</code> (Index)</li>
<li><code>'name'</code> (Name)</li>
<li><code>'rele'</code> (Offset)</li>
<li><code>'prop'</code> (Property)</li>
</ul>
</td>
</tr>
<tr>
<td>Variable</td>
<td>Desired class</td>
<td><a href="#class">Class</a> format.</td>
</tr>
<tr>
<td>Variable (0 for Class)</td>
<td>Value</td>
<td>
Depending on form:
<ul>
<li>Class: nothing</li>
<li><a href="#enumerated">Enumerated</a> format</li>
<li><a href="#identifier">Identifier</a> format</li>
<li><a href="#index">Index</a> format</li>
<li><a href="#name">Name</a> format</li>
<li><a href="#offset">Offset</a> format</li>
<li><a href="#property">Property</a> format</li>
</ul>
</td>
</tr>
</table>

### Unicode string

<table>
<tr>
<th>Length&nbsp;(in&nbsp;bytes)</th>
<th>Description</th>
<th>Comments</th>
</tr>
<tr>
<td>4</td>
<td>Number of Unicode characters</td>
<td>32-bit integer.</td>
</tr>
<tr>
<td>Variable</td>
<td>String of Unicode characters</td>
<td>Two bytes per character; includes terminating null.</td>
</tr>
</table>

### Unit double

<table>
<tr>
<th>Length&nbsp;(in&nbsp;bytes)</th>
<th>Description</th>
<th>Comments</th>
</tr>
<tr>
<td>4</td>
<td>Unit ID</td>
<td>
C-style 4-character constant:
<ul>
<li><code>'#Ang'</code> (Angle)</li>
<li><code>'#Rsl'</code> (Density)</li>
<li><code>'#Rlt'</code> (Distance)</li>
<li><code>'#Nne'</code> (None)</li>
<li><code>'#Prc'</code> (Percent)</li>
<li><code>'#Pxl'</code> (Pixels)</li>
</ul>
or, for text code only:
<ul>
<li><code>'#Mlm'</code> (Millimeters)</li>
<li><code>'#Pnt'</code> (Points)</li>
</ul>
</td>
</tr>
<tr>
<td>8</td>
<td>Double</td>
<td>64-bit double.</td>
</tr>
</table>

## Object array format

### Object array

<table>
<tr>
<th>Length&nbsp;(in&nbsp;bytes)</th>
<th>Description</th>
<th>Comments</th>
</tr>
<tr>
<td>4</td>
<td>Number of objects in the array</td>
<td>32-bit integer.</td>
</tr>
<tr>
<td>Variable</td>
<td>Object class</td>
<td><a href="#class">Class</a> format.</td>
</tr>
<tr>
<td>4</td>
<td>Number of items in each object</td>
<td>32-bit integer.</td>
</tr>
<tr>
<td>Variable</td>
<td>Sequence of key-item pairs</td>
<td>Each in <a href="#object-array-key-item-pair">Object array key-item pair</a> format.</td>
</tr>
</table>

### Object array key-item pair

<table>
<tr>
<th>Length&nbsp;(in&nbsp;bytes)</th>
<th>Description</th>
<th>Comments</th>
</tr>
<tr>
<td>Variable</td>
<td>Key ID</td>
<td><a href="#id">ID</a> format.</td>
</tr>
<tr>
<td>4</td>
<td>Item type</td>
<td>
C-style 4-character constant:
<ul>
<li><code>'UnFl'</code> (Unit doubles)</li>
</ul>
</td>
</tr>
<tr>
<td>Variable</td>
<td>Item value</td>
<td>
Depending on item type:
<ul>
<li><a href="#unit-doubles">Unit doubles</a> format</li>
</ul>
</td>
</tr>
</table>

### Unit doubles

<table>
<tr>
<th>Length&nbsp;(in&nbsp;bytes)</th>
<th>Description</th>
<th>Comments</th>
</tr>
<tr>
<td>4</td>
<td>Unit ID</td>
<td>
C-style 4-character constant:
<ul>
<li><code>'#Rlt'</code> (Distance)</li>
<li><code>'#Prc'</code> (Percent)</li>
<li><code>'#Pxl'</code> (Pixels)</li>
</ul>
</td>
</tr>
<tr>
<td>4</td>
<td>Number of doubles</td>
<td>32-bit integer; should be the same as the number of objects in the array.</td>
</tr>
<tr>
<td>Variable</td>
<td>Sequence of doubles</td>
<td>Each as 64-bit double.</td>
</tr>
</table>

### Specific handling

The `'ObAr'` item type (assumed to be an "Object Array") can be found in some actions files, for instance in the file "Frames.atn" located in the "Presets/Actions" folder alongside the Photoshop application. This specific item type is not only undocumented, but also cannot appear directly in an ActionDescriptor since there are no associated methods putObjectArray or getObjectArray to handle it with.

In addition, it should be noted that the `'UnFl'` item type (assumed to be a "Unit Floats") is not defined either (not to be confused with the standard `'UntF'` item type). Consequently, the object array is altogether a very special case which requires further conversion/translation.

In practice, the object array seems to be only used to describe a polygon made of a list of points (recorded while setting a selection using the Lasso tool, Polygonal Lasso tool, or Magnetic Lasso tool). It is clearly a "packed" format, used only in serialized form inside an actions file, in order to save space by factorizing unnecessarily repeated data, such as the class (point) and keys (horizontal and vertical) of each object, as well as the common unit (distance/percent/pixels) for all double coordinates, seeing that the number of points can be quite important, especially when doing a freehand selection with the Lasso tool.

Here is a quick-and-dirty JavaScript code snippet defining a function which computes how an object array would actually appear in a byte stream in "unpacked" format; it assumes that the current position in the parsed actions file is set just after a recognized `'ObAr'` item type; it returns a byte stream beginning with a `'VlLs'` item type, indicating that it represents a standard ActionList:

```javascript
function toListStream (file)
{
    function toBEIntValue (bytes)
    {
        var intValue = 0;
        for (var index = 0; index < bytes.length; index++)
        {
            intValue = (intValue << 8) + bytes.charCodeAt (index);
        }
        return intValue;
    }
    function readUnicodeString (file)
    {
        var unicodeLength = file.read (4);
        var unicodeLengthValue = toBEIntValue (unicodeLength);
        var unicodeString = file.read (unicodeLengthValue * 2);
        return unicodeLength + unicodeString;
    }
    function readId (file)
    {
        var idLength = file.read (4);
        var idLengthValue = toBEIntValue (idLength);
        var id = file.read ((idLengthValue) ? idLengthValue : 4);
        return idLength + id;
    }
    function readClass (file)
    {
        var classUnicodeString = readUnicodeString (file);
        var classId = readId (file);
        return classUnicodeString + classId;
    }
    //
    var objCount = file.read (4);
    var objCountValue = toBEIntValue (objCount);
    var objClass = readClass (file);
    var itemCount = file.read (4);
    var itemCountValue = toBEIntValue (itemCount);
    var itemKeyId = [ ];
    var itemUnitId = [ ];
    var itemDoubles = [ ];
    for (var itemIndex = 0; itemIndex < itemCountValue; itemIndex++)
    {
        itemKeyId.push (readId (file));
        var itemType = file.read (4);
        if (itemType !== 'UnFl')
        {
            throw new Error ("Unrecognized item type!");
        }
        itemUnitId.push (file.read (4));
        var doublesCountValue = toBEIntValue (file.read (4));
        if (doublesCountValue !== objCountValue)
        {
            throw new Error ("Inconsistent object count!");
        }
        itemDoubles.push (file.read (doublesCountValue * 8));
    }
    //
    var listStream = 'VlLs' + objCount;
    for (var objIndex = 0; objIndex < objCountValue; objIndex++)
    {
        listStream += 'Objc' + objClass + itemCount;
        for (var itemIndex = 0; itemIndex < itemCountValue; itemIndex++)
        {
            listStream += itemKeyId[itemIndex] + 'UntF' + itemUnitId[itemIndex];
            listStream += itemDoubles[itemIndex].substr (objIndex * 8, 8);
        }
    }
    return listStream;
}
```

## Descriptor parsing

An interesting parsing strategy relies on the fact that each command's descriptor data found in the actions file matches the serialized format expected by the `ActionDescriptor.fromStream` method (in JavaScript), or by the corresponding `HandleToDescriptor` routine of the `ActionDescriptor` suite (in C/C++), except that it lacks the 4-byte header whose value in [big-endian](https://en.wikipedia.org/wiki/Big-endian) format is identical to the version number of the actions file itself (=&nbsp;16).

Once the missing header is inserted at the beginning, each command's descriptor data can be easily decoded into an ActionDescriptor. It should be noted that object array (`'ObAr'`) item types are correctly handled, i.e. automatically unpacked and converted to appropriate ActionList items.

The main drawback of that parsing method lies in the fact that each command's descriptor data is just a byte stream whose length is not known beforehand; as a result, it is still necessary to pre-decode each descriptor data by skipping all its fields, in order to compute its entire length and keep synchronized with the rest of the actions file. Surprisingly enough, the 32-bit field preceding the descriptor data is used as a boolean (0: no descriptor, or -1: descriptor) while it would have just been the right place to hold that useful length information...

## Dialog mode

### Decision table

Parsing an actions file can be used in different ways, for instance to play an action without the need to load the file in the Actions Palette.

For each command in the action, the `app.executeAction` method can be called with the "event ID" and the "action descriptor" directly available from the resulting data, whereas the dialog mode requires both "dialog options" and "with dialog" to be taken into account.

The "dialog options" value is set once and for all at the time of recording the action, while the "with dialog" flag can be interactively modified by the user in the Actions palette, by clicking in the toggle dialog visual mark located on the left of each command of the action, provided the mark is both visible and enabled.

<table cellspacing="0" cellpadding="0" class="t2">
<tbody>
<tr>
<th>Dialog options</th>
<th>With dialog</th>
<th colspan="2">Toggle dialog visual mark<br>(Actions palette)</th>
<th>Dialog mode for <code>app.executeAction</code></th>
</tr>
<tr>
<td rowspan="2">0</td>
<td><code>false</code></td>
<td>OFF</td>
<td><img src="images/Off.png" alt="" width="24" height="21" align="top"></td>
<td><code>DialogModes.NO</code></td>
</tr>
<tr>
<td><code>true</code></td>
<td>ON</td>
<td><img src="images/On.png" alt="" width="24" height="21" align="top"></td>
<td><code>DialogModes.ALL</code></td>
</tr>
<tr>
<td rowspan="2">1</td>
<td><code>false</code></td>
<td rowspan="2">Always ON</td>
<td rowspan="2"><img src="images/On-Disabled.png" alt="" width="24" height="21" align="top"></td>
<td rowspan="2"><code>DialogModes.ALL</code></td>
</tr>
<tr>
<td><code>true</code></td>
</tr>
<tr>
<td rowspan="2">2</td>
<td><code>false</code></td>
<td rowspan="2">Always OFF</td>
<td rowspan="2"><img src="images/Off-Disabled.png" alt="" width="24" height="21" align="top"></td>
<td rowspan="2"><code>DialogModes.NO</code></td>
</tr>
<tr>
<td><code>true</code></td>
</tr>
<tr>
<td rowspan="2">3</td>
<td><code>false</code></td>
<td rowspan="2">Always OFF</td>
<td rowspan="2"><img src="images/Off-Disabled.png" alt="" width="24" height="21" align="top"></td>
<td rowspan="2"><code>DialogModes.ALL</code></td>
</tr>
<tr>
<td><code>true</code></td>
</tr>
</tbody>
</table>

### Dialog recording options

While recording an action from the Actions palette, running a dedicated automation plug-in such as the **JSON Event Listener**, part of the **JSON Action Toolbox**, is very useful to monitor the event, descriptor, and dialog options associated with each recorded command.

Here are the different values of dialog opions that can be encountered in practice:

<table cellspacing="0" cellpadding="0" class="t2">
<tbody>
<tr>
<th>Recording options</th>
<th>Value</th>
<th>Description</th>
</tr>
<tr>
<td>Optional</td>
<td>0</td>
<td>Display dialog only if necessary or requested by user.</td>
</tr>
<tr>
<td>Required</td>
<td>1</td>
<td>Always display dialog.</td>
</tr>
<tr>
<td>None</td>
<td>2</td>
<td>No dialog to display.</td>
</tr>
<tr style="color: gray;">
<td>Specific</td>
<td>3</td>
<td>Display dialog (or not) in specific conditions.</td>
</tr>
<tr style="color: gray;">
<td>Stop/Continue</td>
<td>4</td>
<td>Display stop dialog (with continue or not).</td>
</tr>
</tbody>
</table>

**Notes**:

- Values 3 and 4 are undocumented; what they stand for is a guess based on extensive tests.
- Examples of user actions resulting in specific conditions (value 3):
    - `[Actions palette] > Insert Menu Item...` (only for some menu items: `Blur`, `Free Transform`, `Zoom In`, etc.)
    - `Image > Adjustments > Equalize` (or `Equalize...` when active selection)
    - `File > Import > Scanner XYZ...`
    - `Filter > Liquify...`
    - `Filter > Vanishing Point...`
- User action bringing on a stop/continue dialog (value 4):
    - `[Actions palette] > Insert Stop...`
- The value 4 is never recorded as such in the actions file, it is always changed to 0.

### Dialog playback options

For the sake of completeness:

<table cellspacing="0" cellpadding="0" class="t2">
<tbody>
<tr>
<th>Playback options</th>
<th>Value</th>
<th>Description</th>
<th>Dialog mode for<br><code>app.executeAction</code></th>
<th>Meaning</th>
</tr>
<tr>
<td>Don't display</td>
<td>0</td>
<td>Display dialog only if necessary due<br>to missing parameters or error.</td>
<td><code>DialogModes.ERROR</code></td>
<td>Show only dialogs related to errors.</td>
</tr>
<tr>
<td>Display</td>
<td>1</td>
<td>Present the plug-in dialog using descriptor information.</td>
<td><code>DialogModes.ALL</code></td>
<td>Show all dialogs.</td>
</tr>
<tr>
<td>Silent</td>
<td>2</td>
<td>Never present a dialog; use only descriptor information.</td>
<td><code>DialogModes.NO</code></td>
<td>Show no dialogs<br>(by default).</td>
</tr>
</tbody>
</table>

## Parsing actions files

A practical set of JavaScript functions for parsing actions files is contained in the module `jamActions`, which is part of the [JSON Action Manager](/JSON-Action-Manager) scripting library. It is used by three utility scripts:

- [Convert Actions File](/Utility-Scripts/Convert-Actions-File): [Photoshop CS3 or later] convert an actions file (.atn) into a folder of directly executable scripts (.js) which can be further edited.

- [Parse Actions File](/Utility-Scripts/Parse-Actions-File): [Photoshop CS2 or later] parse an actions file (.atn) or an actions palette file (Actions Palette.psp) into a JSON text file.

- [Play Actions File Action](/Utility-Scripts/Play-Actions-File-Action): [Photoshop CS3 or later] play a specific action contained in an actions file (.atn), without the need to load the file in the Actions Palette.

All files are open-source and licensed under [GPLv3](https://www.gnu.org/licenses/gpl.html); the utility scripts have been successfully tested in Photoshop CS4 on Mac OS X, but should be platform agnostic.

---

Doc version: 2.6
<br>
Date: 2018-04-16
<br>
Copyright: © 2012-2018 Michel MARIANI
<br>
Disclaimer: this information is provided 'as is' without warranty of any kind, express or implied; use it at your own risk.

