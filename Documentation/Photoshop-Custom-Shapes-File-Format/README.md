[[HTML version](custom-shapes-file-format.html)]

# Photoshop Custom Shapes File Format

- [Contents](#contents)
- [File format](#file-format)
    - [Custom shapes file](#custom-shapes-file)
    - [Custom shapes file header](#custom-shapes-file-header)
    - [Custom shape](#custom-shape)
    - [Unicode string](#unicode-string)
    - [Pascal-style string](#pascal-style-string)
    - [Bounds rectangle](#bounds-rectangle)
    - [Path record](#path-record)
    - [Path fill rule record](#path-fill-rule-record)
    - [Initial fill rule record](#initial-fill-rule-record)
    - [Subpath length record](#subpath-length-record)
    - [Subpath Bezier knot](#subpath-bezier-knot)
    - [Path point](#path-point)
- [Path records order](#path-records-order)
- [Parsing custom shapes files](#parsing-custom-shapes-files)

## Contents

This document provides information about the (undocumented yet) format of custom shapes files in Photoshop.

**Note**: all multi-byte values, i.e., integer numbers (including C-style 4-character constants), fixed-point numbers, and Unicode characters are coded in [big-endian](https://en.wikipedia.org/wiki/Big-endian) format.

## File format

### Custom shapes file

<table>
<tr>
<th>Name</th>
<th>Type</th>
<th>Kind</th>
<th>Description</th>
</tr>
<tr>
<td><code>CustomShapes.psp</code></td>
<td><code>'8BPF'</code></td>
<td>Custom&nbsp;shapes file</td>
<td>Adobe Photoshop preferences file containing all the custom shapes listed in the Preset Manager.<br><strong>Warning</strong>: like most preferences files, the custom shapes file is not updated in real-time: it is read by the application only once at start-up (launch) time and written back at shut-down (quit) time.</td>
</tr>
<tr>
<td><code>*.csh</code></td>
<td><code>'8BCS'</code></td>
<td>Custom&nbsp;shapes file</td>
<td>Adobe Photoshop custom shapes file; generally produced by saving a selected set of custom shapes from the Preset Manager.</td>
</tr>
</table>

### Custom shapes file header

<table>
<tr>
<th>Length&nbsp;(in&nbsp;bytes)</th>
<th>Description</th>
<th>Comments</th>
</tr>
<tr>
<td>4</td>
<td>Magic&nbsp;number (=&nbsp;<code>'cush'</code>)</td>
<td>C-style 4-character constant.</td>
</tr>
<tr>
<td>4</td>
<td>Version (=&nbsp;2)</td>
<td>32-bit integer.</td>
</tr>
<tr>
<td>4</td>
<td>Number of custom shapes</td>
<td>32-bit integer.</td>
</tr>
<tr>
<td>Variable</td>
<td>Sequence of custom shapes</td>
<td>Each in <a href="#custom-shape">Custom shape</a> format.</td>
</tr>
</table>

### Custom shape

<table>
<tr>
<th>Length&nbsp;(in&nbsp;bytes)</th>
<th>Description</th>
<th>Comments</th>
</tr>
<tr>
<td>Variable</td>
<td>Custom shape name</td>
<td><a href="#unicode-string">Unicode string</a> format.</td>
</tr>
<tr>
<td>0 or 2</td>
<td>Extra null padding</td>
<td>Only if length of previous Unicode string is odd.</td>
</tr>
<tr>
<td>4</td>
<td>Unknown (= 1)</td>
<td>32-bit integer.</td>
</tr>
<tr>
<td>4</td>
<td>Length (in bytes) of remaining custom shape data</td>
<td>32-bit integer.</td>
</tr>
<tr>
<td>1 + 36</td>
<td>Custom shape ID (<a href="https://en.wikipedia.org/wiki/Universally_unique_identifier">UUID</a>)</td>
<td><a href="#pascal-style-string">Pascal-style string</a> format.</td>
</tr>
<tr>
<td>16</td>
<td>Reference bounds for anchor and control points</td>
<td><a href="#bounds-rectangle">Bounds rectangle</a> format.</td>
</tr>
<tr>
<td>Variable</td>
<td>Sequence of path records</td>
<td>Each in <a href="#path-record">Path record</a> format.</td>
</tr>
<tr>
<td>1 or 3</td>
<td>Extra null padding</td>
<td>To match the above length of remaining custom shape data (always a multiple of 4).</td>
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

### Bounds rectangle

<table>
<tr>
<th>Length&nbsp;(in&nbsp;bytes)</th>
<th>Description</th>
<th>Comments</th>
</tr>
<tr>
<td>4</td>
<td>Top coordinate (in pixels)</td>
<td>32-bit integer (signed).</td>
</tr>
<tr>
<td>4</td>
<td>Left coordinate (in pixels)</td>
<td>32-bit integer (signed).</td>
</tr>
<tr>
<td>4</td>
<td>Bottom coordinate (in pixels)</td>
<td>32-bit integer (signed).</td>
</tr>
<tr>
<td>4</td>
<td>Right coordinate (in pixels)</td>
<td>32-bit integer (signed).</td>
</tr>
</table>

### Path record

<table>
<tr>
<th>Length&nbsp;(in&nbsp;bytes)</th>
<th>Description</th>
<th>Comments</th>
</tr>
<tr>
<td>2</td>
<td>Selector</td>
<td>
16-bit integer:<br>
<ul>
<li>0 (closed subpath length record)</li>
<li>1 (closed subpath Bezier knot, linked)</li>
<li>2 (closed subpath Bezier knot, unlinked)</li>
<li>3 (open subpath length record)</li>
<li>4 (open subpath Bezier knot, linked)</li>
<li>5 (open subpath Bezier knot, unlinked)</li>
<li>6 (path fill rule record)</li>
<li>7 (clipboard record)</li>
<li>8 (initial fill rule record)</li>
</ul>
</td>
</tr>
<tr>
<td>24</td>
<td>Path record data</td>
<td>
Depending on selector:
<ul>
<li><a href="#subpath-length-record">Subpath length record</a> format</li>
<li><a href="#subpath-bezier-knot">Subpath Bezier knot</a> format</li>
<li><a href="#subpath-bezier-knot">Subpath Bezier knot</a> format</li>
<li><a href="#subpath-length-record">Subpath length record</a> format</li>
<li><a href="#subpath-bezier-knot">Subpath Bezier knot</a> format</li>
<li><a href="#subpath-bezier-knot">Subpath Bezier knot</a> format</li>
<li><a href="#path-fill-rule-record">Path fill rule record</a> format</li>
<li>Clipboard record format (not used)</li>
<li><a href="#initial-fill-rule-record">Initial fill rule record</a> format</li>
</ul>
</td>
</tr>
</table>

Cf. [Path resource format](https://www.adobe.com/devnet-apps/photoshop/fileformatashtml/PhotoshopFileFormats.htm#50577409_17587) of the page [Adobe Photoshop File Formats Specification](https://www.adobe.com/devnet-apps/photoshop/fileformatashtml/PhotoshopFileFormats.htm) for more details about the way paths are stored in a Photoshop document.

### Path fill rule record

<table>
<tr>
<th>Length&nbsp;(in&nbsp;bytes)</th>
<th>Description</th>
<th>Comments</th>
</tr>
<tr>
<td>24</td>
<td>Unused</td>
<td>Should be zeroes.</td>
</tr>
</table>

### Initial fill rule record

<table>
<tr>
<th>Length&nbsp;(in&nbsp;bytes)</th>
<th>Description</th>
<th>Comments</th>
</tr>
<tr>
<td>2</td>
<td>Initial fill (= 0)</td>
<td>16-bit integer (unsigned); should be 0 or 1 (fill starts with all pixels); not used.</td>
</tr>
<tr>
<td>22</td>
<td>Unused</td>
<td>Should be zeroes.</td>
</tr>
</table>

### Subpath length record

<table>
<tr>
<th>Length&nbsp;(in&nbsp;bytes)</th>
<th>Description</th>
<th>Comments</th>
</tr>
<tr>
<td>2</td>
<td>Subpath length (number of Bezier knots)</td>
<td>16-bit integer (unsigned).</td>
</tr>
<tr>
<td>22</td>
<td>Unused</td>
<td>Should be zeroes.</td>
</tr>
</table>

### Subpath Bezier knot

<table>
<tr>
<th>Length&nbsp;(in&nbsp;bytes)</th>
<th>Description</th>
<th>Comments</th>
</tr>
<tr>
<td>8</td>
<td>Backward control point for the Bezier segment preceding the knot</td>
<td><a href="#path-point">Path point</a> format.</td>
</tr>
<tr>
<td>8</td>
<td>Anchor point for the knot</td>
<td><a href="#path-point">Path point</a> format.</td>
</tr>
<tr>
<td>8</td>
<td>Forward control point for the Bezier segment leaving the knot</td>
<td><a href="#path-point">Path point</a> format.</td>
</tr>
</table>

Cf. [Bezier curves](https://en.wikipedia.org/wiki/Bezier_curves).

### Path point

<table>
<tr>
<th>Length&nbsp;(in&nbsp;bytes)</th>
<th>Description</th>
<th>Comments</th>
</tr>
<tr>
<td>4</td>
<td>Vertical component</td>
<td>32-bit fixed-point number (signed), in <a href="https://en.wikipedia.org/wiki/Fixed_point_numbers#Notation">Q8.24</a> format.</td>
</tr>
<tr>
<td>4</td>
<td>Horizontal component</td>
<td>32-bit fixed-point number (signed), in <a href="https://en.wikipedia.org/wiki/Fixed_point_numbers#Notation">Q8.24</a> format.</td>
</tr>
</table>

[Fixed-point numbers](https://en.wikipedia.org/wiki/Fixed_point_numbers) are implemented here as 32-bit integers, with 8 bits before the binary point and 24 bits after the binary point. In JavaScript, since all numbers are represented as floating-point numbers, appropriate values are simply obtained by dividing the extracted 32-bit signed integer values by 0x1000000 (2<sup>24</sup>).

The resulting horizontal and vertical component values of a path point always fall between 0.0 and 1.0 (both exclusive).
[0.0,&nbsp;0.0] and [1.0,&nbsp;1.0] correspond respectively to the top-left and bottom-right corners of the bounds rectangle, which appears to have an extra "safety" margin of 1 pixel in each direction (i.e.: top, left, bottom, right).

## Path records order

For each custom shape, the first path record is always a "path fill rule record" (selector:&nbsp;6), immediately followed by an "initial fill rule record" (selector:&nbsp;8), whose initial fill value (0 or 1) is apparently not used.

Then, for each subpath:

- a "closed subpath length record" (selector:&nbsp;0) is followed by a sequence of either "closed subpath Bezier knot, linked" (selector:&nbsp;1) or "closed subpath Bezier knot, unlinked" (selector:&nbsp;2),

or

- an "open subpath length record" (selector:&nbsp;3) is followed by a sequence of either "open subpath Bezier knot, linked" (selector:&nbsp;4) or "open subpath Bezier knot, unlinked" (selector:&nbsp;5).

## Parsing custom shapes files

A practical set of JavaScript functions for parsing custom shapes files is contained in the module `jamShapes`, which is part of the [JSON Action Manager](/JSON-Action-Manager) scripting library. It is used by the following utility scripts:

- [Convert Custom Shapes File to SVG Set](/Utility-Scripts/Convert-Custom-Shapes-File-to-SVG-Set): [Photoshop CS3 or later] convert a custom shapes file (.csh) or a custom shapes preferences file (CustomShapes.psp) into a set of SVG files.

- [Insert Custom Shape Path](/Utility-Scripts/Insert-Custom-Shape-Path): [Photoshop CS3 or later] create a work path from a custom shape contained in a custom shapes file (.csh).

- [Parse Custom Shapes File](/Utility-Scripts/Parse-Custom-Shapes-File): [Photoshop CS3 or later] parse a custom shapes file (.csh) or a custom shapes preferences file (CustomShapes.psp) into a JSON text file.

- [Preview Custom Shapes File](/Utility-Scripts/Preview-Custom-Shapes-File): [Photoshop CS3 or later] graphically preview a custom shapes file (.csh) or a custom shapes preferences file (CustomShapes.psp) in a new image document.

All files are open-source and licensed under [GPLv3](https://www.gnu.org/licenses/gpl.html); the utility scripts have been successfully tested in Photoshop CS4 on Mac OS X, but should be platform agnostic.

---

Doc version: 2.1
<br>
Date: 2018-04-15
<br>
Copyright: © 2013-2018 Michel MARIANI
<br>
Disclaimer: this information is provided 'as is' without warranty of any kind, express or implied; use it at your own risk.
