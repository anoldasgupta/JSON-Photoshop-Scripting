[[HTML version](stringids-and-charids.html)]

# Photoshop StringIDs and CharIDs

- [Contents](#contents)
- [Decision Table](#decision-table)
- [Conflicting StringIDs](#conflicting-stringids)
- [Context Rules](#context-rules)

## Contents

This document provides information about StringIDs and CharIDs in Photoshop. It has been mostly inferred from the data available in the files `PITerminology.h` and `PIStringTerminology.h` of the [Adobe Photoshop SDK](https://www.adobe.com/devnet/photoshop/sdk.html).

**Note**: the following utility scripts are also quite useful:

- [Get Equivalent ID Code](/Utility-Scripts/Get-Equivalent-ID-Code): [Photoshop CS3 or later] get the text string of a call to `app.stringIDToTypeID` equivalent to a call to `app.charIDToTypeID`.
- [Get Equivalent ID Strings](/Utility-Scripts/Get-Equivalent-ID-Strings): [Photoshop CS3 or later] get all possible equivalent ID Strings from either a CharID or StringID string.
- [List Internal IDs](/Utility-Scripts/List-Internal-IDs): [Photoshop CS or later] list in JSON format all internal IDs used by the Photoshop’s programming interface.

## Decision Table 

<table>
<thead>
<tr>
<th><br></th>
<th>class</th>
<th>enumType</th>
<th>enumValue</th>
<th>event</th>
<th>key</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>"'Algn'"</code></td>
<td><br></td>
<td><br></td>
<td><br></td>
<td><code>"align"</code></td>
<td><ins><code>"align"</code></ins><br><code>"alignment"</code></td>
</tr>
<tr>
<td><code>"'AntA'"</code></td>
<td><code>"antiAliasedPICTAcquire"</code></td>
<td><br></td>
<td><br></td>
<td><br></td>
<td><code>"antiAlias"</code></td>
</tr>
<tr>
<td><code>"'BckL'"</code></td>
<td><code>"backgroundLayer"</code></td>
<td><br></td>
<td><br></td>
<td><br></td>
<td><code>"backgroundLevel"</code></td>
</tr>
<tr>
<td><code>"'BlcG'"</code></td>
<td><br></td>
<td><code>"blackGenerationType"</code></td>
<td><br></td>
<td><br></td>
<td><code>"blackGenerationCurve"</code></td>
</tr>
<tr>
<td><code>"'BlcL'"</code></td>
<td><br></td>
<td><br></td>
<td><br></td>
<td><br></td>
<td><code>"blackLevel"</code><br><code>"blackLimit"</code></td>
</tr>
<tr>
<td><code>"'Blks'"</code></td>
<td><br></td>
<td><br></td>
<td><code>"blacks"</code><br><code>"blocks"</code></td>
<td><br></td>
<td><br></td>
</tr>
<tr>
<td><code>"'BlrM'"</code></td>
<td><br></td>
<td><code>"blurMethod"</code></td>
<td><br></td>
<td><code>"blurMore"</code></td>
<td><code>"blurMethod"</code></td>
</tr>
<tr>
<td><code>"'BrgC'"</code></td>
<td><code>"brightnessContrast"</code></td>
<td><br></td>
<td><br></td>
<td><ins><code>"brightnessContrast"</code></ins><br><del><code>"brightnessEvent"</code></del></td>
<td><br></td>
</tr>
<tr>
<td><code>"'BrsD'"</code></td>
<td><br></td>
<td><br></td>
<td><code>"brushesDefine"</code></td>
<td><br></td>
<td><code>"brushDetail"</code></td>
</tr>
<tr>
<td><code>"'Brsh'"</code></td>
<td><code>"brush"</code></td>
<td><br></td>
<td><br></td>
<td><br></td>
<td><ins><code>"brush"</code></ins><br><code>"brushes"</code></td>
</tr>
<tr>
<td><code>"'Clcl'"</code></td>
<td><code>"calculation"</code></td>
<td><br></td>
<td><code>"calculations"</code></td>
<td><br></td>
<td><code>"calculation"</code></td>
</tr>
<tr>
<td><code>"'ClrP'"</code></td>
<td><br></td>
<td><code>"colorPalette"</code></td>
<td><ins><code>"coloredPencil"</code></ins></td>
<td><code>"coloredPencil"</code></td>
<td><br></td>
</tr>
<tr>
<td><code>"'Cnst'"</code></td>
<td><br></td>
<td><br></td>
<td><br></td>
<td><br></td>
<td><code>"constant"</code><br><ins><em><code>"constrain"</code></em></ins></td>
</tr>
<tr>
<td><code>"'CntC'"</code></td>
<td><br></td>
<td><br></td>
<td><ins><code>"conteCrayon"</code></ins></td>
<td><code>"conteCrayon"</code></td>
<td><code>"centerCropMarks"</code></td>
</tr>
<tr>
<td><code>"'Cntr'"</code></td>
<td><br></td>
<td><br></td>
<td><code>"center"</code></td>
<td><br></td>
<td><code>"center"</code><br><code>"contrast"</code></td>
</tr>
<tr>
<td><code>"'CrtD'"</code></td>
<td><br></td>
<td><br></td>
<td><code>"createDuplicate"</code></td>
<td><code>"createDroplet"</code></td>
<td><br></td>
</tr>
<tr>
<td><code>"'CstP'"</code></td>
<td><code>"customPhosphors"</code></td>
<td><br></td>
<td><br></td>
<td><br></td>
<td><code>"customPalette"</code></td>
</tr>
<tr>
<td><code>"'Cstm'"</code></td>
<td><br></td>
<td><br></td>
<td><code>"customPattern"</code></td>
<td><code>"custom"</code></td>
<td><code>"custom"</code></td>
</tr>
<tr>
<td><code>"'Drkn'"</code></td>
<td><br></td>
<td><br></td>
<td><code>"darken"</code></td>
<td><br></td>
<td><code>"darkness"</code></td>
</tr>
<tr>
<td><code>"'Dstr'"</code></td>
<td><br></td>
<td><code>"distribution"</code></td>
<td><code>"distort"</code></td>
<td><code>"distribute"</code></td>
<td><code>"distortion"</code>
<br>
<code>"distribution"</code></td>
</tr>
<tr>
<td><code>"'Dstt'"</code></td>
<td><br></td>
<td><br></td>
<td><code>"desaturate"</code></td>
<td><code>"desaturate"</code></td>
<td><code>"destWhiteMax"</code></td>
</tr>
<tr>
<td><code>"'FlIn'"</code></td>
<td><code>"fileInfo"</code></td>
<td><br></td>
<td><code>"fileInfo"</code><br><code>"fillInverse"</code></td>
<td><br></td>
<td><code>"fileInfo"</code></td>
</tr>
<tr>
<td><code>"'Gd&nbsp;&nbsp;'"</code></td>
<td><code>"guide"</code></td>
<td><br></td>
<td><code>"good"</code></td>
<td><br></td>
<td><br></td>
</tr>
<tr>
<td><code>"'GnrP'"</code></td>
<td><del><code>"generalPrefs"</code></del><br><code>"preferencesClass"</code></td>
<td><br></td>
<td><code>"generalPreferences"</code></td>
<td><br></td>
<td><code>"generalPrefs"</code></td>
</tr>
<tr>
<td><code>"'GrSt'"</code></td>
<td><code>"graySetup"</code></td>
<td><br></td>
<td><code>"grainStippled"</code></td>
<td><br></td>
<td><code>"graySetup"</code></td>
</tr>
<tr>
<td><code>"'Grdn'"</code></td>
<td><code>"gradientClassEvent"</code></td>
<td><br></td>
<td><br></td>
<td><code>"gradientClassEvent"</code></td>
<td><del><ins><code>"gradientClassEvent"</code></ins></del><br><code>"gridMinor"</code></td>
</tr>
<tr>
<td><code>"'Grn&nbsp;'"</code></td>
<td><br></td>
<td><br></td>
<td><ins><code>"grain"</code></ins><br><code>"green"</code></td>
<td><code>"grain"</code></td>
<td><code>"grain"</code><br><code>"green"</code></td>
</tr>
<tr>
<td><code>"'Grns'"</code></td>
<td><br></td>
<td><br></td>
<td><code>"greens"</code></td>
<td><br></td>
<td><code>"graininess"</code></td>
</tr>
<tr>
<td><code>"'HstP'"</code></td>
<td><br></td>
<td><br></td>
<td><code>"historyPreferences"</code></td>
<td><br></td>
<td><code>"historyPrefs"</code></td>
</tr>
<tr>
<td><code>"'HstS'"</code></td>
<td><code>"historyState"</code></td>
<td><code>"historyStateSourceType"</code></td>
<td><br></td>
<td><br></td>
<td><br></td>
</tr>
<tr>
<td><code>"'ImgP'"</code></td>
<td><code>"imagePoint"</code></td>
<td><br></td>
<td><code>"imageCachePreferences"</code></td>
<td><br></td>
<td><br></td>
</tr>
<tr>
<td><code>"'In&nbsp;&nbsp;'"</code></td>
<td><br></td>
<td><br></td>
<td><code>"stampIn"</code></td>
<td><br></td>
<td><code>"in"</code></td>
</tr>
<tr>
<td><code>"'IntW'"</code></td>
<td><br></td>
<td><br></td>
<td><br></td>
<td><code>"intersectWith"</code></td>
<td><code>"interfaceWhite"</code></td>
</tr>
<tr>
<td><code>"'Intr'"</code></td>
<td><br></td>
<td><br></td>
<td><ins><code>"intersect"</code></ins></td>
<td><code>"intersect"</code></td>
<td><code>"interfaceIconFrameDimmed"</code><br><code>"interlace"</code><br><code>"interpolation"</code></td>
</tr>
<tr>
<td><code>"'JPEG'"</code></td>
<td><code>"JPEGFormat"</code></td>
<td><br></td>
<td><code>"JPEG"</code></td>
<td><br></td>
<td><br></td>
</tr>
<tr>
<td><code>"'LghD'"</code></td>
<td><br></td>
<td><code>"lightDirection"</code></td>
<td><code>"lightDirectional"</code></td>
<td><br></td>
<td><code>"lightDirection"</code></td>
</tr>
<tr>
<td><code>"'LghO'"</code></td>
<td><br></td>
<td><br></td>
<td><code>"lightenOnly"</code><br><code>"lightOmni"</code></td>
<td><br></td>
<td><br></td>
</tr>
<tr>
<td><code>"'LghS'"</code></td>
<td><code>"lightSource"</code></td>
<td><br></td>
<td><code>"lightSpot"</code></td>
<td><br></td>
<td><code>"lightSource"</code></td>
</tr>
<tr>
<td><code>"'Lns&nbsp;'"</code></td>
<td><br></td>
<td><code>"lens"</code></td>
<td><code>"lines"</code></td>
<td><br></td>
<td><code>"lens"</code></td>
</tr>
<tr>
<td><code>"'Mgnt'"</code></td>
<td><br></td>
<td><br></td>
<td><code>"magenta"</code><br><code>"magentas"</code></td>
<td><br></td>
<td><code>"magenta"</code></td>
</tr>
<tr>
<td><code>"'MrgL'"</code></td>
<td><br></td>
<td><br></td>
<td><code>"mergedLayers"</code></td>
<td><code>"mergeLayers"</code></td>
<td><br></td>
</tr>
<tr>
<td><code>"'Mxm&nbsp;'"</code></td>
<td><br></td>
<td><br></td>
<td><code>"maximumQuality"</code></td>
<td><code>"maximum"</code></td>
<td><code>"maximum"</code></td>
</tr>
<tr>
<td><code>"'NTSC'"</code></td>
<td><br></td>
<td><br></td>
<td><code>"NTSC"</code></td>
<td><code>"NTSCColors"</code></td>
<td><br></td>
</tr>
<tr>
<td><code>"'NmbL'"</code></td>
<td><br></td>
<td><br></td>
<td><br></td>
<td><br></td>
<td><code>"numberOfLayers"</code><br><code>"numberOfLevels"</code></td>
</tr>
<tr>
<td><code>"'PlgP'"</code></td>
<td><code>"pluginPrefs"</code></td>
<td><br></td>
<td><code>"pluginPicker"</code></td>
<td><br></td>
<td><code>"pluginPrefs"</code></td>
</tr>
<tr>
<td><code>"'Pncl'"</code></td>
<td><br></td>
<td><br></td>
<td><code>"pencilEraser"</code></td>
<td><br></td>
<td><code>"pencilWidth"</code></td>
</tr>
<tr>
<td><code>"'Pnt&nbsp;'"</code></td>
<td><code>"point"</code></td>
<td><br></td>
<td><ins><code>"point"</code></ins></td>
<td><code>"paint"</code></td>
<td><br></td>
</tr>
<tr>
<td><code>"'Prsp'"</code></td>
<td><br></td>
<td><br></td>
<td><code>"perspective"</code></td>
<td><br></td>
<td><code>"perspectiveIndex"</code></td>
</tr>
<tr>
<td><code>"'PrvM'"</code></td>
<td><br></td>
<td><br></td>
<td><code>"previewMagenta"</code></td>
<td><br></td>
<td><code>"previewMacThumbnail"</code></td>
</tr>
<tr>
<td><code>"'Pstr'"</code></td>
<td><code>"posterize"</code></td>
<td><br></td>
<td><br></td>
<td><code>"posterize"</code></td>
<td><code>"posterization"</code></td>
</tr>
<tr>
<td><code>"'RGBS'"</code></td>
<td><br></td>
<td><code>"RGBSetupSource"</code></td>
<td><br></td>
<td><br></td>
<td><code>"RGBSetup"</code></td>
</tr>
<tr>
<td><code>"'Rds&nbsp;'"</code></td>
<td><br></td>
<td><br></td>
<td><code>"reds"</code></td>
<td><br></td>
<td><code>"radius"</code></td>
</tr>
<tr>
<td><code>"'ScrD'"</code></td>
<td><br></td>
<td><br></td>
<td><code>"screenDot"</code></td>
<td><br></td>
<td><code>"scratchDisks"</code></td>
</tr>
<tr>
<td><code>"'ShdI'"</code></td>
<td><br></td>
<td><br></td>
<td><br></td>
<td><br></td>
<td><ins><em><code>"shadingIntensity"</code></em></ins><br><code>"shadowIntensity"</code></td>
</tr>
<tr>
<td><code>"'ShpC'"</code></td>
<td><code>"shapingCurve"</code></td>
<td><br></td>
<td><br></td>
<td><br></td>
<td><code>"shapeCurveType"</code><br><ins><code>"shapingCurve"</code></ins></td>
</tr>
<tr>
<td><code>"'ShrE'"</code></td>
<td><br></td>
<td><br></td>
<td><br></td>
<td><code>"sharpenEdges"</code></td>
<td><code>"shearEd"</code></td>
</tr>
<tr>
<td><code>"'Shrp'"</code></td>
<td><br></td>
<td><br></td>
<td><br></td>
<td><code>"sharpen"</code></td>
<td><code>"sharpness"</code></td>
</tr>
<tr>
<td><code>"'SplC'"</code></td>
<td><br></td>
<td><br></td>
<td><br></td>
<td><code>"splitChannels"</code></td>
<td><code>"supplementalCategories"</code></td>
</tr>
<tr>
<td><code>"'Spot'"</code></td>
<td><br></td>
<td><br></td>
<td><code>"spotColor"</code></td>
<td><br></td>
<td><code>"spot"</code></td>
</tr>
<tr>
<td><code>"'SprS'"</code></td>
<td><br></td>
<td><br></td>
<td><code>"separationSetup"</code><br><ins><code>"sprayedStrokes"</code></ins></td>
<td><code>"sprayedStrokes"</code></td>
<td><br></td>
</tr>
<tr>
<td><code>"'StrL'"</code></td>
<td><br></td>
<td><code>"strokeLocation"</code></td>
<td><br></td>
<td><br></td>
<td><code>"strokeLength"</code></td>
</tr>
<tr>
<td><code>"'Strt'"</code></td>
<td><br></td>
<td><br></td>
<td><code>"saturation"</code></td>
<td><br></td>
<td><code>"saturation"</code><br><code>"start"</code></td>
</tr>
<tr>
<td><code>"'TEXT'"</code></td>
<td><br></td>
<td><ins><code>"textType"</code></ins></td>
<td><br></td>
<td><br></td>
<td><ins><code>"textType"</code></ins></td>
</tr>
<tr>
<td><code>"'TIFF'"</code></td>
<td><code>"TIFFFormat"</code></td>
<td><br></td>
<td><code>"TIFF"</code></td>
<td><br></td>
<td><br></td>
</tr>
<tr>
<td><code>"'TglO'"</code></td>
<td><br></td>
<td><br></td>
<td><code>"toggleOptionsPalette"</code></td>
<td><br></td>
<td><code>"toggleOthers"</code></td>
</tr>
<tr>
<td><code>"'TrnG'"</code></td>
<td><br></td>
<td><code>"transparencyGridSize"</code></td>
<td><code>"transparencyGamutPreferences"</code></td>
<td><br></td>
<td><code>"transparencyGrid"</code><br><code>"transparencyGridSize"</code></td>
</tr>
<tr>
<td><code>"'TrnS'"</code></td>
<td><code>"transparencyStop"</code></td>
<td><br></td>
<td><br></td>
<td><br></td>
<td><ins><em><code>"transferSpec"</code></em></ins><br><code>"transparencyShape"</code></td>
</tr>
<tr>
<td><code>"'Trns'"</code></td>
<td><br></td>
<td><br></td>
<td><code>"transparent"</code></td>
<td><br></td>
<td><code>"transparency"</code></td>
</tr>
<tr>
<td><code>"'TxtC'"</code></td>
<td><br></td>
<td><br></td>
<td><br></td>
<td><br></td>
<td><code>"textClickPoint"</code><br><code>"textureCoverage"</code></td>
</tr>
<tr>
<td><code>"'TxtF'"</code></td>
<td><br></td>
<td><br></td>
<td><br></td>
<td><code>"textureFill"</code></td>
<td><code>"textureFile"</code></td>
</tr>
<tr>
<td><code>"'UsrM'"</code></td>
<td><br></td>
<td><code>"userMaskOptions"</code></td>
<td><br></td>
<td><br></td>
<td><code>"userMaskEnabled"</code></td>
</tr>
<tr>
<td><code>"'null'"</code></td>
<td><code>"null"</code></td>
<td><br></td>
<td><code>"null"</code></td>
<td><code>"null"</code></td>
<td><del><code>"null"</code></del><br><code>"target"</code></td>
</tr>
</tbody>
<tfoot>
<tr>
<th><br></th>
<th>class</th>
<th>enumType</th>
<th>enumValue</th>
<th>event</th>
<th>key</th>
</tr>
</tfoot>
</table>

## Conflicting StringIDs

JSON data extracted from the file `jamEngine.jsxinc`, part of the [JSON Action Manager](/JSON-Action-Manager) scripting library, representing a table of all known conflicting StringIDs:

```json
{
    "'Algn'": [ "align", "alignment" ],
    "'AntA'": [ "antiAlias", "antiAliasedPICTAcquire" ],
    "'BckL'": [ "backgroundLayer", "backgroundLevel" ],
    "'BlcG'": [ "blackGenerationType", "blackGenerationCurve" ],
    "'BlcL'": [ "blackLevel", "blackLimit" ],
    "'Blks'": [ "blacks", "blocks" ],
    "'BlrM'": [ "blurMethod", "blurMore" ],
    "'BrgC'": [ "brightnessEvent", "brightnessContrast" ],
    "'BrsD'": [ "brushDetail", "brushesDefine" ],
    "'Brsh'": [ "brush", "brushes" ],
    "'Clcl'": [ "calculation", "calculations" ],
    "'ClrP'": [ "colorPalette", "coloredPencil" ],
    "'Cnst'": [ "constant", "constrain" ],
    "'CntC'": [ "centerCropMarks", "conteCrayon" ],
    "'Cntr'": [ "center", "contrast" ],
    "'CrtD'": [ "createDroplet", "createDuplicate" ],
    "'CstP'": [ "customPalette", "customPhosphors" ],
    "'Cstm'": [ "custom", "customPattern" ],
    "'Drkn'": [ "darken", "darkness" ],
    "'Dstr'": [ "distort", "distortion", "distribute", "distribution" ],
    "'Dstt'": [ "desaturate", "destWhiteMax" ],
    "'FlIn'": [ "fileInfo", "fillInverse" ],
    "'Gd  '": [ "good", "guide" ],
    "'GnrP'": [ "generalPreferences", "generalPrefs", "preferencesClass" ],
    "'GrSt'": [ "grainStippled", "graySetup" ],
    "'Grdn'": [ "gradientClassEvent", "gridMinor" ],
    "'Grn '": [ "grain", "green" ],
    "'Grns'": [ "graininess", "greens" ],
    "'HstP'": [ "historyPreferences", "historyPrefs" ],
    "'HstS'": [ "historyState", "historyStateSourceType" ],
    "'ImgP'": [ "imageCachePreferences", "imagePoint" ],
    "'In  '": [ "in", "stampIn" ],
    "'IntW'": [ "interfaceWhite", "intersectWith" ],
    "'Intr'": [ "interfaceIconFrameDimmed", "interlace", "interpolation", "intersect" ],
    "'JPEG'": [ "JPEG", "JPEGFormat" ],
    "'LghD'": [ "lightDirection", "lightDirectional" ],
    "'LghO'": [ "lightOmni", "lightenOnly" ],
    "'LghS'": [ "lightSource", "lightSpot" ],
    "'Lns '": [ "lens", "lines" ],
    "'Mgnt'": [ "magenta", "magentas" ],
    "'MrgL'": [ "mergeLayers", "mergedLayers" ],
    "'Mxm '": [ "maximum", "maximumQuality" ],
    "'NTSC'": [ "NTSC", "NTSCColors" ],
    "'NmbL'": [ "numberOfLayers", "numberOfLevels" ],
    "'PlgP'": [ "pluginPicker", "pluginPrefs" ],
    "'Pncl'": [ "pencilEraser", "pencilWidth" ],
    "'Pnt '": [ "paint", "point" ],
    "'Prsp'": [ "perspective", "perspectiveIndex" ],
    "'PrvM'": [ "previewMacThumbnail", "previewMagenta" ],
    "'Pstr'": [ "posterization", "posterize" ],
    "'RGBS'": [ "RGBSetup", "RGBSetupSource" ],
    "'Rds '": [ "radius", "reds" ],
    "'ScrD'": [ "scratchDisks", "screenDot" ],
    "'ShdI'": [ "shadingIntensity", "shadowIntensity" ],
    "'ShpC'": [ "shapeCurveType", "shapingCurve" ],
    "'ShrE'": [ "sharpenEdges", "shearEd" ],
    "'Shrp'": [ "sharpen", "sharpness" ],
    "'SplC'": [ "splitChannels", "supplementalCategories" ],
    "'Spot'": [ "spot", "spotColor" ],
    "'SprS'": [ "separationSetup", "sprayedStrokes" ],
    "'StrL'": [ "strokeLength", "strokeLocation" ],
    "'Strt'": [ "saturation", "start" ],
    "'TEXT'": [ "char", "textType" ],
    "'TIFF'": [ "TIFF", "TIFFFormat" ],
    "'TglO'": [ "toggleOptionsPalette", "toggleOthers" ],
    "'TrnG'": [ "transparencyGamutPreferences", "transparencyGrid", "transparencyGridSize" ],
    "'TrnS'": [ "transferSpec", "transparencyShape", "transparencyStop" ],
    "'Trns'": [ "transparency", "transparent" ],
    "'TxtC'": [ "textClickPoint", "textureCoverage" ],
    "'TxtF'": [ "textureFile", "textureFill" ],
    "'UsrM'": [ "userMaskEnabled", "userMaskOptions" ],
    "'c@#^'": [ "inherits", "pInherits" ],
    "'comp'": [ "comp", "sInt64" ],
    "'doub'": [ "floatType", "IEEE64BitFloatingPoint", "longFloat" ],
    "'long'": [ "integer", "longInteger", "sInt32" ],
    "'magn'": [ "magnitude", "uInt32" ],
    "'null'": [ "null", "target" ],
    "'shor'": [ "sInt16", "sMInt", "shortInteger" ],
    "'sing'": [ "IEEE32BitFloatingPoint", "sMFloat", "shortFloat" ]
}
```
## Context Rules

JSON data extracted from the file `jamEngine.jsxinc`, part of the [JSON Action Manager](/JSON-Action-Manager) scripting library, representing a disambiguating rules table, used to choose among conflicting StringIDs the most adequate meaningful one in context:

```json
{
    "'Algn'":
    {
        "<classKey>":
        {
            "bevelEmboss": "align",
            "frameFX": "align",
            "gradientFill": "align",
            "gradientLayer": "align",
            "patternFill": "align",
            "patternLayer": "align"
        },
        "<event>": "align",
        "<key>": "alignment"
    },
    "'AntA'":
    {
        "<class>": "antiAliasedPICTAcquire",
        "<key>": "antiAlias"
    },
    "'BckL'":
    {
        "<class>": "backgroundLayer",
        "<key>": "backgroundLevel"
    },
    "'BlcG'":
    {
        "<enumType>": "blackGenerationType",
        "<key>": "blackGenerationCurve"
    },
    "'BlcL'":
    {
        "<classKey>":
        {
            "'GEfc'": "blackLevel",
            "CMYKSetup": "blackLimit"
        },
        "<eventKey>":
        {
            "reticulation": "blackLevel"
        }
    },
    "'Blks'":
    {
        "<typeValue>":
        {
            "colors": "blacks",
            "extrudeType": "blocks"
        }
    },
    "'BlrM'":
    {
        "<enumType>": "blurMethod",
        "<event>": "blurMore",
        "<key>": "blurMethod"
    },
    "'BrgC'":
    {
        "<class>": "brightnessContrast",
        "<event>": "brightnessContrast"
    },
    "'BrsD'":
    {
        "<enumValue>": "brushesDefine",
        "<key>": "brushDetail"
    },
    "'Brsh'":
    {
        "<class>": "brush",
        "<classKey>":
        {
            "brushPreset": "brush",
            "currentToolOptions": "brush",
            "displayPrefs": "brush"
        },
        "<key>": "brushes"
    },
    "'Clcl'":
    {
        "<class>": "calculation",
        "<enumValue>": "calculations",
        "<key>": "calculation"
    },
    "'ClrP'":
    {
        "<typeValue>":
        {
            "'GEft'": "coloredPencil"
        },
        "<enumType>": "colorPalette",
        "<event>": "coloredPencil"
    },
    "'Cnst'":
    {
        "<classKey>":
        {
            "channelMatrix": "constant"
        },
        "<unknown>": "constrain"
    },
    "'CntC'":
    {
        "<typeValue>":
        {
            "'GEft'": "conteCrayon"
        },
        "<event>": "conteCrayon",
        "<key>": "centerCropMarks"
    },
    "'Cntr'":
    {
        "<classKey>":
        {
            "'GEfc'": "contrast",
            "brightnessContrast": "contrast",
            "document": "center",
            "polygon": "center",
            "quadrilateral": "center"
        },
        "<eventKey>":
        {
            "adaptCorrect": "contrast",
            "brightnessEvent": "contrast",
            "grain": "contrast",
            "halftoneScreen": "contrast",
            "sumie": "contrast",
            "tornEdges": "contrast",
            "waterPaper": "contrast"
        },
        "<enumValue>": "center"
    },
    "'CrtD'":
    {
        "<enumValue>": "createDuplicate",
        "<event>": "createDroplet"
    },
    "'CstP'":
    {
        "<class>": "customPhosphors",
        "<key>": "customPalette"
    },
    "'Cstm'":
    {
        "<enumValue>": "customPattern",
        "<event>": "custom",
        "<key>": "custom"
    },
    "'Drkn'":
    {
        "<enumValue>": "darken",
        "<key>": "darkness"
    },
    "'Dstr'":
    {
        "<classKey>":
        {
            "'GEfc'": "distortion"
        },
        "<eventKey>":
        {
            "glass": "distortion",
            "addNoise": "distribution"
        },
        "<enumType>": "distribution",
        "<enumValue>": "distort",
        "<event>": "distribute"
    },
    "'Dstt'":
    {
        "<enumValue>": "desaturate",
        "<event>": "desaturate",
        "<key>": "destWhiteMax"
    },
    "'FlIn'":
    {
        "<typeValue>":
        {
            "fillColor": "fillInverse",
            "menuItemType": "fileInfo"
        },
        "<class>": "fileInfo",
        "<key>": "fileInfo"
    },
    "'Gd  '":
    {
        "<class>": "guide",
        "<enumValue>": "good"
    },
    "'GnrP'":
    {
        "<class>": "preferencesClass",
        "<enumValue>": "generalPreferences",
        "<key>": "generalPrefs"
    },
    "'GrSt'":
    {
        "<class>": "graySetup",
        "<enumValue>": "grainStippled",
        "<key>": "graySetup"
    },
    "'Grdn'":
    {
        "<class>": "gradientClassEvent",
        "<event>": "gradientClassEvent",
        "<key>": "gridMinor"
    },
    "'Grn '":
    {
        "<typeValue>":
        {
            "'GEft'": "grain"
        },
        "<classKey>":
        {
            "'GEfc'": "grain",
            "RGBColor": "green",
            "blackAndWhite": "green",
            "channelMatrix": "green",
            "channelMixer": "green"
        },
        "<eventKey>":
        {
            "blackAndWhite": "green",
            "channelMixer": "green",
            "filmGrain": "grain"
        },
        "<enumValue>": "green",
        "<event>": "grain"
    },
    "'Grns'":
    {
        "<enumValue>": "greens",
        "<key>": "graininess"
    },
    "'HstP'":
    {
        "<enumValue>": "historyPreferences",
        "<key>": "historyPrefs"
    },
    "'HstS'":
    {
        "<class>": "historyState",
        "<enumType>": "historyStateSourceType"
    },
    "'ImgP'":
    {
        "<class>": "imagePoint",
        "<enumValue>": "imageCachePreferences"
    },
    "'In  '":
    {
        "<enumValue>": "stampIn",
        "<key>": "in"
    },
    "'IntW'":
    {
        "<event>": "intersectWith",
        "<key>": "interfaceWhite"
    },
    "'Intr'":
    {
        "<typeValue>":
        {
            "shapeOperation": "intersect"
        },
        "<classKey>":
        {
            "GIFFormat": "interlace",
            "SaveForWeb": "interlace",
            "application": "interfaceIconFrameDimmed",
            "computedBrush": "interpolation",
            "dBrush": "interpolation",
            "gradientClassEvent": "interpolation",
            "photoshopEPSFormat": "interpolation",
            "sampledBrush": "interpolation"
        },
        "<eventKey>":
        {
            "convertMode": "interpolation",
            "imageSize": "interpolation",
            "transform": "interpolation"
        },
        "<event>": "intersect"
    },
    "'JPEG'":
    {
        "<class>": "JPEGFormat",
        "<enumValue>": "JPEG"
    },
    "'LghD'":
    {
        "<enumType>": "lightDirection",
        "<enumValue>": "lightDirectional",
        "<key>": "lightDirection"
    },
    "'LghO'":
    {
        "<typeValue>":
        {
            "diffuseMode": "lightenOnly",
            "lightType": "lightOmni"
        }
    },
    "'LghS'":
    {
        "<class>": "lightSource",
        "<enumValue>": "lightSpot",
        "<key>": "lightSource"
    },
    "'Lns '":
    {
        "<enumType>": "lens",
        "<enumValue>": "lines",
        "<key>": "lens"
    },
    "'Mgnt'":
    {
        "<typeValue>":
        {
            "channel": "magenta",
            "colors": "magentas",
            "guideGridColor": "magenta"
        },
        "<key>": "magenta"
    },
    "'MrgL'":
    {
        "<enumValue>": "mergedLayers",
        "<event>": "mergeLayers"
    },
    "'Mxm '":
    {
        "<enumValue>": "maximumQuality",
        "<event>": "maximum",
        "<key>": "maximum"
    },
    "'NTSC'":
    {
        "<enumValue>": "NTSC",
        "<event>": "NTSCColors"
    },
    "'NmbL'":
    {
        "<classKey>":
        {
            "'GEfc'": "numberOfLevels",
            "document": "numberOfLayers"
        },
        "<eventKey>":
        {
            "cutout": "numberOfLevels"
        }
    },
    "'PlgP'":
    {
        "<class>": "pluginPrefs",
        "<enumValue>": "pluginPicker",
        "<key>": "pluginPrefs"
    },
    "'Pncl'":
    {
        "<enumValue>": "pencilEraser",
        "<key>": "pencilWidth"
    },
    "'Pnt '":
    {
        "<typeValue>":
        {
            "textType": "point"
        },
        "<class>": "point",
        "<event>": "paint"
    },
    "'Prsp'":
    {
        "<enumValue>": "perspective",
        "<key>": "perspectiveIndex"
    },
    "'PrvM'":
    {
        "<enumValue>": "previewMagenta",
        "<key>": "previewMacThumbnail"
    },
    "'Pstr'":
    {
        "<class>": "posterize",
        "<event>": "posterize",
        "<key>": "posterization"
    },
    "'RGBS'":
    {
        "<enumType>": "RGBSetupSource",
        "<key>": "RGBSetup"
    },
    "'Rds '":
    {
        "<enumValue>": "reds",
        "<key>": "radius"
    },
    "'ScrD'":
    {
        "<enumValue>": "screenDot",
        "<key>": "scratchDisks"
    },
    "'ShdI'":
    {
        "<classKey>":
        {
            "'GEfc'": "shadowIntensity"
        },
        "<eventKey>":
        {
            "watercolor": "shadowIntensity"
        },
        "<unknown>": "shadingIntensity"
    },
    "'ShpC'":
    {
        "<classKey>":
        {
            "application": "shapingCurve"
        },
        "<class>": "shapingCurve",
        "<key>": "shapeCurveType"
    },
    "'ShrE'":
    {
        "<event>": "sharpenEdges",
        "<key>": "shearEd"
    },
    "'Shrp'":
    {
        "<event>": "sharpen",
        "<key>": "sharpness"
    },
    "'SplC'":
    {
        "<event>": "splitChannels",
        "<key>": "supplementalCategories"
    },
    "'Spot'":
    {
        "<enumValue>": "spotColor",
        "<key>": "spot"
    },
    "'SprS'":
    {
        "<typeValue>":
        {
            "'GEft'": "sprayedStrokes"
        },
        "<enumValue>": "separationSetup",
        "<event>": "sprayedStrokes"
    },
    "'StrL'":
    {
        "<enumType>": "strokeLocation",
        "<key>": "strokeLength"
    },
    "'Strt'":
    {
        "<classKey>":
        {
            "currentToolOptions": "saturation",
            "fileNamingRules": "start",
            "HSBColorClass": "saturation",
            "hueSatAdjustment": "saturation",
            "hueSatAdjustmentV2": "saturation",
            "lineClass": "start",
            "range": "start",
            "vibrance": "saturation"
        },
        "<eventKey>":
        {
            "replaceColor": "saturation",
            "variations": "saturation",
            "vibrance": "saturation"
        },
        "<enumValue>": "saturation"
    },
    "'TEXT'":
    {
        "<enumType>": "textType",
        "<key>": "textType"
    },
    "'TIFF'":
    {
        "<class>": "TIFFFormat",
        "<enumValue>": "TIFF"
    },
    "'TglO'":
    {
        "<enumValue>": "toggleOptionsPalette",
        "<key>": "toggleOthers"
    },
    "'TrnG'":
    {
        "<classKey>":
        {
            "application": "transparencyGrid",
            "transparencyPrefs": "transparencyGridSize"
        },
        "<enumType>": "transparencyGridSize",
        "<enumValue>": "transparencyGamutPreferences"
    },
    "'TrnS'":
    {
        "<classKey>":
        {
            "bevelEmboss": "transparencyShape",
            "dropShadow": "transparencyShape",
            "innerGlow": "transparencyShape",
            "innerShadow": "transparencyShape",
            "outerGlow": "transparencyShape"
        },
        "<class>": "transparencyStop",
        "<unknown>": "transferSpec"
    },
    "'Trns'":
    {
        "<enumValue>": "transparent",
        "<key>": "transparency"
    },
    "'TxtC'":
    {
        "<classKey>":
        {
            "'GEfc'": "textureCoverage",
            "textLayer": "textClickPoint"
        },
        "<eventKey>":
        {
            "underpainting": "textureCoverage"
        }
    },
    "'TxtF'":
    {
        "<event>": "textureFill",
        "<key>": "textureFile"
    },
    "'UsrM'":
    {
        "<enumType>": "userMaskOptions",
        "<key>": "userMaskEnabled"
    },
    "'null'":
    {
        "<class>": "null",
        "<enumValue>": "null",
        "<event>": "null",
        "<key>": "target"
    }
}
```

---

Doc version: 1.0
<br>
Date: 2018-04-18
<br>
Copyright: © 2018 Michel MARIANI
<br>
Disclaimer: this information is provided 'as is' without warranty of any kind, express or implied; use it at your own risk.
