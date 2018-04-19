[[HTML version](styles-file-format.html)]

# Photoshop Styles File Format

- [Contents](#contents)
- [File format](#file-format)
    - [Styles palette file](#styles-palette-file)
    - [Styles palette file header](#styles-palette-file-header)
    - [Styles file](#styles-file)
    - [Styles file header](#styles-file-header)
    - [Styles](#styles)
    - [Patterns](#patterns)
    - [Pattern](#pattern)
    - [Unicode string](#unicode-string)
    - [Pascal-style string](#pascal-style-string)
- [Style format](#style-format)
    - [Style](#style)
    - [Style identification](#style-identification)
    - [Style information](#style-information)
- [Document mode format](#document-mode-format)
    - [Document mode object](#document-mode-object)
- [Layer effects format](#layer-effects-format)
    - [Layer effects object](#layer-effects-object)
    - [Drop shadow object](#drop-shadow-object)
    - [Inner shadow object](#inner-shadow-object)
    - [Outer glow object](#outer-glow-object)
    - [Inner glow object](#inner-glow-object)
    - [Bevel emboss object](#bevel-emboss-object)
    - [Chrome FX object](#chrome-fx-object)
    - [Solid fill object](#solid-fill-object)
    - [Gradient fill object](#gradient-fill-object)
    - [Pattern fill object](#pattern-fill-object)
    - [Frame FX object](#frame-fx-object)
    - [Offset point object](#offset-point-object)
    - [Phase point object](#phase-point-object)
    - [Shaping curve object](#shaping-curve-object)
    - [Curve point object](#curve-point-object)
- [Blending options format](#blending-options-format)
    - [Blending options object](#blending-options-object)
    - [Blend range object](#blend-range-object)
    - [Channel reference](#channel-reference)
    - [Channels](#channels)
- [Color format](#color-format)
    - [Book color object](#book-color-object)
    - [CMYK color object](#cmyk-color-object)
    - [Grayscale object](#grayscale-object)
    - [HSB color object](#hsb-color-object)
    - [Lab color object](#lab-color-object)
    - [RGB color object](#rgb-color-object)
- [Gradient format](#gradient-format)
    - [Custom stops gradient object](#custom-stops-gradient-object)
        - [Color stop object](#color-stop-object)
        - [Transparency stop object](#transparency-stop-object)
    - [Color noise gradient object](#color-noise-gradient-object)
- [Pattern format](#pattern-format)
    - [Pattern object](#pattern-object)
- [Blend modes](#blend-modes)
- [Parsing styles files](#parsing-styles-files)

## Contents

This document provides information about the (undocumented yet) format of styles files in Photoshop.

**Note**: all multi-byte values, i.e., integer numbers (including C-style 4-character constants), floating-point (double) numbers, and Unicode characters are coded in [big-endian](https://en.wikipedia.org/wiki/Big-endian) format.

## File format

### Styles palette file

<table>
<tr>
<th>Name</th>
<th>Type</th>
<th>Kind</th>
<th>Description</th>
</tr>
<tr>
<td><code>Styles.psp</code></td>
<td><code>'8BPF'</code></td>
<td>Styles palette file</td>
<td>Adobe Photoshop preferences file containing all the styles listed in the Styles Palette.<br><strong>Warning</strong>: like most preferences files, the styles palette file is not updated in real-time: it is read by the application only once at start-up (launch) time and written back at shut-down (quit) time.</td>
</tr>
</table>

### Styles palette file header

<table>
<tr>
<th>Length&nbsp;(in&nbsp;bytes)</th>
<th>Description</th>
<th>Comments</th>
</tr>
<tr>
<td>Variable</td>
<td>Styles</td>
<td><a href="#styles">Styles</a> format.</td>
</tr>
</table>

### Styles file

<table>
<tr>
<th>Name</th>
<th>Type</th>
<th>Kind</th>
<th>Description</th>
</tr>
<tr>
<td><code>*.asl</code></td>
<td><code>'8BSL'</code></td>
<td>Styles file</td>
<td>Adobe Photoshop styles file; generally produced by saving a selected set of styles from the Preset Manager, or all styles from the Styles Palette.</td>
</tr>
</table>

### Styles file header

<table>
<tr>
<th>Length&nbsp;(in&nbsp;bytes)</th>
<th>Description</th>
<th>Comments</th>
</tr>
<tr>
<td>2</td>
<td>Styles&nbsp;file&nbsp;version (=&nbsp;2)</td>
<td>16-bit integer.</td>
</tr>
<tr>
<td>Variable</td>
<td>Styles</td>
<td><a href="#styles">Styles</a> format.</td>
</tr>
</table>

### Styles

<table>
<tr>
<th>Length&nbsp;(in&nbsp;bytes)</th>
<th>Description</th>
<th>Comments</th>
</tr>
<tr>
<td>4</td>
<td>Magic&nbsp;number (=&nbsp;<code>'8BSL'</code>)</td>
<td>C-style 4-character constant.</td>
</tr>
<tr>
<td>Variable</td>
<td>Set of embedded patterns</td>
<td><a href="#patterns">Patterns</a> format.</td>
</tr>
<tr>
<td>4</td>
<td>Number of styles</td>
<td>32-bit integer.</td>
</tr>
<tr>
<td>Variable</td>
<td>Sequence of styles</td>
<td>Each in <a href="#style">Style</a> format.</td>
</tr>
</table>

### Patterns

Set of patterns referenced by styles contained in the file, more precisely by three kinds of layer effects:

- Bevel and Emboss: Texture
- Pattern Overlay
- Stroke (Fill Type: Pattern)

<table>
<tr>
<th>Length&nbsp;(in&nbsp;bytes)</th>
<th>Description</th>
<th>Comments</th>
</tr>
<tr>
<td>2</td>
<td>Sub-version (=&nbsp;3)</td>
<td>16-bit integer.</td>
</tr>
<tr>
<td>4</td>
<td>Length (in bytes) of remaining patterns data</td>
<td>32-bit integer.</td>
</tr>
<tr>
<td>Variable</td>
<td>Sequence of patterns</td>
<td>Each in <a href="#pattern">Pattern</a> format.</td>
</tr>
</table>

### Pattern

<table>
<tr>
<th>Length&nbsp;(in&nbsp;bytes)</th>
<th>Description</th>
<th>Comments</th>
</tr>
<tr>
<td>4</td>
<td>Length (in bytes) of remaining pattern data</td>
<td>32-bit integer.</td>
</tr>
<tr>
<td>4</td>
<td>Pattern version (=&nbsp;1)</td>
<td>32-bit integer.</td>
</tr>
<tr>
<td>4</td>
<td>Image mode</td>
<td>
32-bit integer:
<ul>
<li>0 (Bitmap)</li>
<li>1 (Grayscale)</li>
<li>2 (Indexed)</li>
<li>3 (RGB)</li>
<li>4 (CMYK)</li>
<li>7 (Multichannel)</li>
<li>8 (Duotone)</li>
<li>9 (Lab)</li>
</ul>
</td>
</tr>
<tr>
<td>2</td>
<td>Pattern height</td>
<td>16-bit integer.</td>
</tr>
<tr>
<td>2</td>
<td>Pattern width</td>
<td>16-bit integer.</td>
</tr>
<tr>
<td>Variable</td>
<td>Pattern name</td>
<td><a href="#unicode-string">Unicode string</a> format.</td>
</tr>
<tr>
<td>1 + 36</td>
<td>Pattern ID (<a href="https://en.wikipedia.org/wiki/Universally_unique_identifier">UUID</a>)</td>
<td><a href="#pascal-style-string">Pascal-style string</a> format.</td>
</tr>
<tr>
<td>Variable</td>
<td>Image data</td>
<td>Image data format (opaque for the time being).</td>
</tr>
<tr>
<td>0 to 3</td>
<td>Extra null padding</td>
<td>The total number of bytes, i.e., the above-mentioned length of remaining pattern data plus the length of this padding, must be a multiple of 4.</td>
</tr>
</table>

Cf. [Additional Layer Information](https://www.adobe.com/devnet-apps/photoshop/fileformatashtml/PhotoshopFileFormats.htm#50577409_pgfId-1049436) of the page [Adobe Photoshop File Formats Specification](https://www.adobe.com/devnet-apps/photoshop/fileformatashtml/PhotoshopFileFormats.htm) for more details about the way patterns are stored in a Photoshop document.

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

### Pascal-style string

<table>
<tr>
<th>Length&nbsp;(in&nbsp;bytes)</th>
<th>Description</th>
<th>Comments</th>
</tr>
<tr>
<td>1</td>
<td>Number of characters</td>
<td>8-bit integer (unsigned).</td>
</tr>
<tr>
<td>Variable</td>
<td>String of characters</td>
<td>One byte per character; no terminating null.</td>
</tr>
</table>

## Style format

### Style

<table>
<tr>
<th>Length&nbsp;(in&nbsp;bytes)</th>
<th>Description</th>
<th>Comments</th>
</tr>
<tr>
<td>Variable</td>
<td>Style identification: name and ID</td>
<td><a href="#style-identification">Style identification</a> format.</td>
</tr>
<tr>
<td>Variable</td>
<td>Style information: document mode, layer effects, blending options</td>
<td><a href="#style-information">Style information</a> format.</td>
</tr>
</table>

Both style identification and style information are actually serialized action descriptors that match the serialized format expected by the `ActionDescriptor.fromStream` method (in JavaScript), or the `HandleToDescriptor` routine of the `ActionDescriptor` suite (in C/C++), i.e. prefixed by a 32-bit integer equal to 16. They will be described below by detailing the structure of their respective action descriptors.

### Style identification

<table>
<tr>
<th>Key</th>
<th>Type</th>
<th>Value</th>
<th>Comments</th>
</tr>
<tr>
<td><code title="&quot;name&quot;">'Nm&nbsp;&nbsp;'</code></td>
<td>String</td>
<td>Style name</td>
<td>Unicode string.</td>
</tr>
<tr>
<td><code title="&quot;ID&quot;">'Idnt'</code></td>
<td>String</td>
<td>Style ID (<a href="https://en.wikipedia.org/wiki/Universally_unique_identifier">UUID</a>)</td>
<td>Unicode string.</td>
</tr>
</table>

### Style information

<table>
<tr>
<th>Key</th>
<th>Type</th>
<th>Value</th>
<th>Comments</th>
</tr>
<tr>
<td><code title="No equivalent CharID">"documentMode"</code></td>
<td>Object</td>
<td>Document mode (color space and depth)</td>
<td><a href="#document-mode-object">Document mode object</a> format.</td>
</tr>
<tr>
<td><code title="&quot;layerEffects&quot;">'Lefx'</code></td>
<td>Object</td>
<td>Layer effects</td>
<td><a href="#layer-effects-object">Layer effects object</a> format.</td>
</tr>
<tr>
<td><code title="No equivalent CharID">"blendOptions"</code></td>
<td>Object</td>
<td>Blending options</td>
<td><a href="#blending-options-object">Blending options object</a> format.</td>
</tr>
</table>

## Document mode format

### Document mode object

<table>
<tr>
<th>Class</th>
<th colspan="4">Descriptor</th>
</tr>
<tr>
<td rowspan="3"><code title="No equivalent CharID">"documentMode"</code></td>
<th>Key</th>
<th>Type</th>
<th>Value</th>
<th>Comments</th>
</tr>
<tr>
<td><code title="&quot;colorSpace&quot;">'ClrS'</code></td>
<td>Enumerated</td>
<td>
Color space:
<ul>
<li><code title="&quot;colorSpace&quot;">'ClrS'</code>,&nbsp;<code title="&quot;CMYKColorEnum&quot;">'ECMY'</code></li>
<li><code title="&quot;colorSpace&quot;">'ClrS'</code>,&nbsp;<code title="&quot;grayScale&quot;">'Gryc'</code></li>
<li><code title="&quot;colorSpace&quot;">'ClrS'</code>,&nbsp;<code title="&quot;labColor&quot;">'LbCl'</code></li>
<li><code title="&quot;colorSpace&quot;">'ClrS'</code>,&nbsp;<code title="&quot;RGBColor&quot;">'RGBC'</code></li>
</ul>
</td>
<td>
Color Mode:
<ul>
<li>CMYK Color</li>
<li>Grayscale</li>
<li>Lab Color</li>
<li>RGB Color</li>
</ul>
</td>
</tr>
<tr>
<td><code title="&quot;depth&quot;">'Dpth'</code></td>
<td>Integer</td>
<td>Depth</td>
<td>8 or 16.</td>
</tr>
</table>

## Layer effects format

### Layer effects object

<table>
<tr>
<th>Class</th>
<th colspan="4">Descriptor</th>
</tr>
<tr>
<td rowspan="13"><code title="&quot;layerEffects&quot;">'Lefx'</code></td>
<th>Key</th>
<th>Type</th>
<th>Value</th>
<th>Comments</th>
</tr>
<tr>
<td><code title="&quot;scale&quot;">'Scl&nbsp;'</code></td>
<td>Unit double</td>
<td>Scale (in <code title="&quot;percentUnit&quot;">'#Prc'</code> units)</td>
<td>100% by default.</td>
</tr>
<tr>
<td><code title="No equivalent CharID">"masterFXSwitch"</code></td>
<td>Boolean</td>
<td>Master FX switch</td>
<td>Enable All Layer Effects.</td>
</tr>
<tr>
<td><code title="&quot;dropShadow&quot;">'DrSh'</code></td>
<td>Object</td>
<td>Drop shadow effect</td>
<td><a href="#drop-shadow-object">Drop shadow object</a> format.</td>
</tr>
<tr>
<td><code title="&quot;innerShadow&quot;">'IrSh'</code></td>
<td>Object</td>
<td>Inner shadow effect</td>
<td><a href="#inner-shadow-object">Inner shadow object</a> format.</td>
</tr>
<tr>
<td><code title="&quot;outerGlow&quot;">'OrGl'</code></td>
<td>Object</td>
<td>Outer glow effect</td>
<td><a href="#outer-glow-object">Outer glow object</a> format.</td>
</tr>
<tr>
<td><code title="&quot;innerGlow&quot;">'IrGl'</code></td>
<td>Object</td>
<td>Inner glow effect</td>
<td><a href="#inner-glow-object">Inner glow object</a> format.</td>
</tr>
<tr>
<td><code title="&quot;bevelEmboss&quot;">'ebbl'</code></td>
<td>Object</td>
<td>Bevel emboss (Bevel and Emboss) effect</td>
<td><a href="#bevel-emboss-object">Bevel emboss object</a> format.</td>
</tr>
<tr>
<td><code title="&quot;chromeFX&quot;">'ChFX'</code></td>
<td>Object</td>
<td>Chrome FX (Satin) effect</td>
<td><a href="#chrome-fx-object">Chrome FX object</a> format.</td>
</tr>
<tr>
<td><code title="&quot;solidFill&quot;">'SoFi'</code></td>
<td>Object</td>
<td>Solid fill (Color Overlay) effect</td>
<td><a href="#solid-fill-object">Solid fill object</a> format.</td>
</tr>
<tr>
<td><code title="&quot;gradientFill&quot;">'GrFl'</code></td>
<td>Object</td>
<td>Gradient fill (Gradient Overlay) effect</td>
<td><a href="#gradient-fill-object">Gradient fill object</a> format.</td>
</tr>
<tr>
<td><code title="No equivalent CharID">"patternFill"</code></td>
<td>Object</td>
<td>Pattern fill (Pattern Overlay) effect</td>
<td><a href="#pattern-fill-object">Pattern fill object</a> format.</td>
</tr>
<tr>
<td><code title="&quot;frameFX&quot;">'FrFX'</code></td>
<td>Object</td>
<td>Frame FX (Stroke) effect</td>
<td><a href="#frame-fx-object">Frame FX object</a> format.</td>
</tr>
</table>

### Drop shadow object

<table>
<tr>
<th>Class</th>
<th colspan="4">Descriptor</th>
</tr>
<tr>
<td rowspan="14"><code title="&quot;dropShadow&quot;">'DrSh'</code></td>
<th>Key</th>
<th>Type</th>
<th>Value</th>
<th>Comments</th>
</tr>
<tr>
<td><code title="&quot;enabled&quot;">'enab'</code></td>
<td>Boolean</td>
<td>Enabled</td>
<td>Apply Drop Shadow effect.</td>
</tr>
<tr>
<td><code title="&quot;mode&quot;">'Md&nbsp;&nbsp;'</code></td>
<td>Enumerated</td>
<td>Blend mode</td>
<td>Among <a href="#blend-modes">Blend modes</a></td>
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
Among:
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
<tr>
<td><code title="&quot;opacity&quot;">'Opct'</code></td>
<td>Unit double</td>
<td>Opacity (in <code title="&quot;percentUnit&quot;">'#Prc'</code> units)</td>
<td>0% to 100%.</td>
</tr>
<tr>
<td><code title="&quot;useGlobalAngle&quot;">'uglg'</code></td>
<td>Boolean</td>
<td>Use global angle</td>
<td>Use Global Light.</td>
</tr>
<tr>
<td><code title="&quot;localLightingAngle&quot;">'lagl'</code></td>
<td>Unit double</td>
<td>Local lighting angle (in <code title="&quot;angleUnit&quot;">'#Ang'</code> units)</td>
<td>Angle: -180° to 180°.</td>
</tr>
<tr>
<td><code title="&quot;distance&quot;">'Dstn'</code></td>
<td>Unit double</td>
<td>Distance (in <code title="&quot;pixelsUnit&quot;">'#Pxl'</code> units)</td>
<td>0 to 30000 pixels.</td>
</tr>
<tr>
<td><code title="&quot;chokeMatte&quot;">'Ckmt'</code></td>
<td>Unit double</td>
<td>Choke matte (in <code title="&quot;pixelsUnit&quot;">'#Pxl'</code> units)</td>
<td>Spread: 0 to 100.</td>
</tr>
<tr>
<td><code title="&quot;blur&quot;">'blur'</code></td>
<td>Unit double</td>
<td>Blur (in <code title="&quot;pixelsUnit&quot;">'#Pxl'</code> units)</td>
<td>Size: 0 to 250 pixels.</td>
</tr>
<tr>
<td><code title="&quot;noise&quot;">'Nose'</code></td>
<td>Unit double</td>
<td>Noise (in <code title="&quot;percentUnit&quot;">'#Prc'</code> units)</td>
<td>0% to 100%.</td>
</tr>
<tr>
<td><code title="&quot;antiAlias&quot;">'AntA'</code></td>
<td>Boolean</td>
<td>Anti-alias</td>
<td>Anti-Aliased.</td>
</tr>
<tr>
<td><code title="&quot;transparencyShape&quot;">'TrnS'</code></td>
<td>Object</td>
<td>Transparency shape (Contour)</td>
<td><a href="#shaping-curve-object">Shaping curve object</a> format.</td>
</tr>
<tr>
<td><code title="No equivalent CharID">"layerConceals"</code></td>
<td>Boolean</td>
<td>Layer conceals</td>
<td>Layer Knocks Out Drop Shadow.</td>
</tr>
</table>

### Inner shadow object

<table>
<tr>
<th>Class</th>
<th colspan="4">Descriptor</th>
</tr>
<tr>
<td rowspan="13"><code title="&quot;innerShadow&quot;">'IrSh'</code></td>
<th>Key</th>
<th>Type</th>
<th>Value</th>
<th>Comments</th>
</tr>
<tr>
<td><code title="&quot;enabled&quot;">'enab'</code></td>
<td>Boolean</td>
<td>Enabled</td>
<td>Apply Inner Shadow effect.</td>
</tr>
<tr>
<td><code title="&quot;mode&quot;">'Md&nbsp;&nbsp;'</code></td>
<td>Enumerated</td>
<td>Blend mode</td>
<td>Among <a href="#blend-modes">Blend modes</a></td>
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
Among:
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
<tr>
<td><code title="&quot;opacity&quot;">'Opct'</code></td>
<td>Unit double</td>
<td>Opacity (in <code title="&quot;percentUnit&quot;">'#Prc'</code> units)</td>
<td>0% to 100%.</td>
</tr>
<tr>
<td><code title="&quot;useGlobalAngle&quot;">'uglg'</code></td>
<td>Boolean</td>
<td>Use global angle</td>
<td>Use Global Light.</td>
</tr>
<tr>
<td><code title="&quot;localLightingAngle&quot;">'lagl'</code></td>
<td>Unit double</td>
<td>Local lighting angle (in <code title="&quot;angleUnit&quot;">'#Ang'</code> units)</td>
<td>Angle: -180° to 180°.</td>
</tr>
<tr>
<td><code title="&quot;distance&quot;">'Dstn'</code></td>
<td>Unit double</td>
<td>Distance (in <code title="&quot;pixelsUnit&quot;">'#Pxl'</code> units)</td>
<td>0 to 30000 pixels.</td>
</tr>
<tr>
<td><code title="&quot;chokeMatte&quot;">'Ckmt'</code></td>
<td>Unit double</td>
<td>Choke matte (in <code title="&quot;pixelsUnit&quot;">'#Pxl'</code> units)</td>
<td>Choke: 0 to 100.</td>
</tr>
<tr>
<td><code title="&quot;blur&quot;">'blur'</code></td>
<td>Unit double</td>
<td>Blur (in <code title="&quot;pixelsUnit&quot;">'#Pxl'</code> units)</td>
<td>Size: 0 to 250 pixels.</td>
</tr>
<tr>
<td><code title="&quot;noise&quot;">'Nose'</code></td>
<td>Unit double</td>
<td>Noise (in <code title="&quot;percentUnit&quot;">'#Prc'</code> units)</td>
<td>0% to 100%.</td>
</tr>
<tr>
<td><code title="&quot;antiAlias&quot;">'AntA'</code></td>
<td>Boolean</td>
<td>Anti-alias</td>
<td>Anti-Aliased.</td>
</tr>
<tr>
<td><code title="&quot;transparencyShape&quot;">'TrnS'</code></td>
<td>Object</td>
<td>Transparency shape (Contour)</td>
<td><a href="#shaping-curve-object">Shaping curve object</a> format.</td>
</tr>
</table>

### Outer glow object

<table>
<tr>
<th>Class</th>
<th colspan="4">Descriptor</th>
</tr>
<tr>
<td rowspan="14"><code title="&quot;outerGlow&quot;">'OrGl'</code></td>
<th>Key</th>
<th>Type</th>
<th>Value</th>
<th>Comments</th>
</tr>
<tr>
<td><code title="&quot;enabled&quot;">'enab'</code></td>
<td>Boolean</td>
<td>Enabled</td>
<td>Apply Outer Glow effect.</td>
</tr>
<tr>
<td><code title="&quot;mode&quot;">'Md&nbsp;&nbsp;'</code></td>
<td>Enumerated</td>
<td>Blend mode</td>
<td>Among <a href="#blend-modes">Blend modes</a></td>
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
Among:
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
<tr>
<td><code title="&quot;gradient&quot;">'Grad'</code></td>
<td>Object</td>
<td>Custom stops gradient object<br>or<br>Color noise gradient object</td>
<td><a href="#custom-stops-gradient-object">Custom stops gradient object</a> format<br>or<br><a href="#color-noise-gradient-object">Color noise gradient object</a> format.</td>
</tr>
<tr>
<td><code title="&quot;opacity&quot;">'Opct'</code></td>
<td>Unit double</td>
<td>Opacity (in <code title="&quot;percentUnit&quot;">'#Prc'</code> units)</td>
<td>0% to 100%.</td>
</tr>
<tr>
<td><code title="&quot;glowTechnique&quot;">'GlwT'</code></td>
<td>Enumerated</td>
<td>
Glow Technique:
<ul>
<li><code title="&quot;matteTechnique&quot;">'BETE'</code>,&nbsp;<code title="&quot;preciseMatte&quot;">'PrBL'</code></li>
<li><code title="&quot;matteTechnique&quot;">'BETE'</code>,&nbsp;<code title="&quot;softMatte&quot;">'SfBL'</code></li>
</ul>
</td>
<td>
Technique:
<ul>
<li>Precise</li>
<li>Softer</li>
</ul>
</td>
</tr>
<tr>
<td><code title="&quot;chokeMatte&quot;">'Ckmt'</code></td>
<td>Unit double</td>
<td>Choke matte (in <code title="&quot;pixelsUnit&quot;">'#Pxl'</code> units)</td>
<td>Spread: 0 to 100.</td>
</tr>
<tr>
<td><code title="&quot;blur&quot;">'blur'</code></td>
<td>Unit double</td>
<td>Blur (in <code title="&quot;pixelsUnit&quot;">'#Pxl'</code> units)</td>
<td>Size: 0 to 250 pixels.</td>
</tr>
<tr>
<td><code title="&quot;noise&quot;">'Nose'</code></td>
<td>Unit double</td>
<td>Noise (in <code title="&quot;percentUnit&quot;">'#Prc'</code> units)</td>
<td>0% to 100%.</td>
</tr>
<tr>
<td><code title="&quot;shadingNoise&quot;">'ShdN'</code></td>
<td>Unit double</td>
<td>Shading noise (in <code title="&quot;percentUnit&quot;">'#Prc'</code> units)</td>
<td>Jitter: 0% to 100%.</td>
</tr>
<tr>
<td><code title="&quot;antiAlias&quot;">'AntA'</code></td>
<td>Boolean</td>
<td>Anti-alias</td>
<td>Anti-Aliased.</td>
</tr>
<tr>
<td><code title="&quot;transparencyShape&quot;">'TrnS'</code></td>
<td>Object</td>
<td>Transparency shape (Contour)</td>
<td><a href="#shaping-curve-object">Shaping curve object</a> format.</td>
</tr>
<tr>
<td><code title="&quot;inputRange&quot;">'Inpr'</code></td>
<td>Unit double</td>
<td>Input range (in <code title="&quot;percentUnit&quot;">'#Prc'</code> units)</td>
<td>Range: 1% to 100%.</td>
</tr>
</table>

**Note**: Color (<code title="&quot;color&quot;">'Clr&nbsp;'</code>) and Gradient (<code title="&quot;gradient&quot;">'Grad'</code>) are mutually exclusive.

### Inner glow object

<table>
<tr>
<th>Class</th>
<th colspan="4">Descriptor</th>
</tr>
<tr>
<td rowspan="15"><code title="&quot;innerGlow&quot;">'IrGl'</code></td>
<th>Key</th>
<th>Type</th>
<th>Value</th>
<th>Comments</th>
</tr>
<tr>
<td><code title="&quot;enabled&quot;">'enab'</code></td>
<td>Boolean</td>
<td>Enabled</td>
<td>Apply Inner Glow effect.</td>
</tr>
<tr>
<td><code title="&quot;mode&quot;">'Md&nbsp;&nbsp;'</code></td>
<td>Enumerated</td>
<td>Blend mode</td>
<td>Among <a href="#blend-modes">Blend modes</a></td>
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
Among:
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
<tr>
<td><code title="&quot;gradient&quot;">'Grad'</code></td>
<td>Object</td>
<td>Custom stops gradient object<br>or<br>Color noise gradient object</td>
<td><a href="#custom-stops-gradient-object">Custom stops gradient object</a> format<br>or<br><a href="#color-noise-gradient-object">Color noise gradient object</a> format.</td>
</tr>
<tr>
<td><code title="&quot;opacity&quot;">'Opct'</code></td>
<td>Unit double</td>
<td>Opacity (in <code title="&quot;percentUnit&quot;">'#Prc'</code> units)</td>
<td>0% to 100%.</td>
</tr>
<tr>
<td><code title="&quot;glowTechnique&quot;">'GlwT'</code></td>
<td>Enumerated</td>
<td>
Glow Technique:
<ul>
<li><code title="&quot;matteTechnique&quot;">'BETE'</code>,&nbsp;<code title="&quot;preciseMatte&quot;">'PrBL'</code></li>
<li><code title="&quot;matteTechnique&quot;">'BETE'</code>,&nbsp;<code title="&quot;softMatte&quot;">'SfBL'</code></li>
</ul>
</td>
<td>
Technique:
<ul>
<li>Precise</li>
<li>Softer</li>
</ul>
</td>
</tr>
<tr>
<td><code title="&quot;chokeMatte&quot;">'Ckmt'</code></td>
<td>Unit double</td>
<td>Choke matte (in <code title="&quot;pixelsUnit&quot;">'#Pxl'</code> units)</td>
<td>Choke: 0 to 100.</td>
</tr>
<tr>
<td><code title="&quot;blur&quot;">'blur'</code></td>
<td>Unit double</td>
<td>Blur (in <code title="&quot;pixelsUnit&quot;">'#Pxl'</code> units)</td>
<td>Size: 0 to 250 pixels.</td>
</tr>
<tr>
<td><code title="&quot;shadingNoise&quot;">'ShdN'</code></td>
<td>Unit double</td>
<td>Shading noise (in <code title="&quot;percentUnit&quot;">'#Prc'</code> units)</td>
<td>Jitter: 0% to 100%.</td>
</tr>
<tr>
<td><code title="&quot;noise&quot;">'Nose'</code></td>
<td>Unit double</td>
<td>Noise (in <code title="&quot;percentUnit&quot;">'#Prc'</code> units)</td>
<td>0% to 100%.</td>
</tr>
<tr>
<td><code title="&quot;antiAlias&quot;">'AntA'</code></td>
<td>Boolean</td>
<td>Anti-alias</td>
<td>Anti-Aliased.</td>
</tr>
<tr>
<td><code title="&quot;innerGlowSource&quot;">'glwS'</code></td>
<td>Enumerated</td>
<td>
Inner glow source:
<ul>
<li><code title="&quot;innerGlowSourceType&quot;">'IGSr'</code>,&nbsp;<code title="&quot;centerGlow&quot;">'SrcC'</code></li>
<li><code title="&quot;innerGlowSourceType&quot;">'IGSr'</code>,&nbsp;<code title="&quot;edgeGlow&quot;">'SrcE'</code></li>
</ul>
</td>
<td>
Source:
<ul>
<li>Center</li>
<li>Edge</li>
</ul>
</td>
</tr>
<tr>
<td><code title="&quot;transparencyShape&quot;">'TrnS'</code></td>
<td>Object</td>
<td>Transparency shape (Contour)</td>
<td><a href="#shaping-curve-object">Shaping curve object</a> format.</td>
</tr>
<tr>
<td><code title="&quot;inputRange&quot;">'Inpr'</code></td>
<td>Unit double</td>
<td>Input range (in <code title="&quot;percentUnit&quot;">'#Prc'</code> units)</td>
<td>Range: 1% to 100%.</td>
</tr>
</table>

**Note**: Color (<code title="&quot;color&quot;">'Clr&nbsp;'</code>) and Gradient (<code title="&quot;gradient&quot;">'Grad'</code>) are mutually exclusive.

### Bevel emboss object

<table>
<tr>
<th>Class</th>
<th colspan="4">Descriptor</th>
</tr>
<tr>
<td rowspan="32"><code title="&quot;bevelEmboss&quot;">'ebbl'</code></td>
<th>Key</th>
<th>Type</th>
<th>Value</th>
<th>Comments</th>
</tr>
<tr>
<td><code title="&quot;enabled&quot;">'enab'</code></td>
<td>Boolean</td>
<td>Enabled</td>
<td>Apply Bevel and Emboss effect.</td>
</tr>
<tr>
<td><code title="&quot;highlightMode&quot;">'hglM'</code></td>
<td>Enumerated</td>
<td>Highlight blend mode</td>
<td>Among <a href="#blend-modes">Blend modes</a></td>
</tr>
<tr>
<td><code title="&quot;highlightColor&quot;">'hglC'</code></td>
<td>Object</td>
<td>
Highlight color object:
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
Among:
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
<tr>
<td><code title="&quot;highlightOpacity&quot;">'hglO'</code></td>
<td>Unit double</td>
<td>Highlight opacity (in <code title="&quot;percentUnit&quot;">'#Prc'</code> units)</td>
<td>0% to 100%.</td>
</tr>
<tr>
<td><code title="&quot;shadowMode&quot;">'sdwM'</code></td>
<td>Enumerated</td>
<td>Shadow blend mode</td>
<td>Among <a href="#blend-modes">Blend modes</a></td>
</tr>
<tr>
<td><code title="&quot;shadowColor&quot;">'sdwC'</code></td>
<td>Object</td>
<td>
Shadow color object:
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
Among:
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
<tr>
<td><code title="&quot;shadowOpacity&quot;">'sdwO'</code></td>
<td>Unit double</td>
<td>Shadow opacity (in <code title="&quot;percentUnit&quot;">'#Prc'</code> units)</td>
<td>0% to 100%.</td>
</tr>
<tr>
<td><code title="&quot;bevelTechnique&quot;">'bvlT'</code></td>
<td>Enumerated</td>
<td>
Bevel Technique:
<ul>
<li><code title="&quot;bevelTechnique&quot;">'bvlT'</code>,&nbsp;<code title="&quot;softMatte&quot;">'SfBL'</code></li>
<li><code title="&quot;bevelTechnique&quot;">'bvlT'</code>,&nbsp;<code title="&quot;preciseMatte&quot;">'PrBL'</code></li>
<li><code title="&quot;bevelTechnique&quot;">'bvlT'</code>,&nbsp;<code title="&quot;slopeLimitMatte&quot;">'Slmt'</code></li>
</ul>
</td>
<td>
Technique:
<ul>
<li>Smooth</li>
<li>Chisel Hard</li>
<li>Chisel Soft</li>
</ul>
</td>
</tr>
<tr>
<td><code title="&quot;bevelStyle&quot;">'bvlS'</code></td>
<td>Enumerated</td>
<td>
Bevel style:
<ul>
<li><code title="&quot;bevelEmbossStyle&quot;">'BESl'</code>,&nbsp;<code title="&quot;outerBevel&quot;">'OtrB'</code></li>
<li><code title="&quot;bevelEmbossStyle&quot;">'BESl'</code>,&nbsp;<code title="&quot;innerBevel&quot;">'InrB'</code></li>
<li><code title="&quot;bevelEmbossStyle&quot;">'BESl'</code>,&nbsp;<code title="&quot;emboss&quot;">'Embs'</code></li>
<li><code title="&quot;bevelEmbossStyle&quot;">'BESl'</code>,&nbsp;<code title="&quot;pillowEmboss&quot;">'PlEb'</code></li>
<li><code title="&quot;bevelEmbossStyle&quot;">'BESl'</code>,&nbsp;<code title="No equivalent CharID">"strokeEmboss"</code></li>
</ul>
</td>
<td>
Style:
<ul>
<li>Outer Bevel</li>
<li>Inner Bevel</li>
<li>Emboss</li>
<li>Pillow Emboss</li>
<li>Stroke Emboss</li>
</ul>
</td>
</tr>
<tr>
<td><code title="&quot;useGlobalAngle&quot;">'uglg'</code></td>
<td>Boolean</td>
<td>Use global angle</td>
<td>Use Global Light.</td>
</tr>
<tr>
<td><code title="&quot;localLightingAngle&quot;">'lagl'</code></td>
<td>Unit double</td>
<td>Local lighting angle (in <code title="&quot;angleUnit&quot;">'#Ang'</code> units)</td>
<td>Angle: -180° to 180°.</td>
</tr>
<tr>
<td><code title="&quot;localLightingAltitude&quot;">'Lald'</code></td>
<td>Unit double</td>
<td>Local lighting altitude (in <code title="&quot;angleUnit&quot;">'#Ang'</code> units)</td>
<td>Altitude: 0° to 90°.</td>
</tr>
<tr>
<td><code title="&quot;strengthRatio&quot;">'srgR'</code></td>
<td>Unit double</td>
<td>Strength ratio (in <code title="&quot;percentUnit&quot;">'#Prc'</code> units)</td>
<td>Depth: 1% to 1000%.</td>
</tr>
<tr>
<td><code title="&quot;blur&quot;">'blur'</code></td>
<td>Unit double</td>
<td>Blur (in <code title="&quot;pixelsUnit&quot;">'#Pxl'</code> units)</td>
<td>Size: 0 to 250 pixels.</td>
</tr>
<tr>
<td><code title="&quot;bevelDirection&quot;">'bvlD'</code></td>
<td>Enumerated</td>
<td>
Bevel direction:
<ul>
<li><code title="&quot;bevelEmbossStampStyle&quot;">'BESs'</code>,&nbsp;<code title="&quot;stampIn&quot;">'In&nbsp;&nbsp;'</code></li>
<li><code title="&quot;bevelEmbossStampStyle&quot;">'BESs'</code>,&nbsp;<code title="&quot;stampOut&quot;">'Out&nbsp;'</code></li>
</ul>
</td>
<td>
Direction:
<ul>
<li>Up</li>
<li>Down</li>
</ul>
</td>
</tr>
<tr>
<td><code title="&quot;transparencyShape&quot;">'TrnS'</code></td>
<td>Object</td>
<td>Transparency shape (Gloss Contour)</td>
<td><a href="#shaping-curve-object">Shaping curve object</a> format.</td>
</tr>
<tr>
<td><code title="No equivalent CharID">"antialiasGloss"</code></td>
<td>Boolean</td>
<td>Anti-alias gloss</td>
<td>Anti-Aliased.</td>
</tr>
<tr>
<td><code title="&quot;softness&quot;">'Sftn'</code></td>
<td>Unit double</td>
<td>Softness (in <code title="&quot;pixelsUnit&quot;">'#Pxl'</code> units)</td>
<td>Soften: 1 to 16 pixels.</td>
</tr>
<tr>
<td colspan="4" style="text-align: center;">Only if "useShape" is true:</td>
</tr>
<tr>
<td><code title="No equivalent CharID">"useShape"</code></td>
<td>Boolean</td>
<td>Use shape</td>
<td>Apply Contour.</td>
</tr>
<tr>
<td><code title="&quot;mappingShape&quot;">'MpgS'</code></td>
<td>Object</td>
<td>Mapping shape (Contour)</td>
<td><a href="#shaping-curve-object">Shaping curve object</a> format.</td>
</tr>
<tr>
<td><code title="&quot;antiAlias&quot;">'AntA'</code></td>
<td>Boolean</td>
<td>Anti-alias</td>
<td>Anti-Aliased.</td>
</tr>
<tr>
<td><code title="&quot;inputRange&quot;">'Inpr'</code></td>
<td>Unit double</td>
<td>Input range (in <code title="&quot;percentUnit&quot;">'#Prc'</code> units)</td>
<td>Range: 0% to 100%.</td>
</tr>
<tr>
<td colspan="4" style="text-align: center;">Only if "useTexture" is true:</td>
</tr>
<tr>
<td><code title="No equivalent CharID">"useTexture"</code></td>
<td>Boolean</td>
<td>Use texture</td>
<td>Apply Texture.</td>
</tr>
<tr>
<td><code title="&quot;invertTexture&quot;">'InvT'</code></td>
<td>Boolean</td>
<td>Invert texture</td>
<td>Invert.</td>
</tr>
<tr>
<td><code title="&quot;align&quot;">'Algn'</code></td>
<td>Boolean</td>
<td>Align</td>
<td>Link with Layer.</td>
</tr>
<tr>
<td><code title="&quot;scale&quot;">'Scl&nbsp;'</code></td>
<td>Unit double</td>
<td>Scale (in <code title="&quot;percentUnit&quot;">'#Prc'</code> units)</td>
<td>1% to 1000%.</td>
</tr>
<tr>
<td><code title="No equivalent CharID">"textureDepth"</code></td>
<td>Unit double</td>
<td>Texture depth (in <code title="&quot;percentUnit&quot;">'#Prc'</code> units)</td>
<td>Depth: -1000% to +1000%.</td>
</tr>
<tr>
<td><code title="&quot;pattern&quot;">'Ptrn'</code></td>
<td>Object</td>
<td>Pattern</td>
<td><a href="#pattern-object">Pattern object</a> format.</td>
</tr>
<tr>
<td><code title="No equivalent CharID">"phase"</code></td>
<td>Object</td>
<td>Phase (Snap to Origin, or drag to position with mouse down)</td>
<td><a href="#phase-point-object">Phase point object</a> format.</td>
</tr>
</table>

### Chrome FX object

<table>
<tr>
<th>Class</th>
<th colspan="4">Descriptor</th>
</tr>
<tr>
<td rowspan="11"><code title="&quot;chromeFX&quot;">'ChFX'</code></td>
<th>Key</th>
<th>Type</th>
<th>Value</th>
<th>Comments</th>
</tr>
<tr>
<td><code title="&quot;enabled&quot;">'enab'</code></td>
<td>Boolean</td>
<td>Enabled</td>
<td>Apply Satin effect.</td>
</tr>
<tr>
<td><code title="&quot;mode&quot;">'Md&nbsp;&nbsp;'</code></td>
<td>Enumerated</td>
<td>Blend mode</td>
<td>Among <a href="#blend-modes">Blend modes</a></td>
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
Among:
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
<tr>
<td><code title="&quot;antiAlias&quot;">'AntA'</code></td>
<td>Boolean</td>
<td>Anti-alias</td>
<td>Anti-Aliased.</td>
</tr>
<tr>
<td><code title="&quot;invert&quot;">'Invr'</code></td>
<td>Boolean</td>
<td>Invert</td>
<td>Reverse effect.</td>
</tr>
<tr>
<td><code title="&quot;opacity&quot;">'Opct'</code></td>
<td>Unit double</td>
<td>Opacity (in <code title="&quot;percentUnit&quot;">'#Prc'</code> units)</td>
<td>0% to 100%.</td>
</tr>
<tr>
<td><code title="&quot;localLightingAngle&quot;">'lagl'</code></td>
<td>Unit double</td>
<td>Local lighting angle (in <code title="&quot;angleUnit&quot;">'#Ang'</code> units)</td>
<td>Angle: -180° to 180°.</td>
</tr>
<tr>
<td><code title="&quot;distance&quot;">'Dstn'</code></td>
<td>Unit double</td>
<td>Distance (in <code title="&quot;pixelsUnit&quot;">'#Pxl'</code> units)</td>
<td>1 to 250 pixels.</td>
</tr>
<tr>
<td><code title="&quot;blur&quot;">'blur'</code></td>
<td>Unit double</td>
<td>Blur (in <code title="&quot;pixelsUnit&quot;">'#Pxl'</code> units)</td>
<td>Size: 0 to 250 pixels.</td>
</tr>
<tr>
<td><code title="&quot;mappingShape&quot;">'MpgS'</code></td>
<td>Object</td>
<td>Mapping shape (Contour)</td>
<td><a href="#shaping-curve-object">Shaping curve object</a> format.</td>
</tr>
</table>

### Solid fill object

<table>
<tr>
<th>Class</th>
<th colspan="4">Descriptor</th>
</tr>
<tr>
<td rowspan="5"><code title="&quot;solidFill&quot;">'SoFi'</code></td>
<th>Key</th>
<th>Type</th>
<th>Value</th>
<th>Comments</th>
</tr>
<tr>
<td><code title="&quot;enabled&quot;">'enab'</code></td>
<td>Boolean</td>
<td>Enabled</td>
<td>Apply Color Overlay effect.</td>
</tr>
<tr>
<td><code title="&quot;mode&quot;">'Md&nbsp;&nbsp;'</code></td>
<td>Enumerated</td>
<td>Blend mode</td>
<td>Among <a href="#blend-modes">Blend modes</a></td>
</tr>
<tr>
<td><code title="&quot;opacity&quot;">'Opct'</code></td>
<td>Unit double</td>
<td>Opacity (in <code title="&quot;percentUnit&quot;">'#Prc'</code> units)</td>
<td>0% to 100%.</td>
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
Among:
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

### Gradient fill object

<table>
<tr>
<th>Class</th>
<th colspan="4">Descriptor</th>
</tr>
<tr>
<td rowspan="12"><code title="&quot;gradientFill&quot;">'GrFl'</code></td>
<th>Key</th>
<th>Type</th>
<th>Value</th>
<th>Comments</th>
</tr>
<tr>
<td><code title="&quot;enabled&quot;">'enab'</code></td>
<td>Boolean</td>
<td>Enabled</td>
<td>Apply Gradient Overlay effect.</td>
</tr>
<tr>
<td><code title="&quot;mode&quot;">'Md&nbsp;&nbsp;'</code></td>
<td>Enumerated</td>
<td>Blend mode</td>
<td>Among <a href="#blend-modes">Blend modes</a></td>
</tr>
<tr>
<td><code title="&quot;opacity&quot;">'Opct'</code></td>
<td>Unit double</td>
<td>Opacity (in <code title="&quot;percentUnit&quot;">'#Prc'</code> units)</td>
<td>0% to 100%.</td>
</tr>
<tr>
<td><code title="&quot;gradient&quot;">'Grad'</code></td>
<td>Object</td>
<td>Custom stops gradient object<br>or<br>Color noise gradient object</td>
<td><a href="#custom-stops-gradient-object">Custom stops gradient object</a> format<br>or<br><a href="#color-noise-gradient-object">Color noise gradient object</a> format.</td>
</tr>
<tr>
<td><code title="&quot;angle&quot;">'Angl'</code></td>
<td>Unit double</td>
<td>Angle (in <code title="&quot;angleUnit&quot;">'#Ang'</code> units)</td>
<td>-180° to 180°.</td>
</tr>
<tr>
<td><code title="&quot;type&quot;">'Type'</code></td>
<td>Enumerated</td>
<td>
Type:
<ul>
<li><code title="&quot;gradientType&quot;">'GrdT'</code>,&nbsp;<code title="&quot;linear&quot;">'Lnr&nbsp;'</code></li>
<li><code title="&quot;gradientType&quot;">'GrdT'</code>,&nbsp;<code title="&quot;radial&quot;">'Rdl&nbsp;'</code></li>
<li><code title="&quot;gradientType&quot;">'GrdT'</code>,&nbsp;<code title="&quot;angle&quot;">'Angl'</code></li>
<li><code title="&quot;gradientType&quot;">'GrdT'</code>,&nbsp;<code title="&quot;reflected&quot;">'Rflc'</code></li>
<li><code title="&quot;gradientType&quot;">'GrdT'</code>,&nbsp;<code title="&quot;diamond&quot;">'Dmnd'</code></li>
</ul>
</td>
<td>
Style:
<ul>
<li>Linear</li>
<li>Radial</li>
<li>Angle</li>
<li>Reflected</li>
<li>Diamond</li>
</ul>
</td>
</tr>
<tr>
<td><code title="&quot;reverse&quot;">'Rvrs'</code></td>
<td>Boolean</td>
<td>Reverse</td>
<td>Reverse direction of gradient.</td>
</tr>
<tr>
<td><code title="&quot;align&quot;">'Algn'</code></td>
<td>Boolean</td>
<td>Align</td>
<td>Align with Layer.</td>
</tr>
<tr>
<td><code title="&quot;scale&quot;">'Scl&nbsp;'</code></td>
<td>Unit double</td>
<td>Scale (in <code title="&quot;percentUnit&quot;">'#Prc'</code> units)</td>
<td>10% to 150%.</td>
</tr>
<tr>
<td><code title="&quot;offset&quot;">'Ofst'</code></td>
<td>Object</td>
<td>Offset (drag to position with mouse down)</td>
<td><a href="#offset-point-object">Offset point object</a> format.</td>
</tr>
<tr>
<td><code title="&quot;dither&quot;">'Dthr'</code></td>
<td>Boolean</td>
<td>Dither</td>
<td>Only from CS6.</td>
</tr>
</table>

### Pattern fill object

<table>
<tr>
<th>Class</th>
<th colspan="4">Descriptor</th>
</tr>
<tr>
<td rowspan="8"><code title="No equivalent CharID">"patternFill"</code></td>
<th>Key</th>
<th>Type</th>
<th>Value</th>
<th>Comments</th>
</tr>
<tr>
<td><code title="&quot;enabled&quot;">'enab'</code></td>
<td>Boolean</td>
<td>Enabled</td>
<td>Apply Pattern Overlay effect.</td>
</tr>
<tr>
<td><code title="&quot;mode&quot;">'Md&nbsp;&nbsp;'</code></td>
<td>Enumerated</td>
<td>Blend mode</td>
<td>Among <a href="#blend-modes">Blend modes</a></td>
</tr>
<tr>
<td><code title="&quot;opacity&quot;">'Opct'</code></td>
<td>Unit double</td>
<td>Opacity (in <code title="&quot;percentUnit&quot;">'#Prc'</code> units)</td>
<td>0% to 100%.</td>
</tr>
<tr>
<td><code title="&quot;pattern&quot;">'Ptrn'</code></td>
<td>Object</td>
<td>Pattern</td>
<td><a href="#pattern-object">Pattern object</a> format.</td>
</tr>
<tr>
<td><code title="&quot;scale&quot;">'Scl&nbsp;'</code></td>
<td>Unit double</td>
<td>Scale (in <code title="&quot;percentUnit&quot;">'#Prc'</code> units)</td>
<td>1% to 1000%.</td>
</tr>
<tr>
<td><code title="&quot;align&quot;">'Algn'</code></td>
<td>Boolean</td>
<td>Align</td>
<td>Link with Layer.</td>
</tr>
<tr>
<td><code title="No equivalent CharID">"phase"</code></td>
<td>Object</td>
<td>Phase (Snap to Origin, or drag to position with mouse down)</td>
<td><a href="#phase-point-object">Phase point object</a> format.</td>
</tr>
</table>

### Frame FX object

<table>
<tr>
<th>Class</th>
<th colspan="4">Descriptor</th>
</tr>
<tr>
<td rowspan="23"><code title="&quot;frameFX&quot;">'FrFX'</code></td>
<th>Key</th>
<th>Type</th>
<th>Value</th>
<th>Comments</th>
</tr>
<tr>
<td><code title="&quot;enabled&quot;">'enab'</code></td>
<td>Boolean</td>
<td>Enabled</td>
<td>Apply Stroke effect.</td>
</tr>
<tr>
<td><code title="&quot;style&quot;">'Styl'</code></td>
<td>Enumerated</td>
<td>
Style:
<ul>
<li><code title="&quot;frameStyle&quot;">'FStl'</code>,&nbsp;<code title="&quot;outsetFrame&quot;">'OutF'</code></li>
<li><code title="&quot;frameStyle&quot;">'FStl'</code>,&nbsp;<code title="&quot;insetFrame&quot;">'InsF'</code></li>
<li><code title="&quot;frameStyle&quot;">'FStl'</code>,&nbsp;<code title="&quot;centeredFrame&quot;">'CtrF'</code></li>
</ul>
</td>
<td>
Position:
<ul>
<li>Outside</li>
<li>Inside</li>
<li>Center</li>
</ul>
</td>
</tr>
<tr>
<td><code title="&quot;paintType&quot;">'PntT'</code></td>
<td>Enumerated</td>
<td>
Paint type:
<ul>
<li><code title="&quot;frameFill&quot;">'FrFl'</code>,&nbsp;<code title="&quot;solidColor&quot;">'SClr'</code></li>
<li><code title="&quot;frameFill&quot;">'FrFl'</code>,&nbsp;<code title="&quot;gradientFill&quot;">'GrFl'</code></li>
<li><code title="&quot;frameFill&quot;">'FrFl'</code>,&nbsp;<code title="&quot;pattern&quot;">'Ptrn'</code></li>
</ul>
</td>
<td>
Fill Type:
<ul>
<li>Color</li>
<li>Gradient</li>
<li>Pattern</li>
</ul>
</td>
</tr>
<tr>
<td><code title="&quot;mode&quot;">'Md&nbsp;&nbsp;'</code></td>
<td>Enumerated</td>
<td>Blend mode</td>
<td>Among <a href="#blend-modes">Blend modes</a></td>
</tr>
<tr>
<td><code title="&quot;opacity&quot;">'Opct'</code></td>
<td>Unit double</td>
<td>Opacity (in <code title="&quot;percentUnit&quot;">'#Prc'</code> units)</td>
<td>0% to 100%.</td>
</tr>
<tr>
<td><code title="&quot;size&quot;">'Sz&nbsp;&nbsp;'</code></td>
<td>Unit double</td>
<td>Size (in <code title="&quot;pixelsUnit&quot;">'#Pxl'</code> units)</td>
<td>1 to 250 pixels.</td>
</tr>
<tr>
<td colspan="4" style="text-align: center;">Color Fill Type only:</td>
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
Among:
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
<tr>
<td colspan="4" style="text-align: center;">Gradient Fill Type only:</td>
</tr>
<tr>
<td><code title="&quot;gradient&quot;">'Grad'</code></td>
<td>Object</td>
<td>Custom stops gradient object<br>or<br>Color noise gradient object</td>
<td><a href="#custom-stops-gradient-object">Custom stops gradient object</a> format<br>or<br><a href="#color-noise-gradient-object">Color noise gradient object</a> format.</td>
</tr>
<tr>
<td><code title="&quot;angle&quot;">'Angl'</code></td>
<td>Unit double</td>
<td>Angle (in <code title="&quot;angleUnit&quot;">'#Ang'</code> units)</td>
<td>-180° to 180°.</td>
</tr>
<tr>
<td><code title="&quot;type&quot;">'Type'</code></td>
<td>Enumerated</td>
<td>
Type:
<ul>
<li><code title="&quot;gradientType&quot;">'GrdT'</code>,&nbsp;<code title="&quot;linear&quot;">'Lnr&nbsp;'</code></li>
<li><code title="&quot;gradientType&quot;">'GrdT'</code>,&nbsp;<code title="&quot;radial&quot;">'Rdl&nbsp;'</code></li>
<li><code title="&quot;gradientType&quot;">'GrdT'</code>,&nbsp;<code title="&quot;angle&quot;">'Angl'</code></li>
<li><code title="&quot;gradientType&quot;">'GrdT'</code>,&nbsp;<code title="&quot;reflected&quot;">'Rflc'</code></li>
<li><code title="&quot;gradientType&quot;">'GrdT'</code>,&nbsp;<code title="&quot;diamond&quot;">'Dmnd'</code></li>
<li><code title="&quot;gradientType&quot;">'GrdT'</code>,&nbsp;<code title="No equivalent CharID">"shapeburst"</code></li>
</ul>
</td>
<td>
Style:
<ul>
<li>Linear</li>
<li>Radial</li>
<li>Angle</li>
<li>Reflected</li>
<li>Diamond</li>
<li>Shape Burst</li>
</ul>
</td>
</tr>
<tr>
<td><code title="&quot;reverse&quot;">'Rvrs'</code></td>
<td>Boolean</td>
<td>Reverse</td>
<td>Reverse direction of gradient.</td>
</tr>
<tr>
<td><code title="&quot;scale&quot;">'Scl&nbsp;'</code></td>
<td>Unit double</td>
<td>Scale (in <code title="&quot;percentUnit&quot;">'#Prc'</code> units)</td>
<td>10% to 150%.</td>
</tr>
<tr>
<td><code title="&quot;align&quot;">'Algn'</code></td>
<td>Boolean</td>
<td>Align</td>
<td>Align with Layer.</td>
</tr>
<tr>
<td><code title="&quot;offset&quot;">'Ofst'</code></td>
<td>Object</td>
<td>Offset (drag to position with mouse down)</td>
<td><a href="#offset-point-object">Offset point object</a> format.</td>
</tr>
<tr>
<td><code title="&quot;dither&quot;">'Dthr'</code></td>
<td>Boolean</td>
<td>Dither</td>
<td>Only from CS6.</td>
</tr>
<tr>
<td colspan="4" style="text-align: center;">Pattern Fill Type only:</td>
</tr>
<tr>
<td><code title="&quot;pattern&quot;">'Ptrn'</code></td>
<td>Object</td>
<td>Pattern</td>
<td><a href="#pattern-object">Pattern object</a> format.</td>
</tr>
<tr>
<td><code title="&quot;scale&quot;">'Scl&nbsp;'</code></td>
<td>Unit double</td>
<td>Scale (in <code title="&quot;percentUnit&quot;">'#Prc'</code> units)</td>
<td>1% to 1000%.</td>
</tr>
<tr>
<td><code title="&quot;linked&quot;">'Lnkd'</code></td>
<td>Boolean</td>
<td>Linked</td>
<td>Link with Layer.</td>
</tr>
<tr>
<td><code title="No equivalent CharID">"phase"</code></td>
<td>Object</td>
<td>Phase (Snap to Origin, or drag to position with mouse down)</td>
<td><a href="#phase-point-object">Phase point object</a> format.</td>
</tr>
</table>

### Offset point object

<table>
<tr>
<th>Class</th>
<th colspan="4">Descriptor</th>
</tr>
<tr>
<td rowspan="3"><code title="&quot;point&quot;">'Pnt&nbsp;'</code></td>
<th>Key</th>
<th>Type</th>
<th>Value</th>
<th>Comments</th>
</tr>
<tr>
<td><code title="&quot;horizontal&quot;">'Hrzn'</code></td>
<td>Unit double</td>
<td>Horizontal (in <code title="&quot;percentUnit&quot;">'#Prc'</code> units)</td>
<td>Horizontal offset.</td>
</tr>
<tr>
<td><code title="&quot;vertical&quot;">'Vrtc'</code></td>
<td>Unit double</td>
<td>Vertical (in <code title="&quot;percentUnit&quot;">'#Prc'</code> units)</td>
<td>Vertical offset.</td>
</tr>
</table>

### Phase point object

<table>
<tr>
<th>Class</th>
<th colspan="4">Descriptor</th>
</tr>
<tr>
<td rowspan="3"><code title="&quot;point&quot;">'Pnt&nbsp;'</code></td>
<th>Key</th>
<th>Type</th>
<th>Value</th>
<th>Comments</th>
</tr>
<tr>
<td><code title="&quot;horizontal&quot;">'Hrzn'</code></td>
<td>Double</td>
<td>Horizontal</td>
<td>Horizontal phase.</td>
</tr>
<tr>
<td><code title="&quot;vertical&quot;">'Vrtc'</code></td>
<td>Double</td>
<td>Vertical</td>
<td>Vertical phase.</td>
</tr>
</table>

### Shaping curve object

<table>
<tr>
<th>Class</th>
<th colspan="4">Descriptor</th>
</tr>
<tr>
<td rowspan="3"><code title="&quot;shapingCurve&quot;">'ShpC'</code></td>
<th>Key</th>
<th>Type</th>
<th>Value</th>
<th>Comments</th>
</tr>
<tr>
<td><code title="&quot;name&quot;">'Nm&nbsp;&nbsp;'</code></td>
<td>String</td>
<td>Name</td>
<td>Contour name.</td>
</tr>
<tr>
<td><code title="&quot;curve&quot;">'Crv&nbsp;'</code></td>
<td>List</td>
<td>List of curve points</td>
<td>Each in <a href="#curve-point-object">Curve point object</a> format.</td>
</tr>
</table>

### Curve point object

<table>
<tr>
<th>Class</th>
<th colspan="4">Descriptor</th>
</tr>
<tr>
<td rowspan="4"><code title="&quot;curvePoint&quot;">'CrPt'</code></td>
<th>Key</th>
<th>Type</th>
<th>Value</th>
<th>Comments</th>
</tr>
<tr>
<td><code title="&quot;horizontal&quot;">'Hrzn'</code></td>
<td>Double</td>
<td>Horizontal</td>
<td>0 to 255.</td>
</tr>
<tr>
<td><code title="&quot;vertical&quot;">'Vrtc'</code></td>
<td>Double</td>
<td>Vertical</td>
<td>0 to 255.</td>
</tr>
<tr>
<td><code title="&quot;continuity&quot;">'Cnty'</code></td>
<td>Boolean</td>
<td>Continuity</td>
<td>Non-Corner (true by default).</td>
</tr>
</table>

## Blending options format

### Blending options object

<table>
<tr>
<th>Class</th>
<th colspan="4">Descriptor</th>
</tr>
<tr>
<td rowspan="12"><code title="No equivalent CharID">"blendOptions"</code></td>
<th>Key</th>
<th>Type</th>
<th>Value</th>
<th>Comments</th>
</tr>
<tr>
<td><code title="&quot;opacity&quot;">'Opct'</code></td>
<td>Unit double</td>
<td>Opacity (in <code title="&quot;percentUnit&quot;">'#Prc'</code> units)</td>
<td>0% to 100%.</td>
</tr>
<tr>
<td><code title="&quot;mode&quot;">'Md&nbsp;&nbsp;'</code></td>
<td>Enumerated</td>
<td>Blend mode</td>
<td>Among <a href="#blend-modes">Blend modes</a></td>
</tr>
<tr>
<td><code title="No equivalent CharID">"fillOpacity"</code></td>
<td>Unit double</td>
<td>Fill opacity (in <code title="&quot;percentUnit&quot;">'#Prc'</code> units)</td>
<td>0% to 100%.</td>
</tr>
<tr>
<td><code title="No equivalent CharID">"blendClipped"</code></td>
<td>Boolean</td>
<td>Blend clipped</td>
<td>Blend Clipped Effects as Group</td>
</tr>
<tr>
<td><code title="No equivalent CharID">"blendInterior"</code></td>
<td>Boolean</td>
<td>Blend interior</td>
<td>Blend Interior Effects as Group</td>
</tr>
<tr>
<td><code title="No equivalent CharID">"knockout"</code></td>
<td>Enumerated</td>
<td>
Knockout:
<ul>
<li><code title="No equivalent CharID">"knockout"</code>,&nbsp;<code title="&quot;none&quot;">'None'</code></li>
<li><code title="No equivalent CharID">"knockout"</code>,&nbsp;<code title="No equivalent CharID">"shallow"</code></li>
<li><code title="No equivalent CharID">"knockout"</code>,&nbsp;<code title="No equivalent CharID">"deep"</code></li>
</ul>
</td>
<td>
Knockout:
<ul>
<li>None</li>
<li>Shallow</li>
<li>Deep</li>
</ul>
</td>
</tr>
<tr>
<td><code title="No equivalent CharID">"transparencyShapesLayer"</code></td>
<td>Boolean</td>
<td>Transparency shapes layer</td>
<td>Transparency Shapes Layer</td>
</tr>
<tr>
<td><code title="No equivalent CharID">"layerMaskAsGlobalMask"</code></td>
<td>Boolean</td>
<td>Layer mask as global mask</td>
<td>Layer Mask Hides Effects</td>
</tr>
<tr>
<td><code title="No equivalent CharID">"vectorMaskAsGlobalMask"</code></td>
<td>Boolean</td>
<td>Vector mask as global mask</td>
<td>Vector Mask Hides Effects</td>
</tr>
<tr>
<td><code title="&quot;blendRange&quot;">'Blnd'</code></td>
<td>List</td>
<td>List of blend ranges</td>
<td>Each in <a href="#blend-range-object">Blend range object</a> format.</td>
</tr>
<tr>
<td><code title="No equivalent CharID">"channelRestrictions"</code></td>
<td>List</td>
<td>List of enumerated channels</td>
<td>Each among <a href="#channels">Channels</a>.</td>
</tr>
</table>

### Blend range object

<table>
<tr>
<th>Class</th>
<th colspan="4">Descriptor</th>
</tr>
<tr>
<td rowspan="10"><code title="&quot;blendRange&quot;">'Blnd'</code></td>
<th>Key</th>
<th>Type</th>
<th>Value</th>
<th>Comments</th>
</tr>
<tr>
<td><code title="&quot;channel&quot;">'Chnl'</code></td>
<td>Reference</td>
<td>Channel reference</td>
<td><a href="#channel-reference">Channel reference</a> format.</td>
</tr>
<tr>
<td><code title="&quot;srcBlackMin&quot;">'SrcB'</code></td>
<td>Integer</td>
<td>Source minimum black</td>
<td>0 to 255.</td>
</tr>
<tr>
<td><code title="&quot;srcBlackMax&quot;">'Srcl'</code></td>
<td>Integer</td>
<td>Source maximum black</td>
<td>0 to 255.</td>
</tr>
<tr>
<td><code title="&quot;srcWhiteMin&quot;">'SrcW'</code></td>
<td>Integer</td>
<td>Source minimum white</td>
<td>0 to 255.</td>
</tr>
<tr>
<td><code title="&quot;srcWhiteMax&quot;">'Srcm'</code></td>
<td>Integer</td>
<td>Source maximum white</td>
<td>0 to 255.</td>
</tr>
<tr>
<td><code title="&quot;destBlackMin&quot;">'DstB'</code></td>
<td>Integer</td>
<td>Destination minimum black</td>
<td>0 to 255.</td>
</tr>
<tr>
<td><code title="&quot;destBlackMax&quot;">'Dstl'</code></td>
<td>Integer</td>
<td>Destination maximum black</td>
<td>0 to 255.</td>
</tr>
<tr>
<td><code title="&quot;destWhiteMin&quot;">'DstW'</code></td>
<td>Integer</td>
<td>Destination minimum white</td>
<td>0 to 255.</td>
</tr>
<tr>
<td><code title="&quot;destWhiteMax&quot;">'Dstt'</code></td>
<td>Integer</td>
<td>Destination maximum white</td>
<td>0 to 255.</td>
</tr>
</table>

### Channel reference

<table>
<tr>
<th>Desired Class</th>
<th>Type</th>
<th>Value</th>
<th>Comments</th>
</tr>
<tr>
<td><code title="&quot;channel&quot;">'Chnl'</code></td>
<td>Enumerated</td>
<td>Channel</td>
<td>Among <a href="#channels">Channels</a>.</td>
</tr>
</table>

### Channels

<table>
<tr>
<th>EnumType</th>
<th>EnumValue</th>
<th>Comments</th>
</tr>
<tr>
<td rowspan="27"><code title="&quot;channel&quot;">'Chnl'</code></td>
<td><code title="&quot;a&quot;">'A&nbsp;&nbsp;&nbsp;'</code></td>
<td>A</td>
</tr>
<tr>
<td><code title="&quot;b&quot;">'B&nbsp;&nbsp;&nbsp;'</code></td>
<td>B</td>
</tr>
<tr>
<td><code title="&quot;black&quot;">'Blck'</code></td>
<td>Black</td>
</tr>
<tr>
<td><code title="&quot;blue&quot;">'Bl&nbsp;&nbsp;'</code></td>
<td>Blue</td>
</tr>
<tr>
<td><code title="&quot;cyan&quot;">'Cyn&nbsp;'</code></td>
<td>Cyan</td>
</tr>
<tr>
<td><code title="&quot;duotone&quot;">'Dtn&nbsp;'</code></td>
<td>Duotone</td>
</tr>
<tr>
<td><code title="&quot;gray&quot;">'Gry&nbsp;'</code></td>
<td>Gray</td>
</tr>
<tr>
<td><code title="&quot;green&quot;">'Grn&nbsp;'</code></td>
<td>Green</td>
</tr>
<tr>
<td><code title="&quot;lightness&quot;">'Lght'</code></td>
<td>Lightness</td>
</tr>
<tr>
<td><code title="&quot;magenta&quot;">'Mgnt'</code></td>
<td>Magenta</td>
</tr>
<tr>
<td><code title="&quot;monotone&quot;">'Mntn'</code></td>
<td>Monotone</td>
</tr>
<tr>
<td><code title="&quot;quadtone&quot;">'Qdtn'</code></td>
<td>Quadtone</td>
</tr>
<tr>
<td><code title="&quot;red&quot;">'Rd&nbsp;&nbsp;'</code></td>
<td>Red</td>
</tr>
<tr>
<td><code title="&quot;tritone&quot;">'Trtn'</code></td>
<td>Tritone</td>
</tr>
<tr>
<td><code title="&quot;yellow&quot;">'Yllw'</code></td>
<td>Yellow</td>
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

## Gradient format

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

## Pattern format

### Pattern object

<table>
<tr>
<th>Class</th>
<th colspan="4">Descriptor</th>
</tr>
<tr>
<td rowspan="3"><code title="&quot;pattern&quot;">'Ptrn'</code></td>
<th>Key</th>
<th>Type</th>
<th>Value</th>
<th>Comments</th>
</tr>
<tr>
<td><code title="&quot;name&quot;">'Nm&nbsp;&nbsp;'</code></td>
<td>String</td>
<td>Pattern name</td>
<td>Unicode string.</td>
</tr>
<tr>
<td><code title="&quot;ID&quot;">'Idnt'</code></td>
<td>String</td>
<td>Pattern ID (<a href="https://en.wikipedia.org/wiki/Universally_unique_identifier">UUID</a>)</td>
<td>Unicode string.</td>
</tr>
</table>

## Blend modes

<table>
<tr>
<th>EnumType</th>
<th>EnumValue</th>
<th>Comments</th>
</tr>
<tr>
<td rowspan="27"><code title="&quot;blendMode&quot;">'BlnM'</code></td>
<td><code title="&quot;normal&quot;">'Nrml'</code></td>
<td>Normal</td>
</tr>
<tr>
<td><code title="&quot;dissolve&quot;">'Dslv'</code></td>
<td>Dissolve</td>
</tr>
<tr>
<td><code title="&quot;darken&quot;">'Drkn'</code></td>
<td>Darken</td>
</tr>
<tr>
<td><code title="&quot;multiply&quot;">'Mltp'</code></td>
<td>Multiply</td>
</tr>
<tr>
<td><code title="&quot;colorBurn&quot;">'CBrn'</code></td>
<td>Color Burn</td>
</tr>
<tr>
<td><code title="No equivalent CharID">"linearBurn"</code></td>
<td>Linear Burn</td>
</tr>
<tr>
<td><code title="No equivalent CharID">"darkerColor"</code></td>
<td>Darker Color</td>
</tr>
<tr>
<td><code title="&quot;lighten&quot;">'Lghn'</code></td>
<td>Lighten</td>
</tr>
<tr>
<td><code title="&quot;screen&quot;">'Scrn'</code></td>
<td>Screen</td>
</tr>
<tr>
<td><code title="&quot;colorDodge&quot;">'CDdg'</code></td>
<td>Color Dodge</td>
</tr>
<tr>
<td><code title="No equivalent CharID">"linearDodge"</code></td>
<td>Linear Dodge (Add)</td>
</tr>
<tr>
<td><code title="No equivalent CharID">"lighterColor"</code></td>
<td>Lighter Color</td>
</tr>
<tr>
<td><code title="&quot;overlay&quot;">'Ovrl'</code></td>
<td>Overlay</td>
</tr>
<tr>
<td><code title="&quot;softLight&quot;">'SftL'</code></td>
<td>Soft Light</td>
</tr>
<tr>
<td><code title="&quot;hardLight&quot;">'HrdL'</code></td>
<td>Hard Light</td>
</tr>
<tr>
<td><code title="No equivalent CharID">"vividLight"</code></td>
<td>Vivid Light</td>
</tr>
<tr>
<td><code title="No equivalent CharID">"linearLight"</code></td>
<td>Linear Light</td>
</tr>
<tr>
<td><code title="No equivalent CharID">"pinLight"</code></td>
<td>Pin Light</td>
</tr>
<tr>
<td><code title="No equivalent CharID">"hardMix"</code></td>
<td>Hard Mix</td>
</tr>
<tr>
<td><code title="&quot;difference&quot;">'Dfrn'</code></td>
<td>Difference</td>
</tr>
<tr>
<td><code title="&quot;exclusion&quot;">'Xclu'</code></td>
<td>Exclusion</td>
</tr>
<tr>
<td><code title="&quot;subtract&quot;">'Sbtr'</code></td>
<td>Subtract</td>
</tr>
<tr>
<td><code title="No equivalent CharID">"divide"</code></td>
<td>Divide</td>
</tr>
<tr>
<td><code title="&quot;hue&quot;">'H&nbsp;&nbsp;&nbsp;'</code></td>
<td>Hue</td>
</tr>
<tr>
<td><code title="&quot;saturation&quot;">'Strt'</code></td>
<td>Saturation</td>
</tr>
<tr>
<td><code title="&quot;color&quot;">'Clr&nbsp;'</code></td>
<td>Color</td>
</tr>
<tr>
<td><code title="&quot;luminosity&quot;">'Lmns'</code></td>
<td>Luminosity</td>
</tr>
</table>

## Parsing styles files

A practical set of JavaScript functions for parsing styles files is contained in the module `jamStyles`, which is part of the [JSON Action Manager](/JSON-Action-Manager) scripting library.

It uses the following simplified formats:

- [Document Mode Object Simplified Format](/JSON-Simplified-Formats/Document-Mode-Object-Simplified-Format)
- [Layer Effects Object Simplified Format](/JSON-Simplified-Formats/Layer-Effects-Object-Simplified-Format)
- [Blending Options Object Simplified Format](/JSON-Simplified-Formats/Blending-Options-Object-Simplified-Format)

Three utility scripts are available:

- [Export Styles File Patterns](/Utility-Scripts/Export-Styles-File-Patterns): [Photoshop CS3 or later] export the embedded patterns of a styles file (.asl) or a styles palette (Styles.psp) into a patterns file.

- [Get Layer Style](/Utility-Scripts/Get-Layer-Style): [Photoshop CS2 or later] get the style (blending options and layer effects) of the current layer in JSON simplified format.

- [Parse Styles File](/Utility-Scripts/Parse-Styles-File): [Photoshop CS3 or later] parse a styles file (.asl) or a styles palette (Styles.psp) into a JSON text file.

All files are open-source and licensed under [GPLv3](https://www.gnu.org/licenses/gpl.html); the utility scripts have been successfully tested in Photoshop CS4 on Mac OS X, but should be platform agnostic.

---

Doc version: 1.6
<br>
Date: 2018-04-16
<br>
Copyright: © 2013-2018 Michel MARIANI
<br>
Disclaimer: this information is provided 'as is' without warranty of any kind, express or implied; use it at your own risk.
