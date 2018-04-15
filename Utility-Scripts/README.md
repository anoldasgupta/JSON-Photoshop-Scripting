# Utility Scripts

## License

The following stand-alone scripts, making use of the [JSON Action Manager](/JSON-Action-Manager) scripting library, are licensed under [GPLv3](https://www.gnu.org/licenses/gpl.html).

They are available either from the [Downloads](/Downloads) page, or individually from their respective pages listed below.

## Actions Files Utility Scripts

- [Convert Actions File](Convert-Actions-File): convert an actions file (.atn) into a folder of directly executable scripts (.js) which can be further edited \[Photoshop CS3 or later\].

- [Parse Actions File](Parse-Actions-File): parse an actions file (.atn) or an actions palette file (Actions Palette.psp) into a JSON text file \[Photoshop CS2 or later\].

- [Play Actions File Action](Play-Actions-File-Action): play a specific action contained in an actions file (.atn), without the need to load the file in the Actions Palette \[Photoshop CS3 or later\].

## Actions Palette Utility Scripts

- [List Palette Actions](List-Palette-Actions): list in JSON format all action sets, actions and commands currently available in the Actions Palette \[Photoshop CS or later\].

- [Play Palette Action](Play-Palette-Action): play a single action of the Actions palette, from beginning to end by default, or starting from a specific command \[Photoshop CS2 or later\].

## Code Utility Scripts

- [Convert AM Code to JSON](Convert-AM-Code-to-JSON): convert plain Action Manager code copied from the ScriptingListenerJS.log file into executable code using the JSON Action Manager scripting library \[Photoshop CS4 or later\].

- [Get Application Info Code](Get-Application-Info-Code): get information in JSON AM Data Format from the Photoshop application \[Photoshop CS3 or later\].

- [Get Document Info Code](Get-Document-Info-Code): get information in JSON AM Data Format from the currently active document \[Photoshop CS3 or later\].

- [Get Equivalent ID Code](Get-Equivalent-ID-Code): get the text string of a call to `app.stringIDToTypeID` equivalent to a call to `app.charIDToTypeID` \[Photoshop CS3 or later\].

- [Get Layer Info Code](Get-Layer-Info-Code): get information in JSON AM Data Format from the currently active layer \[Photoshop CS3 or later\].

- [Get User Colors Code](Get-User-Colors-Code): get code used to set user colors to the current foreground and background values, making use of their JSON simplified format \[Photoshop CS or later\].

- [Quick Run Code](Quick-Run-Code): quickly run a snippet of JavaScript code copied or typed into a dialog text area \[Photoshop CS4 or later\].

## Color Books Utility Scripts

- [Generate Color Book File](Generate-Color-Book-File): generate a color book file (.acb) from a JSON text file \[Photoshop CS3 or later\].

- [Get Nearest Book Color](Get-Nearest-Book-Color): interactively get from a Photoshop color book file (.acb) the nearest book color to any given RGB color \[Photoshop CS3 or later\].

- [List Color Book File Colors](List-Color-Book-File-Colors): list in JSON text format all available colors (name and component values) from a color book file (.acb) \[Photoshop CS3 or later\].

- [Parse Color Book File](Parse-Color-Book-File): parse a color book file (.acb) into a JSON text file \[Photoshop CS3 or later\].

## Custom Shapes Files Utility Scripts

- [Convert Custom Shapes File to SVG Set](Convert-Custom-Shapes-File-to-SVG-Set): convert a custom shapes file (.csh) or a custom shapes preferences file (CustomShapes.psp) into a set of SVG files \[Photoshop CS3 or later\].

- [Insert Custom Shape Path](Insert-Custom-Shape-Path): create a work path from a custom shape contained in a custom shapes file (.csh) \[Photoshop CS3 or later\].

- [Parse Custom Shapes File](Parse-Custom-Shapes-File): parse a custom shapes file (.csh) or a custom shapes preferences file (CustomShapes.psp) into a JSON text file \[Photoshop CS3 or later\].

- [Preview Custom Shapes File](Preview-Custom-Shapes-File): graphically preview a custom shapes file (.csh) or a custom shapes preferences file (CustomShapes.psp) in a new image document \[Photoshop CS3 or later\].

## Fonts Utility Scripts

- [Get Font PostScript Name](Get-Font-PostScript-Name): get the PostScript name of a font selected by family and style, presented in the same way they are displayed in the character palette or in the type tool bar \[Photoshop CS3 or later\].

- [List Fonts](List-Fonts): list in JSON format all fonts currently available in Photoshop \[Photoshop CS or later\].

## Gradients Utility Scripts

- [Generate Gradients File](Generate-Gradients-File): generate a gradients file (.grd) from a JSON text file containing an array of gradient objects in JSON simplified format \[Photoshop CS3 or later\].

- [Get Current Gradient](Get-Current-Gradient): get the current gradient in JSON simplified format \[Photoshop CS4 or later\].

- [Parse Gradients File](Parse-Gradients-File): parse a gradients file (.grd) into a JSON text file containing an array of gradient objects in JSON simplified format \[Photoshop CS3 or later\].

## JSON Utility Scripts

- [Reformat JSON](Reformat-JSON): Reformat JSON text \[Photoshop CS4 or later\].

## Layer Styles Utility Scripts

- [Export Styles File Patterns](Export-Styles-File-Patterns): export the embedded patterns of a styles file (.asl) or a styles palette (Styles.psp) into a new patterns file \[Photoshop CS3 or later\].

- [Get Layer Style](Get-Layer-Style): get the style (blending options and layer effects) of the current layer in JSON simplified format \[Photoshop CS3 or later\].

- [Parse Styles File](Parse-Styles-File): parse a styles file (.asl) or a styles palette (Styles.psp) into a JSON text file \[Photoshop CS3 or later\].

## Layer Text Utility Scripts

- [Get Layer Text](Get-Layer-Text): get the text of the current text layer in JSON simplified format \[Photoshop CS3 or later\].

## Miscellaneous Utility Scripts

- [Get Binary File Data String](Get-Binary-File-Data-String): generates a string representing the data of a binary file \[Photoshop CS or later\].

- [Get Equivalent ID Strings](Get-Equivalent-ID-Strings): get all possible equivalent ID Strings from either a CharID or StringID string \[Photoshop CS3 or later\].

- [List Internal IDs](List-Internal-IDs): list in JSON format all internal IDs used by the Photoshop’s programming interface \[Photoshop CS or later\].

- [List Presets](List-Presets): list in JSON format the names of all presets (brushes, swatches, gradients, styles, patterns, contours, custom shapes, and tools) currently available in Photoshop \[Photoshop CS or later\].

- [List Recent Files](List-Recent-Files): list in JSON format the full paths of all the recently opened files in Photoshop (same as File>Open Recent) \[Photoshop CS3 or later\].

## Paths Utility Scripts

- [Get Path Components](Get-Path-Components): get the JSON simplified format of the components of the currently selected path \[Photoshop CS3 or later\].

- [Get SVG Code from Path](Get-SVG-Code-from-Path): Get SVG code from the currently selected path \[Photoshop CS3 or later\].

## Patterns Utility Scripts

- [Get Patterns File Info](Get-Patterns-File-Info): Get basic information from a patterns file (.pat) or a patterns preferences file (Patterns.psp) \[Photoshop CS3 or later\].

## Syntax Utility Scripts

- [Parse JavaScript Code](Parse-JavaScript-Code): parse JavaScript code to an abstract syntax tree (AST) or to a list of tokens \[Photoshop CS4 or later\].
