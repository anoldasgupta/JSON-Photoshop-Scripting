[[HTML version](gradients-file-format.html)]

# Photoshop Gradients File Format

- [Contents](#contents)
- [File format](#file-format)
    - [Gradients file](#gradients-file)
    - [Gradients file header](#gradients-file-header)
    - [Descriptor](#descriptor)
    - [Gradient object](#gradient-object)
    - [Custom stops gradient object](#custom-stops-gradient-object)
        - [Color stop object](#color-stop-object)
        - [Transparency stop object](#transparency-stop-object)
    - [Color noise gradient object](#color-noise-gradient-object)
- [Color format](#color-format)
    - [Book color object](#book-color-object)
    - [CMYK color object](#cmyk-color-object)
    - [Grayscale object](#grayscale-object)
    - [HSB color object](#hsb-color-object)
    - [Lab color object](#lab-color-object)
    - [RGB color object](#rgb-color-object)
- [Parsing gradients files](#parsing-gradients-files)
- [Generating gradients files](#generating-gradients-files)

## Contents

This document provides information about the (undocumented yet) format of gradients files in Photoshop.

**Note**: all multi-byte values, i.e., integer numbers (including C-style 4-character constants), floating-point (double) numbers, and Unicode characters are coded in [big-endian](https://en.wikipedia.org/wiki/Big-endian) format.

## File format

### Gradients file

<table>
<tr>
<th>Name</th>
<th>Type</th>
<th>Kind</th>
<th>Description</th>
</tr>
<tr>
<td><code>Gradients.psp</code></td>
<td><code>'8BPF'</code></td>
<td>Gradients file</td>
<td>Adobe Photoshop preferences file containing all the gradients listed in the Preset Manager.<br><strong>Warning</strong>: like most preferences files, the gradients file is not updated in real-time: it is read by the application only once at start-up (launch) time and written back at shut-down (quit) time.</td>
</tr>
<tr>
<td><code>*.grd</code></td>
<td><code>'8BGR'</code></td>
<td>Gradients file</td>
<td>Adobe Photoshop gradients file; generally produced by saving a selected set of gradients from the Preset Manager.</td>
</tr>
</table>

### Gradients file header

<table>
<tr>
<th>Length&nbsp;(in&nbsp;bytes)</th>
<th>Description</th>
<th>Comments</th>
</tr>
<tr>
<td>4</td>
<td>Magic&nbsp;number (=&nbsp;<code>'8BGR'</code>)</td>
<td>C-style 4-character constant.</td>
</tr>
<tr>
<td>2</td>
<td>Version (=&nbsp;5)</td>
<td>16-bit integer.</td>
</tr>
<tr>
<td>Variable</td>
<td>Serialized action descriptor</td>
<td>Matches the serialized format expected by the <code>ActionDescriptor.fromStream</code> method (in JavaScript), or the <code>HandleToDescriptor</code> routine of the <code>ActionDescriptor</code> suite (in C/C++), i.e. prefixed by a 32-bit integer equal to 16. See <a href="#descriptor">Descriptor</a> format below.</td>
</tr>
</table>

### Descriptor

Here is the structure of the descriptor returned by calling the `ActionDescriptor.fromStream` method (in JavaScript), or the `HandleToDescriptor` routine of the `ActionDescriptor` suite (in C/C++), on the remaining part of the file following the magic number (`'8BGR'`) and the version (5):

<table>
<tr>
<th>Key</th>
<th>Type</th>
<th>Value</th>
<th>Comments</th>
</tr>
<tr>
<td><code title="No equivalent StringID">'GrdL'</code></td>
<td>List</td>
<td>List of gradient objects</td>
<td>Each in <a href="#gradient-object">Gradient object</a> format.</td>
</tr>
</table>

### Gradient object

<table>
<tr>
<th>Class</th>
<th colspan="4">Descriptor</th>
</tr>
<tr>
<td rowspan="2"><code title="&quot;gradientClassEvent&quot;">'Grdn'</code></td>
<th>Key</th>
<th>Type</th>
<th>Value</th>
<th>Comments</th>
</tr>
<tr>
<td><code title="&quot;gradient&quot;">'Grad'</code></td>
<td>Object</td>
<td>Custom stops gradient object<br>or<br>Color noise gradient object</td>
<td><a href="#custom-stops-gradient-object">Custom stops gradient object</a> format<br>or<br><a href="#color-noise-gradient-object">Color noise gradient object</a> format.</td>
</tr>
</table>

### Custom stops gradient object

<table>
<tr>
<th>Class</th>
<th colspan="4">Descriptor</th>
</tr>
<tr>
<td rowspan="6"><code title="&quot;gradientClassEvent&quot;">'Grdn'</code></td>
<th>Key</th>
<th>Type</th>
<th>Value</th>
<th>Comments</th>
</tr>
<tr>
<td><code title="&quot;name&quot;">'Nm&nbsp;&nbsp;'</code></td>
<td>String</td>
<td>Gradient name</td>
<td>Unicode string.</td>
</tr>
<tr>
<td><code title="&quot;gradientForm&quot;">'GrdF'</code></td>
<td>Enumerated</td>
<td>Gradient form: custom stops<br>(=&nbsp;<code title="&quot;gradientForm&quot;">'GrdF'</code>,&nbsp;<code title="&quot;customStops&quot;">'CstS'</code>)</td>
<td>Solid gradient.</td>
</tr>
<tr>
<td><code title="&quot;interpolation&quot;">'Intr'</code></td>
<td>Double</td>
<td>Interpolation</td>
<td>0 to 4096 (Smoothness: 0% to 100%).</td>
</tr>
<tr>
<td><code title="&quot;colors&quot;">'Clrs'</code></td>
<td>List</td>
<td>List of color stops</td>
<td>Each in <a href="#color-stop-object">Color stop object</a> format.</td>
</tr>
<tr>
<td><code title="&quot;transparency&quot;">'Trns'</code></td>
<td>List</td>
<td>List of transparency stops</td>
<td>Each in <a href="#transparency-stop-object">Transparency stop object</a> format.</td>
</tr>
</table>

#### Color stop object

<table>
<tr>
<th>Class</th>
<th colspan="4">Descriptor</th>
</tr>
<tr>
<td rowspan="5"><code title="&quot;colorStop&quot;">'Clrt'</code></td>
<th>Key</th>
<th>Type</th>
<th>Value</th>
<th>Comments</th>
</tr>
<tr>
<td><code title="&quot;location&quot;">'Lctn'</code></td>
<td>Integer</td>
<td>Location</td>
<td>0 to 4096 (0% to 100%).</td>
</tr>
<tr>
<td><code title="&quot;midpoint&quot;">'Mdpn'</code></td>
<td>Integer</td>
<td>Midpoint</td>
<td>0% to 100%.</td>
</tr>
<tr>
<td><code title="&quot;type&quot;">'Type'</code></td>
<td>Enumerated</td>
<td>
Color stop type:
<ul>
<li><code title="&quot;colorStopType&quot;">'Clry'</code>,&nbsp;<code title="&quot;userStop&quot;">'UsrS'</code></li>
<li><code title="&quot;colorStopType&quot;">'Clry'</code>,&nbsp;<code title="&quot;backgroundColor&quot;">'BckC'</code></li>
<li><code title="&quot;colorStopType&quot;">'Clry'</code>,&nbsp;<code title="&quot;foregroundColor&quot;">'FrgC'</code></li>
</ul>
</td>
<td>
Type:
<ul>
<li>User stop</li>
<li>Background color</li>
<li>Foreground color</li>
</ul>
</td>
</tr>
<tr>
<td><code title="&quot;color&quot;">'Clr&nbsp;'</code></td>
<td>Object</td>
<td>
Color object:
<ul>
<li>Book color object</li>
<li>CMYK color object</li>
<li>Grayscale object</li>
<li>HSB color object</li>
<li>Lab color object</li>
<li>RGB color object</li>
</ul>
</td>
<td>
Key present only if color stop type is user stop:
<ul>
<li><a href="#book-color-object">Book color object</a> format</li>
<li><a href="#cmyk-color-object">CMYK color object</a> format</li>
<li><a href="#grayscale-object">Grayscale object</a> format</li>
<li><a href="#hsb-color-object">HSB color object</a> format</li>
<li><a href="#lab-color-object">Lab color object</a> format</li>
<li><a href="#rgb-color-object">RGB color object</a> format</li>
</ul>
</td>
</tr>
</table>

#### Transparency stop object

<table>
<tr>
<th>Class</th>
<th colspan="4">Descriptor</th>
</tr>
<tr>
<td rowspan="4"><code title="&quot;transparencyStop&quot;">'TrnS'</code></td>
<th>Key</th>
<th>Type</th>
<th>Value</th>
<th>Comments</th>
</tr>
<tr>
<td><code title="&quot;location&quot;">'Lctn'</code></td>
<td>Integer</td>
<td>Location</td>
<td>0 to 4096 (0% to 100%).</td>
</tr>
<tr>
<td><code title="&quot;midpoint&quot;">'Mdpn'</code></td>
<td>Integer</td>
<td>Midpoint</td>
<td>0% to 100%.</td>
</tr>
<tr>
<td><code title="&quot;opacity&quot;">'Opct'</code></td>
<td>Unit double</td>
<td>Opacity (in <code title="&quot;percentUnit&quot;">'#Prc'</code> units)</td>
<td>0% to 100%.</td>
</tr>
</table>

### Color noise gradient object

<table>
<tr>
<th>Class</th>
<th colspan="4">Descriptor</th>
</tr>
<tr>
<td rowspan="10"><code title="&quot;gradientClassEvent&quot;">'Grdn'</code></td>
<th>Key</th>
<th>Type</th>
<th>Value</th>
<th>Comments</th>
</tr>
<tr>
<td><code title="&quot;name&quot;">'Nm&nbsp;&nbsp;'</code></td>
<td>String</td>
<td>Gradient name</td>
<td>Unicode string.</td>
</tr>
<tr>
<td><code title="&quot;gradientForm&quot;">'GrdF'</code></td>
<td>Enumerated</td>
<td>Gradient form: color noise<br>(=&nbsp;<code title="&quot;gradientForm&quot;">'GrdF'</code>,&nbsp;<code title="&quot;colorNoise&quot;">'ClNs'</code>)</td>
<td>Noise gradient.</td>
</tr>
<tr>
<td><code title="&quot;randomSeed&quot;">'RndS'</code></td>
<td>Integer</td>
<td>Random seed</td>
<td>Randomize.</td>
</tr>
<tr>
<td><code title="&quot;showTransparency&quot;">'ShTr'</code></td>
<td>Boolean</td>
<td>Show transparency</td>
<td>Add Transparency.</td>
</tr>
<tr>
<td><code title="&quot;vectorColor&quot;">'VctC'</code></td>
<td>Boolean</td>
<td>Vector color</td>
<td>Restrict Colors.</td>
</tr>
<tr>
<td><code title="&quot;smoothness&quot;">'Smth'</code></td>
<td>Integer</td>
<td>Smoothness</td>
<td>0 to 4096 (Roughness: 0% to 100%).</td>
</tr>
<tr>
<td><code title="&quot;colorSpace&quot;">'ClrS'</code></td>
<td>Enumerated</td>
<td>
Color space:
<ul>
<li><code title="&quot;colorSpace&quot;">'ClrS'</code>,&nbsp;<code title="&quot;RGBColor&quot;">'RGBC'</code></li>
<li><code title="&quot;colorSpace&quot;">'ClrS'</code>,&nbsp;<code title="&quot;HSBColorEnum&quot;">'HSBl'</code></li>
<li><code title="&quot;colorSpace&quot;">'ClrS'</code>,&nbsp;<code title="&quot;labColor&quot;">'LbCl'</code></li>
</ul>
</td>
<td>
Color Model:
<ul>
<li>RGB</li>
<li>HSB</li>
<li>LAB</li>
</ul>
</td>
</tr>
<tr>
<td><code title="&quot;minimum&quot;">'Mnm&nbsp;'</code></td>
<td>List of Integers</td>
<td>Four minimum values</td>
<td>Three color components (0% to 100%) + transparency (0%).</td>
</tr>
<tr>
<td><code title="&quot;maximum&quot;">'Mxm&nbsp;'</code></td>
<td>List of Integers</td>
<td>Four maximum values</td>
<td>Three color components (0% to 100%) + transparency (100%).</td>
</tr>
</table>

## Color format

### Book color object

<table>
<tr>
<th>Class</th>
<th colspan="4">Descriptor</th>
</tr>
<tr>
<td rowspan="5"><code title="&quot;bookColor&quot;">'BkCl'</code></td>
<th>Key</th>
<th>Type</th>
<th>Value</th>
<th>Comments</th>
</tr>
<tr>
<td><code title="&quot;book&quot;">'Bk&nbsp;&nbsp;'</code></td>
<td>String</td>
<td>Book name</td>
<td>Unicode string.</td>
</tr>
<tr>
<td><code title="&quot;name&quot;">'Nm&nbsp;&nbsp;'</code></td>
<td>String</td>
<td>Color name</td>
<td>Unicode string.</td>
</tr>
<tr>
<td><code title="No equivalent CharID">"bookID"</code></td>
<td>Integer</td>
<td>Book ID</td>
<td>Signed number.</td>
</tr>
<tr>
<td><code title="No equivalent CharID">"bookKey"</code></td>
<td>Raw data</td>
<td>Book key</td>
<td>Byte string.</td>
</tr>
</table>

### CMYK color object

<table>
<tr>
<th>Class</th>
<th colspan="4">Descriptor</th>
</tr>
<tr>
<td rowspan="5"><code title="&quot;CMYKColorClass&quot;">'CMYC'</code></td>
<th>Key</th>
<th>Type</th>
<th>Value</th>
<th>Comments</th>
</tr>
<tr>
<td><code title="&quot;cyan&quot;">'Cyn&nbsp;'</code></td>
<td>Double</td>
<td>Cyan</td>
<td>0% to 100%.</td>
</tr>
<tr>
<td><code title="&quot;magenta&quot;">'Mgnt'</code></td>
<td>Double</td>
<td>Magenta</td>
<td>0% to 100%.</td>
</tr>
<tr>
<td><code title="&quot;yellowColor&quot;">'Ylw&nbsp;'</code></td>
<td>Double</td>
<td>Yellow</td>
<td>0% to 100%.</td>
</tr>
<tr>
<td><code title="&quot;black&quot;">'Blck'</code></td>
<td>Double</td>
<td>Black</td>
<td>0% to 100%.</td>
</tr>
</table>

### Grayscale object

<table>
<tr>
<th>Class</th>
<th colspan="4">Descriptor</th>
</tr>
<tr>
<td rowspan="2"><code title="&quot;grayscale&quot;">'Grsc'</code></td>
<th>Key</th>
<th>Type</th>
<th>Value</th>
<th>Comments</th>
</tr>
<tr>
<td><code title="&quot;gray&quot;">'Gry&nbsp;'</code></td>
<td>Double</td>
<td>Gray</td>
<td>0% to 100%.</td>
</tr>
</table>

### HSB color object

<table>
<tr>
<th>Class</th>
<th colspan="4">Descriptor</th>
</tr>
<tr>
<td rowspan="4"><code title="&quot;HSBColorClass&quot;">'HSBC'</code></td>
<th>Key</th>
<th>Type</th>
<th>Value</th>
<th>Comments</th>
</tr>
<tr>
<td><code title="&quot;hue&quot;">'H&nbsp;&nbsp;&nbsp;'</code></td>
<td>Unit double</td>
<td>Hue (in <code title="&quot;angleUnit&quot;">'#Ang'</code> units)</td>
<td>0° to 360°.</td>
</tr>
<tr>
<td><code title="&quot;saturation&quot;">'Strt'</code></td>
<td>Double</td>
<td>Saturation</td>
<td>0% to 100%.</td>
</tr>
<tr>
<td><code title="&quot;brightness&quot;">'Brgh'</code></td>
<td>Double</td>
<td>Brightness</td>
<td>0% to 100%.</td>
</tr>
</table>

### Lab color object

<table>
<tr>
<th>Class</th>
<th colspan="4">Descriptor</th>
</tr>
<tr>
<td rowspan="4"><code title="&quot;labColor&quot;">'LbCl'</code></td>
<th>Key</th>
<th>Type</th>
<th>Value</th>
<th>Comments</th>
</tr>
<tr>
<td><code title="&quot;luminance&quot;">'Lmnc'</code></td>
<td>Double</td>
<td>Luminance</td>
<td>0 to 100.</td>
</tr>
<tr>
<td><code title="&quot;a&quot;">'A&nbsp;&nbsp;&nbsp;'</code></td>
<td>Double</td>
<td>A</td>
<td>-128 to 127.</td>
</tr>
<tr>
<td><code title="&quot;b&quot;">'B&nbsp;&nbsp;&nbsp;'</code></td>
<td>Double</td>
<td>B</td>
<td>-128 to 127.</td>
</tr>
</table>

### RGB color object

<table>
<tr>
<th>Class</th>
<th colspan="4">Descriptor</th>
</tr>
<tr>
<td rowspan="4"><code title="&quot;RGBColor&quot;">'RGBC'</code></td>
<th>Key</th>
<th>Type</th>
<th>Value</th>
<th>Comments</th>
</tr>
<tr>
<td><code title="&quot;red&quot;">'Rd&nbsp;&nbsp;'</code></td>
<td>Double</td>
<td>Red</td>
<td>0 to 255.</td>
</tr>
<tr>
<td><code title="&quot;green&quot;">'Grn&nbsp;'</code></td>
<td>Double</td>
<td>Green</td>
<td>0 to 255.</td>
</tr>
<tr>
<td><code title="&quot;blue&quot;">'Bl&nbsp;&nbsp;'</code></td>
<td>Double</td>
<td>Blue</td>
<td>0 to 255.</td>
</tr>
</table>

## Parsing gradients files

The utility script [Parse Gradients File](/Utility-Scripts/Parse-Gradients-File) (for Photoshop CS3 or later) is a practical example of parser written in JavaScript; it shows how to make use of the information contained in the present document to extract relevant data from the gradients file's main action descriptor; this utility script uses both the [JSON AM Data Format](/JSON-AM-Data-Format) and the [Gradient Object Simplified Format](/JSON-Simplified-Formats/Gradient-Object-Simplified-Format), but can be adapted to produce results into any other desired format through direct calls to appropriate ActionDescriptor and ActionList methods.

## Generating gradients files

The utility script [Generate Gradients File](/Utility-Scripts/Generate-Gradients-File) (for Photoshop CS3 or later) can be used to generate a gradients file from a JSON text file whose format is the same as the one returned by the above-mentioned script for parsing gradient files, i.e. consisting of an array of gradient objects in [Gradient Object Simplified Format](/JSON-Simplified-Formats/Gradient-Object-Simplified-Format).

---

Doc version: 2.7
<br>
Date: 2018-04-16
<br>
Copyright: © 2012-2018 Michel MARIANI
<br>
Disclaimer: this information is provided 'as is' without warranty of any kind, express or implied; use it at your own risk.
