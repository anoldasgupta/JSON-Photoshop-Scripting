/*

<javascriptresource>
<name>Create Color Ramp...</name>
<about>"Create Color Ramp" v4.1

Create a 256-color ramp programmatically.

Creative script using the "JSON Action Manager" scripting library.
© 2014-2016 Michel MARIANI.
</about>
<menu>automate</menu>
<category>JSON Action Manager Color Ramps</category>
</javascriptresource>

*/

//------------------------------------------------------------------------------
// File: Create Color Ramp.js
// Version: 4.1
// Release Date: 2016-08-03
// Copyright: © 2014-2016 Michel MARIANI <http://www.tonton-pixel.com/blog/>
// Licence: GPL <http://www.gnu.org/licenses/gpl.html>
//------------------------------------------------------------------------------
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.	 See the
// GNU General Public License for more details.
// 
// You should have received a copy of the GNU General Public License
// along with this program.	 If not, see <http://www.gnu.org/licenses/>.
//------------------------------------------------------------------------------
// Version History:
//  4.1:
//  - Added Lab and XYZ color models.
//  - Moved YCbCr functions to jamColors module.
//  - Used new version 4.4.5 of jamColors scripting library module.
//  4.0:
//  - Added YCbCr color model.
//  3.9:
//  - Removed helper function linear (); used plain interpolate () instead.
//  - Added helper functions for components formula format: linear (),
//    quadratic (), cubic () and polynomial ().
//  3.8:
//  - Used new version 4.4.4 of jamEngine scripting library module.
//  3.7:
//  - Used new version 4.4.3 of jamLayers scripting library module.
//  3.6:
//  - Used new version 4.4.1 of scripting library modules.
//  3.5:
//  - Added shiftHue () and transformColor () helper functions for 
//    indexed colors formula format.
//  - Added check of non-integer color component values in imported JSON files.
//  3.4:
//  - Fixed minor harmless bug in dialog handling.
//  3.3:
//  - Added display options in steps info dialog.
//  - Simplified expression of function segmentIndex ().
//  3.2:
//	- Cleaned up user interface code.
//  - Added helper function for components formula format: distribute ().
//  - Fixed checking of number of color stops in function distributeColors ().
//  3.1:
//  - Fixed event handler for float range checkbox.
//  - Improved performance of pchip () and spline () functions.
//  - Added steps info dialog to get sampled colors as JSON array.
//  3.0:
//  - Added handling of discrete steps.
//  - Allowed saving of invalid formulas.
//  - Added new formula format: indexed colors.
//  - Added optional smoothing in function interpolate ().
//  - Added helper functions for components formula format:
//    linear (), pchip (), coserp (), smoothstep (), smootherstep ().
//  - Added helper functions for indexed colors formula format:
//    interpolateColors () to interpolate colors between fixed locations,
//    distributeColors () to distribute colors evenly and interpolate them.
//  - Improved performance of function spline (), using a new cache strategy.
//  - Used new version 4.4 of scripting library modules.
//  2.1:
//  - Lifted restriction over strict ascending order in function interpolate ().
//  2.0:
//  - Added a new helper function: spline () to build a "natural" interpolating 
//    cubic spline passing through several points, similar to Photoshop's 
//    curves adjustement.
//  - Lifted validity check of bound values for HSB/HSL.
//  1.9:
//  - Added two helper functions: bias () and gain () to adjust brightness and 
//    contrast.
//  - Added a new helper function: interpolate () to interpolate color 
//    components between several points.
//  - Used new version 4.3.2 of jamColors scripting library module.
//  1.8:
//  - Allowed the use of shortened names for math functions and constants in
//    formulas.
//  1.7:
//  - Renamed HCL lightness to luminance.
//  - Used new version 4.3.1 of jamColors scripting library module.
//  1.6:
//  - Used new version 4.3 of scripting library modules.
//  - Moved color conversion functions to new jamColors module.
//	1.5:
//  - Lifted validity check of bound values for HCL.
//	1.4:
//  - Added internal helper function for formulas : lerp (linear interpolation).
//  - Restricted scope of formula eval ().
//  - Corrected a few typos.
//  - Reorganized code.
//	1.3:
//  - Changed calculation mode for HCL (no more dependency on Photoshop Lab).
//  - Changed maximum value for HCL chroma, from 100 to 128.
//  - Updated examples of color ramp formulas (JSON text files).
//	1.2:
//	- Added import and export of color ramp in JSON text format.
//  - Added creation of (approximated) gradient map adjustment layer.
//	1.1:
//	- Cleaned up code.
//  - Sanitized saved file name.
//  - Added explicit validity check of JSON file.
//  - Added CIE-LCH color model (named HCL here, to be consistent with HSL).
//	1.0:
//	- Initial release.
//------------------------------------------------------------------------------

// jamColors.jsxinc v4.4.5 (minified)
if(typeof jamColors!=='object') {var jamColors={};(function() {var namedColorsSets={"css":"w3c","svg":"w3c","w3c":{"colorClass":"RGBColor","colorNames":{"aliceblue":[240,248,255],"antiquewhite":[250,235,215],"aqua":[0,255,255],"aquamarine":[127,255,212],"azure":[240,255,255],"beige":[245,245,220],"bisque":[255,228,196],"black":[0,0,0],"blanchedalmond":[255,235,205],"blue":[0,0,255],"blueviolet":[138,43,226],"brown":[165,42,42],"burlywood":[222,184,135],"cadetblue":[95,158,160],"chartreuse":[127,255,0],"chocolate":[210,105,30],"coral":[255,127,80],"cornflowerblue":[100,149,237],"cornsilk":[255,248,220],"crimson":[220,20,60],"cyan":[0,255,255],"darkblue":[0,0,139],"darkcyan":[0,139,139],"darkgoldenrod":[184,134,11],"darkgray":[169,169,169],"darkgreen":[0,100,0],"darkgrey":"darkgray","darkkhaki":[189,183,107],"darkmagenta":[139,0,139],"darkolivegreen":[85,107,47],"darkorange":[255,140,0],"darkorchid":[153,50,204],"darkred":[139,0,0],"darksalmon":[233,150,122],"darkseagreen":[143,188,143],"darkslateblue":[72,61,139],"darkslategray":[47,79,79],"darkslategrey":"darkslategray","darkturquoise":[0,206,209],"darkviolet":[148,0,211],"deeppink":[255,20,147],"deepskyblue":[0,191,255],"dimgray":[105,105,105],"dimgrey":"dimgray","dodgerblue":[30,144,255],"firebrick":[178,34,34],"floralwhite":[255,250,240],"forestgreen":[34,139,34],"fuchsia":[255,0,255],"gainsboro":[220,220,220],"ghostwhite":[248,248,255],"gold":[255,215,0],"goldenrod":[218,165,32],"gray":[128,128,128],"green":[0,128,0],"greenyellow":[173,255,47],"grey":"gray","honeydew":[240,255,240],"hotpink":[255,105,180],"indianred":[205,92,92],"indigo":[75,0,130],"ivory":[255,255,240],"khaki":[240,230,140],"lavender":[230,230,250],"lavenderblush":[255,240,245],"lawngreen":[124,252,0],"lemonchiffon":[255,250,205],"lightblue":[173,216,230],"lightcoral":[240,128,128],"lightcyan":[224,255,255],"lightgoldenrodyellow":[250,250,210],"lightgray":[211,211,211],"lightgreen":[144,238,144],"lightgrey":"lightgray","lightpink":[255,182,193],"lightsalmon":[255,160,122],"lightseagreen":[32,178,170],"lightskyblue":[135,206,250],"lightslategray":[119,136,153],"lightslategrey":"lightslategray","lightsteelblue":[176,196,222],"lightyellow":[255,255,224],"lime":[0,255,0],"limegreen":[50,205,50],"linen":[250,240,230],"magenta":[255,0,255],"maroon":[128,0,0],"mediumaquamarine":[102,205,170],"mediumblue":[0,0,205],"mediumorchid":[186,85,211],"mediumpurple":[147,112,219],"mediumseagreen":[60,179,113],"mediumslateblue":[123,104,238],"mediumspringgreen":[0,250,154],"mediumturquoise":[72,209,204],"mediumvioletred":[199,21,133],"midnightblue":[25,25,112],"mintcream":[245,255,250],"mistyrose":[255,228,225],"moccasin":[255,228,181],"navajowhite":[255,222,173],"navy":[0,0,128],"oldlace":[253,245,230],"olive":[128,128,0],"olivedrab":[107,142,35],"orange":[255,165,0],"orangered":[255,69,0],"orchid":[218,112,214],"palegoldenrod":[238,232,170],"palegreen":[152,251,152],"paleturquoise":[175,238,238],"palevioletred":[219,112,147],"papayawhip":[255,239,213],"peachpuff":[255,218,185],"peru":[205,133,63],"pink":[255,192,203],"plum":[221,160,221],"powderblue":[176,224,230],"purple":[128,0,128],"rebeccapurple":[102,51,153],"red":[255,0,0],"rosybrown":[188,143,143],"royalblue":[65,105,225],"saddlebrown":[139,69,19],"salmon":[250,128,114],"sandybrown":[244,164,96],"seagreen":[46,139,87],"seashell":[255,245,238],"sienna":[160,82,45],"silver":[192,192,192],"skyblue":[135,206,235],"slateblue":[106,90,205],"slategray":[112,128,144],"slategrey":"slategray","snow":[255,250,250],"springgreen":[0,255,127],"steelblue":[70,130,180],"tan":[210,180,140],"teal":[0,128,128],"thistle":[216,191,216],"tomato":[255,99,71],"turquoise":[64,224,208],"violet":[238,130,238],"wheat":[245,222,179],"white":[255,255,255],"whitesmoke":[245,245,245],"yellow":[255,255,0],"yellowgreen":[154,205,50]},"fallbackColor":"black","info":["http://www.w3.org/TR/css3-color/#svg-color","https://www.w3.org/TR/css-color-4/#changes-from-3","http://www.w3.org/TR/SVG/types.html#ColorKeywords","http://en.wikipedia.org/wiki/X11_color_names"]},"x11":{"colorClass":"RGBColor","colorNames":{"aliceblue":[240,248,255],"antiquewhite":[250,235,215],"antiquewhite1":[255,239,219],"antiquewhite2":[238,223,204],"antiquewhite3":[205,192,176],"antiquewhite4":[139,131,120],"aquamarine":[127,255,212],"aquamarine1":[127,255,212],"aquamarine2":[118,238,198],"aquamarine3":[102,205,170],"aquamarine4":[69,139,116],"azure":[240,255,255],"azure1":[240,255,255],"azure2":[224,238,238],"azure3":[193,205,205],"azure4":[131,139,139],"beige":[245,245,220],"bisque":[255,228,196],"bisque1":[255,228,196],"bisque2":[238,213,183],"bisque3":[205,183,158],"bisque4":[139,125,107],"black":[0,0,0],"blanchedalmond":[255,235,205],"blue":[0,0,255],"blue1":[0,0,255],"blue2":[0,0,238],"blue3":[0,0,205],"blue4":[0,0,139],"blueviolet":[138,43,226],"brown":[165,42,42],"brown1":[255,64,64],"brown2":[238,59,59],"brown3":[205,51,51],"brown4":[139,35,35],"burlywood":[222,184,135],"burlywood1":[255,211,155],"burlywood2":[238,197,145],"burlywood3":[205,170,125],"burlywood4":[139,115,85],"cadetblue":[95,158,160],"cadetblue1":[152,245,255],"cadetblue2":[142,229,238],"cadetblue3":[122,197,205],"cadetblue4":[83,134,139],"chartreuse":[127,255,0],"chartreuse1":[127,255,0],"chartreuse2":[118,238,0],"chartreuse3":[102,205,0],"chartreuse4":[69,139,0],"chocolate":[210,105,30],"chocolate1":[255,127,36],"chocolate2":[238,118,33],"chocolate3":[205,102,29],"chocolate4":[139,69,19],"coral":[255,127,80],"coral1":[255,114,86],"coral2":[238,106,80],"coral3":[205,91,69],"coral4":[139,62,47],"cornflowerblue":[100,149,237],"cornsilk":[255,248,220],"cornsilk1":[255,248,220],"cornsilk2":[238,232,205],"cornsilk3":[205,200,177],"cornsilk4":[139,136,120],"cyan":[0,255,255],"cyan1":[0,255,255],"cyan2":[0,238,238],"cyan3":[0,205,205],"cyan4":[0,139,139],"darkblue":[0,0,139],"darkcyan":[0,139,139],"darkgoldenrod":[184,134,11],"darkgoldenrod1":[255,185,15],"darkgoldenrod2":[238,173,14],"darkgoldenrod3":[205,149,12],"darkgoldenrod4":[139,101,8],"darkgray":[169,169,169],"darkgreen":[0,100,0],"darkgrey":"darkgray","darkkhaki":[189,183,107],"darkmagenta":[139,0,139],"darkolivegreen":[85,107,47],"darkolivegreen1":[202,255,112],"darkolivegreen2":[188,238,104],"darkolivegreen3":[162,205,90],"darkolivegreen4":[110,139,61],"darkorange":[255,140,0],"darkorange1":[255,127,0],"darkorange2":[238,118,0],"darkorange3":[205,102,0],"darkorange4":[139,69,0],"darkorchid":[153,50,204],"darkorchid1":[191,62,255],"darkorchid2":[178,58,238],"darkorchid3":[154,50,205],"darkorchid4":[104,34,139],"darkred":[139,0,0],"darksalmon":[233,150,122],"darkseagreen":[143,188,143],"darkseagreen1":[193,255,193],"darkseagreen2":[180,238,180],"darkseagreen3":[155,205,155],"darkseagreen4":[105,139,105],"darkslateblue":[72,61,139],"darkslategray":[47,79,79],"darkslategray1":[151,255,255],"darkslategray2":[141,238,238],"darkslategray3":[121,205,205],"darkslategray4":[82,139,139],"darkslategrey":"darkslategray","darkslategrey1":"darkslategray1","darkslategrey2":"darkslategray2","darkslategrey3":"darkslategray3","darkslategrey4":"darkslategray4","darkturquoise":[0,206,209],"darkviolet":[148,0,211],"deeppink":[255,20,147],"deeppink1":[255,20,147],"deeppink2":[238,18,137],"deeppink3":[205,16,118],"deeppink4":[139,10,80],"deepskyblue":[0,191,255],"deepskyblue1":[0,191,255],"deepskyblue2":[0,178,238],"deepskyblue3":[0,154,205],"deepskyblue4":[0,104,139],"dimgray":[105,105,105],"dimgrey":"dimgray","dodgerblue":[30,144,255],"dodgerblue1":[30,144,255],"dodgerblue2":[28,134,238],"dodgerblue3":[24,116,205],"dodgerblue4":[16,78,139],"firebrick":[178,34,34],"firebrick1":[255,48,48],"firebrick2":[238,44,44],"firebrick3":[205,38,38],"firebrick4":[139,26,26],"floralwhite":[255,250,240],"forestgreen":[34,139,34],"gainsboro":[220,220,220],"ghostwhite":[248,248,255],"gold":[255,215,0],"gold1":[255,215,0],"gold2":[238,201,0],"gold3":[205,173,0],"gold4":[139,117,0],"goldenrod":[218,165,32],"goldenrod1":[255,193,37],"goldenrod2":[238,180,34],"goldenrod3":[205,155,29],"goldenrod4":[139,105,20],"gray":[190,190,190],"gray0":[0,0,0],"gray1":[3,3,3],"gray2":[5,5,5],"gray3":[8,8,8],"gray4":[10,10,10],"gray5":[13,13,13],"gray6":[15,15,15],"gray7":[18,18,18],"gray8":[20,20,20],"gray9":[23,23,23],"gray10":[26,26,26],"gray11":[28,28,28],"gray12":[31,31,31],"gray13":[33,33,33],"gray14":[36,36,36],"gray15":[38,38,38],"gray16":[41,41,41],"gray17":[43,43,43],"gray18":[46,46,46],"gray19":[48,48,48],"gray20":[51,51,51],"gray21":[54,54,54],"gray22":[56,56,56],"gray23":[59,59,59],"gray24":[61,61,61],"gray25":[64,64,64],"gray26":[66,66,66],"gray27":[69,69,69],"gray28":[71,71,71],"gray29":[74,74,74],"gray30":[77,77,77],"gray31":[79,79,79],"gray32":[82,82,82],"gray33":[84,84,84],"gray34":[87,87,87],"gray35":[89,89,89],"gray36":[92,92,92],"gray37":[94,94,94],"gray38":[97,97,97],"gray39":[99,99,99],"gray40":[102,102,102],"gray41":[105,105,105],"gray42":[107,107,107],"gray43":[110,110,110],"gray44":[112,112,112],"gray45":[115,115,115],"gray46":[117,117,117],"gray47":[120,120,120],"gray48":[122,122,122],"gray49":[125,125,125],"gray50":[127,127,127],"gray51":[130,130,130],"gray52":[133,133,133],"gray53":[135,135,135],"gray54":[138,138,138],"gray55":[140,140,140],"gray56":[143,143,143],"gray57":[145,145,145],"gray58":[148,148,148],"gray59":[150,150,150],"gray60":[153,153,153],"gray61":[156,156,156],"gray62":[158,158,158],"gray63":[161,161,161],"gray64":[163,163,163],"gray65":[166,166,166],"gray66":[168,168,168],"gray67":[171,171,171],"gray68":[173,173,173],"gray69":[176,176,176],"gray70":[179,179,179],"gray71":[181,181,181],"gray72":[184,184,184],"gray73":[186,186,186],"gray74":[189,189,189],"gray75":[191,191,191],"gray76":[194,194,194],"gray77":[196,196,196],"gray78":[199,199,199],"gray79":[201,201,201],"gray80":[204,204,204],"gray81":[207,207,207],"gray82":[209,209,209],"gray83":[212,212,212],"gray84":[214,214,214],"gray85":[217,217,217],"gray86":[219,219,219],"gray87":[222,222,222],"gray88":[224,224,224],"gray89":[227,227,227],"gray90":[229,229,229],"gray91":[232,232,232],"gray92":[235,235,235],"gray93":[237,237,237],"gray94":[240,240,240],"gray95":[242,242,242],"gray96":[245,245,245],"gray97":[247,247,247],"gray98":[250,250,250],"gray99":[252,252,252],"gray100":[255,255,255],"green":[0,255,0],"green1":[0,255,0],"green2":[0,238,0],"green3":[0,205,0],"green4":[0,139,0],"greenyellow":[173,255,47],"grey":"gray","grey0":"gray0","grey1":"gray1","grey2":"gray2","grey3":"gray3","grey4":"gray4","grey5":"gray5","grey6":"gray6","grey7":"gray7","grey8":"gray8","grey9":"gray9","grey10":"gray10","grey11":"gray11","grey12":"gray12","grey13":"gray13","grey14":"gray14","grey15":"gray15","grey16":"gray16","grey17":"gray17","grey18":"gray18","grey19":"gray19","grey20":"gray20","grey21":"gray21","grey22":"gray22","grey23":"gray23","grey24":"gray24","grey25":"gray25","grey26":"gray26","grey27":"gray27","grey28":"gray28","grey29":"gray29","grey30":"gray30","grey31":"gray31","grey32":"gray32","grey33":"gray33","grey34":"gray34","grey35":"gray35","grey36":"gray36","grey37":"gray37","grey38":"gray38","grey39":"gray39","grey40":"gray40","grey41":"gray41","grey42":"gray42","grey43":"gray43","grey44":"gray44","grey45":"gray45","grey46":"gray46","grey47":"gray47","grey48":"gray48","grey49":"gray49","grey50":"gray50","grey51":"gray51","grey52":"gray52","grey53":"gray53","grey54":"gray54","grey55":"gray55","grey56":"gray56","grey57":"gray57","grey58":"gray58","grey59":"gray59","grey60":"gray60","grey61":"gray61","grey62":"gray62","grey63":"gray63","grey64":"gray64","grey65":"gray65","grey66":"gray66","grey67":"gray67","grey68":"gray68","grey69":"gray69","grey70":"gray70","grey71":"gray71","grey72":"gray72","grey73":"gray73","grey74":"gray74","grey75":"gray75","grey76":"gray76","grey77":"gray77","grey78":"gray78","grey79":"gray79","grey80":"gray80","grey81":"gray81","grey82":"gray82","grey83":"gray83","grey84":"gray84","grey85":"gray85","grey86":"gray86","grey87":"gray87","grey88":"gray88","grey89":"gray89","grey90":"gray90","grey91":"gray91","grey92":"gray92","grey93":"gray93","grey94":"gray94","grey95":"gray95","grey96":"gray96","grey97":"gray97","grey98":"gray98","grey99":"gray99","grey100":"gray100","honeydew":[240,255,240],"honeydew1":[240,255,240],"honeydew2":[224,238,224],"honeydew3":[193,205,193],"honeydew4":[131,139,131],"hotpink":[255,105,180],"hotpink1":[255,110,180],"hotpink2":[238,106,167],"hotpink3":[205,96,144],"hotpink4":[139,58,98],"indianred":[205,92,92],"indianred1":[255,106,106],"indianred2":[238,99,99],"indianred3":[205,85,85],"indianred4":[139,58,58],"ivory":[255,255,240],"ivory1":[255,255,240],"ivory2":[238,238,224],"ivory3":[205,205,193],"ivory4":[139,139,131],"khaki":[240,230,140],"khaki1":[255,246,143],"khaki2":[238,230,133],"khaki3":[205,198,115],"khaki4":[139,134,78],"lavender":[230,230,250],"lavenderblush":[255,240,245],"lavenderblush1":[255,240,245],"lavenderblush2":[238,224,229],"lavenderblush3":[205,193,197],"lavenderblush4":[139,131,134],"lawngreen":[124,252,0],"lemonchiffon":[255,250,205],"lemonchiffon1":[255,250,205],"lemonchiffon2":[238,233,191],"lemonchiffon3":[205,201,165],"lemonchiffon4":[139,137,112],"lightblue":[173,216,230],"lightblue1":[191,239,255],"lightblue2":[178,223,238],"lightblue3":[154,192,205],"lightblue4":[104,131,139],"lightcoral":[240,128,128],"lightcyan":[224,255,255],"lightcyan1":[224,255,255],"lightcyan2":[209,238,238],"lightcyan3":[180,205,205],"lightcyan4":[122,139,139],"lightgoldenrod":[238,221,130],"lightgoldenrod1":[255,236,139],"lightgoldenrod2":[238,220,130],"lightgoldenrod3":[205,190,112],"lightgoldenrod4":[139,129,76],"lightgoldenrodyellow":[250,250,210],"lightgray":[211,211,211],"lightgreen":[144,238,144],"lightgrey":"lightgray","lightpink":[255,182,193],"lightpink1":[255,174,185],"lightpink2":[238,162,173],"lightpink3":[205,140,149],"lightpink4":[139,95,101],"lightsalmon":[255,160,122],"lightsalmon1":[255,160,122],"lightsalmon2":[238,149,114],"lightsalmon3":[205,129,98],"lightsalmon4":[139,87,66],"lightseagreen":[32,178,170],"lightskyblue":[135,206,250],"lightskyblue1":[176,226,255],"lightskyblue2":[164,211,238],"lightskyblue3":[141,182,205],"lightskyblue4":[96,123,139],"lightslateblue":[132,112,255],"lightslategray":[119,136,153],"lightslategrey":"lightslategray","lightsteelblue":[176,196,222],"lightsteelblue1":[202,225,255],"lightsteelblue2":[188,210,238],"lightsteelblue3":[162,181,205],"lightsteelblue4":[110,123,139],"lightyellow":[255,255,224],"lightyellow1":[255,255,224],"lightyellow2":[238,238,209],"lightyellow3":[205,205,180],"lightyellow4":[139,139,122],"limegreen":[50,205,50],"linen":[250,240,230],"magenta":[255,0,255],"magenta1":[255,0,255],"magenta2":[238,0,238],"magenta3":[205,0,205],"magenta4":[139,0,139],"maroon":[176,48,96],"maroon1":[255,52,179],"maroon2":[238,48,167],"maroon3":[205,41,144],"maroon4":[139,28,98],"mediumaquamarine":[102,205,170],"mediumblue":[0,0,205],"mediumorchid":[186,85,211],"mediumorchid1":[224,102,255],"mediumorchid2":[209,95,238],"mediumorchid3":[180,82,205],"mediumorchid4":[122,55,139],"mediumpurple":[147,112,219],"mediumpurple1":[171,130,255],"mediumpurple2":[159,121,238],"mediumpurple3":[137,104,205],"mediumpurple4":[93,71,139],"mediumseagreen":[60,179,113],"mediumslateblue":[123,104,238],"mediumspringgreen":[0,250,154],"mediumturquoise":[72,209,204],"mediumvioletred":[199,21,133],"midnightblue":[25,25,112],"mintcream":[245,255,250],"mistyrose":[255,228,225],"mistyrose1":[255,228,225],"mistyrose2":[238,213,210],"mistyrose3":[205,183,181],"mistyrose4":[139,125,123],"moccasin":[255,228,181],"navajowhite":[255,222,173],"navajowhite1":[255,222,173],"navajowhite2":[238,207,161],"navajowhite3":[205,179,139],"navajowhite4":[139,121,94],"navy":[0,0,128],"navyblue":[0,0,128],"oldlace":[253,245,230],"olivedrab":[107,142,35],"olivedrab1":[192,255,62],"olivedrab2":[179,238,58],"olivedrab3":[154,205,50],"olivedrab4":[105,139,34],"orange":[255,165,0],"orange1":[255,165,0],"orange2":[238,154,0],"orange3":[205,133,0],"orange4":[139,90,0],"orangered":[255,69,0],"orangered1":[255,69,0],"orangered2":[238,64,0],"orangered3":[205,55,0],"orangered4":[139,37,0],"orchid":[218,112,214],"orchid1":[255,131,250],"orchid2":[238,122,233],"orchid3":[205,105,201],"orchid4":[139,71,137],"palegoldenrod":[238,232,170],"palegreen":[152,251,152],"palegreen1":[154,255,154],"palegreen2":[144,238,144],"palegreen3":[124,205,124],"palegreen4":[84,139,84],"paleturquoise":[175,238,238],"paleturquoise1":[187,255,255],"paleturquoise2":[174,238,238],"paleturquoise3":[150,205,205],"paleturquoise4":[102,139,139],"palevioletred":[219,112,147],"palevioletred1":[255,130,171],"palevioletred2":[238,121,159],"palevioletred3":[205,104,137],"palevioletred4":[139,71,93],"papayawhip":[255,239,213],"peachpuff":[255,218,185],"peachpuff1":[255,218,185],"peachpuff2":[238,203,173],"peachpuff3":[205,175,149],"peachpuff4":[139,119,101],"peru":[205,133,63],"pink":[255,192,203],"pink1":[255,181,197],"pink2":[238,169,184],"pink3":[205,145,158],"pink4":[139,99,108],"plum":[221,160,221],"plum1":[255,187,255],"plum2":[238,174,238],"plum3":[205,150,205],"plum4":[139,102,139],"powderblue":[176,224,230],"purple":[160,32,240],"purple1":[155,48,255],"purple2":[145,44,238],"purple3":[125,38,205],"purple4":[85,26,139],"red":[255,0,0],"red1":[255,0,0],"red2":[238,0,0],"red3":[205,0,0],"red4":[139,0,0],"rosybrown":[188,143,143],"rosybrown1":[255,193,193],"rosybrown2":[238,180,180],"rosybrown3":[205,155,155],"rosybrown4":[139,105,105],"royalblue":[65,105,225],"royalblue1":[72,118,255],"royalblue2":[67,110,238],"royalblue3":[58,95,205],"royalblue4":[39,64,139],"saddlebrown":[139,69,19],"salmon":[250,128,114],"salmon1":[255,140,105],"salmon2":[238,130,98],"salmon3":[205,112,84],"salmon4":[139,76,57],"sandybrown":[244,164,96],"seagreen":[46,139,87],"seagreen1":[84,255,159],"seagreen2":[78,238,148],"seagreen3":[67,205,128],"seagreen4":[46,139,87],"seashell":[255,245,238],"seashell1":[255,245,238],"seashell2":[238,229,222],"seashell3":[205,197,191],"seashell4":[139,134,130],"sienna":[160,82,45],"sienna1":[255,130,71],"sienna2":[238,121,66],"sienna3":[205,104,57],"sienna4":[139,71,38],"skyblue":[135,206,235],"skyblue1":[135,206,255],"skyblue2":[126,192,238],"skyblue3":[108,166,205],"skyblue4":[74,112,139],"slateblue":[106,90,205],"slateblue1":[131,111,255],"slateblue2":[122,103,238],"slateblue3":[105,89,205],"slateblue4":[71,60,139],"slategray":[112,128,144],"slategray1":[198,226,255],"slategray2":[185,211,238],"slategray3":[159,182,205],"slategray4":[108,123,139],"slategrey":"slategray","slategrey1":"slategray1","slategrey2":"slategray2","slategrey3":"slategray3","slategrey4":"slategray4","snow":[255,250,250],"snow1":[255,250,250],"snow2":[238,233,233],"snow3":[205,201,201],"snow4":[139,137,137],"springgreen":[0,255,127],"springgreen1":[0,255,127],"springgreen2":[0,238,118],"springgreen3":[0,205,102],"springgreen4":[0,139,69],"steelblue":[70,130,180],"steelblue1":[99,184,255],"steelblue2":[92,172,238],"steelblue3":[79,148,205],"steelblue4":[54,100,139],"tan":[210,180,140],"tan1":[255,165,79],"tan2":[238,154,73],"tan3":[205,133,63],"tan4":[139,90,43],"thistle":[216,191,216],"thistle1":[255,225,255],"thistle2":[238,210,238],"thistle3":[205,181,205],"thistle4":[139,123,139],"tomato":[255,99,71],"tomato1":[255,99,71],"tomato2":[238,92,66],"tomato3":[205,79,57],"tomato4":[139,54,38],"turquoise":[64,224,208],"turquoise1":[0,245,255],"turquoise2":[0,229,238],"turquoise3":[0,197,205],"turquoise4":[0,134,139],"violet":[238,130,238],"violetred":[208,32,144],"violetred1":[255,62,150],"violetred2":[238,58,140],"violetred3":[205,50,120],"violetred4":[139,34,82],"wheat":[245,222,179],"wheat1":[255,231,186],"wheat2":[238,216,174],"wheat3":[205,186,150],"wheat4":[139,126,102],"white":[255,255,255],"whitesmoke":[245,245,245],"yellow":[255,255,0],"yellow1":[255,255,0],"yellow2":[238,238,0],"yellow3":[205,205,0],"yellow4":[139,139,0],"yellowgreen":[154,205,50]},"fallbackColor":"white","info":["http://www.thomas-guettler.de/rgb.txt.html","http://www.astrouw.edu.pl/~jskowron/colors-x11/rgb.html","file://localhost/usr/X11/share/X11/rgb.txt"]}};jamColors.defineNamedColorsSet=function(setName,setData) {var setName=setName.replace(/\s/g,"").toLowerCase();if(setName in namedColorsSets) {throw new Error("[jamColors.defineNamedColorsSet] Named colors set already exists: "+setName);} else if(setData.constructor!==Object) {throw new Error("[jamColors.defineNamedColorsSet] JavaScript object expected");} else if(!(("colorClass"in setData)&&("colorNames"in setData))) {throw new Error("[jamColors.defineNamedColorsSet] Data syntax error");} else {namedColorsSets[setName]=setData;}};function getNamedColorsSet(setName) {var setName=setName.replace(/\s/g,"").toLowerCase();if(setName in namedColorsSets) {var namedColorsSet=namedColorsSets[setName];if(typeof namedColorsSet==='string') {namedColorsSet=namedColorsSets[namedColorsSet];}} else {throw new Error("[jamColors getNamedColorsSet] Unknown named colors set: "+setName);} return namedColorsSet;} jamColors.enumerateNamedColors=function(setName,excludeVariants) {var namedColorsSet=getNamedColorsSet(setName);var colorNames=namedColorsSet["colorNames"];var names=[];for(var colorName in colorNames) {if(colorNames.hasOwnProperty(colorName)) {if((!excludeVariants)||(typeof colorNames[colorName]!=='string')) {names.push(colorName);}}} return names;};jamColors.nameToColor=function(setName,colorName,strict) {var namedColorsSet=getNamedColorsSet(setName);var colorNames=namedColorsSet["colorNames"];var colorName=colorName.replace(/\s/g,"").toLowerCase();if(!(colorName in colorNames)) {if((!strict)&&("fallbackColor"in namedColorsSet)) {colorName=namedColorsSet["fallbackColor"];} else {throw new Error("[jamColors.nameToColor] Unknown color name: "+colorName);}} var colorComponents=colorNames[colorName];return[namedColorsSet["colorClass"],(typeof colorComponents==='string')?colorNames[colorComponents]:colorComponents];};jamColors.hexToRgb=function(hexColorString) {var result=hexColorString.match(/^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/);if(result) {var rgb=result[1];if(rgb.length===3) {rgb=rgb[0]+rgb[0]+rgb[1]+rgb[1]+rgb[2]+rgb[2];} var color=[parseInt(rgb.slice(0,2),16),parseInt(rgb.slice(2,4),16),parseInt(rgb.slice(4,6),16)];} else {throw new Error("[jamColors.hexToRgb] Invalid HTML/CSS hexadecimal string: "+hexColorString);} return color;};jamColors.rgbToHex=function(rgbColor,noSign,lowercase) {if((rgbColor.constructor===Array)&&(rgbColor.length===3)) {var red=Math.round(rgbColor[0]);var green=Math.round(rgbColor[1]);var blue=Math.round(rgbColor[2]);var hexaDigits=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"];var hexColorString=(noSign)?"":"#";hexColorString+=hexaDigits[(red&0xF0)>>4]+hexaDigits[red&0x0F];hexColorString+=hexaDigits[(green&0xF0)>>4]+hexaDigits[green&0x0F];hexColorString+=hexaDigits[(blue&0xF0)>>4]+hexaDigits[blue&0x0F];if(lowercase) {hexColorString=hexColorString.toLowerCase();}} else {throw new Error("[jamColors.rgbToHex] Invalid RGB color array");} return hexColorString;};jamColors.colorToRgb=function(color) {var rgb=null;if(typeof color==='string') {color=color.trim();if(color[0]==='#') {rgb=this.hexToRgb(color);} else {var defaultSetName="W3C";var names=color.split(/[:\/]/);var setName;var colorName;if(names.length>1) {setName=names[0]||defaultSetName;colorName=names[1];} else {setName=defaultSetName;colorName=names[0];} color=this.nameToColor(setName,colorName,true);if(color[0]==="RGBColor") {rgb=color[1];} else {throw new Error("[jamColors.colorToRgb] Unsupported named color set name: "+setName);}}} else if((color.constructor===Array)&&(color.length===3)) {rgb=color;} else {throw new Error("[jamColors.colorToRgb] Invalid syntax");} return rgb;} function limit(value,min,max) {return Math.min(Math.max(min,value),max);} jamColors.hsbToRgb=function(hsbColor,hsbFloatRange,rgbFloatRange) {var hue=hsbColor[0];var saturation=hsbColor[1];var brightness=hsbColor[2];if(!hsbFloatRange) {hue/=360;saturation/=100;brightness/=100;} hue-=Math.floor(hue);saturation=limit(saturation,0.0,1.0);brightness=limit(brightness,0.0,1.0);var red;var green;var blue;var i=Math.floor(hue*6);var f=(hue*6)-i;var p=brightness*(1-saturation);var q=brightness*(1-(f*saturation));var t=brightness*(1-((1-f)*saturation));switch(i%6) {case 0:red=brightness;green=t;blue=p;break;case 1:red=q;green=brightness;blue=p;break;case 2:red=p;green=brightness;blue=t;break;case 3:red=p;green=q;blue=brightness;break;case 4:red=t;green=p;blue=brightness;break;case 5:red=brightness;green=p;blue=q;break;} if(!rgbFloatRange) {red*=255;green*=255;blue*=255;} return[red,green,blue];};jamColors.rgbToHsb=function(rgbColor,rgbFloatRange,hsbFloatRange) {var red=rgbColor[0];var green=rgbColor[1];var blue=rgbColor[2];if(!rgbFloatRange) {red/=255;green/=255;blue/=255;} red=limit(red,0.0,1.0);green=limit(green,0.0,1.0);blue=limit(blue,0.0,1.0);var min=Math.min(Math.min(red,green),blue);var max=Math.max(Math.max(red,green),blue);var delta=max-min;var hue=0;var saturation=0;var brightness=max;if(delta!==0) {saturation=delta/max;if(max===red) {hue=(0+((green-blue)/delta))/6;} else if(max===green) {hue=(2+((blue-red)/delta))/6;} else if(max===blue) {hue=(4+((red-green)/delta))/6;} if(hue<0) {hue+=1;} if(hue>1) {hue-=1;}} if(!hsbFloatRange) {hue*=360;saturation*=100;brightness*=100;} return[hue,saturation,brightness];};jamColors.hslToRgb=function(hslColor,hslFloatRange,rgbFloatRange) {var hue=hslColor[0];var saturation=hslColor[1];var lightness=hslColor[2];if(!hslFloatRange) {hue/=360;saturation/=100;lightness/=100;} hue-=Math.floor(hue);saturation=limit(saturation,0.0,1.0);lightness=limit(lightness,0.0,1.0);var red;var green;var blue;if(saturation===0) {red=green=blue=lightness;} else {function hue2rgb(p,q,t) {if(t<0)t+=1;if(t>1)t-=1;if(t<1/6)return p+((q-p)*t*6);if(t<1/2)return q;if(t<2/3)return p+((q-p)*(2/3-t)*6);return p;} var q=(lightness<0.5)?lightness*(1+saturation):lightness+saturation-(lightness*saturation);var p=(2*lightness)-q;red=hue2rgb(p,q,hue+1/3);green=hue2rgb(p,q,hue);blue=hue2rgb(p,q,hue-1/3);} if(!rgbFloatRange) {red*=255;green*=255;blue*=255;} return[red,green,blue];};jamColors.rgbToHsl=function(rgbColor,rgbFloatRange,hslFloatRange) {var red=rgbColor[0];var green=rgbColor[1];var blue=rgbColor[2];if(!rgbFloatRange) {red/=255;green/=255;blue/=255;} red=limit(red,0.0,1.0);green=limit(green,0.0,1.0);blue=limit(blue,0.0,1.0);var min=Math.min(Math.min(red,green),blue);var max=Math.max(Math.max(red,green),blue);var delta=max-min;var hue=0;var saturation=0;var lightness=(max+min)/2;if(delta!==0) {saturation=(lightness<0.5)?delta/(max+min):delta/(2-(max+min));if(max===red) {hue=(0+((green-blue)/delta))/6;} else if(max===green) {hue=(2+((blue-red)/delta))/6;} else if(max===blue) {hue=(4+((red-green)/delta))/6;} if(hue<0) {hue+=1;} if(hue>1) {hue-=1;}} if(!hslFloatRange) {hue*=360;saturation*=100;lightness*=100;} return[hue,saturation,lightness];};var whiteReference=[95.047,100.000,108.883];var t0=4/29;var t1=6/29;var t2=3*t1*t1;var t3=t1*t1*t1;function rgbToXyz(rgbColor) {var red=rgbColor[0];var green=rgbColor[1];var blue=rgbColor[2];red/=255;green/=255;blue/=255;function inverseGamma(n) {return(n>0.04045)?Math.pow((n+0.055)/1.055,2.4):n/12.92;} red=inverseGamma(red);green=inverseGamma(green);blue=inverseGamma(blue);var x=(red*0.4124564)+(green*0.3575761)+(blue*0.1804375);var y=(red*0.2126729)+(green*0.7151522)+(blue*0.0721750);var z=(red*0.0193339)+(green*0.1191920)+(blue*0.9503041);x*=100;y*=100;z*=100;return[x,y,z];} function xyzToRgb(xyzColor) {var x=xyzColor[0];var y=xyzColor[1];var z=xyzColor[2];x/=100;y/=100;z/=100;function gamma(n) {return(n>0.0031308)?1.055*Math.pow(n,1/2.4)-0.055:12.92*n;} var red=gamma((3.2404542*x)+(-1.5371385*y)+(-0.4985314*z));var green=gamma((-0.9692660*x)+(1.8760108*y)+(0.0415560*z));var blue=gamma((0.0556434*x)+(-0.2040259*y)+(1.0572252*z));red*=255;green*=255;blue*=255;return[red,green,blue];} function xyzToLab(xyzColor) {var x=xyzColor[0]/whiteReference[0];var y=xyzColor[1]/whiteReference[1];var z=xyzColor[2]/whiteReference[2];function pivot(t) {return(t>t3)?Math.pow(t,1/3):(t/t2)+t0;} x=pivot(x);y=pivot(y);z=pivot(z);var luminance=(116*y)-16;var a=500*(x-y);var b=200*(y-z);return[luminance,a,b];} function labToXyz(labColor) {var luminance=labColor[0];var a=labColor[1];var b=labColor[2];var y=(luminance+16)/116;var x=y+(a/500);var z=y-(b/200);function inversePivot(t) {return(t>t1)?t*t*t:(t-t0)*t2;} x=inversePivot(x)*whiteReference[0];y=inversePivot(y)*whiteReference[1];z=inversePivot(z)*whiteReference[2];return[x,y,z];} function labToHcl(labColor) {var luminance=labColor[0];var a=labColor[1];var b=labColor[2];var hue=Math.atan2(b,a);if(hue<0) {hue+=2*Math.PI;} hue*=180/Math.PI;var chroma=Math.sqrt((a*a)+(b*b));return[hue,chroma,luminance];} function hclToLab(hclColor) {var hue=hclColor[0];var chroma=hclColor[1];var luminance=hclColor[2];var a=Math.cos(hue*Math.PI/180)*chroma;var b=Math.sin(hue*Math.PI/180)*chroma;return[luminance,a,b];} jamColors.xyzToRgb=function(xyzColor,xyzFloatRange,rgbFloatRange) {var x=xyzColor[0];var y=xyzColor[1];var z=xyzColor[2];if(xyzFloatRange) {x*=100;y*=100;z*=100;} var rgbColor=xyzToRgb([x,y,z]);var red=rgbColor[0];var green=rgbColor[1];var blue=rgbColor[2];if(rgbFloatRange) {red/=255;green/=255;blue/=255;} return[red,green,blue];};jamColors.rgbToXyz=function(rgbColor,rgbFloatRange,xyzFloatRange) {var red=rgbColor[0];var green=rgbColor[1];var blue=rgbColor[2];if(rgbFloatRange) {red*=255;green*=255;blue*=255;} var xyzColor=rgbToXyz([red,green,blue]);var x=xyzColor[0];var y=xyzColor[1];var z=xyzColor[2];if(xyzFloatRange) {x/=100;y/=100;z/=100;} return[x,y,z];};jamColors.labToRgb=function(labColor,labFloatRange,rgbFloatRange) {var luminance=labColor[0];var a=labColor[1];var b=labColor[2];if(labFloatRange) {luminance*=100;a*=256;a-=128;b*=256;b-=128;} var rgbColor=xyzToRgb(labToXyz([luminance,a,b]));var red=rgbColor[0];var green=rgbColor[1];var blue=rgbColor[2];if(rgbFloatRange) {red/=255;green/=255;blue/=255;} return[red,green,blue];};jamColors.rgbToLab=function(rgbColor,rgbFloatRange,labFloatRange) {var red=rgbColor[0];var green=rgbColor[1];var blue=rgbColor[2];if(rgbFloatRange) {red*=255;green*=255;blue*=255;} var labColor=xyzToLab(rgbToXyz([red,green,blue]));var luminance=labColor[0];var a=labColor[1];var b=labColor[2];if(labFloatRange) {luminance/=100;a+=128;a/=256;b+=128;b/=256;} return[luminance,a,b];};jamColors.hclToRgb=function(hclColor,hclFloatRange,rgbFloatRange) {var hue=hclColor[0];var chroma=hclColor[1];var luminance=hclColor[2];if(hclFloatRange) {hue*=360;chroma*=128;luminance*=100;} var rgbColor=xyzToRgb(labToXyz(hclToLab([hue,chroma,luminance])));var red=rgbColor[0];var green=rgbColor[1];var blue=rgbColor[2];if(rgbFloatRange) {red/=255;green/=255;blue/=255;} return[red,green,blue];};jamColors.rgbToHcl=function(rgbColor,rgbFloatRange,hclFloatRange) {var red=rgbColor[0];var green=rgbColor[1];var blue=rgbColor[2];if(rgbFloatRange) {red*=255;green*=255;blue*=255;} var hclColor=labToHcl(xyzToLab(rgbToXyz([red,green,blue])));var hue=hclColor[0];var chroma=hclColor[1];var luminance=hclColor[2];if(hclFloatRange) {hue/=360;chroma/=128;luminance/=100;} return[hue,chroma,luminance];};jamColors.ycbcrToRgb=function(ycbcrColor,ycbcrFloatRange,rgbFloatRange) {var y=ycbcrColor[0];var cb=ycbcrColor[1];var cr=ycbcrColor[2];if(ycbcrFloatRange) {y*=255;cb*=255;cr*=255;} var red=y+(1.402*(cr-128));var green=y-(0.34414*(cb-128))-(0.71414*(cr-128));var blue=y+(1.772*(cb-128));if(rgbFloatRange) {red/=255;green/=255;blue/=255;} return[red,green,blue];};jamColors.rgbToYcbcr=function(rgbColor,rgbFloatRange,ycbcrFloatRange) {var red=rgbColor[0];var green=rgbColor[1];var blue=rgbColor[2];if(rgbFloatRange) {red*=255;green*=255;blue*=255;} var y=0+(0.299*red)+(0.587*green)+(0.114*blue);var cb=128-(0.168736*red)-(0.331264*green)+(0.5*blue);var cr=128+(0.5*red)-(0.418688*green)-(0.081312*blue);if(ycbcrFloatRange) {y/=255;cb/=255;cr/=255;} return[y,cb,cr];};}());}
// jamEngine.jsxinc v4.4.4 (minified)
if(typeof jamEngine!=='object') {var jamEngine={};(function() {var that;jamEngine.meaningfulIds=false;jamEngine.parseFriendly=false;jamEngine.displayDialogs=DialogModes.ERROR;var conflictingStringIdStrs={"'Algn'":["align","alignment"],"'AntA'":["antiAlias","antiAliasedPICTAcquire"],"'BckL'":["backgroundLayer","backgroundLevel"],"'BlcG'":["blackGenerationType","blackGenerationCurve"],"'BlcL'":["blackLevel","blackLimit"],"'Blks'":["blacks","blocks"],"'BlrM'":["blurMethod","blurMore"],"'BrgC'":["brightnessEvent","brightnessContrast"],"'BrsD'":["brushDetail","brushesDefine"],"'Brsh'":["brush","brushes"],"'Clcl'":["calculation","calculations"],"'ClrP'":["colorPalette","coloredPencil"],"'Cnst'":["constant","constrain"],"'CntC'":["centerCropMarks","conteCrayon"],"'Cntr'":["center","contrast"],"'CrtD'":["createDroplet","createDuplicate"],"'CstP'":["customPalette","customPhosphors"],"'Cstm'":["custom","customPattern"],"'Drkn'":["darken","darkness"],"'Dstr'":["distort","distortion","distribute","distribution"],"'Dstt'":["desaturate","destWhiteMax"],"'FlIn'":["fileInfo","fillInverse"],"'Gd  '":["good","guide"],"'GnrP'":["generalPreferences","generalPrefs","preferencesClass"],"'GrSt'":["grainStippled","graySetup"],"'Grdn'":["gradientClassEvent","gridMinor"],"'Grn '":["grain","green"],"'Grns'":["graininess","greens"],"'HstP'":["historyPreferences","historyPrefs"],"'HstS'":["historyState","historyStateSourceType"],"'ImgP'":["imageCachePreferences","imagePoint"],"'In  '":["in","stampIn"],"'IntW'":["interfaceWhite","intersectWith"],"'Intr'":["interfaceIconFrameDimmed","interlace","interpolation","intersect"],"'JPEG'":["JPEG","JPEGFormat"],"'LghD'":["lightDirection","lightDirectional"],"'LghO'":["lightOmni","lightenOnly"],"'LghS'":["lightSource","lightSpot"],"'Lns '":["lens","lines"],"'Mgnt'":["magenta","magentas"],"'MrgL'":["mergeLayers","mergedLayers"],"'Mxm '":["maximum","maximumQuality"],"'NTSC'":["NTSC","NTSCColors"],"'NmbL'":["numberOfLayers","numberOfLevels"],"'PlgP'":["pluginPicker","pluginPrefs"],"'Pncl'":["pencilEraser","pencilWidth"],"'Pnt '":["paint","point"],"'Prsp'":["perspective","perspectiveIndex"],"'PrvM'":["previewMacThumbnail","previewMagenta"],"'Pstr'":["posterization","posterize"],"'RGBS'":["RGBSetup","RGBSetupSource"],"'Rds '":["radius","reds"],"'ScrD'":["scratchDisks","screenDot"],"'ShdI'":["shadingIntensity","shadowIntensity"],"'ShpC'":["shapeCurveType","shapingCurve"],"'ShrE'":["sharpenEdges","shearEd"],"'Shrp'":["sharpen","sharpness"],"'SplC'":["splitChannels","supplementalCategories"],"'Spot'":["spot","spotColor"],"'SprS'":["separationSetup","sprayedStrokes"],"'StrL'":["strokeLength","strokeLocation"],"'Strt'":["saturation","start"],"'TEXT'":["char","textType"],"'TIFF'":["TIFF","TIFFFormat"],"'TglO'":["toggleOptionsPalette","toggleOthers"],"'TrnG'":["transparencyGamutPreferences","transparencyGrid","transparencyGridSize"],"'TrnS'":["transferSpec","transparencyShape","transparencyStop"],"'Trns'":["transparency","transparent"],"'TxtC'":["textClickPoint","textureCoverage"],"'TxtF'":["textureFile","textureFill"],"'UsrM'":["userMaskEnabled","userMaskOptions"],"'c@#^'":["inherits","pInherits"],"'comp'":["comp","sInt64"],"'doub'":["floatType","IEEE64BitFloatingPoint","longFloat"],"'long'":["integer","longInteger","sInt32"],"'magn'":["magnitude","uInt32"],"'null'":["null","target"],"'shor'":["sInt16","sMInt","shortInteger"],"'sing'":["IEEE32BitFloatingPoint","sMFloat","shortFloat"]};jamEngine.getConflictingStringIdStrs=function(charIdStr) {return conflictingStringIdStrs[charIdStr]||null;};jamEngine.uniIdStrToId=function(uniIdStr) {var id=0;if(typeof uniIdStr==='string') {if((uniIdStr.length===(1+4+1))&&(uniIdStr.charAt(0)==="'")&&(uniIdStr.charAt(5)==="'")) {id=app.charIDToTypeID(uniIdStr.substring(1,5));} else {id=app.stringIDToTypeID(uniIdStr);}} return id;};var smallestHashValue=app.charIDToTypeID("    ");jamEngine.idToUniIdStrs=function(id) {var charIdStr="";var stringIdStr=app.typeIDToStringID(id);if(id>=smallestHashValue) {charIdStr="'"+app.typeIDToCharID(id)+"'";if(stringIdStr!=="") {if(charIdStr in conflictingStringIdStrs) {stringIdStr=conflictingStringIdStrs[charIdStr];}}} return[charIdStr,stringIdStr];};jamEngine.equivalentUniIdStrs=function(uniIdStr1,uniIdStr2) {return this.uniIdStrToId(uniIdStr1)===this.uniIdStrToId(uniIdStr2);};function putInReference(ref,containers) {if(containers.constructor===Array) {var count=containers.length;for(var i=0;i<count;i++) {var container=that.parseCompact(containers[i]);var desiredClassId=that.uniIdStrToId(container[0]);var typedValue=that.parseCompact(container[1]);var form=typedValue[0];var value=typedValue[1];switch(form) {case"<class>":ref.putClass(desiredClassId);break;case"<enumerated>":var enumerated=that.parseCompact(value);ref.putEnumerated(desiredClassId,that.uniIdStrToId(enumerated[0]),that.uniIdStrToId(enumerated[1]));break;case"<identifier>":ref.putIdentifier(desiredClassId,value);break;case"<index>":ref.putIndex(desiredClassId,value);break;case"<name>":ref.putName(desiredClassId,value);break;case"<offset>":ref.putOffset(desiredClassId,value);break;case"<property>":ref.putProperty(desiredClassId,that.uniIdStrToId(value));break;default:throw new Error("[jamEngine putInReference] Unknown reference form: "+form);break;}}} else {throw new Error("[jamEngine putInReference] JavaScript array expected");}} function putInList(list,items) {if(items.constructor===Array) {var count=items.length;for(var i=0;i<count;i++) {var item=that.parseCompact(items[i]);var type=item[0];var value=item[1];switch(type) {case"<boolean>":list.putBoolean(value);break;case"<class>":list.putClass(that.uniIdStrToId(value));break;case"<data>":list.putData(value);break;case"<double>":list.putDouble(value);break;case"<enumerated>":var enumerated=that.parseCompact(value);list.putEnumerated(that.uniIdStrToId(enumerated[0]),that.uniIdStrToId(enumerated[1]));break;case"<integer>":list.putInteger(value);break;case"<largeInteger>":list.putLargeInteger(value);break;case"<list>":var actionList=new ActionList();putInList(actionList,value);list.putList(actionList);break;case"<object>":var object=that.parseCompact(value);if(object[1]) {var actionDescriptor=new ActionDescriptor();putInDescriptor(actionDescriptor,object[1]);list.putObject(that.uniIdStrToId(object[0]),actionDescriptor);} else {list.putClass(that.uniIdStrToId(object[0]));} break;case"<path>":var fileRef=new File(value);list.putPath(fileRef);break;case"<reference>":var actionReference=new ActionReference();putInReference(actionReference,value);list.putReference(actionReference);break;case"<string>":list.putString(value);break;case"<unitDouble>":var unitDouble=that.parseCompact(value);list.putUnitDouble(that.uniIdStrToId(unitDouble[0]),unitDouble[1]);break;default:throw new Error("[jamEngine putInList] Unknown list type: "+type);break;}}} else {throw new Error("[jamEngine putInList] JavaScript array expected");}} function putInDescriptor(desc,members) {if(members.constructor===Object) {for(var key in members) {if(members.hasOwnProperty(key)) {var keyID=that.uniIdStrToId(key);var member=that.parseCompact(members[key]);var type=member[0];var value=member[1];switch(type) {case"<boolean>":desc.putBoolean(keyID,value);break;case"<class>":desc.putClass(keyID,that.uniIdStrToId(value));break;case"<data>":desc.putData(keyID,value);break;case"<double>":desc.putDouble(keyID,value);break;case"<enumerated>":var enumerated=that.parseCompact(value);desc.putEnumerated(keyID,that.uniIdStrToId(enumerated[0]),that.uniIdStrToId(enumerated[1]));break;case"<integer>":desc.putInteger(keyID,value);break;case"<largeInteger>":desc.putLargeInteger(keyID,value);break;case"<list>":var actionList=new ActionList();putInList(actionList,value);desc.putList(keyID,actionList);break;case"<object>":var object=that.parseCompact(value);if(object[1]) {var actionDescriptor=new ActionDescriptor();putInDescriptor(actionDescriptor,object[1]);desc.putObject(keyID,that.uniIdStrToId(object[0]),actionDescriptor);} else {desc.putClass(keyID,that.uniIdStrToId(object[0]));} break;case"<path>":var fileRef=new File(value);desc.putPath(keyID,fileRef);break;case"<reference>":var actionReference=new ActionReference();putInReference(actionReference,value);desc.putReference(keyID,actionReference);break;case"<string>":desc.putString(keyID,value);break;case"<unitDouble>":var unitDouble=that.parseCompact(value);desc.putUnitDouble(keyID,that.uniIdStrToId(unitDouble[0]),unitDouble[1]);break;default:throw new Error("[jamEngine putInDescriptor] Unknown descriptor type: "+type);break;}}}} else {throw new Error("[jamEngine putInDescriptor] JavaScript object expected");}} var contextRules={"'Algn'":{"<classKey>":{"bevelEmboss":"align","frameFX":"align","gradientFill":"align","gradientLayer":"align","patternFill":"align","patternLayer":"align"},"<event>":"align","<key>":"alignment"},"'AntA'":{"<class>":"antiAliasedPICTAcquire","<key>":"antiAlias"},"'BckL'":{"<class>":"backgroundLayer","<key>":"backgroundLevel"},"'BlcG'":{"<enumType>":"blackGenerationType","<key>":"blackGenerationCurve"},"'BlcL'":{"<classKey>":{"'GEfc'":"blackLevel","CMYKSetup":"blackLimit"},"<eventKey>":{"reticulation":"blackLevel"}},"'Blks'":{"<typeValue>":{"colors":"blacks","extrudeType":"blocks"}},"'BlrM'":{"<enumType>":"blurMethod","<event>":"blurMore","<key>":"blurMethod"},"'BrgC'":{"<class>":"brightnessContrast","<event>":"brightnessContrast"},"'BrsD'":{"<enumValue>":"brushesDefine","<key>":"brushDetail"},"'Brsh'":{"<class>":"brush","<key>":"brushes"},"'Clcl'":{"<class>":"calculation","<enumValue>":"calculations","<key>":"calculation"},"'ClrP'":{"<typeValue>":{"'GEft'":"coloredPencil"},"<enumType>":"colorPalette","<event>":"coloredPencil"},"'Cnst'":{"<classKey>":{"channelMatrix":"constant"},"<unknown>":"constrain"},"'CntC'":{"<typeValue>":{"'GEft'":"conteCrayon"},"<event>":"conteCrayon","<key>":"centerCropMarks"},"'Cntr'":{"<classKey>":{"'GEfc'":"contrast","brightnessContrast":"contrast","document":"center","polygon":"center","quadrilateral":"center"},"<eventKey>":{"adaptCorrect":"contrast","brightnessEvent":"contrast","grain":"contrast","halftoneScreen":"contrast","sumie":"contrast","tornEdges":"contrast","waterPaper":"contrast"},"<enumValue>":"center"},"'CrtD'":{"<enumValue>":"createDuplicate","<event>":"createDroplet"},"'CstP'":{"<class>":"customPhosphors","<key>":"customPalette"},"'Cstm'":{"<enumValue>":"customPattern","<event>":"custom","<key>":"custom"},"'Drkn'":{"<enumValue>":"darken","<key>":"darkness"},"'Dstr'":{"<classKey>":{"'GEfc'":"distortion"},"<eventKey>":{"glass":"distortion","addNoise":"distribution"},"<enumType>":"distribution","<enumValue>":"distort","<event>":"distribute"},"'Dstt'":{"<enumValue>":"desaturate","<event>":"desaturate","<key>":"destWhiteMax"},"'FlIn'":{"<typeValue>":{"fillColor":"fillInverse","menuItemType":"fileInfo"},"<class>":"fileInfo","<key>":"fileInfo"},"'Gd  '":{"<class>":"guide","<enumValue>":"good"},"'GnrP'":{"<class>":"preferencesClass","<enumValue>":"generalPreferences","<key>":"generalPrefs"},"'GrSt'":{"<class>":"graySetup","<enumValue>":"grainStippled","<key>":"graySetup"},"'Grdn'":{"<class>":"gradientClassEvent","<event>":"gradientClassEvent","<key>":"gridMinor"},"'Grn '":{"<typeValue>":{"'GEft'":"grain"},"<classKey>":{"'GEfc'":"grain","RGBColor":"green","blackAndWhite":"green","channelMatrix":"green","channelMixer":"green"},"<eventKey>":{"blackAndWhite":"green","channelMixer":"green","filmGrain":"grain"},"<enumValue>":"green","<event>":"grain"},"'Grns'":{"<enumValue>":"greens","<key>":"graininess"},"'HstP'":{"<enumValue>":"historyPreferences","<key>":"historyPrefs"},"'HstS'":{"<class>":"historyState","<enumType>":"historyStateSourceType"},"'ImgP'":{"<class>":"imagePoint","<enumValue>":"imageCachePreferences"},"'In  '":{"<enumValue>":"stampIn","<key>":"in"},"'IntW'":{"<event>":"intersectWith","<key>":"interfaceWhite"},"'Intr'":{"<typeValue>":{"shapeOperation":"intersect"},"<classKey>":{"GIFFormat":"interlace","SaveForWeb":"interlace","application":"interfaceIconFrameDimmed","computedBrush":"interpolation","dBrush":"interpolation","gradientClassEvent":"interpolation","photoshopEPSFormat":"interpolation","sampledBrush":"interpolation"},"<eventKey>":{"convertMode":"interpolation","imageSize":"interpolation","transform":"interpolation"},"<event>":"intersect"},"'JPEG'":{"<class>":"JPEGFormat","<enumValue>":"JPEG"},"'LghD'":{"<enumType>":"lightDirection","<enumValue>":"lightDirectional","<key>":"lightDirection"},"'LghO'":{"<typeValue>":{"diffuseMode":"lightenOnly","lightType":"lightOmni"}},"'LghS'":{"<class>":"lightSource","<enumValue>":"lightSpot","<key>":"lightSource"},"'Lns '":{"<enumType>":"lens","<enumValue>":"lines","<key>":"lens"},"'Mgnt'":{"<typeValue>":{"channel":"magenta","colors":"magentas","guideGridColor":"magenta"},"<key>":"magenta"},"'MrgL'":{"<enumValue>":"mergedLayers","<event>":"mergeLayers"},"'Mxm '":{"<enumValue>":"maximumQuality","<event>":"maximum","<key>":"maximum"},"'NTSC'":{"<enumValue>":"NTSC","<event>":"NTSCColors"},"'NmbL'":{"<classKey>":{"'GEfc'":"numberOfLevels","document":"numberOfLayers"},"<eventKey>":{"cutout":"numberOfLevels"}},"'PlgP'":{"<class>":"pluginPrefs","<enumValue>":"pluginPicker","<key>":"pluginPrefs"},"'Pncl'":{"<enumValue>":"pencilEraser","<key>":"pencilWidth"},"'Pnt '":{"<typeValue>":{"textType":"point"},"<class>":"point","<event>":"paint"},"'Prsp'":{"<enumValue>":"perspective","<key>":"perspectiveIndex"},"'PrvM'":{"<enumValue>":"previewMagenta","<key>":"previewMacThumbnail"},"'Pstr'":{"<class>":"posterize","<event>":"posterize","<key>":"posterization"},"'RGBS'":{"<enumType>":"RGBSetupSource","<key>":"RGBSetup"},"'Rds '":{"<enumValue>":"reds","<key>":"radius"},"'ScrD'":{"<enumValue>":"screenDot","<key>":"scratchDisks"},"'ShdI'":{"<classKey>":{"'GEfc'":"shadowIntensity"},"<eventKey>":{"watercolor":"shadowIntensity"},"<unknown>":"shadingIntensity"},"'ShpC'":{"<classKey>":{"application":"shapingCurve"},"<class>":"shapingCurve","<key>":"shapeCurveType"},"'ShrE'":{"<event>":"sharpenEdges","<key>":"shearEd"},"'Shrp'":{"<event>":"sharpen","<key>":"sharpness"},"'SplC'":{"<event>":"splitChannels","<key>":"supplementalCategories"},"'Spot'":{"<enumValue>":"spotColor","<key>":"spot"},"'SprS'":{"<typeValue>":{"'GEft'":"sprayedStrokes"},"<enumValue>":"separationSetup","<event>":"sprayedStrokes"},"'StrL'":{"<enumType>":"strokeLocation","<key>":"strokeLength"},"'Strt'":{"<classKey>":{"currentToolOptions":"saturation","fileNamingRules":"start","HSBColorClass":"saturation","hueSatAdjustment":"saturation","hueSatAdjustmentV2":"saturation","lineClass":"start","range":"start","vibrance":"saturation"},"<eventKey>":{"replaceColor":"saturation","variations":"saturation","vibrance":"saturation"},"<enumValue>":"saturation"},"'TEXT'":{"<enumType>":"textType","<key>":"textType"},"'TIFF'":{"<class>":"TIFFFormat","<enumValue>":"TIFF"},"'TglO'":{"<enumValue>":"toggleOptionsPalette","<key>":"toggleOthers"},"'TrnG'":{"<classKey>":{"application":"transparencyGrid","transparencyPrefs":"transparencyGridSize"},"<enumType>":"transparencyGridSize","<enumValue>":"transparencyGamutPreferences"},"'TrnS'":{"<classKey>":{"bevelEmboss":"transparencyShape","dropShadow":"transparencyShape","innerGlow":"transparencyShape","innerShadow":"transparencyShape","outerGlow":"transparencyShape"},"<class>":"transparencyStop","<unknown>":"transferSpec"},"'Trns'":{"<enumValue>":"transparent","<key>":"transparency"},"'TxtC'":{"<classKey>":{"'GEfc'":"textureCoverage","textLayer":"textClickPoint"},"<eventKey>":{"underpainting":"textureCoverage"}},"'TxtF'":{"<event>":"textureFill","<key>":"textureFile"},"'UsrM'":{"<enumType>":"userMaskOptions","<key>":"userMaskEnabled"},"'null'":{"<class>":"null","<enumValue>":"null","<event>":"null","<key>":"target"}};function getFromId(context,parentContext) {var uniIdStr;var kind=context[0];var id=context[1];if(id<smallestHashValue) {uniIdStr=app.typeIDToStringID(id);} else {uniIdStr="'"+app.typeIDToCharID(id)+"'";if(that.meaningfulIds) {if(uniIdStr in contextRules) {function resolveIdStr(candidates) {var idStr="";for(var parentString in candidates) {if(candidates.hasOwnProperty(parentString)) {if(parentContext[1]===that.uniIdStrToId(parentString)) {idStr=candidates[parentString];break;}}} return idStr;} var resolvedIdStr="";var rule=contextRules[uniIdStr];if(parentContext) {switch(kind) {case"<key>":if((parentContext[0]==="<class>")&&("<classKey>"in rule)) {resolvedIdStr=resolveIdStr(rule["<classKey>"]);} else if((parentContext[0]==="<event>")&&("<eventKey>"in rule)) {resolvedIdStr=resolveIdStr(rule["<eventKey>"]);} break;case"<enumValue>":if((parentContext[0]==="<enumType>")&&("<typeValue>"in rule)) {resolvedIdStr=resolveIdStr(rule["<typeValue>"]);} break;}} if(resolvedIdStr!=="") {uniIdStr=resolvedIdStr;} else if(kind in rule) {uniIdStr=rule[kind];}} else {var stringIDStr=app.typeIDToStringID(id);if(stringIDStr!=="") {uniIdStr=stringIDStr;}}}} return uniIdStr;} var incompatiblePlatformPath="";var getEventId=app.stringIDToTypeID("get");var targetKeyId=app.stringIDToTypeID("target");var propertyClassId=app.stringIDToTypeID("property");function getFromReference(ref) {var propertyId=0;var arr=[];do {try{var desiredClassId=ref.getDesiredClass();}catch(e){break;} if(propertyId!==0) {var propertyCompact=that.buildCompact("<property>",getFromId(["<key>",propertyId],["<class>",desiredClassId]));arr.push(that.buildCompact(getFromId(["<class>",propertyClassId]),propertyCompact));propertyId=0;} var desiredCompact;var aFormID=ref.getForm();switch(aFormID) {case ReferenceFormType.CLASSTYPE:desiredCompact=that.buildCompact("<class>",null);break;case ReferenceFormType.ENUMERATED:var enumTypeContext=["<enumType>",ref.getEnumeratedType()];var enumValueContext=["<enumValue>",ref.getEnumeratedValue()];desiredCompact=that.buildCompact("<enumerated>",that.buildCompact(getFromId(enumTypeContext),getFromId(enumValueContext,enumTypeContext)));break;case ReferenceFormType.IDENTIFIER:desiredCompact=that.buildCompact("<identifier>",ref.getIdentifier());break;case ReferenceFormType.INDEX:desiredCompact=that.buildCompact("<index>",ref.getIndex());break;case ReferenceFormType.NAME:desiredCompact=that.buildCompact("<name>",ref.getName());break;case ReferenceFormType.OFFSET:desiredCompact=that.buildCompact("<offset>",ref.getOffset());break;case ReferenceFormType.PROPERTY:if(desiredClassId===propertyClassId) {propertyId=ref.getProperty();} else {desiredCompact=that.buildCompact("<property>",getFromId(["<key>",ref.getProperty()],["<class>",desiredClassId]));} break;default:throw new Error("[jamEngine getFromReference] Unknown reference form type: "+aFormID);break;} if(desiredClassId!==propertyClassId) {arr.push(that.buildCompact(getFromId(["<class>",desiredClassId]),desiredCompact));} ref=ref.getContainer();} while(ref);return arr;} function getFromList(list) {var arr=[];var itemCount=list.count;for(var itemIndex=0;itemIndex<itemCount;itemIndex++) {var itemCompact;var typeID;try{typeID=list.getType(itemIndex);}catch(e){continue;} switch(typeID) {case DescValueType.BOOLEANTYPE:itemCompact=that.buildCompact("<boolean>",list.getBoolean(itemIndex));break;case DescValueType.CLASSTYPE:itemCompact=that.buildCompact("<class>",getFromId(["<class>",list.getClass(itemIndex)]));break;case DescValueType.DOUBLETYPE:itemCompact=that.buildCompact("<double>",list.getDouble(itemIndex));break;case DescValueType.ENUMERATEDTYPE:var enumTypeContext=["<enumType>",list.getEnumerationType(itemIndex)];var enumValueContext=["<enumValue>",list.getEnumerationValue(itemIndex)];itemCompact=that.buildCompact("<enumerated>",that.buildCompact(getFromId(enumTypeContext),getFromId(enumValueContext,enumTypeContext)));break;case DescValueType.INTEGERTYPE:itemCompact=that.buildCompact("<integer>",list.getInteger(itemIndex));break;case DescValueType.LISTTYPE:itemCompact=that.buildCompact("<list>",getFromList(list.getList(itemIndex)));break;case DescValueType.OBJECTTYPE:var objectTypeContext=["<class>",list.getObjectType(itemIndex)];var objectValue=list.getObjectValue(itemIndex);itemCompact=that.buildCompact("<object>",that.buildCompact(getFromId(objectTypeContext),getFromDescriptor(objectValue,objectTypeContext)));break;case DescValueType.ALIASTYPE:try {var fileRef=list.getPath(itemIndex);itemCompact=that.buildCompact("<path>",fileRef.fsName);} catch(e) {itemCompact=that.buildCompact("<path>",incompatiblePlatformPath);} break;case DescValueType.REFERENCETYPE:itemCompact=that.buildCompact("<reference>",getFromReference(list.getReference(itemIndex)));break;case DescValueType.STRINGTYPE:itemCompact=that.buildCompact("<string>",list.getString(itemIndex));break;case DescValueType.UNITDOUBLE:var unitTypeContext=["<unit>",list.getUnitDoubleType(itemIndex)];var doubleValue=list.getUnitDoubleValue(itemIndex);itemCompact=that.buildCompact("<unitDouble>",that.buildCompact(getFromId(unitTypeContext),doubleValue));break;default:var isRawType;var isLargeIntegerType;try{isRawType=(typeID===DescValueType.RAWTYPE);}catch(e){} try{isLargeIntegerType=(typeID===DescValueType.LARGEINTEGERTYPE);}catch(e){} if(isRawType) {itemCompact=that.buildCompact("<data>",list.getData(itemIndex));} else if(isLargeIntegerType) {itemCompact=that.buildCompact("<largeInteger>",list.getLargeInteger(itemIndex));} else {throw new Error("[jamEngine getFromList] Unknown descriptor value type: "+typeID);} break;} arr[itemIndex]=itemCompact;} return arr;} function getFromDescriptor(desc,parentContext) {if(desc) {var obj={};var keyCount;try{keyCount=desc.count;}catch(e){return null;} for(var keyIndex=0;keyIndex<keyCount;keyIndex++) {var keyID=desc.getKey(keyIndex);var keyString=getFromId(["<key>",keyID],parentContext);var keyCompact;var typeID;try{typeID=desc.getType(keyID);}catch(e){continue;} switch(typeID) {case DescValueType.BOOLEANTYPE:keyCompact=that.buildCompact("<boolean>",desc.getBoolean(keyID));break;case DescValueType.CLASSTYPE:keyCompact=that.buildCompact("<class>",getFromId(["<class>",desc.getClass(keyID)]));break;case DescValueType.DOUBLETYPE:keyCompact=that.buildCompact("<double>",desc.getDouble(keyID));break;case DescValueType.ENUMERATEDTYPE:var enumTypeContext=["<enumType>",desc.getEnumerationType(keyID)];var enumValueContext=["<enumValue>",desc.getEnumerationValue(keyID)];keyCompact=that.buildCompact("<enumerated>",that.buildCompact(getFromId(enumTypeContext),getFromId(enumValueContext,enumTypeContext)));break;case DescValueType.INTEGERTYPE:keyCompact=that.buildCompact("<integer>",desc.getInteger(keyID));break;case DescValueType.LISTTYPE:keyCompact=that.buildCompact("<list>",getFromList(desc.getList(keyID)));break;case DescValueType.OBJECTTYPE:var objectTypeContext=["<class>",desc.getObjectType(keyID)];var objectValue=desc.getObjectValue(keyID);keyCompact=that.buildCompact("<object>",that.buildCompact(getFromId(objectTypeContext),getFromDescriptor(objectValue,objectTypeContext)));break;case DescValueType.ALIASTYPE:try {var fileRef=desc.getPath(keyID);keyCompact=that.buildCompact("<path>",fileRef.fsName);} catch(e) {keyCompact=that.buildCompact("<path>",incompatiblePlatformPath);} break;case DescValueType.REFERENCETYPE:keyCompact=that.buildCompact("<reference>",getFromReference(desc.getReference(keyID)));break;case DescValueType.STRINGTYPE:keyCompact=that.buildCompact("<string>",desc.getString(keyID));break;case DescValueType.UNITDOUBLE:var unitTypeContext=["<unit>",desc.getUnitDoubleType(keyID)];var doubleValue=desc.getUnitDoubleValue(keyID);keyCompact=that.buildCompact("<unitDouble>",that.buildCompact(getFromId(unitTypeContext),doubleValue));break;default:var isRawType;var isLargeIntegerType;try{isRawType=(typeID===DescValueType.RAWTYPE);}catch(e){} try{isLargeIntegerType=(typeID===DescValueType.LARGEINTEGERTYPE);}catch(e){} if(isRawType) {keyCompact=that.buildCompact("<data>",desc.getData(keyID));} else if(isLargeIntegerType) {keyCompact=that.buildCompact("<largeInteger>",desc.getLargeInteger(keyID));} else {throw new Error("[jamEngine getFromDescriptor] Unknown descriptor value type: "+typeID);} break;} obj[keyString]=keyCompact;} return obj;} else {return null;}} jamEngine.jsonToActionDescriptor=function(descriptorObj) {that=this;var actionDescriptor;if(descriptorObj) {actionDescriptor=new ActionDescriptor();putInDescriptor(actionDescriptor,descriptorObj);} return actionDescriptor;};jamEngine.jsonToActionReference=function(referenceArr) {that=this;var actionReference;if(referenceArr) {actionReference=new ActionReference();putInReference(actionReference,referenceArr);} return actionReference;};jamEngine.eventIdAndActionDescriptorToJson=function(eventId,actionDescriptor) {that=this;var eventIdContext=["<event>",eventId];return{"<event>":getFromId(eventIdContext),"<descriptor>":getFromDescriptor(actionDescriptor,eventIdContext)};};jamEngine.classIdAndActionDescriptorToJson=function(classId,actionDescriptor) {that=this;var classIdContext=["<class>",classId];return{"<class>":getFromId(classIdContext),"<descriptor>":getFromDescriptor(actionDescriptor,classIdContext)};};jamEngine.actionReferenceToJson=function(actionReference) {that=this;return getFromReference(actionReference);};function getReferenceClassId(ref) {classId=0;do {try{var desiredClassId=ref.getDesiredClass();}catch(e){break;} if(desiredClassId!==propertyClassId) {classId=desiredClassId;break;} ref=ref.getContainer();} while(ref);return classId;} jamEngine.jsonPlay=function(eventUniIdStr,descriptorObj,displayDialogs) {var eventId=this.uniIdStrToId(eventUniIdStr);var desc=this.jsonToActionDescriptor(descriptorObj);var parentContext;if(eventId===getEventId) {var ref=desc.getReference(targetKeyId);parentContext=["<class>",getReferenceClassId(ref)];} else {parentContext=["<event>",eventId];} return getFromDescriptor(app.executeAction(eventId,desc,displayDialogs||this.displayDialogs),parentContext);};jamEngine.jsonGet=function(referenceArr) {var ref=this.jsonToActionReference(referenceArr);return getFromDescriptor(app.executeActionGet(ref),["<class>",getReferenceClassId(ref)]);};jamEngine.normalizeJsonItem=function(item,options) {function normalizeItem(item) {var explicit=that.parseCompact(item);var type=explicit[0];var value=explicit[1];var normalizedValue;switch(type) {case"<boolean>":case"<data>":case"<double>":case"<identifier>":case"<index>":case"<integer>":case"<largeInteger>":case"<name>":case"<offset>":case"<path>":case"<string>":normalizedValue=value;break;case"<class>":normalizedValue=value&&getFromId(["<class>",that.uniIdStrToId(value)]);break;case"<enumerated>":var enumerated=that.parseCompact(value);var enumTypeContext=["<enumType>",that.uniIdStrToId(enumerated[0])];var enumValueContext=["<enumValue>",that.uniIdStrToId(enumerated[1])];normalizedValue=that.buildCompact(getFromId(enumTypeContext),getFromId(enumValueContext,enumTypeContext));break;case"<list>":normalizedValue=[];for(var i=0;i<value.length;i++) {normalizedValue.push(normalizeItem(value[i]));} break;case"<object>":var object=that.parseCompact(value);var objectClassContext=["<class>",that.uniIdStrToId(object[0])];var objectDescriptor=object[1];var normalizedDescriptor;if(objectDescriptor===null) {normalizedDescriptor=null;} else {normalizedDescriptor={};for(var key in objectDescriptor) {if(objectDescriptor.hasOwnProperty(key)) {var objectKeyContext=["<key>",that.uniIdStrToId(key)];normalizedDescriptor[getFromId(objectKeyContext,objectClassContext)]=normalizeItem(objectDescriptor[key]);}}} normalizedValue=that.buildCompact(getFromId(objectClassContext),normalizedDescriptor);break;case"<property>":normalizedValue=getFromId(["<key>",that.uniIdStrToId(value)]);break;case"<reference>":normalizedValue=[];for(var i=0;i<value.length;i++) {var container=that.parseCompact(value[i]);normalizedValue.push(that.buildCompact(getFromId(["<class>",that.uniIdStrToId(container[0])]),normalizeItem(container[1])));} break;case"<unitDouble>":var unitDouble=that.parseCompact(value);var unitTypeContext=["<unit>",that.uniIdStrToId(unitDouble[0])];normalizedValue=that.buildCompact(getFromId(unitTypeContext),unitDouble[1]);break;default:throw new Error("[jamEngine.normalizeJsonItem] Unknown item type: "+type);break;} return that.buildCompact(type,normalizedValue);} that=this;var saveMeaningfulIds=this.meaningfulIds;var saveParseFriendly=this.parseFriendly;if(options&&(options.constructor===Object)) {if(typeof options.meaningfulIds!=='undefined') {this.meaningfulIds=options.meaningfulIds;} if(typeof options.parseFriendly!=='undefined') {this.parseFriendly=options.parseFriendly;}} var normalizedItem=normalizeItem(item);this.meaningfulIds=saveMeaningfulIds;this.parseFriendly=saveParseFriendly;return normalizedItem;};function simplifyRef(ref) {var simplifiedRef=[];for(var i=0;i<ref.length;i++) {var element=ref[i];var simplifiedElement={};var desiredClass=element[0];var form=element[1][0];var value=element[1][1];switch(form) {case"<class>":case"<identifier>":case"<index>":case"<name>":case"<offset>":case"<property":simplifiedElement[desiredClass]=value;break;case"<enumerated>":simplifiedElement[desiredClass]=value[1];break;default:throw new Error("[jamEngine simplifyRef] Unexpected element form: "+form);break;} simplifiedRef.push(simplifiedElement);} return simplifiedRef;} function simplifyItem(item,hook) {var simplifiedItem;var type=item[0];var value=item[1];switch(type) {case"<boolean>":case"<class>":case"<data>":case"<double>":case"<integer>":case"<largeInteger>":case"<path>":case"<string>":simplifiedItem=value;break;case"<list>":simplifiedItem=simplifyList(value,hook);break;case"<enumerated>":case"<unitDouble>":simplifiedItem=value[1];break;case"<object>":simplifiedItem=simplifyDesc(value[1],hook);break;case"<reference>":simplifiedItem=simplifyRef(value);break;default:throw new Error("[jamEngine simplifyItem] Unexpected item type: "+type);break;} return simplifiedItem;} function simplifyList(list,hook) {var simplifiedList=[];for(var i=0;i<list.length;i++) {simplifiedList.push(simplifyItem(list[i],hook));} return simplifiedList;} function simplifyDesc(desc,hook) {var getDefaultValue=function(desc,key){return simplifyItem(desc[key],hook);};var simplifiedDesc={};for(var key in desc) {if(desc.hasOwnProperty(key)) {var value=undefined;if(typeof hook==='function') {value=hook(desc,key,getDefaultValue);} if(typeof value==='undefined') {value=simplifyItem(desc[key],hook);} simplifiedDesc[key]=value;}} return simplifiedDesc;} jamEngine.simplifyObject=function(object,hookFunction) {return simplifyDesc((this.normalizeJsonItem(object,{meaningfulIds:true,parseFriendly:true}))[1][1],hookFunction);};jamEngine.simplifyList=function(list,hookFunction) {return simplifyList((this.normalizeJsonItem(list,{meaningfulIds:true,parseFriendly:true}))[1],hookFunction);};jamEngine.parseCompact=function(compact) {var result=[];if(compact.constructor===Object) {var keys=[];for(var k in compact) {if(compact.hasOwnProperty(k)) {keys.push(k);}} if(keys.length===1) {result[0]=keys[0];result[1]=compact[keys[0]];} else {throw new Error("[jamEngine.parseCompact] Syntax error: "+compact.toSource());}} else if(compact.constructor===Array) {if(compact.length===2) {result[0]=compact[0];result[1]=compact[1];} else {throw new Error("[jamEngine.parseCompact] Syntax error: "+compact.toSource());}} else {throw new Error("[jamEngine.parseCompact] JavaScript object or array expected");} return result;};jamEngine.compactToExplicit=function(compact,typeKey,valueKey) {var explicit={};var typeValue=this.parseCompact(compact);explicit[typeKey||"<type>"]=typeValue[0];explicit[valueKey||"<value>"]=typeValue[1];return explicit;};jamEngine.buildCompact=function(type,value) {var compact;if(typeof type==='string') {if(this.parseFriendly) {compact=[type,value];} else {compact={};compact[type]=value;}} else {throw new Error("[jamEngine.buildCompact] String expected");} return compact;};jamEngine.explicitToCompact=function(explicit,typeKey,valueKey) {var compact;if(explicit.constructor===Object) {compact=this.buildCompact(explicit[typeKey||"<type>"],explicit[valueKey||"<value>"]);} else {throw new Error("[jamEngine.explicitToCompact] JavaScript object expected");} return compact;};for(var charIdStr in conflictingStringIdStrs) {if(conflictingStringIdStrs.hasOwnProperty(charIdStr)) {var stringIdStrs=conflictingStringIdStrs[charIdStr];for(var index=stringIdStrs.length-1;index>=0;index--) {var stringIdStr=stringIdStrs[index];if(!(app.charIDToTypeID(charIdStr.substring(1,5))===app.stringIDToTypeID(stringIdStr))) {stringIdStrs.splice(index,1);}} if(stringIdStrs.length<2) {delete conflictingStringIdStrs[charIdStr];}}} for(var charIdStr in contextRules) {if(contextRules.hasOwnProperty(charIdStr)) {if(charIdStr in conflictingStringIdStrs) {var rule=contextRules[charIdStr];for(var kind in rule) {if(rule.hasOwnProperty(kind)) {switch(kind) {case"<class>":case"<event>":case"<enumType>":case"<enumValue>":case"<key>":case"<unknown>":if(app.charIDToTypeID(charIdStr.substring(1,5))!=app.stringIDToTypeID(rule[kind])) {throw new Error("[jamEngine] "+"\""+charIdStr+"\" and \""+rule[kind]+"\" are not equivalent ID strings");} break;case"<classKey>":case"<eventKey>":case"<typeValue>":for(var parent in rule[kind]) {if(rule[kind].hasOwnProperty(parent)) {if(app.charIDToTypeID(charIdStr.substring(1,5))!=app.stringIDToTypeID(rule[kind][parent])) {throw new Error("[jamEngine] "+"\""+charIdStr+"\" and \""+rule[kind][parent]+"\" are not equivalent ID strings");}}} break;}}}} else {delete contextRules[charIdStr];}}}}());}
// jamHelpers.jsxinc v4.4 (minified)
if(typeof jamHelpers!=='object') {var jamHelpers={};(function() {jamHelpers.toColorObject=function(color) {var colorObject;if(color.constructor===Object) {function restoreDesc(desc) {var restoredDesc={};for(var key in desc) {if(desc.hasOwnProperty(key)) {var value=desc[key];var typedValue=null;switch(key) {case"book":case"name":typedValue=["<string>",localize(value)];break;case"bookKey":typedValue=["<data>",value];break;case"bookID":typedValue=["<integer>",value];break;case"a":case"b":case"black":case"blue":case"brightness":case"cyan":case"gray":case"green":case"luminance":case"magenta":case"red":case"saturation":case"yellowColor":typedValue=["<double>",value];break;case"hue":typedValue=["<unitDouble>",["angleUnit",value]];break;case"color":var colorClass;if((("book"in value)&&("name"in value))||(("bookID"in value)&&("bookKey"in value))) {colorClass="bookColor";} else if(("cyan"in value)&&("magenta"in value)&&("yellowColor"in value)&&("black"in value)) {colorClass="CMYKColorClass";} else if("gray"in value) {colorClass="grayscale";} else if(("hue"in value)&&("saturation"in value)&&("brightness"in value)) {colorClass="HSBColorClass";} else if(("luminance"in value)&&("a"in value)&&("b"in value)) {colorClass="labColor";} else if(("red"in value)&&("green"in value)&&("blue"in value)) {colorClass="RGBColor";} typedValue=["<object>",[colorClass,restoreDesc(value)]];break;} if(typedValue) {restoredDesc[key]=typedValue;}}} return restoredDesc;} colorObject=restoreDesc({"color":color})["color"];} else if(color.constructor===Array) {var colorClass=color[0];switch(jamEngine.uniIdStrToId(colorClass)) {case jamEngine.uniIdStrToId("bookColor"):switch(color[1].length) {case 2:if(typeof color[1][0]==='string') {colorObject=["<object>",["bookColor",{"book":["<string>",color[1][0]],"name":["<string>",color[1][1]]}]];} else if(typeof color[1][0]==='number') {colorObject=["<object>",["bookColor",{"bookID":["<integer>",color[1][0]],"bookKey":["<data>",color[1][1]]}]];} break;case 4:colorObject=["<object>",["bookColor",{"book":["<string>",color[1][0]],"name":["<string>",color[1][1]],"bookID":["<integer>",color[1][2]],"bookKey":["<data>",color[1][3]]}]];break;} break;case jamEngine.uniIdStrToId("CMYKColorClass"):colorObject=["<object>",["CMYKColorClass",{"cyan":["<double>",color[1][0]],"magenta":["<double>",color[1][1]],"yellowColor":["<double>",color[1][2]],"black":["<double>",color[1][3]]}]];break;case jamEngine.uniIdStrToId("grayscale"):colorObject=["<object>",["grayscale",{"gray":["<double>",(color[1].constructor===Array)?color[1][0]:color[1]]}]];break;case jamEngine.uniIdStrToId("HSBColorClass"):colorObject=["<object>",["HSBColorClass",{"hue":["<unitDouble>",["angleUnit",color[1][0]]],"saturation":["<double>",color[1][1]],"brightness":["<double>",color[1][2]]}]];break;case jamEngine.uniIdStrToId("labColor"):colorObject=["<object>",["labColor",{"luminance":["<double>",color[1][0]],"a":["<double>",color[1][1]],"b":["<double>",color[1][2]]}]];break;case jamEngine.uniIdStrToId("RGBColor"):colorObject=["<object>",["RGBColor",{"red":["<double>",color[1][0]],"green":["<double>",color[1][1]],"blue":["<double>",color[1][2]]}]];break;default:throw new Error("[jamHelpers.toColorObject] Unrecognized color class: "+colorClass);break;}} return colorObject;};jamHelpers.fromColorObject=function(colorObject,explicit) {var color;if(explicit) {color=jamEngine.simplifyObject(colorObject);} else {var normalizedColorObject=jamEngine.normalizeJsonItem(colorObject,{meaningfulIds:true,parseFriendly:true});var colorClass=normalizedColorObject[1][0];var colorDesc=normalizedColorObject[1][1];switch(colorClass) {case"bookColor":var book=colorDesc["book"][1];var name=colorDesc["name"][1];if(("bookID"in colorDesc)&&("bookKey"in colorDesc)) {var bookID=colorDesc["bookID"][1];var bookKey=colorDesc["bookKey"][1];color=[colorClass,[book,name,bookID,bookKey]];} else {color=[colorClass,[book,name]];} break;case"CMYKColorClass":var cyan=colorDesc["cyan"][1];var magenta=colorDesc["magenta"][1];var yellowColor=colorDesc["yellowColor"][1];var black=colorDesc["black"][1];color=[colorClass,[cyan,magenta,yellowColor,black]];break;case"grayscale":var gray=colorDesc["gray"][1];color=[colorClass,[gray]];break;case"HSBColorClass":var hue=colorDesc["hue"][1][1];var saturation=colorDesc["saturation"][1];var brightness=colorDesc["brightness"][1];color=[colorClass,[hue,saturation,brightness]];break;case"labColor":var luminance=colorDesc["luminance"][1];var a=colorDesc["a"][1];var b=colorDesc["b"][1];color=[colorClass,[luminance,a,b]];break;case"RGBColor":var red=colorDesc["red"][1];var green=colorDesc["green"][1];var blue=colorDesc["blue"][1];color=[colorClass,[red,green,blue]];break;default:throw new Error("[jamHelpers.fromColorObject] Unrecognized color class: "+colorClass);break;}} return color;};jamHelpers.nameToColorObject=function(setName,colorName) {return this.toColorObject(jamColors.nameToColor(setName,colorName));};jamHelpers.hexToColorObject=function(hexColorString) {return this.toColorObject(["RGBColor",jamColors.hexToRgb(hexColorString)]);};jamHelpers.hexFromColorObject=function(colorObject,noSign,lowercase) {var color=this.fromColorObject(colorObject);return(color[0]==="RGBColor")?jamColors.rgbToHex(color[1],noSign,lowercase):null;};jamHelpers.toGradientObject=function(gradient) {var gradientObject;if(gradient.constructor===Object) {var that=this;function restoreDesc(desc) {var restoredDesc={};for(var key in desc) {if(desc.hasOwnProperty(key)) {var value=desc[key];var typedValue=null;var restoredList;switch(key) {case"showTransparency":case"vectorColor":typedValue=["<boolean>",value];break;case"name":typedValue=["<string>",localize(value)];break;case"gradientForm":typedValue=["<enumerated>",["gradientForm",value]];break;case"type":typedValue=["<enumerated>",["colorStopType",value]];break;case"colorSpace":typedValue=["<enumerated>",["colorSpace",value]];break;case"location":case"midpoint":case"randomSeed":case"smoothness":typedValue=["<integer>",value];break;case"interpolation":typedValue=["<double>",value];break;case"opacity":typedValue=["<unitDouble>",["percentUnit",value]];break;case"colors":restoredList=[];for(var i=0;i<value.length;i++) {restoredList.push(["<object>",["colorStop",restoreDesc(value[i])]]);} typedValue=["<list>",restoredList];break;case"transparency":restoredList=[];for(var i=0;i<value.length;i++) {restoredList.push(["<object>",["transparencyStop",restoreDesc(value[i])]]);} typedValue=["<list>",restoredList];break;case"minimum":case"maximum":restoredList=[];for(var i=0;i<value.length;i++) {restoredList.push(["<integer>",value[i]]);} typedValue=["<list>",restoredList];break;case"color":typedValue=that.toColorObject(value);break;case"gradient":typedValue=["<object>",["gradientClassEvent",restoreDesc(value)]];break;} if(typedValue) {restoredDesc[key]=typedValue;}}} return restoredDesc;} gradientObject=restoreDesc({"gradient":gradient})["gradient"];} else if(gradient.constructor===Array) {var gradientObj={};var gradientName=gradient[0];if(gradientName) {gradientObj["name"]=["<string>",gradientName];} var gradientForm=gradient[1];gradientObj["gradientForm"]=["<enumerated>",["gradientForm",gradientForm]];switch(jamEngine.uniIdStrToId(gradientForm)) {case jamEngine.uniIdStrToId("customStops"):gradientObj["interpolation"]=["<double>",gradient[2]];var colorStops=gradient[3];var colorsArr=[];for(var i=0;i<colorStops.length;i++) {var colorStopObj={};colorStopObj["location"]=["<integer>",colorStops[i][0]];colorStopObj["midpoint"]=["<integer>",colorStops[i][1]];var type=colorStops[i][2];colorStopObj["type"]=["<enumerated>",["colorStopType",type]];switch(jamEngine.uniIdStrToId(type)) {case jamEngine.uniIdStrToId("userStop"):colorStopObj["color"]=this.toColorObject(colorStops[i][3]);break;case jamEngine.uniIdStrToId("backgroundColor"):case jamEngine.uniIdStrToId("foregroundColor"):break;default:throw new Error("[jamHelpers.toGradientObject] Unrecognized color stop type: "+type);break;} colorsArr.push(["<object>",["colorStop",colorStopObj]]);} gradientObj["colors"]=["<list>",colorsArr];var transparencyStops=gradient[4];if(typeof transparencyStops!=='undefined') {var transparencyArr=[];for(var j=0;j<transparencyStops.length;j++) {var transparencyStopObj={};transparencyStopObj["location"]=["<integer>",transparencyStops[j][0]];transparencyStopObj["midpoint"]=["<integer>",transparencyStops[j][1]];transparencyStopObj["opacity"]=["<unitDouble>",["percentUnit",transparencyStops[j][2]]];transparencyArr.push(["<object>",["transparencyStop",transparencyStopObj]]);} gradientObj["transparency"]=["<list>",transparencyArr];} break;case jamEngine.uniIdStrToId("colorNoise"):gradientObj["randomSeed"]=["<integer>",gradient[2]];gradientObj["showTransparency"]=["<boolean>",gradient[3]];gradientObj["vectorColor"]=["<boolean>",gradient[4]];gradientObj["smoothness"]=["<integer>",gradient[5]];var colorSpace=gradient[6];gradientObj["colorSpace"]=["<enumerated>",["colorSpace",colorSpace]];switch(jamEngine.uniIdStrToId(colorSpace)) {case jamEngine.uniIdStrToId("RGBColor"):case jamEngine.uniIdStrToId("HSBColorEnum"):case jamEngine.uniIdStrToId("labColor"):break;default:throw new Error("[jamHelpers.toGradientObject] Unrecognized color space: "+colorSpace);break;} gradientObj["minimum"]=this.toIntegerList(gradient[7]);gradientObj["maximum"]=this.toIntegerList(gradient[8]);break;default:throw new Error("[jamHelpers.toGradientObject] Unrecognized gradient form: "+gradientForm);break;} gradientObject=["<object>",["gradientClassEvent",gradientObj]];} return gradientObject;};jamHelpers.fromGradientObject=function(gradientObject,explicit) {var gradient;if(explicit) {gradient=jamEngine.simplifyObject(gradientObject);} else {gradient=[];var normalizedGradientObject=jamEngine.normalizeJsonItem(gradientObject,{meaningfulIds:true,parseFriendly:true});var gradientDesc=normalizedGradientObject[1][1];var name=gradientDesc["name"];gradient.push((name)?name[1]:null);var gradientForm=gradientDesc["gradientForm"][1][1];gradient.push(gradientForm);switch(gradientForm) {case"customStops":gradient.push(gradientDesc["interpolation"][1]);var colors=gradientDesc["colors"][1];var colorStops=[];for(var i=0;i<colors.length;i++) {var colorStop=colors[i][1][1];var colorStopArr=[];colorStopArr.push(colorStop["location"][1]);colorStopArr.push(colorStop["midpoint"][1]);var type=colorStop["type"][1][1];colorStopArr.push(type);switch(type) {case"userStop":colorStopArr.push(this.fromColorObject(colorStop["color"]));break;case"backgroundColor":case"foregroundColor":break;default:throw new Error("[jamHelpers.fromGradientObject] Unrecognized color stop type: "+type);break;} colorStops.push(colorStopArr);} gradient.push(colorStops);var transparency=gradientDesc["transparency"][1];var transparencyStops=[];for(var j=0;j<transparency.length;j++) {var transparencyStop=transparency[j][1][1];var transparencyStopArr=[];transparencyStopArr.push(transparencyStop["location"][1]);transparencyStopArr.push(transparencyStop["midpoint"][1]);transparencyStopArr.push(transparencyStop["opacity"][1][1]);transparencyStops.push(transparencyStopArr);} gradient.push(transparencyStops);break;case"colorNoise":gradient.push(gradientDesc["randomSeed"][1]);gradient.push(gradientDesc["showTransparency"][1]);gradient.push(gradientDesc["vectorColor"][1]);gradient.push(gradientDesc["smoothness"][1]);var colorSpace=gradientDesc["colorSpace"][1][1] gradient.push(colorSpace);switch(colorSpace) {case"RGBColor":case"HSBColorEnum":case"labColor":break;default:throw new Error("[jamHelpers.fromGradientObject] Unrecognized color space: "+colorSpace);break;} gradient.push(this.fromIntegerList(gradientDesc["minimum"]));gradient.push(this.fromIntegerList(gradientDesc["maximum"]));break;default:throw new Error("[jamHelpers.fromGradientObject] Unrecognized gradient form: "+gradientForm);break;}} return gradient;};jamHelpers.toCurvesAdjustmentList=function(curvesAdjustmentsArr) {var curvesAdjustmentListArr=[];for(var i=0;i<curvesAdjustmentsArr.length;i++) {var curvesAdjustment=curvesAdjustmentsArr[i];var channel=["<reference>",[["channel",["<enumerated>",["channel",curvesAdjustment[0]]]]]];var info=curvesAdjustment[1];var type=info[0];var points=info[1];var pointArr=[];switch(jamEngine.uniIdStrToId(type)) {case jamEngine.uniIdStrToId("mapping"):for(var j=0;j<points.length;j++) {pointArr.push(["<integer>",points[j]]);} var mapping=["<list>",pointArr];curvesAdjustmentListArr.push(["<object>",["curvesAdjustment",{"channel":channel,"mapping":mapping}]]);break;case jamEngine.uniIdStrToId("curve"):for(var j=0;j<points.length;j++) {var point=["<object>",["point",{"horizontal":["<double>",points[j][0]],"vertical":["<double>",points[j][1]]}]];pointArr.push(point);} var curve=["<list>",pointArr];curvesAdjustmentListArr.push(["<object>",["curvesAdjustment",{"channel":channel,"curve":curve}]]);break;default:throw new Error("[jamHelpers.toCurvesAdjustmentList] Unrecognized curve type");break;}} return["<list>",curvesAdjustmentListArr];};jamHelpers.toHueSatAdjustmentV2List=function(hueSatAdjustmentsArr) {var hueSatAdjustmentListArr=[];for(var i=0;i<hueSatAdjustmentsArr.length;i++) {var hueSatAdjustmentArr=hueSatAdjustmentsArr[i];var hueSatAdjustmentObj;if((hueSatAdjustmentArr.length===3)&&(i===0)) {hueSatAdjustmentObj={"hue":["<integer>",hueSatAdjustmentArr[0]],"saturation":["<integer>",hueSatAdjustmentArr[1]],"lightness":["<integer>",hueSatAdjustmentArr[2]]};} else if(hueSatAdjustmentArr.length===(1+4+3)) {hueSatAdjustmentObj={"localRange":["<integer>",hueSatAdjustmentArr[0]],"beginRamp":["<integer>",hueSatAdjustmentArr[1]],"beginSustain":["<integer>",hueSatAdjustmentArr[2]],"endSustain":["<integer>",hueSatAdjustmentArr[3]],"endRamp":["<integer>",hueSatAdjustmentArr[4]],"hue":["<integer>",hueSatAdjustmentArr[5]],"saturation":["<integer>",hueSatAdjustmentArr[6]],"lightness":["<integer>",hueSatAdjustmentArr[7]]};} hueSatAdjustmentListArr.push(["<object>",["hueSatAdjustmentV2",hueSatAdjustmentObj]]);} return["<list>",hueSatAdjustmentListArr];};jamHelpers.toBlendRangeList=function(blendRanges) {var blendRangeListArr=[];var blendRangeObject;for(var i=0;i<blendRanges.length;i++) {var blendRange=blendRanges[i];if(blendRange.constructor===Object) {function restoreDesc(desc) {var restoredDesc={};for(var key in desc) {if(desc.hasOwnProperty(key)) {var value=desc[key];var typedValue=null;switch(key) {case"channel":typedValue=["<reference>",[["channel",["<enumerated>",["channel",value]]]]];break;case"srcBlackMin":case"srcBlackMax":case"srcWhiteMin":case"srcWhiteMax":case"destBlackMin":case"destBlackMax":case"destWhiteMin":case"destWhiteMax":typedValue=["<integer>",value];break;case"blendRange":typedValue=["<object>",["blendRange",restoreDesc(value)]];break;} if(typedValue) {restoredDesc[key]=typedValue;}}} return restoredDesc;} blendRangeObject=restoreDesc({"blendRange":blendRange})["blendRange"];} else if(blendRange.constructor===Array) {blendRangeObject=["<object>",["blendRange",{"channel":["<reference>",[["channel",["<enumerated>",["channel",blendRange[0]]]]]],"srcBlackMin":["<integer>",blendRange[1]],"srcBlackMax":["<integer>",blendRange[2]],"srcWhiteMin":["<integer>",blendRange[3]],"srcWhiteMax":["<integer>",blendRange[4]],"destBlackMin":["<integer>",blendRange[5]],"destBlackMax":["<integer>",blendRange[6]],"destWhiteMin":["<integer>",blendRange[7]],"destWhiteMax":["<integer>",blendRange[8]]}]];} blendRangeListArr.push(blendRangeObject);} return["<list>",blendRangeListArr];};jamHelpers.fromBlendRangeList=function(blendRangeList,explicit) {var blendRanges;if(explicit) {var replaceChannelHook=function(desc,key,getDefaultValue) {var replacedValue=undefined;if(key==="channel") {var value=getDefaultValue(desc,key);replacedValue=value[0]["channel"];} return replacedValue;};blendRanges=jamEngine.simplifyList(blendRangeList,replaceChannelHook);} else {blendRanges=[];var normalizedBlendRangeList=jamEngine.normalizeJsonItem(blendRangeList,{meaningfulIds:true,parseFriendly:true});for(index=0;index<normalizedBlendRangeList[1].length;index++) {var blendRange=normalizedBlendRangeList[1][index][1][1];var blendRangeArr=[blendRange["channel"][1][0][1][1][1],blendRange["srcBlackMin"][1],blendRange["srcBlackMax"][1],blendRange["srcWhiteMin"][1],blendRange["srcWhiteMax"][1],blendRange["destBlackMin"][1],blendRange["destBlackMax"][1],blendRange["destWhiteMin"][1],blendRange["destWhiteMax"][1]];blendRanges.push(blendRangeArr);}} return blendRanges;};jamHelpers.toIntegerList=function(integersArr) {var integerListArr=[];for(var i=0;i<integersArr.length;i++) {integerListArr.push(["<integer>",integersArr[i]]);} return["<list>",integerListArr];};jamHelpers.fromIntegerList=function(integerList) {var normalizedIntegerList=jamEngine.normalizeJsonItem(integerList,{meaningfulIds:true,parseFriendly:true});var integersArr=[];var integers=normalizedIntegerList[1];for(var i=0;i<integers.length;i++) {integersArr.push(integers[i][1]);} return integersArr;};function toUnitDouble(value,unit) {return(typeof unit==='undefined')?["<double>",value]:["<unitDouble>",[unit,value]];} jamHelpers.toPointObject=function(pointArr) {var data=pointArr[0];var unit=pointArr[1];var pointObject=["<object>",["point",{"horizontal":toUnitDouble(data[0],unit),"vertical":toUnitDouble(data[1],unit)}]];return pointObject;};jamHelpers.toPointList=function(pointsArr) {var data=pointsArr[0];var unit=pointsArr[1];var pointListArr=[];for(var i=0;i<data.length;i++) {pointListArr.push (["<object>",["point",{"horizontal":toUnitDouble(data[i][0],unit),"vertical":toUnitDouble(data[i][1],unit)}]]);} return["<list>",pointListArr];};jamHelpers.fromPointList=function(pointList) {var pointsArr=[];var normalizedPointList=jamEngine.normalizeJsonItem(pointList,{meaningfulIds:true,parseFriendly:true});var data=[];var unit;function getValue(coordinate) {var value;switch(coordinate[0]) {case"<unitDouble>":unit=coordinate[1][0];value=coordinate[1][1];break;case"<double>":unit=undefined;value=coordinate[1];break;} return value;} var pointListArr=normalizedPointList[1];for(var i=0;i<pointListArr.length;i++) {data.push([getValue(pointListArr[i][1][1]["horizontal"]),getValue(pointListArr[i][1][1]["vertical"])]);} pointsArr.push(data);if(unit) {pointsArr.push(unit);} return pointsArr;};jamHelpers.toOffsetObject=function(offsetArr) {var data=offsetArr[0];var unit=offsetArr[1];var offsetObject=["<object>",["offset",{"horizontal":toUnitDouble(data[0],unit),"vertical":toUnitDouble(data[1],unit)}]];return offsetObject;};jamHelpers.toRectangleObject=function(rectangleArr) {var data=rectangleArr[0];var unit=rectangleArr[1];var rectangleObj={"left":toUnitDouble(data[0],unit),"top":toUnitDouble(data[1],unit),"right":toUnitDouble(data[2],unit),"bottom":toUnitDouble(data[3],unit)};if(data.length===5) {rectangleObj["radius"]=toUnitDouble(data[4],unit);} return["<object>",["rectangle",rectangleObj]];};jamHelpers.toEllipseObject=function(ellipseArr) {var data=ellipseArr[0];var unit=ellipseArr[1];var ellipseObject=["<object>",["ellipse",{"left":toUnitDouble(data[0],unit),"top":toUnitDouble(data[1],unit),"right":toUnitDouble(data[2],unit),"bottom":toUnitDouble(data[3],unit)}]];return ellipseObject;};jamHelpers.toCustomShapeObject=function(customShapeArr) {var data=customShapeArr[0];var unit=customShapeArr[1];var customShapeObject=["<object>",["customShape",{"name":["<string>",data[0]],"left":toUnitDouble(data[1],unit),"top":toUnitDouble(data[2],unit),"right":toUnitDouble(data[3],unit),"bottom":toUnitDouble(data[4],unit)}]];return customShapeObject;};jamHelpers.toCurvePointList=function(curvePoints) {var curvePointListArr=[];var curvePointObject;for(var i=0;i<curvePoints.length;i++) {var curvePoint=curvePoints[i];if(curvePoint.constructor===Object) {function restoreDesc(desc) {var restoredDesc={};for(var key in desc) {if(desc.hasOwnProperty(key)) {var value=desc[key];var typedValue=null;switch(key) {case"continuity":typedValue=["<boolean>",value];break;case"horizontal":case"vertical":typedValue=["<double>",value];break;case"curvePoint":typedValue=["<object>",["curvePoint",restoreDesc(value)]];break;} if(typedValue) {restoredDesc[key]=typedValue;}}} return restoredDesc;} curvePointObject=restoreDesc({"curvePoint":curvePoint})["curvePoint"];} else if(curvePoint.constructor===Array) {switch(curvePoint.length) {case 2:curvePointObject=["<object>",["curvePoint",{"horizontal":["<double>",curvePoint[0]],"vertical":["<double>",curvePoint[1]]}]];break;case 3:curvePointObject=["<object>",["curvePoint",{"horizontal":["<double>",curvePoint[0]],"vertical":["<double>",curvePoint[1]],"continuity":["<boolean>",curvePoint[2]]}]];break;}} curvePointListArr.push(curvePointObject);} return["<list>",curvePointListArr];};jamHelpers.fromCurvePointList=function(curvePointList,explicit) {var curvePoints;if(explicit) {curvePoints=jamEngine.simplifyList(curvePointList);} else {curvePoints=[];var normalizedCurvePointList=jamEngine.normalizeJsonItem(curvePointList,{meaningfulIds:true,parseFriendly:true});for(index=0;index<normalizedCurvePointList[1].length;index++) {var curvePoint=normalizedCurvePointList[1][index][1][1];var curvePointArr=[curvePoint["horizontal"][1],curvePoint["vertical"][1]];if("continuity"in curvePoint) {curvePointArr.push(curvePoint["continuity"][1]);} curvePoints.push(curvePointArr);}} return curvePoints;};jamHelpers.toRationalPointList=function(rationalPointsArr) {var data=rationalPointsArr[0];var unit=rationalPointsArr[1];var rationalPointListArr=[];for(var i=0;i<data.length;i++) {rationalPointListArr.push (["<object>",["rationalPoint",{"horizontal":toUnitDouble(data[i][0],unit),"vertical":toUnitDouble(data[i][1],unit)}]]);} return["<list>",rationalPointListArr];};jamHelpers.toPathComponentList=function(pathComponents) {var pathComponentList;if(pathComponents.constructor===Object) {var unit;if("unit"in pathComponents) {unit=pathComponents["unit"];} var data=pathComponents["pathComponents"];function restoreDesc(desc) {var restoredDesc={};for(var key in desc) {if(desc.hasOwnProperty(key)) {var value=desc[key];var typedValue=null;var restoredList;switch(key) {case"closedSubpath":case"smooth":case"windingFill":typedValue=["<boolean>",value];break;case"shapeOperation":typedValue=["<enumerated>",["shapeOperation",value]];break;case"horizontal":case"vertical":typedValue=toUnitDouble(value,unit);break;case"anchor":case"backward":case"forward":typedValue=["<object>",["point",restoreDesc(value)]];break;case"subpathListKey":restoredList=[];for(var i=0;i<value.length;i++) {restoredList.push(["<object>",["subpathsList",restoreDesc(value[i])]]);} typedValue=["<list>",restoredList];break;case"points":restoredList=[];for(var i=0;i<value.length;i++) {restoredList.push(["<object>",["pathPoint",restoreDesc(value[i])]]);} typedValue=["<list>",restoredList];break;case"pathComponents":restoredList=[];for(var i=0;i<value.length;i++) {restoredList.push(["<object>",["pathComponent",restoreDesc(value[i])]]);} typedValue=["<list>",restoredList];break;} if(typedValue) {restoredDesc[key]=typedValue;}}} return restoredDesc;} pathComponentList=restoreDesc({"pathComponents":data})["pathComponents"];} else if(pathComponents.constructor===Array) {var pathComponentListArr=[];var data=pathComponents[0];var unit=pathComponents[1];for(var i=0;i<data.length;i++) {var shapeOperation=data[i][0];var subpaths=data[i][1];var windingFill=data[i][2];var subpathArr=[];for(var j=0;j<subpaths.length;j++) {var points=subpaths[j][0];var closedSubpath=subpaths[j][1];var pointArr=[];for(var k=0;k<points.length;k++) {var point=points[k];switch(point.length) {case 1:pointArr.push (["<object>",["pathPoint",{"anchor":["<object>",["point",{"horizontal":toUnitDouble(point[0][0],unit),"vertical":toUnitDouble(point[0][1],unit)}]]}]]);break;case 3:case 4:pointArr.push (["<object>",["pathPoint",{"anchor":["<object>",["point",{"horizontal":toUnitDouble(point[0][0],unit),"vertical":toUnitDouble(point[0][1],unit)}]],"forward":["<object>",["point",{"horizontal":toUnitDouble(point[1][0],unit),"vertical":toUnitDouble(point[1][1],unit)}]],"backward":["<object>",["point",{"horizontal":toUnitDouble(point[2][0],unit),"vertical":toUnitDouble(point[2][1],unit)}]],"smooth":["<boolean>",point[3]||false]}]]);break;}} var subpath={};if(closedSubpath) {subpath["closedSubpath"]=["<boolean>",closedSubpath];} subpath["points"]=["<list>",pointArr];subpathArr.push(["<object>",["subpathsList",subpath]]);} var pathComponent={};pathComponent["shapeOperation"]=["<enumerated>",["shapeOperation",shapeOperation]];if(windingFill) {pathComponent["windingFill"]=["<boolean>",windingFill];} pathComponent["subpathListKey"]=["<list>",subpathArr];pathComponentListArr.push(["<object>",["pathComponent",pathComponent]]);} pathComponentList=["<list>",pathComponentListArr];} return pathComponentList;};jamHelpers.fromPathComponentList=function(pathComponentList,explicit) {var pathComponents;if(explicit) {pathComponents={};var unit;var done=false;function getUnitHook(desc,key) {if(!done) {if(key==="horizontal") {var value=desc[key];if(value[0]==="<unitDouble>") {unit=value[1][0];} done=true;}} return undefined;} pathComponents["pathComponents"]=jamEngine.simplifyList(pathComponentList,getUnitHook);if(unit) {pathComponents["unit"]=unit;}} else {pathComponents=[];var normalizedPathComponentList=jamEngine.normalizeJsonItem(pathComponentList,{meaningfulIds:true,parseFriendly:true});var data=[];var unit;function getValue(coordinate) {var value;switch(coordinate[0]) {case"<unitDouble>":unit=coordinate[1][0];value=coordinate[1][1];break;case"<double>":unit=undefined;value=coordinate[1];break;} return value;} var pathComponentListArr=normalizedPathComponentList[1];for(var i=0;i<pathComponentListArr.length;i++) {var pathComponent=pathComponentListArr[i][1][1];var shapeOperation=pathComponent["shapeOperation"][1][1];var windingFill=("windingFill"in pathComponent)?pathComponent["windingFill"][1]:false;var subpathsArr=[];var subpathListArr=pathComponent["subpathListKey"][1];for(var j=0;j<subpathListArr.length;j++) {var subpathsList=subpathListArr[j][1][1];var closedSubpath=("closedSubpath"in subpathsList)?subpathsList["closedSubpath"][1]:false;var pathPointsArr=[];var pointsArr=subpathsList["points"][1];for(var k=0;k<pointsArr.length;k++) {var pathPoint=pointsArr[k][1][1];var pathPointArr=[];var anchor=pathPoint["anchor"][1][1];pathPointArr.push([getValue(anchor["horizontal"]),getValue(anchor["vertical"])]);if("forward"in pathPoint) {var forward=pathPoint["forward"][1][1];pathPointArr.push([getValue(forward["horizontal"]),getValue(forward["vertical"])]);} if("backward"in pathPoint) {var backward=pathPoint["backward"][1][1];pathPointArr.push([getValue(backward["horizontal"]),getValue(backward["vertical"])]);} var smooth=("smooth"in pathPoint)?pathPoint["smooth"][1]:false;if(smooth) {pathPointArr.push(smooth);} pathPointsArr.push(pathPointArr);} var subpathArr=[];subpathArr.push(pathPointsArr);if(closedSubpath) {subpathArr.push(closedSubpath);} subpathsArr.push(subpathArr);} var pathComponentArr=[];pathComponentArr.push(shapeOperation);pathComponentArr.push(subpathsArr);if(windingFill) {pathComponentArr.push(windingFill);} data.push(pathComponentArr);} pathComponents.push(data);if(unit) {pathComponents.push(unit);}} return pathComponents;};}());}
// jamJSON.jsxinc v4.4 (minified)
if(typeof jamJSON!=='object') {var jamJSON={};(function() {var state;var stack;var container;var key;var value;var escapes={'\\':'\\','"':'"','/':'/','t':'\t','n':'\n','r':'\r','f':'\f','b':'\b'};var action={'{':{go:function() {stack.push({state:'ok'});container={};state='firstokey';},ovalue:function() {stack.push({container:container,state:'ocomma',key:key});container={};state='firstokey';},firstavalue:function() {stack.push({container:container,state:'acomma'});container={};state='firstokey';},avalue:function() {stack.push({container:container,state:'acomma'});container={};state='firstokey';}},'}':{firstokey:function() {var pop=stack.pop();value=container;container=pop.container;key=pop.key;state=pop.state;},ocomma:function() {var pop=stack.pop();container[key]=value;value=container;container=pop.container;key=pop.key;state=pop.state;}},'[':{go:function() {stack.push({state:'ok'});container=[];state='firstavalue';},ovalue:function() {stack.push({container:container,state:'ocomma',key:key});container=[];state='firstavalue';},firstavalue:function() {stack.push({container:container,state:'acomma'});container=[];state='firstavalue';},avalue:function() {stack.push({container:container,state:'acomma'});container=[];state='firstavalue';}},']':{firstavalue:function() {var pop=stack.pop();value=container;container=pop.container;key=pop.key;state=pop.state;},acomma:function() {var pop=stack.pop();container.push(value);value=container;container=pop.container;key=pop.key;state=pop.state;}},':':{colon:function() {if(container.hasOwnProperty(key)) {throw new SyntaxError("[jamJSON.parse] Duplicate key: “"+key+"”");} state='ovalue';}},',':{ocomma:function() {container[key]=value;state='okey';},acomma:function() {container.push(value);state='avalue';}},'true':{go:function() {value=true;state='ok';},ovalue:function() {value=true;state='ocomma';},firstavalue:function() {value=true;state='acomma';},avalue:function() {value=true;state='acomma';}},'false':{go:function() {value=false;state='ok';},ovalue:function() {value=false;state='ocomma';},firstavalue:function() {value=false;state='acomma';},avalue:function() {value=false;state='acomma';}},'null':{go:function() {value=null;state='ok';},ovalue:function() {value=null;state='ocomma';},firstavalue:function() {value=null;state='acomma';},avalue:function() {value=null;state='acomma';}}};var number={go:function() {state='ok';},ovalue:function() {state='ocomma';},firstavalue:function() {state='acomma';},avalue:function() {state='acomma';}};var string={go:function() {state='ok';},firstokey:function() {key=value;state='colon';},okey:function() {key=value;state='colon';},ovalue:function() {state='ocomma';},firstavalue:function() {state='acomma';},avalue:function() {state='acomma';}};var commentFunc=function(){};function debackslashify(text) {return text.replace(/\\(?:u(.{4})|([^u]))/g,function(a,b,c){return(b)?String.fromCharCode(parseInt(b,16)):escapes[c];});} jamJSON.parse=function(text,validate,allowComments) {if(validate) {var tx=/^[\x20\t\n\r]*(?:([,:\[\]{}]|true|false|null)|(-?(?:0|[1-9][0-9]*)(?:\.[0-9]+)?(?:[eE][+\-]?[0-9]+)?)|"((?:[^\r\n\t\\\"]|\\(?:["\\\/trnfb]|u[0-9a-fA-F]{4}))*)")/;var txc=/^[\x20\t\n\r]*(?:(\/(?:\/.*|\*(?:.|[\r\n])*?\*\/))|([,:\[\]{}]|true|false|null)|(-?(?:0|[1-9][0-9]*)(?:\.[0-9]+)?(?:[eE][+\-]?[0-9]+)?)|"((?:[^\r\n\t\\\"]|\\(?:["\\\/trnfb]|u[0-9a-fA-F]{4}))*)")/;var r;var i;var actionFunc;state='go';stack=[];try {while(true) {i=(allowComments)?1:0;r=(allowComments)?txc.exec(text):tx.exec(text);if(!r) {break;} if(allowComments&&r[1]) {actionFunc=commentFunc;} else if(r[i+1]) {actionFunc=action[r[i+1]][state];} else if(r[i+2]) {value=+r[i+2];actionFunc=number[state];} else {value=debackslashify(r[i+3]);actionFunc=string[state];} if(actionFunc) {actionFunc();text=text.slice(r[0].length);} else {break;}}} catch(e) {state=e;} if(state!=='ok'||/[^\x20\t\n\r]/.test(text)) {throw state instanceof SyntaxError?state:new SyntaxError("[jamJSON.parse] Invalid JSON");} return value;} else {return eval('('+text+')');}};var escapable=/[\\\"\x00-\x1F\x7F-\x9F\u00AD\u0600-\u0604\u070F\u17B4\u17B5\u200C-\u200F\u2028-\u202F\u2060-\u206F\uFEFF\uFFF0-\uFFFF]/g;var meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'};var gap;var indent;var prefixIndent;function quote(string) {escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return(typeof c==='string')?c:'\\u'+('0000'+a.charCodeAt(0).toString(16).toUpperCase()).slice(-4);})+'"':'"'+string+'"';} function str(value) {var i;var k;var v;var mind=gap;var partial;switch(typeof value) {case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value) {return'null';} gap+=indent;partial=[];if(value.constructor===Array) {for(i=0;i<value.length;i++) {partial[i]=str(value[i]);} v=(partial.length===0)?(gap?'[\n'+prefixIndent+mind+']':'[ ]'):(gap?'[\n'+prefixIndent+gap+partial.join(',\n'+prefixIndent+gap)+'\n'+prefixIndent+mind+']':'[ '+partial.join(', ')+' ]');gap=mind;return v;} else {for(k in value) {if(value.hasOwnProperty(k)) {v=str(value[k]);if(v) {partial.push(quote(k)+(gap&&((v.charAt(0)==='{')||(v.charAt(0)==='['))?':\n'+prefixIndent+gap:': ')+v);}}} v=(partial.length===0)?(gap?'{\n'+prefixIndent+mind+'}':'{ }'):(gap?'{\n'+prefixIndent+gap+partial.join(',\n'+prefixIndent+gap)+'\n'+prefixIndent+mind+'}':'{ '+partial.join(', ')+' }');gap=mind;return v;} default:throw new SyntaxError("[jamJSON.stringify] Invalid JSON");}} jamJSON.stringify=function(value,space,prefix) {var i;gap='';indent='';prefixIndent='';if(typeof space==='number') {for(i=0;i<space;i++) {indent+=' ';}} else if(typeof space==='string') {indent=space;} if(typeof prefix==='number') {for(i=0;i<prefix;i++) {prefixIndent+=' ';}} else if(typeof prefix==='string') {prefixIndent=prefix;} return prefixIndent+str(value);};}());}
// jamLayers.jsxinc v4.4.3 (minified)
if(typeof jamLayers!=='object') {var jamLayers={};(function() {function getObjectClass(object) {return(jamEngine.parseCompact(object))[0];} function toBlackAndWhite(desc) {function restoreDesc(desc) {var restoredDesc={};for(var key in desc) {if(desc.hasOwnProperty(key)) {var value=desc[key];var typedValue=null;switch(key) {case"using":typedValue=["<path>",value];break;case"useTint":typedValue=["<boolean>",value];break;case"blue":case"cyan":case"green":case"magenta":case"red":case"yellow":typedValue=["<integer>",value];break;case"tintColor":typedValue=jamHelpers.toColorObject(value);break;} if(typedValue) {restoredDesc[key]=typedValue;}}} return restoredDesc;} return restoreDesc(desc);} function toBrightnessContrast(desc) {function restoreDesc(desc) {var restoredDesc={};for(var key in desc) {if(desc.hasOwnProperty(key)) {var value=desc[key];var typedValue=null;switch(key) {case"useLegacy":typedValue=["<boolean>",value];break;case"brightness":case"contrast":typedValue=["<integer>",value];break;} if(typedValue) {restoredDesc[key]=typedValue;}}} return restoredDesc;} return restoreDesc(desc);} function toChannelMixer(desc) {function restoreDesc(desc,hintData) {var restoredDesc={};for(var key in desc) {if(desc.hasOwnProperty(key)) {var value=desc[key];var typedValue=null;switch(key) {case"using":typedValue=["<path>",value];break;case"monochromatic":typedValue=["<boolean>",value];break;case"black":case"blue":case"cyan":case"green":case"magenta":case"red":case"yellowColor":if(hintData) {typedValue=["<unitDouble>",[hintData,value]];} else {typedValue=["<object>",["channelMatrix",restoreDesc(value,"percentUnit")]];} break;case"gray":typedValue=["<object>",["channelMatrix",restoreDesc(value,"percentUnit")]];break;case"constant":typedValue=["<unitDouble>",[hintData,value]];break;} if(typedValue) {restoredDesc[key]=typedValue;}}} return restoredDesc;} return restoreDesc(desc);} function toColorBalance(desc) {function restoreDesc(desc) {var restoredDesc={};for(var key in desc) {if(desc.hasOwnProperty(key)) {var value=desc[key];var typedValue=null;var restoredList;switch(key) {case"preserveLuminosity":typedValue=["<boolean>",value];break;case"shadowLevels":case"midtoneLevels":case"highlightLevels":restoredList=[];for(var i=0;i<value.length;i++) {restoredList.push(["<integer>",value[i]]);} typedValue=["<list>",restoredList];break;} if(typedValue) {restoredDesc[key]=typedValue;}}} return restoredDesc;} return restoreDesc(desc);} function toCurves(desc) {function restoreDesc(desc) {var restoredDesc={};for(var key in desc) {if(desc.hasOwnProperty(key)) {var value=desc[key];var typedValue=null;var restoredList;switch(key) {case"using":typedValue=["<path>",value];break;case"horizontal":case"vertical":typedValue=["<double>",value];break;case"adjustment":restoredList=[];for(var i=0;i<value.length;i++) {restoredList.push(["<object>",["curvesAdjustment",restoreDesc(value[i])]]);} typedValue=["<list>",restoredList];break;case"curve":restoredList=[];for(var i=0;i<value.length;i++) {restoredList.push(["<object>",["point",restoreDesc(value[i])]]);} typedValue=["<list>",restoredList];break;case"mapping":restoredList=[];for(var i=0;i<value.length;i++) {restoredList.push(["<integer>",value[i]]);} typedValue=["<list>",restoredList];break;case"channel":typedValue=["<reference>",[["channel",["<enumerated>",["channel",value]]]]];break;} if(typedValue) {restoredDesc[key]=typedValue;}}} return restoredDesc;} return restoreDesc(desc);} function toExposure(desc) {function restoreDesc(desc) {var restoredDesc={};for(var key in desc) {if(desc.hasOwnProperty(key)) {var value=desc[key];var typedValue=null;switch(key) {case"using":typedValue=["<path>",value];break;case"exposure":case"gammaCorrection":case"offset":typedValue=["<double>",value];break;} if(typedValue) {restoredDesc[key]=typedValue;}}} return restoredDesc;} return restoreDesc(desc);} function toGradientMap(desc) {function restoreDesc(desc) {var restoredDesc={};for(var key in desc) {if(desc.hasOwnProperty(key)) {var value=desc[key];var typedValue=null;switch(key) {case"dither":case"reverse":typedValue=["<boolean>",value];break;case"gradient":typedValue=jamHelpers.toGradientObject(value);break;} if(typedValue) {restoredDesc[key]=typedValue;}}} return restoredDesc;} return restoreDesc(desc);} function toHueSaturation(desc) {function restoreDesc(desc) {var restoredDesc={};for(var key in desc) {if(desc.hasOwnProperty(key)) {var value=desc[key];var typedValue=null;var restoredList;switch(key) {case"using":typedValue=["<path>",value];break;case"colorize":typedValue=["<boolean>",value];break;case"beginRamp":case"beginSustain":case"endRamp":case"endSustain":case"hue":case"lightness":case"localRange":case"saturation":typedValue=["<integer>",value];break;case"adjustment":restoredList=[];for(var i=0;i<value.length;i++) {restoredList.push(["<object>",["hueSatAdjustmentV2",restoreDesc(value[i])]]);} typedValue=["<list>",restoredList];break;case"channel":typedValue=["<reference>",[["channel",["<enumerated>",["channel",value]]]]];break;} if(typedValue) {restoredDesc[key]=typedValue;}}} return restoredDesc;} return restoreDesc(desc);} function toLevels(desc) {function restoreDesc(desc) {var restoredDesc={};for(var key in desc) {if(desc.hasOwnProperty(key)) {var value=desc[key];var typedValue=null;var restoredList;switch(key) {case"using":typedValue=["<path>",value];break;case"auto":case"autoBlackWhite":case"autoContrast":case"autoNeutrals":typedValue=["<boolean>",value];break;case"blackClip":case"gamma":case"whiteClip":typedValue=["<double>",value];break;case"input":case"output":restoredList=[];for(var i=0;i<value.length;i++) {restoredList.push(["<integer>",value[i]]);} typedValue=["<list>",restoredList];break;case"adjustment":restoredList=[];for(var i=0;i<value.length;i++) {restoredList.push(["<object>",["levelsAdjustment",restoreDesc(value[i])]]);} typedValue=["<list>",restoredList];break;case"channel":typedValue=["<reference>",[["channel",["<enumerated>",["channel",value]]]]];break;} if(typedValue) {restoredDesc[key]=typedValue;}}} return restoredDesc;} return restoreDesc(desc);} function toPhotoFilter(desc) {function restoreDesc(desc) {var restoredDesc={};for(var key in desc) {if(desc.hasOwnProperty(key)) {var value=desc[key];var typedValue=null;switch(key) {case"preserveLuminosity":typedValue=["<boolean>",value];break;case"density":typedValue=["<integer>",value];break;case"color":typedValue=jamHelpers.toColorObject(value);break;} if(typedValue) {restoredDesc[key]=typedValue;}}} return restoredDesc;} return restoreDesc(desc);} function toPosterize(desc) {function restoreDesc(desc) {var restoredDesc={};for(var key in desc) {if(desc.hasOwnProperty(key)) {var value=desc[key];var typedValue=null;switch(key) {case"levels":typedValue=["<integer>",value];break;} if(typedValue) {restoredDesc[key]=typedValue;}}} return restoredDesc;} return restoreDesc(desc);} function toSelectiveColor(desc) {function restoreDesc(desc) {var restoredDesc={};for(var key in desc) {if(desc.hasOwnProperty(key)) {var value=desc[key];var typedValue=null;var restoredList;switch(key) {case"using":typedValue=["<path>",value];break;case"colors":typedValue=["<enumerated>",["colors",value]];break;case"method":typedValue=["<enumerated>",["correctionMethod",value]];break;case"black":case"cyan":case"magenta":case"yellowColor":typedValue=["<unitDouble>",["percentUnit",value]];break;case"colorCorrection":restoredList=[];for(var i=0;i<value.length;i++) {restoredList.push(["<object>",["colorCorrection",restoreDesc(value[i])]]);} typedValue=["<list>",restoredList];break;} if(typedValue) {restoredDesc[key]=typedValue;}}} return restoredDesc;} return restoreDesc(desc);} function toThreshold(desc) {function restoreDesc(desc) {var restoredDesc={};for(var key in desc) {if(desc.hasOwnProperty(key)) {var value=desc[key];var typedValue=null;switch(key) {case"level":typedValue=["<integer>",value];break;} if(typedValue) {restoredDesc[key]=typedValue;}}} return restoredDesc;} return restoreDesc(desc);} function toVibrance(desc) {function restoreDesc(desc) {var restoredDesc={};for(var key in desc) {if(desc.hasOwnProperty(key)) {var value=desc[key];var typedValue=null;switch(key) {case"vibrance":case"saturation":typedValue=["<integer>",value];break;} if(typedValue) {restoredDesc[key]=typedValue;}}} return restoredDesc;} return restoreDesc(desc);} function toGradient(desc) {function restoreDesc(desc,hintData) {var restoredDesc={};for(var key in desc) {if(desc.hasOwnProperty(key)) {var value=desc[key];var typedValue=null;switch(key) {case"align":case"dither":case"reverse":typedValue=["<boolean>",value];break;case"angle":typedValue=["<unitDouble>",["angleUnit",value]];break;case"scale":typedValue=["<unitDouble>",["percentUnit",value]];break;case"horizontal":case"vertical":typedValue=["<unitDouble>",[hintData,value]];break;case"offset":typedValue=["<object>",["point",restoreDesc(value,"percentUnit")]];break;case"type":typedValue=["<enumerated>",["gradientType",value]];break;case"gradient":typedValue=jamHelpers.toGradientObject(value);break;} if(typedValue) {restoredDesc[key]=typedValue;}}} return restoredDesc;} return restoreDesc(desc);} function toPattern(desc) {function restoreDesc(desc,hintData) {var restoredDesc={};for(var key in desc) {if(desc.hasOwnProperty(key)) {var value=desc[key];var typedValue=null;switch(key) {case"align":typedValue=["<boolean>",value];break;case"ID":case"name":typedValue=["<string>",value];break;case"scale":typedValue=["<unitDouble>",["percentUnit",value]];break;case"horizontal":case"vertical":typedValue=["<double>",value];break;case"phase":typedValue=["<object>",["point",restoreDesc(value)]];break;case"pattern":typedValue=["<object>",["pattern",restoreDesc(value)]];break;} if(typedValue) {restoredDesc[key]=typedValue;}}} return restoredDesc;} return restoreDesc(desc);} function toSolidColor(desc) {function restoreDesc(desc) {var restoredDesc={};for(var key in desc) {if(desc.hasOwnProperty(key)) {var value=desc[key];var typedValue=null;switch(key) {case"color":typedValue=jamHelpers.toColorObject(value);break;} if(typedValue) {restoredDesc[key]=typedValue;}}} return restoredDesc;} return restoreDesc(desc);} jamLayers.toLayerTypeObject=function(layerType) {var result=null;var typeArr=jamEngine.parseCompact(layerType);var kind=typeArr[0];var desc=typeArr[1];var toAdjustmentFunctions={"blackAndWhite":toBlackAndWhite,"brightnessContrast":toBrightnessContrast,"channelMixer":toChannelMixer,"colorBalance":toColorBalance,"curves":toCurves,"exposure":toExposure,"gradientMapClass":toGradientMap,"hueSaturation":toHueSaturation,"invert":null,"levels":toLevels,"photoFilter":toPhotoFilter,"posterize":toPosterize,"selectiveColor":toSelectiveColor,"thresholdClassEvent":toThreshold,"vibrance":toVibrance,"gradientLayer":toGradient,"patternLayer":toPattern,"solidColorLayer":toSolidColor};if(kind in toAdjustmentFunctions) {result=(desc)?["<object>",[kind,(toAdjustmentFunctions[kind])(desc)]]:["<class>",kind];} return result;};jamLayers.toLayerObject=function(layer) {var that=this;function restoreDesc(desc) {var restoredDesc={};for(var key in desc) {if(desc.hasOwnProperty(key)) {var value=desc[key];var typedValue=null;var restoredList;switch(key) {case"group":case"blendClipped":case"blendInterior":case"fillNeutral":case"layerMaskAsGlobalMask":case"protectAll":case"protectComposite":case"protectPosition":case"protectTransparency":case"transparencyShapesLayer":case"vectorMaskAsGlobalMask":typedValue=["<boolean>",value];break;case"name":typedValue=["<string>",value];break;case"srcBlackMin":case"srcBlackMax":case"srcWhiteMin":case"srcWhiteMax":case"destBlackMin":case"destBlackMax":case"destWhiteMin":case"destWhiteMax":typedValue=["<integer>",value];break;case"fillOpacity":case"opacity":case"userMaskDensity":case"vectorMaskDensity":typedValue=["<unitDouble>",["percentUnit",value]];break;case"userMaskFeather":case"vectorMaskFeather":typedValue=["<unitDouble>",["pixelsUnit",value]];break;case"mode":typedValue=["<enumerated>",["blendMode",value]];break;case"color":typedValue=["<enumerated>",["color",value]];break;case"knockout":typedValue=["<enumerated>",["knockout",value]];break;case"channel":typedValue=["<reference>",[["channel",["<enumerated>",["channel",value]]]]];break;case"layerLocking":typedValue=["<object>",["layerLocking",restoreDesc(value)]];break;case"blendRange":restoredList=[];for(var i=0;i<value.length;i++) {restoredList.push(["<object>",["blendRange",restoreDesc(value[i])]]);} typedValue=["<list>",restoredList];break;case"channelRestrictions":restoredList=[];for(var i=0;i<value.length;i++) {restoredList.push(["<enumerated>",["channel",value[i]]]);} typedValue=["<list>",restoredList];break;case"type":typedValue=that.toLayerTypeObject(value);break;} if(typedValue) {restoredDesc[key]=typedValue;}}} return restoredDesc;} var layerClass=getObjectClass(layer);return["<object>",[layerClass,restoreDesc(layer[layerClass])]];};jamLayers.fromLayerObject=function(layerObject) {var layer={};function layerHook(desc,key,getDefaultValue) {var replacedValue=undefined;switch(key) {case"layerObject":case"type":if(desc[key][0]==="<object>") {replacedValue={};replacedValue[desc[key][1][0]]=getDefaultValue(desc,key);} else if(desc[key][0]==="<class>") {replacedValue={};replacedValue[desc[key][1]]=null;} break;case"channel":var value=getDefaultValue(desc,key);replacedValue=value[0]["channel"];break;} return replacedValue;} return jamEngine.simplifyObject(["<object>",["layerObject",{"layerObject":layerObject}]],layerHook)["layerObject"];};jamLayers.toLayerClassReference=function(layer) {return["<reference>",[[getObjectClass(layer),["<class>",null]]]];};jamLayers.makeLayer=function(layer,below) {var makeDesc={"target":this.toLayerClassReference(layer),"using":this.toLayerObject(layer)};if(below) {makeDesc["below"]=["<boolean>",below];} jamEngine.jsonPlay("make",makeDesc);};jamLayers.toLayerReference=function(layer) {return["<reference>",[[getObjectClass(layer),["<enumerated>",["ordinal","targetEnum"]]]]];};jamLayers.setLayerProperties=function(layerProperties) {var layer={"layer":layerProperties};var setDesc={"target":this.toLayerReference(layer),"to":this.toLayerObject(layer)};jamEngine.jsonPlay("set",setDesc);};jamLayers.toLayerTypeReference=function(layerType) {var layerTypeClasses={"blackAndWhite":"adjustmentLayer","brightnessContrast":"adjustmentLayer","channelMixer":"adjustmentLayer","colorBalance":"adjustmentLayer","curves":"adjustmentLayer","exposure":"adjustmentLayer","gradientMapClass":"adjustmentLayer","hueSaturation":"adjustmentLayer","invert":"adjustmentLayer","levels":"adjustmentLayer","photoFilter":"adjustmentLayer","posterize":"adjustmentLayer","selectiveColor":"adjustmentLayer","thresholdClassEvent":"adjustmentLayer","vibrance":"adjustmentLayer","gradientLayer":"contentLayer","patternLayer":"contentLayer","solidColorLayer":"contentLayer"};return["<reference>",[[layerTypeClasses[getObjectClass(layerType)],["<enumerated>",["ordinal","targetEnum"]]]]];};jamLayers.setLayerType=function(layerType) {var setDesc={"target":this.toLayerTypeReference(layerType),"to":this.toLayerTypeObject(layerType)};jamEngine.jsonPlay("set",setDesc);};jamLayers.groupLayer=function() {jamEngine.jsonPlay("groupEvent");};jamLayers.ungroupLayer=function() {jamEngine.jsonPlay("ungroup");};}());}
// jamUtils.jsxinc v4.4 (minified)
if(typeof jamUtils!=='object') {var jamUtils={};(function() {jamUtils.toDistanceUnit=function(amount,amountBasePerInch) {return(amount/amountBasePerInch)*72.0;};jamUtils.fromDistanceUnit=function(amount,amountBasePerInch) {return(amount/72.0)*amountBasePerInch;};jamUtils.fontExists=function(fontPostScriptName) {var useDOM=true;var found=false;if(useDOM) {for(var i=0;i<app.fonts.length;i++) {if(app.fonts[i].postScriptName===fontPostScriptName) {found=true;break;}}} else {var saveMeaningfulIds=jamEngine.meaningfulIds;var saveParseFriendly=jamEngine.parseFriendly;jamEngine.meaningfulIds=true;jamEngine.parseFriendly=true;var resultDescriptorObj=jamEngine.jsonGet ([["property",["<property>","fontList"]],["application",["<enumerated>",["ordinal","targetEnum"]]]]);var fontPostScriptNameArr=resultDescriptorObj["fontList"][1][1]["fontPostScriptName"][1];for(var i=0;i<fontPostScriptNameArr.length;i++) {if(fontPostScriptNameArr[i][1]===fontPostScriptName) {found=true;break;}} jamEngine.meaningfulIds=saveMeaningfulIds;jamEngine.parseFriendly=saveParseFriendly;} return found;};jamUtils.loadAction=function(action,actionSet,actionsFilePath) {try {jamEngine.jsonGet([["action",["<name>",action]],["actionSet",["<name>",actionSet]]]);var found=true;} catch(e) {var found=false;} if(!found) {jamEngine.jsonPlay("open",{"target":["<path>",actionsFilePath]});}};jamUtils.loadActionSet=function(actionSet,actionsFilePath) {try {jamEngine.jsonGet([["actionSet",["<name>",actionSet]]]);var found=true;} catch(e) {var found=false;} if(!found) {jamEngine.jsonPlay("open",{"target":["<path>",actionsFilePath]});}};jamUtils.loadPreset=function(presetProperty,presetName,presetFilePath) {var useDOM=false;var useOpen=true;var classes={"brush":"brush","colors":"color","gradientClassEvent":"gradientClassEvent","style":"styleClass","pattern":"'PttR'","shapingCurve":"shapingCurve","customShape":"customShape","toolPreset":"toolPreset"};var presetClass=classes[presetProperty];var saveMeaningfulIds=jamEngine.meaningfulIds;var saveParseFriendly=jamEngine.parseFriendly;jamEngine.meaningfulIds=true;jamEngine.parseFriendly=true;var found=false;var resultDescriptorObj=jamEngine.jsonGet ([["property",["<property>","presetManager"]],["application",["<enumerated>",["ordinal","targetEnum"]]]]);var presetManagerArr=resultDescriptorObj["presetManager"][1];for(var i=0;i<presetManagerArr.length;i++) {var presets=presetManagerArr[i][1];if(presets[0]===presetClass) {var presetsArr=presets[1]["name"][1];for(var j=0;j<presetsArr.length;j++) {if(presetsArr[j][1]===presetName) {found=true;break;}} break;}} if(!found) {if(useDOM) {app.load(new File(presetFilePath));} else if(useOpen) {jamEngine.jsonPlay("open",{"target":["<path>",presetFilePath]});} else {jamEngine.jsonPlay ("set",{"target":["<reference>",[["property",["<property>",presetProperty]],["application",["<enumerated>",["ordinal","targetEnum"]]]]],"to":["<path>",presetFilePath],"append":["<boolean>",true]});}} jamEngine.meaningfulIds=saveMeaningfulIds;jamEngine.parseFriendly=saveParseFriendly;};function getFileObject(file) {var fileObject;if(file instanceof File) {fileObject=file;} else if(typeof file==='string') {fileObject=new File(file);} else {throw new Error('[jamUtils getFileObject] Invalid argument');} return fileObject;} jamUtils.readTextFile=function(textFile) {var text=null;var file=getFileObject(textFile);if(file.open("r")) {text=file.read();file.close();} return text;};jamUtils.readJsonFile=function(jsonFile) {return jamJSON.parse(this.readTextFile(jsonFile),true);};jamUtils.writeTextFile=function(textFile,text) {var file=getFileObject(textFile);if(file.open('w','TEXT')) {file.encoding='UTF-8';file.lineFeed='unix';file.write('\uFEFF');file.write(text);file.close();}};jamUtils.writeJsonFile=function(jsonFile,data,space) {this.writeTextFile(jsonFile,jamJSON.stringify(data,space));};jamUtils.cloneData=function(data) {var clone;if(data===null) {clone=data;} else if(data.constructor===Object) {clone={};for(var k in data) {if(data.hasOwnProperty(k)) {clone[k]=this.cloneData(data[k]);}}} else if(data.constructor===Array) {clone=[];for(var i=0;i<data.length;i++) {clone.push(this.cloneData(data[i]));}} else {clone=data;} return clone;};jamUtils.mergeData=function(data,defaultData) {for(var k in defaultData) {if(defaultData.hasOwnProperty(k)) {if(k in data) {if((defaultData[k]!==null)&&(defaultData[k].constructor===Object)) {data[k]=this.mergeData(data[k],defaultData[k]);}} else {data[k]=this.cloneData(defaultData[k]);}}} return data;};var jsonCustomOptionsStringKey="jsonCustomOptions";jamUtils.getCustomOptions=function(signature,defaultOptions) {var saveMeaningfulIds=jamEngine.meaningfulIds;var saveParseFriendly=jamEngine.parseFriendly;jamEngine.meaningfulIds=true;jamEngine.parseFriendly=false;try {var resultObj=jamEngine.classIdAndActionDescriptorToJson(jamEngine.uniIdStrToId(signature),app.getCustomOptions(signature));var customOptions=jamJSON.parse(resultObj["<descriptor>"][jsonCustomOptionsStringKey]["<string>"],true)} catch(e) {var customOptions={};} jamEngine.meaningfulIds=saveMeaningfulIds;jamEngine.parseFriendly=saveParseFriendly;return this.mergeData(customOptions,defaultOptions);};jamUtils.putCustomOptions=function(signature,customOptions,persistent) {var descriptorObj={};descriptorObj[jsonCustomOptionsStringKey]=["<string>",jamJSON.stringify(customOptions)];app.putCustomOptions(signature,jamEngine.jsonToActionDescriptor(descriptorObj),persistent);};jamUtils.eraseCustomOptions=function(signature) {app.eraseCustomOptions(signature);};jamUtils.dataToHexaString=function(dataString,lowercase) {var hexaDigits=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"];var hexaString="";var length=dataString.length;for(var index=0;index<length;index++) {var dataByte=dataString.charCodeAt(index);if((dataByte>=0x00)&&(dataByte<=0xFF)) {hexaString+=hexaDigits[(dataByte&0xF0)>>4]+hexaDigits[dataByte&0x0F];} else {throw new Error("[jamUtils.dataToHexaString] Invalid data string");}} if(lowercase) {hexaString=hexaString.toLowerCase();} return hexaString;};jamUtils.hexaToDataString=function(hexaString) {var dataString="";var length=hexaString.length;if(((length%2)===0)&&(/^[0-9A-Fa-f]*$/.test(hexaString))) {for(var index=0;index<length;index+=2) {var byteString=hexaString.slice(index,index+2);dataString+=String.fromCharCode(parseInt(byteString,16));}} else {throw new Error("[jamUtils.hexaToDataString] Invalid hexa string");} return dataString;};}());}

//------------------------------------------------------------------------------

function reverseClut (clut)
{
	var reversedClut = [ ];
	for (var index = 0; index < clut.length; index++)
	{
		reversedClut.unshift (clut[index]);
	}
	return reversedClut;
}

//------------------------------------------------------------------------------

function isMapping (mapping)
{
	var result = true;
	if (mapping && (mapping.constructor === Array))
	{
		var channelCount = mapping.length;
		if (channelCount === 3)
		{
			for (var channelIndex = 0; channelIndex < channelCount; channelIndex++)
			{
				var channelMapping = mapping[channelIndex];
				if (channelMapping && (channelMapping.constructor === Array))
				{
					var componentCount = channelMapping.length;
					if (componentCount === 256)
					{
						for (var componentIndex = 0; componentIndex < componentCount; componentIndex++)
						{
							var component = channelMapping[componentIndex];
							if (typeof component === 'number')
							{
								if ((component < 0) || (component > 255))
								{
									result = false;
								}
								else if (Math.floor (component) !== component)
								{
									result = false;
								}
							}
							else
							{
								result = false;
							}
							if (!result)
							{
								break;
							}
						}
					}
					else
					{
						result = false;
					}
				}
				else
				{
					result = false;
				}
				if (!result)
				{
					break;
				}
			}
		}
		else
		{
			result = false;
		}
	}
	else
	{
		result = false;
	}
	return result;
}

//------------------------------------------------------------------------------

function isClut (clut)
{
	var result = true;
	if (clut && (clut.constructor === Array))
	{
		var colorCount = clut.length;
		if (colorCount === 256)
		{
			for (var colorIndex = 0; colorIndex < colorCount; colorIndex++)
			{
				var color = clut[colorIndex];
				if (color && (color.constructor === Array))
				{
					var componentCount = color.length;
					if (componentCount === 3)
					{
						for (var componentIndex = 0; componentIndex < componentCount; componentIndex++)
						{
							var component = color[componentIndex];
							if (typeof component === 'number')
							{
								if ((component < 0) || (component > 255))
								{
									result = false;
								}
								else if (Math.floor (component) !== component)
								{
									result = false;
								}
							}
							else
							{
								result = false;
							}
							if (!result)
							{
								break;
							}
						}
					}
					else
					{
						result = false;
					}
				}
				else
				{
					result = false;
				}
				if (!result)
				{
					break;
				}
			}
		}
		else
		{
			result = false;
		}
	}
	else
	{
		result = false;
	}
	return result;
}

//------------------------------------------------------------------------------

function clutToMapping (clut)
{
	var redMapping = [ ];
	var greenMapping = [ ];
	var blueMapping = [ ];
	for (var index = 0; index < 256; index++)
	{
		redMapping.push (clut[index][0]);
		greenMapping.push (clut[index][1]);
		blueMapping.push (clut[index][2]);
	}
	return [ redMapping, greenMapping, blueMapping ];
}

//------------------------------------------------------------------------------

function mappingToClut (mapping)
{
	var clut = [ ];
	var redMapping = mapping[0];
	var greenMapping = mapping[1];
	var blueMapping = mapping[2];
	for (var index = 0; index < 256; index++)
	{
		clut.push ([ redMapping[index], greenMapping[index], blueMapping[index] ]);
	}
	return clut;
}

//------------------------------------------------------------------------------

function equalPoints (data1, data2)
{
	var isEqual = false;
	if ((data1.constructor === Array) && (data2.constructor === Array))
	{
		if (data1.length === data2.length)
		{
			for (var i = 0; i < data1.length; i++)
			{
				isEqual = equalPoints (data1[i], data2[i]);
				if (!isEqual) break;
			}
		}
	}
	else if (data1 === data2)
	{
		isEqual = true;
	}
	return isEqual;
}

//------------------------------------------------------------------------------

function clonePoints (data)
{
	var clone;
	if (data.constructor === Array)
	{
		clone = [ ];
		for (var i = 0; i < data.length; i++)
		{
			clone.push (clonePoints (data[i]));
		}
	}
	else
	{
		clone = data;
	}
	return clone;
}

//------------------------------------------------------------------------------

function limit (value, min, max)
{
	return (Math.min (Math.max (min, value), max));
}

//------------------------------------------------------------------------------

function lerp (a, b, t)
{
	return a + ((b - a) * t);
}

//------------------------------------------------------------------------------

function coserp (a, b, t)
{
	t = limit (t, 0.0, 1.0);
	return a + ((b - a) * (1 - Math.cos (t * Math.PI)) / 2);
}

//------------------------------------------------------------------------------

// <http://en.wikipedia.org/wiki/Smoothstep>

function smoothstep (a, b, t)
{
	t = limit (t, 0.0, 1.0);
	return a + ((b - a) * t * t * (3 - (2 * t)));
}

function smootherstep (a, b, t)
{
	t = limit (t, 0.0, 1.0);
	return a + ((b - a) * t * t * t * (t * ((t * 6) - 15) + 10));
}

//------------------------------------------------------------------------------

function bias (t, b)
{
	return t / ((((1 / b) - 2) * (1 - t)) + 1);
}

//------------------------------------------------------------------------------

function gain (t, g)
{
	return t < 0.5 ? bias (2 * t, g) / 2 : 1 - (bias ((2 * (1 - t)), g) / 2);
}

//------------------------------------------------------------------------------

// Shape-preserving PCHIP (Piecewise Cubic Hermite Interpolation Polynomial)
// Based on:
// <http://www.mathworks.fr/moler/interp.pdf>
// <http://en.wikipedia.org/wiki/Monotone_cubic_interpolation>

function getTangents (xs, ys, ms)
{
	var dxs = [ ];
	var ss = [ ];
	for (var i = 0; i < xs.length - 1; i++)
	{
		var dx = xs[i + 1] - xs[i];
		var dy = ys[i + 1] - ys[i];
		dxs.push (dx);
		ss.push (dy / dx);
	}
	ms[0] = ss[0];
	for (var i = 1; i < ss.length; i++)
	{
		var s1 = ss[i - 1];
		var s2 = ss[i];
		if ((s1 * s2) <= 0)
		{
			ms[i] = 0;
		}
		else
		{
			var w1 = (2 * dxs[i]) + dxs[i - 1];
			var w2 = (2 * dxs[i - 1]) + dxs[i];
			ms[i] = (w1 + w2) / ((w1 / s1) + (w2 / s2));
		}
	}
	ms[ms.length - 1] = ss[ss.length - 1];
}
//
function evalCurve (x, xs, ys, ms)
{
	var y;
	var count = xs.length;
	if (x < xs[0])
	{
		y = ys[0] + (ms[0] * (x - xs[0]));
	}
	else if (x > xs[count - 1])
	{
		y = ys[count - 1] + (ms[count - 1] * (x - xs[count - 1]))
	}
	else
	{
		var i = 1;
		while (xs[i] < x)
		{
			i++;
		}
		var h = xs[i] - xs[i - 1];
		var t = (x - xs[i - 1]) / h;
		var t2 = Math.pow (t, 2);
		var t3 = Math.pow (t, 3);
		var h00 = (2 * t3) - (3 * t2) + 1;
		var h10 = t3 - (2 * t2) + t;
		var h01 = (-2 * t3) + (3 * t2);
		var h11 = t3 - t2;
		y = (h00 * ys[i - 1]) + (h10 * h * ms[i - 1]) + (h01 * ys[i]) + (h11 * h * ms[i]);
	}
	return y;
}
//
function pchip (points, position)
{
	var pointsCount = points.length;
	if (pointsCount > 1)
	{
		for (var index = 1; index < pointsCount; index++)
		{
			if (points[index - 1][0] >= points[index][0])
			{
				throw new Error ("pchip: positions must be in strict ascending order");
			}
		}
		var cacheSize = (3 + 3) * 2;	// 3 * 2
		if (typeof pchip.statics === 'undefined')
		{
			pchip.statics = { };
			pchip.statics.cache = [ ];
			pchip.statics.cacheQueue = [ ];
			for (var index = 0; index < cacheSize; index++)
			{
				pchip.statics.cache.push ({ points: [ ], xs: [ ], ys: [ ], ms: [ ] });
				pchip.statics.cacheQueue.push (index);
			}
		}
		var matchIndex = -1;
		for (var index = 0; index < cacheSize; index++)
		{
			var cacheIndex = pchip.statics.cacheQueue[index];
			if (equalPoints (points, pchip.statics.cache[cacheIndex].points))
			{
				matchIndex = index;
				break;
			}
		}
		var cache;
		if (matchIndex === -1)
		{
			var cacheIndex = pchip.statics.cacheQueue.pop ();
			pchip.statics.cacheQueue.unshift (cacheIndex);
			cache = pchip.statics.cache[cacheIndex];
			cache.points = clonePoints (points);
			cache.xs = [ ];
			cache.ys = [ ];
			cache.ms = [ ];
			for (var pointsIndex = 0; pointsIndex < pointsCount; pointsIndex++)
			{
				cache.xs.push (points[pointsIndex][0]);
				cache.ys.push (points[pointsIndex][1]);
				cache.ms.push (1);
			}
			getTangents (cache.xs, cache.ys, cache.ms);
		}
		else
		{
			var cacheIndex = pchip.statics.cacheQueue[matchIndex];
			if (matchIndex !== 0)
			{
				pchip.statics.cacheQueue.splice (matchIndex, 1);
				pchip.statics.cacheQueue.unshift (cacheIndex);
			}
			cache = pchip.statics.cache[cacheIndex];
		}
		return evalCurve (position, cache.xs, cache.ys, cache.ms);
	}
	else
	{
		throw new Error ("pchip: two points or more are required");
	}
}

//------------------------------------------------------------------------------

function interpolate (points, position, smoothness)
{
	var value;
	var pointsCount = points.length;
	if (pointsCount > 1)
	{
		for (var startIndex = 0; startIndex < (pointsCount - 1); startIndex++)
		{
			var startPoint = points[startIndex];
			var startPosition = startPoint[0];
			var startValue = startPoint[1];
			var endIndex = startIndex + 1;
			var endPoint = points[endIndex];
			var endPosition = endPoint[0];
			var endValue = endPoint[1];
			if (startPosition > endPosition)
			{
				throw new Error ("interpolate: positions must be in ascending order");
			}
			else
			{
				if ((position <= endPosition) || (endIndex === (pointsCount - 1)))
				{
					value = lerp (startValue, endValue, (position - startPosition) / (endPosition - startPosition));
					break;
				}
			}
		}
	}
	else
	{
		throw new Error ("interpolate: two points or more are required");
	}
	if (typeof smoothness !== 'undefined')
	{
		if ((smoothness < 0) || (smoothness > 100))
		{
			throw new Error ("interpolate: invalid smoothness percentage: " + smoothness);
		}
		else if (smoothness !== 0)
		{
			var smoothValue = pchip (points, position);
			value = lerp (value, smoothValue, smoothness / 100);
		}
	}
	return value;
}

//------------------------------------------------------------------------------

function distribute (values, bounds, position, smoothness)
{
	var value;
	var count = values.length;
	if (count > 1)
	{
		var min = bounds[0];
		var max = bounds[1];
		var points = [ ];
		for (var valueIndex = 0; valueIndex < count; valueIndex++)
		{
			points.push ([ min + ((max - min) * valueIndex / (count - 1)), values[valueIndex] ]);
		}
		value = interpolate (points, position, smoothness);
	}
	else
	{
		throw new Error ("distribute: invalid number of values: " + count);
	}
	return value;
}

//------------------------------------------------------------------------------

// Code adapted from:
// <http://blog.ivank.net/interpolation-with-cubic-splines.html>
// <http://www.ivank.net/blogspot/cspline/CSPL.js>
// By: Ivan Kuckir

function getNaturalKs (xs, ys, ks)
{
	function zerosMatrix (r, c)
	{
		var A = [ ];
		for (var i = 0; i < r; i++)
		{
			A.push ([ ]);
			for (var j = 0; j < c; j++)
			{
				A[i].push (0);
			}
		}
		return A;
	}
	function solve (A, x)
	{
		function swapRows (m, k, l)
		{
			var p = m[k];
			m[k] = m[l];
			m[l] = p;
		}
		var m = A.length;
		for (var k = 0; k < m; k++)
		{
			var i_max = 0;
			var vali = Number.NEGATIVE_INFINITY;
			for (var i = k; i < m; i++)
			{
				if(A[i][k] > vali)
				{
					i_max = i;
					vali = A[i][k];
				}
			}
			swapRows (A, k, i_max);
			for (var i = k + 1; i < m; i++)
			{
				for (var j = k + 1; j < m + 1; j++)
				{
					A[i][j] = A[i][j] - A[k][j] * (A[i][k] / A[k][k]);
				}
				A[i][k] = 0;
			}
		}
		for (var i = m - 1; i >= 0; i--)
		{
			var v = A[i][m] / A[i][i];
			x[i] = v;
			for (var j = i - 1; j >= 0; j--)
			{
				A[j][m] -= A[j][i] * v;
				A[j][i] = 0;
			}
		}
	}
	var n = xs.length - 1;
	var A = zerosMatrix (n + 1, n + 2);
	for (var i = 1; i < n; i++)
	{
		A[i][i - 1] = 1 / (xs[i] - xs[i - 1]);
		A[i][i] = 2 * ((1 / (xs[i] - xs[i - 1])) + (1 / (xs[i + 1] - xs[i])));
		A[i][i + 1] = 1 / (xs[i + 1] - xs[i]);
		A[i][n + 1] = 3 * ((ys[i] - ys[i - 1]) / ((xs[i] - xs[i - 1]) * (xs[i] - xs[i - 1])) + (ys[i + 1] - ys[i]) / ((xs[i + 1] - xs[i]) * (xs[i + 1] - xs[i])));
	}
	A[0][0] = 2 / (xs[1] - xs[0]);
	A[0][1] = 1 / (xs[1] - xs[0]);
	A[0][n + 1] = 3 * (ys[1] - ys[0]) / ((xs[1] - xs[0]) * (xs[1] - xs[0]));
	A[n][n - 1] = 1 / (xs[n] - xs[n - 1]);
	A[n][n] = 2 / (xs[n] - xs[n - 1]);
	A[n][n + 1] = 3 * (ys[n] - ys[n - 1]) / ((xs[n] - xs[n - 1]) * (xs[n] - xs[n - 1]));
	solve (A, ks);
	A = null;
}
//
function evalSpline (x, xs, ys, ks, compatible)
{
	var y;
	var count = xs.length;
	if (x < xs[0])
	{
		y = (compatible) ? ys[0] : ys[0] + (ks[0] * (x - xs[0]));
	}
	else if (x > xs[count - 1])
	{
		y = (compatible) ? ys[count - 1] : ys[count - 1] + (ks[count - 1] * (x - xs[count - 1]));
	}
	else
	{
		var i = 1;
		while (xs[i] < x)
		{
			i++;
		}
		var x1 = xs[i - 1];
		var x2 = xs[i];
		var y1 = ys[i - 1];
		var y2 = ys[i];
		var k1 = ks[i - 1];
		var k2 = ks[i];
		var a = (k1 * (x2 - x1)) - (y2 - y1);
		var b = (-k2 * (x2 - x1)) + (y2 - y1);
		var t = (x - x1) / (x2 - x1);
		y = ((1 - t) * y1) + (t * y2) + (t * (1 - t) * (a * (1 - t) + (b * t)));
	}
	return y;
}
//
function spline (points, position, compatible)
{
	var pointsCount = points.length;
	if (pointsCount > 1)
	{
		for (var index = 1; index < pointsCount; index++)
		{
			if (points[index - 1][0] > points[index][0])
			{
				throw new Error ("spline: positions must be in ascending order");
			}
		}
		var cacheSize = (3 + 3) * 2;
		if (typeof spline.statics === 'undefined')
		{
			spline.statics = { };
			spline.statics.cache = [ ];
			spline.statics.cacheQueue = [ ];
			for (var index = 0; index < cacheSize; index++)
			{
				spline.statics.cache.push ({ points: [ ], xs: [ ], ys: [ ], ks: [ ] });
				spline.statics.cacheQueue.push (index);
			}
		}
		var matchIndex = -1;
		for (var index = 0; index < cacheSize; index++)
		{
			var cacheIndex = spline.statics.cacheQueue[index];
			if (equalPoints (points, spline.statics.cache[cacheIndex].points))
			{
				matchIndex = index;
				break;
			}
		}
		var cache;
		if (matchIndex === -1)
		{
			var cacheIndex = spline.statics.cacheQueue.pop ();
			spline.statics.cacheQueue.unshift (cacheIndex);
			cache = spline.statics.cache[cacheIndex];
			cache.points = clonePoints (points);
			cache.xs = [ ];
			cache.ys = [ ];
			cache.ks = [ ];
			for (var pointsIndex = 0; pointsIndex < pointsCount; pointsIndex++)
			{
				cache.xs.push (points[pointsIndex][0]);
				cache.ys.push (points[pointsIndex][1]);
				cache.ks.push (1);
			}
			getNaturalKs (cache.xs, cache.ys, cache.ks);
		}
		else
		{
			var cacheIndex = spline.statics.cacheQueue[matchIndex];
			if (matchIndex !== 0)
			{
				spline.statics.cacheQueue.splice (matchIndex, 1);
				spline.statics.cacheQueue.unshift (cacheIndex);
			}
			cache = spline.statics.cache[cacheIndex];
		}
		return evalSpline (position, cache.xs, cache.ys, cache.ks, compatible);
	}
	else
	{
		throw new Error ("spline: two points or more are required");
	}
}

//------------------------------------------------------------------------------

function linear (coeffs, x)
{
	var a = coeffs[0]; if (!isFinite (a)) { a = 0 };
	var b = coeffs[1]; if (!isFinite (b)) { b = 0 };
	return (a * x) + b;
}

//------------------------------------------------------------------------------

function quadratic (coeffs, x)
{
	var a = coeffs[0]; if (!isFinite (a)) { a = 0 };
	var b = coeffs[1]; if (!isFinite (b)) { b = 0 };
	var c = coeffs[2]; if (!isFinite (c)) { c = 0 };
	return (a * x * x) + (b * x) + c;
}

//------------------------------------------------------------------------------

function cubic (coeffs, x)
{
	var a = coeffs[0]; if (!isFinite (a)) { a = 0 };
	var b = coeffs[1]; if (!isFinite (b)) { b = 0 };
	var c = coeffs[2]; if (!isFinite (c)) { c = 0 };
	var d = coeffs[3]; if (!isFinite (d)) { d = 0 };
	return (a * x * x * x) + (b * x * x) + (c * x) + d;
}

//------------------------------------------------------------------------------

function polynomial (coeffs, x)
{
	var sum = 0;
	if (coeffs.constructor === Array)
	{
		var count = coeffs.length;
		if (count > 0)
		{
			for (var degree = 0; degree < count; degree++)
			{
				sum += coeffs[count - degree - 1] * Math.pow (x, degree);
			}
		}
	}
	return sum;
}

//------------------------------------------------------------------------------

function interpolateColors (stops, location, colorModel, option)
{
	var rgb;
	var stopsCount = stops.length;
	if (stopsCount > 1)
	{
		if (colorModel)
		{
			colorModel = colorModel.toLowerCase ();
		}
		else
		{
			throw new Error ("interpolateColors: missing interpolation color model");
		}
		if (colorModel === "rgb")
		{
			var redPoints = [ ];
			var greenPoints = [ ];
			var bluePoints = [ ];
			for (var stopIndex = 0; stopIndex < stopsCount; stopIndex++)
			{
				var stop = stops[stopIndex];
				var position = stop[0];
				rgb = jamColors.colorToRgb (stop[1]);
				redPoints.push ([ position, rgb[0] ]);
				greenPoints.push ([ position, rgb[1] ]);
				bluePoints.push ([ position, rgb[2] ]);
			}
			if ((typeof option === 'undefined') || (typeof option === 'number'))	// Smoothness: 0 to 100 (0 by default)
			{
				rgb =
				[
					interpolate (redPoints, location, option),
					interpolate (greenPoints, location, option),
					interpolate (bluePoints, location, option)
				];
			}
			else
			{
				throw new Error ("interpolateColors: invalid option: " + option);
			}
		}
		else
		{
			var rgbTo;
			var toRgb;
			switch (colorModel)
			{
				case "hsb":
					rgbTo = jamColors.rgbToHsb;
					toRgb = jamColors.hsbToRgb;
					break;
				case "hsl":
					rgbTo = jamColors.rgbToHsl;
					toRgb = jamColors.hslToRgb;
					break;
				case "hcl":
					rgbTo = jamColors.rgbToHcl;
					toRgb = jamColors.hclToRgb;
					break;
				default:
					throw new Error ("interpolateColors: invalid interpolation color model: " + colorModel);
					break;
			}
			for (var startIndex = 0; startIndex < (stopsCount - 1); startIndex++)
			{
				var startStop = stops[startIndex];
				var startLocation = startStop[0];
				var endIndex = startIndex + 1;
				var endStop = stops[endIndex];
				var endLocation = endStop[0];
				if (startLocation > endLocation)
				{
					throw new Error ("interpolateColors: locations must be in ascending order");
				}
				else
				{
					if ((location <= endLocation) || (endIndex === (stopsCount - 1)))
					{
						var startColor = rgbTo (jamColors.colorToRgb (startStop[1]), false, true);
						var endColor = rgbTo (jamColors.colorToRgb (endStop[1]), false, true);
						if (typeof option !== 'undefined')	// Hue mode
						{
							if (typeof option === 'string')
							{
								// Interpolation around the hue wheel
								switch (option.toLowerCase ())
								{
									case "desc":	// Descending
									case "dec":		// Decreasing
										if (endColor[0] > startColor[0])
										{
											startColor[0] += 1;
										}
										break;
									case "asc":		// Ascending
									case "inc":		// Increasing
										if (startColor[0] > endColor[0])
										{
											endColor[0] += 1;
										}
										break;
									case "far":		// Furthest route
									case "long":	// Longest path
										var delta = Math.abs (endColor[0] - startColor[0]);
										if (delta < 0.5)
										{
											if (endColor[0] > startColor[0])
											{
												startColor[0] += 1;
											}
											else if (startColor[0] > endColor[0])
											{
												endColor[0] += 1;
											}
										}
										else if (delta === 0.5)
										{
											// Same as "desc" or "dec"
											if (endColor[0] > startColor[0])
											{
												startColor[0] += 1;
											}
										}
										break;
									case "near":	// Nearest route
									case "short":	// Shortest path
										var delta = Math.abs (endColor[0] - startColor[0]);
										if (delta > 0.5)
										{
											if (endColor[0] > startColor[0])
											{
												startColor[0] += 1;
											}
											else if (startColor[0] > endColor[0])
											{
												endColor[0] += 1;
											}
										}
										else if (delta === 0.5)
										{
											// Same as "asc" or "inc"
											if (startColor[0] > endColor[0])
											{
												endColor[0] += 1;
											}
										}
										break;
									case "none":	// Do nothing
										break;
									default:
										throw new Error ("interpolateColors: invalid option: " + option);
										break;
								}
							}
							else
							{
								throw new Error ("interpolateColors: invalid option: " + option);
							}
						}
						var t = (location - startLocation) / (endLocation - startLocation);
						var color =
						[
							lerp (startColor[0], endColor[0], t),
							lerp (startColor[1], endColor[1], t),
							lerp (startColor[2], endColor[2], t)
						];
						rgb = toRgb (color, true);
						break;
					}
				}
			}
		}
	}
	else
	{
		throw new Error ("interpolateColors: two stops or more are required");
	}
	return rgb;
}

//------------------------------------------------------------------------------

function distributeColors (colors, bounds, location, colorModel, option)
{
	var rgb;
	var count = colors.length;
	if (count > 1)
	{
		var min = bounds[0];
		var max = bounds[1];
		var stops = [ ];
		for (var stopIndex = 0; stopIndex < count; stopIndex++)
		{
			stops.push ([ min + ((max - min) * stopIndex / (count - 1)), colors[stopIndex] ]);
		}
		rgb = interpolateColors (stops, location, colorModel, option);
	}
	else
	{
		throw new Error ("distributeColors: invalid number of colors: " + count);
	}
	return rgb;
}

//------------------------------------------------------------------------------

function rgb (red, green, blue)
{
	return [ red, green, blue ];
}

//------------------------------------------------------------------------------

function hsb (hue, saturation, brightness)
{
	return jamColors.hsbToRgb ([ hue, saturation, brightness ]);
}

//------------------------------------------------------------------------------

function hsl (hue, saturation, lightness)
{
	return jamColors.hslToRgb ([ hue, saturation, lightness ]);
}

//------------------------------------------------------------------------------

function hcl (hue, chroma, luminance)
{
	return jamColors.hclToRgb ([ hue, chroma, luminance ]);
}

//------------------------------------------------------------------------------

function lab (luminance, a, b)
{
	return jamColors.labToRgb ([ luminance, a, b ]);
}

//------------------------------------------------------------------------------

function xyz (x, y, z)
{
	return jamColors.xyzToRgb ([ x, y, z ]);
}

//------------------------------------------------------------------------------

function ycbcr (y, cb, cr)
{
	return jamColors.ycbcrToRgb ([ y, cb, cr ]);
}

//------------------------------------------------------------------------------

function shiftHue (rgb, shift)
{
	if (shift)
	{
		var hsl = jamColors.rgbToHsl (rgb);
		hsl[0] += shift;
		rgb = jamColors.hslToRgb (hsl);
	}
	return rgb;
}

//------------------------------------------------------------------------------

function multiplyMatrix (m1, m2)
{
	if (m1[0].length !== m2.length)	// (m1.width !== m2.height)
	{
		throw new Error ("multiplyMatrix: incompatible sizes");
	}
	else
	{
		var result = [ ];
		for (var i = 0; i < m1.length; i++)	// m1.height
		{
			result[i] = [ ];
			for (var j = 0; j < m2[0].length; j++)	// m2.width
			{
				var sum = 0;
				for (var k = 0; k < m2.length; k++)	// m2.height
				{
					sum += m1[i][k] * m2[k][j];
				}
				result[i][j] = sum;
			}
		}
		return result;
	}
}

//------------------------------------------------------------------------------

function vectorToMatrix (v)
{
	var m = [ ];
	for (var i = 0; i < v.length; i++)
	{
		if (typeof v[i] !== 'number')
		{
			throw new Error ("vectorToMatrix: not a vector");
		}
		else
		{
			m.push ([ v[i] ]);
		}
	}
	return m;
}

//------------------------------------------------------------------------------

function matrixToVector (m)
{
	var v = [ ];
	for (var i = 0; i < m.length; i++)
	{
		if (m[i].length !== 1)
		{
			throw new Error ("matrixToVector: not a vector");
		}
		else
		{
			v.push (m[i][0]);
		}
	}
	return v;
}

//------------------------------------------------------------------------------

// YUV <http://en.wikipedia.org/wiki/YUV>
// Color Conversion <http://www.equasys.de/colorconversion.html>

var rgbToYuv =
[
	[ 0.299, 0.587, 0.114 ],
	[ -0.14713, -0.28886, 0.436 ],
	[ 0.615, -0.51499, -0.10001 ]
];
var yuvToRgb =
[
	[ 1, 0, 1.13983 ],
	[ 1, -0.39465, -0.58060 ],
	[ 1, 2.03211, 0 ]
];

// YIQ <http://en.wikipedia.org/wiki/YIQ>
// HSV color transforms <http://beesbuzz.biz/code/hsv_color_transforms.php>

var rgbToYiq =
[
	[ 0.299, 0.587, 0.114 ],
	[ 0.596, -0.274, -0.322 ],
	[ 0.211, -0.523, 0.312 ]
];
var yiqToRgb =
[
	[ 1, 0.956, 0.621 ],
	[ 1, -0.272, -0.647 ],
	[ 1, -1.106, 1.703 ]
];

var useYiq = true;

//------------------------------------------------------------------------------

function transformColor (rgb, hueShift, saturationMultiplier, brightnessMultiplier)
{
	var toRgbMatrix;
	var fromRgbMatrix;
	var h = (typeof hueShift === 'number') ? hueShift : 0;
	if (useYiq)
	{
		h = -h;
		toRgbMatrix = yiqToRgb;
		fromRgbMatrix = rgbToYiq;
	}
	else
	{
		toRgbMatrix = yuvToRgb;
		fromRgbMatrix = rgbToYuv;
	}
	var s = (typeof saturationMultiplier === 'number') ? saturationMultiplier : 1;
	var b = (typeof brightnessMultiplier === 'number') ? brightnessMultiplier : 1;
	var bsu = b * s * Math.cos (h * Math.PI / 180);
	var bsv = b * s * Math.sin (h * Math.PI / 180);
	var hsb =
	[
		[ b, 0, 0 ],
		[ 0, bsu, -bsv ],
		[ 0, bsv, bsu ]
	];
	return matrixToVector (multiplyMatrix (multiplyMatrix (toRgbMatrix, multiplyMatrix (hsb, fromRgbMatrix)), vectorToMatrix (rgb)));
}

//------------------------------------------------------------------------------

function evalXFormula (x, formula)
{
	// Math properties
	var E = Math.E;				// Euler's constant and the base of natural logarithms, approximately 2.718.
	var LN2 = Math.LN2;			// Natural logarithm of 2, approximately 0.693.
	var LN10 = Math.LN10;		// Natural logarithm of 10, approximately 2.303.
	var LOG2E = Math.LOG2E;		// Base 2 logarithm of E, approximately 1.443.
	var LOG10E = Math.LOG10E;	// Base 10 logarithm of E, approximately 0.434.
	var PI = Math.PI;			// Ratio of the circumference of a circle to its diameter, approximately 3.14159.
	var SQRT1_2 = Math.SQRT1_2;	// Square root of 1/2; equivalently, 1 over the square root of 2, approximately 0.707.
	var SQRT2 = Math.SQRT2;		// Square root of 2, approximately 1.414.
	//
	// Math methods
	var abs = Math.abs;			// Returns the absolute value of a number.
	var acos = Math.acos;		// Returns the arccosine of a number.
	var asin = Math.asin;		// Returns the arcsine of a number.
	var atan = Math.atan;		// Returns the arctangent of a number.
	var atan2 = Math.atan2;		// Returns the arctangent of the quotient of its arguments.
	var ceil = Math.ceil;		// Returns the smallest integer greater than or equal to a number.
	var cos = Math.cos;			// Returns the cosine of a number.
	var exp = Math.exp;			// Returns E^x, where x is the argument, and E is Euler's constant (2.718...), the base of the natural logarithm.
	var floor = Math.floor;		// Returns the largest integer less than or equal to a number.
	var log = Math.log;			// Returns the natural logarithm of a number.
	var max = Math.max;			// Returns the largest of two numbers.
	var min = Math.min;			// Returns the smallest of two numbers.
	var pow = Math.pow;			// Returns base to the exponent power, that is, base^exponent.
	var random = Math.random;	// Returns a pseudo-random number between 0 and 1.
	var round = Math.round;		// Returns the value of a number rounded to the nearest integer.
	var sin = Math.sin;			// Returns the sine of a number.
	var sqrt = Math.sqrt;		// Returns the positive square root of a number.
	var tan = Math.tan;			// Returns the tangent of a number.
	//
	return eval (formula);
}

//------------------------------------------------------------------------------

function getParameters ()
{
	var cautionPNGFileBinaryData = "\x89PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x10\x00\x00\x00\x10\b\x06\x00\x00\x00\x1Fóÿa\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyqÉe<\x00\x00\x01$IDATxÚ¤S\x8D\xAD\x83 \x10Ææ\rp\x1B\x94n@7`\x04ÜÀ\x11Ü\x80×\tê\x06u\x03ÝÀ\x11p\x03è\x04²\x01\x8F¯Ä¨}Ø\x98Ôä\x8BwßýpÜ\x1DE\b\x81}ó\x9Dö\fã8\x8A²,;\x00òn\x06Tð\x8Ei\x9AH\bn\x8Da\x01\x80\f.ç\x9B\xAD i\x9AZ)ÇE<\x17\x80\fîP\x05ÖÚ\x18H\x13ÔºN\x80\f\x0E¶wÿ\x7F\t\x94R]×%\x15ùç3ÀÁö1Á0\fRÊ\x85R*aÖa\x83Ïn\x02!\x84±v¡\x1E\x0F\x16î÷E\x87\r>Ù&¶m[I9\nÎ\x97þ@\x16b«Ã\x07¾\x9B&bD\x9CSüm[\x02=Ç%ß4Ö\x17«µþ]\x97:c=\x855à\x8B\x98W\x02\x8C&\x96\x96Û\x91@\x94\x90³!\x06±?Î9^Uù-\x8D[¸û!\x06±\x05îr½^¬Ö\x9E\x9EÏc\x0Fè|fìv#o\x8C½\x14¨\x07\x99ú¾WÞ{:\x92\x80\x88|\\ª>ÞÝ\x15ß>ç?\x01\x06\x00\x88#\x92Dq¼³X\x00\x00\x00\x00IEND®B`\x82";
	var infoPNGFileBinaryData = "\x89PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x10\x00\x00\x00\x10\b\x06\x00\x00\x00\x1Fóÿa\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyqÉe<\x00\x00\x03\rIDATxÚd\x93Yk\x14A\x10ÇÿÝslv6kÖ#»\x8B\x1BãæRc\\\x8Dñ\x88¢>é«\x88'\x8A\nA!\x1FÁ\x07\x1Fü\x02>\nâ\x85 ê« \x10¼â\x81\nFP£\x12×#\x1E1·I\\3ÙÍÎÕÓcÏd=\x82\x03Ý\r]U¿ªúO5ñ<\x0F³?OÑ'Çö\r\x0Eåö\x8Fåì\r\x8CñX,\x1AêMÆµ;©Tü\x02\x95´\x9E\x7F½É¿\x00Ó(¬Ë~\x1C=þìµ±µo\x94F\n\x16%\x1E\x07Q\x15xsË]\x9E©Cß\x86Õó.&\x13\x95§¨¤äg\x01¦¦r»n=\x18<}ï\x85\x9CÈ;\x1AdJ@\t\x81íz`Ì\x83¢\x10\x10ÎP\x13/`Ï6ízfEº\x9DRe,\x00\x98æô\x9A\x1B·?wtt\x85\x13\x1EU!Ñ\x19¨+\x82\x9BjË\x10\x9F¯âqw\x1E\x9CC\x00\x81ª\x8A<ÚvhW\x967Ö¶ÉÂOÉ¾\x1F9qï\x854+Ø/L\x96\t\x8Eì^\x80Ê¹\n\x86Çmô|1P¦P\fNFqóÑä¡EUú5Y×'öv½*nÍ;Q\x84ä¿z\x88êQ(r\\ïÔQ»HÅÐ¸\x03E¢\x81M\x15à\x9Eþ\x10²\x1F'\x8EÒÁáÜÁ/ßiD¢4Èú{\x996Çæær45\x94áùÛ\"~èLh2c\x13;\fV\x86\x0F_§WÊßÇÍõ\x05C\x16WDôÈ\x83\f¾p-\r\x1A6®Ò°.S\x0EÛñÐõv\x1A!Å§\x97*\x04ÅøO¯\x92\x1A\x86\x1DóUöÅôÃ¹ß»D0¡»\x18\x18q\x02çì'ãOe\x81OÉÏ4]\x95F4©\x97\x12î1\x91Õ\x15\x16q\x80\t¥?\rYhi\x8AÀ²<t\x7F0@\x05\x94ùöÒrÄ\x16\x0Ey:]\x98Ð:ç\x84-8LP\x05Ö_\x86ÅQ\x9F\naqJÅËwE\x18B\x0FE\x00Ü\x92=\x80¸\x0E\x92ó1LÓéª3\x8DÕì\x1BcNð\x9FýÒ,\x87£yiXô\t\x18\x86\x8BÖ&-\x80ú\x81<ÈNP!ëX¹lÎ-ªª\x91ì\x96ÖÊsImLd¢p\x99_\"A,*\x05ýW\x88óÉ\x9BâÌlp¿=1\x9D\x96\x89ÖåÆè\x92\x86ÔÙ`\x12]×\x8EÞ½ÿòò¥\x0EoÇ¤\x93\x84$b\x13\x15\x04\x0Bã²\x18\x1E\x0B¶?Ê²\x80s\nÇ6±6=Tl?P×^]\x9D¾úç-Ø¶\x91xø¸ûäµÎâá¾\x9FqX\\\x13\x82R\x84UR\x1Ak\x07\x11\x92Ã¦F}dïöºc55õWþ{\x8D¢C:ÐÿmçÓçýmï>³ÌÄ\x14M¸ÌSµ0ôª8\x1FX\x9B\x89Ýni®?¯Eb½¿#~\t0\x00ýã\x9D¸¨3=î\x00\x00\x00\x00IEND®B`\x82";
	//
	function getRGBDocumentID ()
	{
		var documentID = 0;
		if (app.documents.length > 0)
		{
			jamEngine.meaningfulIds = true;
			var resultDescriptorObj = jamEngine.jsonGet
			(
				[
					{ "property": { "<property>": "mode" } },
					{ "document": { "<enumerated>": { "ordinal": "first" } } }
				]
			);
			var colorMode = resultDescriptorObj["mode"]["<enumerated>"]["colorSpace"];
			if ((colorMode === "RGBColor") || (colorMode === "RGB48"))
			{
				resultDescriptorObj = jamEngine.jsonGet
				(
					[
						{ "property": { "<property>": "documentID" } },
						{ "document": { "<enumerated>": { "ordinal": "targetEnum" } } }
					]
				);
				documentID = resultDescriptorObj["documentID"]["<integer>"];
			}
		}
		return documentID;
	}
	//
	function isLayeredDocument ()
	{
		jamEngine.meaningfulIds = true;
		resultDescriptorObj = jamEngine.jsonGet
		(
			[
				{ "property": { "<property>": "numberOfLayers" } },
				{ "document": { "<enumerated>": { "ordinal": "targetEnum" } } }
			]
		);
		var layerCount = resultDescriptorObj["numberOfLayers"]["<integer>"];
		return (layerCount > 0);
	}
	//
	function sanitizeFileName (name)
	{
		var fileName = name.replace (/^[\.\s]+|[\s]+$/g, '');	// Strip leading dot(s), and leading and trailing space(s)
		fileName = fileName.replace (/["\*\/:<>\?\\\|¨]/g, '-');	// Replace file-system-unsafe characters with a hyphen-minus
		return fileName;
	}
	//
	function capitalizeString (string)
	{
		return (string ? string.charAt (0).toUpperCase () + string.substring (1).toLowerCase () : "");
	}
	//
	function segmentIndex (index, count)
	{
		return Math.floor ((index + 0.5) * count / 256);
	}
	//
	function sampleIndex (index, count, alignment)
	{
		if (!alignment)
		{
			alignment = "fill";
		}
		switch (alignment.toLowerCase ())
		{
			case "f":
			case "fill":
				index = index * 255 / (count - 1);
				break;
			case "l":
			case "left":
				index = (index + 0) * 255 / count;
				break;
			case "c":
			case "center":
				index = (index + 0.5) * 255 / count;
				break;
			case "r":
			case "right":
				index = (index + 1) * 255 / count;
				break;
			default:
				throw new Error ("sampleIndex: invalid alignment: " + alignment);
				break;
		}
		return index;
	}
	//
	function steps (index, count, alignment)
	{
		if (count)
		{
			if ((count > 1) && (count <= 256))
			{
				index = sampleIndex (segmentIndex (index, count), count, alignment)
			}
			else
			{
				throw new Error ("steps: invalid number of steps: " + count);
			}
		}
		return index;
	}
	//
	var documentID = getRGBDocumentID ();
	//
	var simpleUnitCount = 4;
	var detailedUnitCount = 10;
	var reverseOnSimpleClick = false;
	//
	var linearGrayscaleClut = [ ];
	for (var index = 0; index < 256; index++)
	{
		linearGrayscaleClut.push ([ index, index, index ]);	// Linear grayscale ramp by default
	}
	var linearGrayscaleClutName = "Linear Grayscale";
	//
	var clut;
	var clutName;
	var reverse;
	var detailedGrid;
	//
	var singleLineSteps;
	var displayFormatSteps;
	//
	var reverseSuffix = " [reverse]";
	//
	var dialog = new Window ('dialog', "Create Color Ramp");
	dialog.margins = [ 16, 8, 16, 16 ];
	//
	var panels = dialog.add ('group');
	panels.alignChildren = [ "fill", "fill" ];
	//
	var inputOutput = panels.add ('group');
	inputOutput.orientation = "column";
	inputOutput.alignChildren = [ "fill", "fill" ];
	//
	var formulaPanel = inputOutput.add ('panel', undefined, "Formula", { borderStyle: "sunken" });
	//
	var formulaFormatsItems =
	[
		"Components",
		"Indexed Colors"
	];
	var formatsMenu = formulaPanel.add ('dropdownlist', undefined, formulaFormatsItems);
	formatsMenu.helpTip = "Select the formula format.";
	formatsMenu.onChange = function ()
	{
		switch (formatsMenu.selection.index)
		{
			case 0:
				indexedColorsOptions.visible = false;
				componentsOptions.visible = true;
				break;
			case 1:
				componentsOptions.visible = false;
				indexedColorsOptions.visible = true;
				break;
		}
	};
	//
	var formatsGroup = formulaPanel.add ('group');
	formatsGroup.alignChildren = [ "fill", "fill" ];
	formatsGroup.orientation = "stack";
	//
	function componentsKeyPressed (k)
	{
		if (k.keyName === "Enter")
		{
			k.preventDefault ();
			componentsOptions.calculateButton.notify ("onClick");
		}
	}
	//
	function isInvalidComponentsFormula (componentFormula, floatRange, stepCount, alignment)
	{
		var message = "";
		var component;
		try
		{
			for (var index = 0; index < 256; index++)
			{
				var newIndex = steps (index, stepCount, alignment);
				component = evalXFormula ((floatRange) ? newIndex / 255 : newIndex, componentFormula);
				if ((typeof component !== 'number') || isNaN (component))
				{
					throw new Error ("Not a number");
				}
			}
		}
		catch (e)
		{
			message = e.message;
		}
		return message;
	}
	//
	function changeComponentsFormula ()
	{
		switch (componentsOptions.formulaMenu.selection.text)
		{
			case "RGB":
				componentsOptions.component[0].label.text = "R(x):";
				componentsOptions.component[1].label.text = "G(x):";
				componentsOptions.component[2].label.text = "B(x):";
				componentsOptions.component[0].label.helpTip = "Formula (x) for red.";
				componentsOptions.component[1].label.helpTip = "Formula (x) for green.";
				componentsOptions.component[2].label.helpTip = "Formula (x) for blue.";
				componentsOptions.floatRangeCheck.helpTip =
					(componentsOptions.floatRangeCheck.value) ?
						"The RGB formula uses input and output values in the range [0.0, 1.0]." :
						"The RGB formula uses input and output values in the range [0, 255].";
				break;
			case "HSB":
				componentsOptions.component[0].label.text = "H(x):";
				componentsOptions.component[1].label.text = "S(x):";
				componentsOptions.component[2].label.text = "B(x):";
				componentsOptions.component[0].label.helpTip = "Formula (x) for hue.";
				componentsOptions.component[1].label.helpTip = "Formula (x) for saturation.";
				componentsOptions.component[2].label.helpTip = "Formula (x) for brightness.";
				componentsOptions.floatRangeCheck.helpTip =
					(componentsOptions.floatRangeCheck.value) ?
						"The HSB formula uses input and output values in the range [0.0, 1.0]." :
						"The HSB formula uses values in the range [0, 255] in input, and in the ranges [0, 360], [0, 100], [0, 100] in output.";
				break;
			case "HSL":
				componentsOptions.component[0].label.text = "H(x):";
				componentsOptions.component[1].label.text = "S(x):";
				componentsOptions.component[2].label.text = "L(x):";
				componentsOptions.component[0].label.helpTip = "Formula (x) for hue.";
				componentsOptions.component[1].label.helpTip = "Formula (x) for saturation.";
				componentsOptions.component[2].label.helpTip = "Formula (x) for lightness.";
				componentsOptions.floatRangeCheck.helpTip =
					(componentsOptions.floatRangeCheck.value) ?
						"The HSL formula uses input and output values in the range [0.0, 1.0]." :
						"The HSL formula uses values in the range [0, 255] in input, and in the ranges [0, 360], [0, 100], [0, 100] in output.";
				break;
			case "HCL":
				componentsOptions.component[0].label.text = "H(x):";
				componentsOptions.component[1].label.text = "C(x):";
				componentsOptions.component[2].label.text = "L(x):";
				componentsOptions.component[0].label.helpTip = "Formula (x) for hue.";
				componentsOptions.component[1].label.helpTip = "Formula (x) for chroma.";
				componentsOptions.component[2].label.helpTip = "Formula (x) for luminance.";
				componentsOptions.floatRangeCheck.helpTip =
					(componentsOptions.floatRangeCheck.value) ?
						"The HCL formula uses input and output values in the range [0.0, 1.0]." :
						"The HCL formula uses values in the range [0, 255] in input, and in the ranges [0, 360], [0, 128], [0, 100] in output.";
				break;
			case "Lab":
				componentsOptions.component[0].label.text = "L(x):";
				componentsOptions.component[1].label.text = "a(x):";
				componentsOptions.component[2].label.text = "b(x):";
				componentsOptions.component[0].label.helpTip = "Formula (x) for luminance.";
				componentsOptions.component[1].label.helpTip = "Formula (x) for a.";
				componentsOptions.component[2].label.helpTip = "Formula (x) for b.";
				componentsOptions.floatRangeCheck.helpTip =
					(componentsOptions.floatRangeCheck.value) ?
						"The Lab formula uses input and output values in the range [0.0, 1.0]." :
						"The Lab formula uses values in the range [0, 255] in input, and in the ranges [0, 100], [-128, 128], [-128, 128] in output.";
				break;
			case "XYZ":
				componentsOptions.component[0].label.text = "X(x):";
				componentsOptions.component[1].label.text = "Y(x):";
				componentsOptions.component[2].label.text = "Z(x):";
				componentsOptions.component[0].label.helpTip = "Formula (x) for X.";
				componentsOptions.component[1].label.helpTip = "Formula (x) for Y.";
				componentsOptions.component[2].label.helpTip = "Formula (x) for Z.";
				componentsOptions.floatRangeCheck.helpTip =
					(componentsOptions.floatRangeCheck.value) ?
						"The XYZ formula uses input and output values in the range [0.0, 1.0]." :
						"The XYZ formula uses values in the range [0, 255] in input, and in the ranges [0, 100], [0, 100], [0, 100] in output.";
				break;
			case "YCbCr":
				componentsOptions.component[0].label.text = "Y(x):";
				componentsOptions.component[1].label.text = "Cb(x):";
				componentsOptions.component[2].label.text = "Cr(x):";
				componentsOptions.component[0].label.helpTip = "Formula (x) for luma.";
				componentsOptions.component[1].label.helpTip = "Formula (x) for chroma blue.";
				componentsOptions.component[2].label.helpTip = "Formula (x) for chroma red.";
				componentsOptions.floatRangeCheck.helpTip =
					(componentsOptions.floatRangeCheck.value) ?
						"The YCbCr formula uses input and output values in the range [0.0, 1.0]." :
						"The YCbCr formula uses input and output values in the range [0, 255].";
				break;
		}
		var message;
		var isInvalid;
		for (var index = 0; index < componentsOptions.component.length; index++)
		{
			message = isInvalidComponentsFormula (componentsOptions.component[index].formulaText.text, componentsOptions.floatRangeCheck.value, componentsOptions.stepsMenu.selection.index, componentsOptions.alignmentMenu.selection.text);
			isInvalid = (message !== "");
			componentsOptions.component[index].cautionImage.helpTip = (isInvalid) ? message : null;
			componentsOptions.component[index].cautionImage.visible = isInvalid;
		}
		componentsOptions.calculateButton.enabled = !(componentsOptions.component[0].cautionImage.visible || componentsOptions.component[1].cautionImage.visible || componentsOptions.component[2].cautionImage.visible);
		componentsOptions.alignmentMenu.enabled = (componentsOptions.stepsMenu.selection.index !== 0);
		componentsOptions.infoButton.enabled = componentsOptions.calculateButton.enabled && componentsOptions.alignmentMenu.enabled;
	}
	//
	var componentsOptions = formatsGroup.add ('panel');
	componentsOptions.spacing = 4;
	componentsOptions.margins = [ 8, 8, 8, 8 ];
	//
	componentsOptions.formulaNameText = componentsOptions.add ('edittext');
	componentsOptions.formulaNameText.helpTip = "Name of the formula.";
	componentsOptions.formulaNameText.characters = 28;
	componentsOptions.formulaNameText.alignment = [ "center", "top" ];
	componentsOptions.formulaNameText.addEventListener ('keydown', componentsKeyPressed);
	//
	componentsOptions.componentsGroup = componentsOptions.add ('group');
	componentsOptions.componentsGroup.orientation = "column";
	componentsOptions.componentsGroup.alignment = [ "fill", "center" ];
	componentsOptions.componentsGroup.alignChildren = [ "fill", "center" ];
	componentsOptions.componentsGroup.spacing = 4;
	//
	componentsOptions.topGroup = componentsOptions.componentsGroup.add ('group');
	componentsOptions.topGroup.alignment = [ "fill", "center" ];
	//
	componentsOptions.formulaMenu = componentsOptions.topGroup.add ('dropdownlist', undefined, [ "RGB", "HSB", "HSL", "HCL", "Lab", "XYZ", "YCbCr" ]);
	componentsOptions.formulaMenu.alignment = [ "left", "center" ];
	componentsOptions.formulaMenu.helpTip = "Select the formula color model among: RGB, HSB, HSL, HCL (CIE-LCH), Lab (CIE-Lab), XYZ (CIE-XYZ), YCbCr.";
	componentsOptions.formulaMenu.onChange = changeComponentsFormula;
	//
	componentsOptions.floatRangeCheck = componentsOptions.topGroup.add ('checkbox', undefined, "Float Range [0.0, 1.0]");
	componentsOptions.floatRangeCheck.alignment = [ "right", "center" ];
	componentsOptions.floatRangeCheck.onClick = changeComponentsFormula;
	//
	componentsOptions.component = [ ];
	for (index = 0; index < 3; index++)
	{
		componentsOptions.component[index] = { };
		componentsOptions.component[index].componentGroup = componentsOptions.componentsGroup.add ('group');
		componentsOptions.component[index].componentGroup.alignChildren = [ "fill", "top" ];
		componentsOptions.component[index].labelGroup = componentsOptions.component[index].componentGroup.add ('group');
		componentsOptions.component[index].labelGroup.orientation = "column";
		componentsOptions.component[index].labelGroup.alignChildren = [ "center", "top" ];
		componentsOptions.component[index].labelGroup.spacing = 2;
		componentsOptions.component[index].label = componentsOptions.component[index].labelGroup.add ('statictext', undefined, "M(x):");	// Dynamically updated later on...
		componentsOptions.component[index].cautionImage = componentsOptions.component[index].labelGroup.add ('image', undefined, cautionPNGFileBinaryData);
		componentsOptions.component[index].formulaText = componentsOptions.component[index].componentGroup.add ('edittext', undefined, "\r\r\r\r\r", { multiline: true });
		componentsOptions.component[index].formulaText.characters = 21;
		componentsOptions.component[index].formulaText.componentIndex = index;
		componentsOptions.component[index].formulaText.onChanging = validateComponentsFormula;
		componentsOptions.component[index].formulaText.addEventListener ("keydown", componentsKeyPressed);
	}
	//
	function validateComponentsFormula ()
	{
		var index = this.componentIndex;
		var message = isInvalidComponentsFormula (componentsOptions.component[index].formulaText.text, componentsOptions.floatRangeCheck.value, componentsOptions.stepsMenu.selection.index, componentsOptions.alignmentMenu.selection.text);
		var isInvalid = (message !== "");
		componentsOptions.component[index].cautionImage.helpTip = (isInvalid) ? message : null;
		componentsOptions.component[index].cautionImage.visible = isInvalid;
		componentsOptions.calculateButton.enabled = !(componentsOptions.component[0].cautionImage.visible || componentsOptions.component[1].cautionImage.visible || componentsOptions.component[2].cautionImage.visible);
		componentsOptions.alignmentMenu.enabled = (componentsOptions.stepsMenu.selection.index !== 0);
		componentsOptions.infoButton.enabled = componentsOptions.calculateButton.enabled && componentsOptions.alignmentMenu.enabled;
	}
	//
	function rgbToRgb (rgbColor, inFloatRange, outFloatRange)
	{
		var red = rgbColor[0];
		var green = rgbColor[1];
		var blue = rgbColor[2];
		if (inFloatRange)
		{
			red *= 255;
			green *= 255;
			blue *= 255;
		}
		if (outFloatRange)
		{
			red /= 255;
			green /= 255;
			blue /= 255;
		}
		return [ red, green, blue ];
	}
	//
	function evalComponentsFormula (index, formulas, colorModel, floatRange)
	{
		var rgbColor;
		var newIndex = (floatRange) ? index / 255 : index;
		switch (colorModel)
		{
			case "RGB":
				var red = evalXFormula (newIndex, formulas[0]);
				var green = evalXFormula (newIndex, formulas[1]);
				var blue = evalXFormula (newIndex, formulas[2]);
				rgbColor = rgbToRgb ([ red, green, blue ], floatRange);
				break;
			case "HSB":
				var hue = evalXFormula (newIndex, formulas[0]);
				var saturation = evalXFormula (newIndex, formulas[1]);
				var brightness = evalXFormula (newIndex, formulas[2]);
				rgbColor = jamColors.hsbToRgb ([ hue, saturation, brightness ], floatRange);
				break;
			case "HSL":
				var hue = evalXFormula (newIndex, formulas[0]);
				var saturation = evalXFormula (newIndex, formulas[1]);
				var lightness = evalXFormula (newIndex, formulas[2]);
				rgbColor = jamColors.hslToRgb ([ hue, saturation, lightness ], floatRange);
				break;
			case "HCL":
				var hue = evalXFormula (newIndex, formulas[0]);
				var chroma = evalXFormula (newIndex, formulas[1]);
				var luminance = evalXFormula (newIndex, formulas[2]);
				rgbColor = jamColors.hclToRgb ([ hue, chroma, luminance ], floatRange);
				break;
			case "Lab":
				var luminance = evalXFormula (newIndex, formulas[0]);
				var a = evalXFormula (newIndex, formulas[1]);
				var b = evalXFormula (newIndex, formulas[2]);
				rgbColor = jamColors.labToRgb ([ luminance, a, b ], floatRange);
				break;
			case "XYZ":
				var x = evalXFormula (newIndex, formulas[0]);
				var y = evalXFormula (newIndex, formulas[1]);
				var z = evalXFormula (newIndex, formulas[2]);
				rgbColor = jamColors.xyzToRgb ([ x, y, z ], floatRange);
				break;
			case "YCbCr":
				var y = evalXFormula (newIndex, formulas[0]);
				var cb = evalXFormula (newIndex, formulas[1]);
				var cr = evalXFormula (newIndex, formulas[2]);
				rgbColor = jamColors.ycbcrToRgb ([ y, cb, cr ], floatRange);
				break;
		}
		for (var componentIndex = 0; componentIndex < rgbColor.length; componentIndex++)
		{
			rgbColor[componentIndex] = Math.round (limit (rgbColor[componentIndex], 0, 255));
		}
		return rgbColor;
	}
	//
	componentsOptions.stepsGroup = componentsOptions.add ('group');
	componentsOptions.stepsGroup.alignment = [ "center", "bottom" ];
	//
	var stepCountItems = [ ];
	var maxStepCount = 256;
	for (index = 0; index <= maxStepCount; index++)
	{
		stepCountItems.push ((index === 1) ? "-" : "" + index);
	}
	stepCountItems[0] = "None";
	//
	componentsOptions.stepsMenu = componentsOptions.stepsGroup.add ('dropdownlist', undefined, stepCountItems);
	componentsOptions.stepsMenu.title = "Steps:"
	componentsOptions.stepsMenu.alignment = [ "left", "center" ];
	componentsOptions.stepsMenu.helpTip = "Select the number of discrete steps: 2 to " + maxStepCount + " (0 for none).";
	componentsOptions.stepsMenu.selection = 0;
	componentsOptions.stepsMenu.onChange = changeComponentsFormula;
	//
	componentsOptions.alignmentMenu = componentsOptions.stepsGroup.add ('dropdownlist', undefined, [ "Fill", "-", "Left", "Center", "Right" ]);
	componentsOptions.alignmentMenu.alignment = [ "right", "center" ];
	componentsOptions.alignmentMenu.helpTip = "Select the sampling alignment of discrete steps.";
	componentsOptions.alignmentMenu.selection = 0;
	componentsOptions.alignmentMenu.onChange = changeComponentsFormula;
	//
	var sampleFormats =
	{
		"RGB Color Arrays" : "colorArray",
		"Hex Strings (Uppercase)" : "hexUpper",
		"Hex Strings (Lowercase)" : "hexLower"
	};
	var sampleFormatsItems = [ ];
	var sampleFormatsNicknames = { };
	for (var sampleFormat in sampleFormats)
	{
		sampleFormatsItems.push (sampleFormat);
		sampleFormatsNicknames[sampleFormats[sampleFormat]] = sampleFormat;
	}
	//
	componentsOptions.infoButton = componentsOptions.stepsGroup.add ('iconbutton', undefined, infoPNGFileBinaryData, { style: "toolbutton" });
	componentsOptions.infoButton.helpTip = "Get sampled colors of components steps.";
	componentsOptions.infoButton.alignment = [ "right", "center" ];
	componentsOptions.infoButton.preferredSize = [ 24, 24 ];
	componentsOptions.infoButton.enabled = false;
	componentsOptions.infoButton.onClick = function ()
	{
		var sampleColors = [ ];
		var sampleHexaStrings = [ ];
		var stepCount = componentsOptions.stepsMenu.selection.index;
		var alignment = componentsOptions.alignmentMenu.selection.text;
		var formulas =
		[
			componentsOptions.component[0].formulaText.text,
			componentsOptions.component[1].formulaText.text,
			componentsOptions.component[2].formulaText.text
		];
		var colorModel = componentsOptions.formulaMenu.selection.text;
		var floatRange = componentsOptions.floatRangeCheck.value;
		for (var index = 0; index < stepCount; index++)
		{
			sampleColors.push (evalComponentsFormula (sampleIndex (index, stepCount, alignment), formulas, colorModel, floatRange));
		}
		for (var index = 0; index < sampleColors.length; index++)
		{
			sampleHexaStrings.push (jamColors.rgbToHex (sampleColors[index]));
		}
		//
		var stepsDialog = new Window ('dialog', "Components Steps Info");
		//
		var sampleFormatsMenu = stepsDialog.add ('dropdownlist', undefined, sampleFormatsItems);
		sampleFormatsMenu.helpTip = "Select the display format for sample colors.";
		sampleFormatsMenu.selection = sampleFormatsMenu.find (sampleFormatsNicknames[displayFormatSteps]) || 0;
		sampleFormatsMenu.onChange = updateSampleColors;
		//
		stepsDialog.stepsColorsText = stepsDialog.add ('edittext', undefined, "\r\r\r\r\r\r\r\r\r\r\r\r\r", { multiline: true, readonly: true });
		stepsDialog.stepsColorsText.helpTip = "Array of colors of components steps.";
		stepsDialog.stepsColorsText.characters = 20;
		//
		stepsDialog.singleLineCheck = stepsDialog.add ('checkbox', undefined, "Single Line");
		stepsDialog.singleLineCheck.value = singleLineSteps;
		stepsDialog.singleLineCheck.onClick = updateSampleColors;
		//
		function updateSampleColors ()
		{
			var colorArray = (sampleFormatsMenu.selection.text === sampleFormatsNicknames["colorArray"]);
			var lowercase = (sampleFormatsMenu.selection.text === sampleFormatsNicknames["hexLower"]);
			var text = jamJSON.stringify (colorArray ? sampleColors : sampleHexaStrings, (stepsDialog.singleLineCheck.value) ? 0 : '\t');
			if (colorArray && (!stepsDialog.singleLineCheck.value))
			{
				text = text.replace (/\[\s+(\d+),\s+(\d+),\s+(\d+)\s+\]/gm, "[ $1, $2, $3 ]");
			}
			if (lowercase)
			{
				text = text.toLowerCase ();
			}
			stepsDialog.stepsColorsText.text = text;
		}
		//
		stepsDialog.okButton = stepsDialog.add ('button', undefined, 'OK', { name: "ok" });
		stepsDialog.okButton.onClick = function ()
		{
			singleLineSteps = stepsDialog.singleLineCheck.value;
			displayFormatSteps = sampleFormats[sampleFormatsMenu.selection.text];
			stepsDialog.close (true);
		};
		//
		stepsDialog.onShow = function ()
		{
			updateSampleColors ();
		};
		//
		stepsDialog.show ();
	};
	//
	componentsOptions.calculateButton = componentsOptions.add ('button', undefined, "Calculate");
	componentsOptions.calculateButton.helpTip = "Calculate a color ramp from the current formula.";
	componentsOptions.calculateButton.alignment = [ "center", "bottom" ];
	componentsOptions.calculateButton.onClick = function ()
	{
		var stepCount = componentsOptions.stepsMenu.selection.index;
		var alignment = componentsOptions.alignmentMenu.selection.text;
		var formulas =
		[
			componentsOptions.component[0].formulaText.text,
			componentsOptions.component[1].formulaText.text,
			componentsOptions.component[2].formulaText.text
		];
		var colorModel = componentsOptions.formulaMenu.selection.text;
		var floatRange = componentsOptions.floatRangeCheck.value;
		var calculatedClut = [ ];
		for (var index = 0; index < 256; index++)
		{
			calculatedClut.push (evalComponentsFormula (steps (index, stepCount, alignment), formulas, colorModel, floatRange));
		}
		if (calculatedClut.length === 256)
		{
			clut = calculatedClut;
			clutName = componentsOptions.formulaNameText.text || (componentsOptions.formulaMenu.selection.text + " Components Formula");
			reverse = false;
			clutNameText.text = clutName;
			curvesMap.notify ("onDraw");
			gradientMap.notify ("onDraw");
			colorTable.notify ("onDraw");
		}
	};
	//
	function indexedColorsKeyPressed (k)
	{
		var multiline = (k.target.properties && k.target.properties.multiline);
		if (k.keyName === "Enter")
		{
			k.preventDefault ();
			if (k.altKey)
			{
				if (multiline)
				{
					k.target.textselection = '\n';
				}
			}
			else
			{
				indexedColorsOptions.calculateButton.notify ("onClick");
			}
		}
		else if (k.keyName === "Tab")
		{
			k.preventDefault ();
			if (k.altKey)
			{
				if (multiline)
				{
					k.target.textselection = '\t';
				}
			}
		}
	}
	//
	function isInvalidIndexedColorsFormula (indexedColorsFormula, stepCount, alignment)
	{
		var message = "";
		var rgbColor;
		try
		{
			for (var index = 0; index < 256; index++)
			{
				rgbColor = evalXFormula (steps (index, stepCount, alignment), indexedColorsFormula);
				if ((rgbColor.constructor !== Array) || (rgbColor.length !== 3))
				{
					throw new Error ("Not an RGB color array");
				}
				else
				{
					for (var componentIndex = 0; componentIndex < rgbColor.length; componentIndex++)
					{
						var component = rgbColor[componentIndex];
						if ((typeof component !== 'number') || isNaN (component))
						{
							throw new Error ("Not a number");
						}
					}
				}
			}
		}
		catch (e)
		{
			message = e.message;
		}
		return message;
	}
	//
	var indexedColorsOptions = formatsGroup.add ('panel');
	indexedColorsOptions.spacing = 4;
	indexedColorsOptions.margins = [ 8, 8, 8, 8 ];
	//
	indexedColorsOptions.formulaNameText = indexedColorsOptions.add ('edittext');
	indexedColorsOptions.formulaNameText.helpTip = "Name of the formula.";
	indexedColorsOptions.formulaNameText.characters = 28;
	indexedColorsOptions.formulaNameText.alignment = [ "center", "top" ];
	indexedColorsOptions.formulaNameText.addEventListener ('keydown', indexedColorsKeyPressed);
	//
	function changeIndexedColorsFormula ()
	{
		var message = isInvalidIndexedColorsFormula (indexedColorsOptions.formulaText.text, indexedColorsOptions.stepsMenu.selection.index, indexedColorsOptions.alignmentMenu.selection.text);
		var isInvalid = (message !== "");
		indexedColorsOptions.cautionImage.helpTip = (isInvalid) ? message : null;
		indexedColorsOptions.cautionImage.visible = isInvalid;
		indexedColorsOptions.calculateButton.enabled = !indexedColorsOptions.cautionImage.visible;
		indexedColorsOptions.alignmentMenu.enabled = (indexedColorsOptions.stepsMenu.selection.index !== 0);
		indexedColorsOptions.infoButton.enabled = indexedColorsOptions.calculateButton.enabled && indexedColorsOptions.alignmentMenu.enabled;
	}
	//
	function evalIndexedColorsFormula (index, formula)
	{
		var rgbColor = evalXFormula (index, formula);
		for (var componentIndex = 0; componentIndex < rgbColor.length; componentIndex++)
		{
			rgbColor[componentIndex] = Math.round (limit (rgbColor[componentIndex], 0, 255));
		}
		return rgbColor;
	}
	//
	indexedColorsOptions.indexedColorsGroup = indexedColorsOptions.add ('group');
	indexedColorsOptions.indexedColorsGroup.orientation = "column";
	indexedColorsOptions.indexedColorsGroup.alignment = [ "fill", "center" ];
	indexedColorsOptions.indexedColorsGroup.alignChildren = [ "fill", "center" ];
	indexedColorsOptions.indexedColorsGroup.spacing = 4;
	//
	indexedColorsOptions.labelGroup = indexedColorsOptions.indexedColorsGroup.add ('group');
	indexedColorsOptions.labelGroup.orientation = "row";
	indexedColorsOptions.labelGroup.alignChildren = [ "left", "top" ];
	indexedColorsOptions.label = indexedColorsOptions.labelGroup.add ('statictext', undefined, "RGB(x):");
	indexedColorsOptions.label.helpTip = "Formula (x) for [ red, green, blue ].";
	indexedColorsOptions.cautionImage = indexedColorsOptions.labelGroup.add ('image', undefined, cautionPNGFileBinaryData);
	indexedColorsOptions.formulaText = indexedColorsOptions.indexedColorsGroup.add ('edittext', undefined, "\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r", { multiline: true });
	indexedColorsOptions.formulaText.onChanging = changeIndexedColorsFormula;
	indexedColorsOptions.formulaText.addEventListener ("keydown", indexedColorsKeyPressed);
	//
	indexedColorsOptions.stepsGroup = indexedColorsOptions.add ('group');
	indexedColorsOptions.stepsGroup.alignment = [ "center", "bottom" ];
	//
	indexedColorsOptions.stepsMenu = indexedColorsOptions.stepsGroup.add ('dropdownlist', undefined, stepCountItems);
	indexedColorsOptions.stepsMenu.title = "Steps:"
	indexedColorsOptions.stepsMenu.alignment = [ "left", "center" ];
	indexedColorsOptions.stepsMenu.helpTip = "Select the number of discrete steps: 2 to " + maxStepCount + " (0 for none).";
	indexedColorsOptions.stepsMenu.selection = 0;
	indexedColorsOptions.stepsMenu.onChange = changeIndexedColorsFormula;
	//
	indexedColorsOptions.alignmentMenu = indexedColorsOptions.stepsGroup.add ('dropdownlist', undefined, [ "Fill", "-", "Left", "Center", "Right" ]);
	indexedColorsOptions.alignmentMenu.alignment = [ "right", "center" ];
	indexedColorsOptions.alignmentMenu.helpTip = "Select the sampling alignment of discrete steps.";
	indexedColorsOptions.alignmentMenu.selection = 0;
	indexedColorsOptions.alignmentMenu.onChange = changeIndexedColorsFormula;
	//
	indexedColorsOptions.infoButton = indexedColorsOptions.stepsGroup.add ('iconbutton', undefined, infoPNGFileBinaryData, { style: "toolbutton" });
	indexedColorsOptions.infoButton.helpTip = "Get sampled colors of indexed colors steps.";
	indexedColorsOptions.infoButton.alignment = [ "right", "center" ];
	indexedColorsOptions.infoButton.preferredSize = [ 24, 24 ];
	indexedColorsOptions.infoButton.enabled = false;
	indexedColorsOptions.infoButton.onClick = function ()
	{
		var sampleColors = [ ];
		var sampleHexaStrings = [ ];
		var stepCount = indexedColorsOptions.stepsMenu.selection.index;
		var alignment = indexedColorsOptions.alignmentMenu.selection.text;
		var formulaText = indexedColorsOptions.formulaText.text;
		for (var index = 0; index < stepCount; index++)
		{
			sampleColors.push (evalIndexedColorsFormula (sampleIndex (index, stepCount, alignment), formulaText));
		}
		for (var index = 0; index < sampleColors.length; index++)
		{
			sampleHexaStrings.push (jamColors.rgbToHex (sampleColors[index]));
		}
		//
		var stepsDialog = new Window ('dialog', "Indexed Colors Steps Info");
		//
		var sampleFormatsMenu = stepsDialog.add ('dropdownlist', undefined, sampleFormatsItems);
		sampleFormatsMenu.helpTip = "Select the display format for sample colors.";
		sampleFormatsMenu.selection = sampleFormatsMenu.find (sampleFormatsNicknames[displayFormatSteps]) || 0;
		sampleFormatsMenu.onChange = updateSampleColors;
		//
		stepsDialog.stepsColorsText = stepsDialog.add ('edittext', undefined, "\r\r\r\r\r\r\r\r\r\r\r\r\r", { multiline: true, readonly: true });
		stepsDialog.stepsColorsText.helpTip = "Array of colors of indexed colors steps.";
		stepsDialog.stepsColorsText.characters = 20;
		//
		stepsDialog.singleLineCheck = stepsDialog.add ('checkbox', undefined, "Single Line");
		stepsDialog.singleLineCheck.value = singleLineSteps;
		stepsDialog.singleLineCheck.onClick = updateSampleColors;
		//
		function updateSampleColors ()
		{
			var colorArray = (sampleFormatsMenu.selection.text === sampleFormatsNicknames["colorArray"]);
			var lowercase = (sampleFormatsMenu.selection.text === sampleFormatsNicknames["hexLower"]);
			var text = jamJSON.stringify (colorArray ? sampleColors : sampleHexaStrings, (stepsDialog.singleLineCheck.value) ? 0 : '\t');
			if (colorArray && (!stepsDialog.singleLineCheck.value))
			{
				text = text.replace (/\[\s+(\d+),\s+(\d+),\s+(\d+)\s+\]/gm, "[ $1, $2, $3 ]");
			}
			if (lowercase)
			{
				text = text.toLowerCase ();
			}
			stepsDialog.stepsColorsText.text = text;
		}
		//
		stepsDialog.okButton = stepsDialog.add ('button', undefined, 'OK', { name: "ok" });
		stepsDialog.okButton.onClick = function ()
		{
			singleLineSteps = stepsDialog.singleLineCheck.value;
			displayFormatSteps = sampleFormats[sampleFormatsMenu.selection.text];
			stepsDialog.close (true);
		};
		//
		stepsDialog.onShow = function ()
		{
			updateSampleColors ();
		};
		//
		stepsDialog.show ();
	};
	//
	indexedColorsOptions.calculateButton = indexedColorsOptions.add ('button', undefined, "Calculate");
	indexedColorsOptions.calculateButton.helpTip = "Calculate a color ramp from the current formula.";
	indexedColorsOptions.calculateButton.alignment = [ "center", "bottom" ];
	indexedColorsOptions.calculateButton.onClick = function ()
	{
		var stepCount = indexedColorsOptions.stepsMenu.selection.index;
		var alignment = indexedColorsOptions.alignmentMenu.selection.text;
		var formulaText = indexedColorsOptions.formulaText.text
		var calculatedClut = [ ];
		for (var index = 0; index < 256; index++)
		{
			calculatedClut.push (evalIndexedColorsFormula (steps (index, stepCount, alignment), formulaText));
		}
		if (calculatedClut.length === 256)
		{
			clut = calculatedClut;
			clutName = indexedColorsOptions.formulaNameText.text || "Indexed Colors Formula";
			reverse = false;
			clutNameText.text = clutName;
			curvesMap.notify ("onDraw");
			gradientMap.notify ("onDraw");
			colorTable.notify ("onDraw");
		}
	};
	//
	var loadSaveGroup = formulaPanel.add ('group');
	loadSaveGroup.alignment = [ "center", "center" ];
	//
	var loadButton = loadSaveGroup.add ('button', undefined, "Load Formula...");
	loadButton.alignment = [ "left", "center" ];
	loadButton.helpTip = "Load a formula from a JSON text file.";
	loadButton.onClick = function ()
	{
		var formulasFolder = new File (customOptions.formulasFolder);
		var jsonFilter =
			(File.fs === "Macintosh") ?
				function (f) { return (f instanceof Folder) || f.name.match (/\.json$/i) } :
				"JSON Text Files:*.json,All Files:*.*";
		var formulaFile = formulasFolder.openDlg ("Open JSON text file:", jsonFilter);
		if (formulaFile)
		{
			customOptions.formulasFolder = formulaFile.parent.fsName;
			var data = null;
			try
			{
				data = jamUtils.readJsonFile (formulaFile);
			}
			catch (e)
			{
				alert ("Invalid JSON File:\r" + File.decode (formulaFile.name));
			}
			if (data)
			{
				if (data.constructor === Object)
				{
					var formula = data["colorRampFormula"];
					if ("components" in formula)
					{
						if ("name" in formula)
						{
							componentsOptions.formulaNameText.text = formula["name"];
						}
						else
						{
							componentsOptions.formulaNameText.text = File.decode (formulaFile.name.replace (/\.(json)$/i, ''));
						}
						formatsMenu.selection = 0;
						componentsOptions.formulaMenu.selection = componentsOptions.formulaMenu.find (formula["colorModel"]) || 0;
						componentsOptions.component[0].formulaText.text = formula["components"][0];
						componentsOptions.component[1].formulaText.text = formula["components"][1];
						componentsOptions.component[2].formulaText.text = formula["components"][2];
						componentsOptions.floatRangeCheck.value = formula["floatRange"];
						componentsOptions.stepsMenu.selection = componentsOptions.stepsMenu.find (formula["steps"]) || 0;
						componentsOptions.alignmentMenu.selection = componentsOptions.alignmentMenu.find (capitalizeString (formula["alignment"])) || 0;
						changeComponentsFormula ();
						componentsOptions.calculateButton.notify ("onClick");
					}
					else if ("indexedColors" in formula)
					{
						if ("name" in formula)
						{
							indexedColorsOptions.formulaNameText.text = formula["name"];
						}
						else
						{
							indexedColorsOptions.formulaNameText.text = File.decode (formulaFile.name.replace (/\.(json)$/i, ''));
						}
						formatsMenu.selection = 1;
						indexedColorsOptions.formulaText.text = formula["indexedColors"];
						indexedColorsOptions.stepsMenu.selection = indexedColorsOptions.stepsMenu.find (formula["steps"]) || 0;
						indexedColorsOptions.alignmentMenu.selection = indexedColorsOptions.alignmentMenu.find (capitalizeString (formula["alignment"])) || 0;
						changeIndexedColorsFormula ();
						indexedColorsOptions.calculateButton.notify ("onClick");
					}
				}
				else
				{
					alert ("Unrecognized formula file format.");
				}
			}
		}
	};
	//
	var saveButton = loadSaveGroup.add ('button', undefined, "Save Formula...");
	saveButton.alignment = [ "right", "center" ];
	saveButton.helpTip = "Save the current formula to a JSON text file.";
	saveButton.onClick = function ()
	{
		var formulaName;
		if (formatsMenu.selection.index === 0)
		{
			formulaName = componentsOptions.formulaNameText.text || (componentsOptions.formulaMenu.selection.text + " Components Formula");
		}
		else if (formatsMenu.selection.index === 1)
		{
			formulaName = indexedColorsOptions.formulaNameText.text || "Indexed Colors Formula";
		}
		var formulaOutFile = new File (new Folder (customOptions.formulasFolder) + '/' + sanitizeFileName (formulaName) + '.json');
		var formulaFile = formulaOutFile.saveDlg ("Save formula as JSON text file:");
		if (formulaFile)
		{
			customOptions.formulasFolder = formulaFile.parent.fsName;
			var data;
			if (formatsMenu.selection.index === 0)
			{
				data =
				{
					"colorRampFormula":
					{
						"name": formulaName,
						"colorModel": componentsOptions.formulaMenu.selection.text,
						"components":
						[
							componentsOptions.component[0].formulaText.text,
							componentsOptions.component[1].formulaText.text,
							componentsOptions.component[2].formulaText.text
						],
						"floatRange": componentsOptions.floatRangeCheck.value
					}
				};
				if (componentsOptions.stepsMenu.selection.index > 0)
				{
					data["colorRampFormula"]["steps"] = componentsOptions.stepsMenu.selection.index;
					data["colorRampFormula"]["alignment"] = componentsOptions.alignmentMenu.selection.text.toLowerCase ();
				}
			}
			else if (formatsMenu.selection.index === 1)
			{
				data =
				{
					"colorRampFormula":
					{
						"name": formulaName,
						"indexedColors": indexedColorsOptions.formulaText.text
					}
				};
				if (indexedColorsOptions.stepsMenu.selection.index > 0)
				{
					data["colorRampFormula"]["steps"] = indexedColorsOptions.stepsMenu.selection.index;
					data["colorRampFormula"]["alignment"] = indexedColorsOptions.alignmentMenu.selection.text.toLowerCase ();
				}
			}
			jamUtils.writeJsonFile (formulaFile, data, '\t');
		}
	};
	//
	var inputPanel = inputOutput.add ('panel', undefined, "Input", { borderStyle: "sunken" });
	inputPanel.alignChildren = [ "fill", "center" ];
	//
	var importButton = inputPanel.add ('button', undefined, "Import Color Ramp...");
	importButton.helpTip = "Import a color ramp from a curves map file (.amp) or a color table (CLUT) file (.act, .lut).";
	importButton.onClick = function ()
	{
		var defaultInFolder = new Folder (customOptions.defaultInFolder);
		var headerClutSize = 32;	// NIH Image (ImageJ) header
		var rawClutFileSize = 768;	// (256 * 3) or (3 * 256)
		var footerClutSize = 4;		// Photoshop Save for Web CLUT footer (undocumented)
		function isActFile (f)
		{
			return ((f.type === '8BCT') || f.name.match (/\.act$/i)) && ((f.length === rawClutFileSize) || (f.length === (rawClutFileSize + footerClutSize)));
		}
		function isAmpFile (f)
		{
			return ((f.type === '8BLT') || f.name.match (/\.amp$/i)) && (f.length === rawClutFileSize);
		}
		function isLutFile (f)
		{
			return ((f.type === 'ICOL') || f.name.match (/\.lut$/i)) && ((f.length === rawClutFileSize) || (f.length === (headerClutSize + rawClutFileSize)));
		}
		function isJsonFile (f)
		{
			return (f.name.match (/\.json$/i));
		}
		var clutFilter =
			(File.fs === "Macintosh") ?
				function (f) { return (f instanceof Folder) || isActFile (f) || isAmpFile (f) || isLutFile (f) || isJsonFile (f) } :
				"CLUT Files:*.act;*.amp;*.json;*.lut,All Files:*.*";
		var clutFile = defaultInFolder.openDlg ("Load a color ramp file:", clutFilter);
		if (clutFile)
		{
			customOptions.defaultInFolder = clutFile.parent.fsName;
			var newClut = null;
			if (isJsonFile (clutFile))
			{
				try
				{
					newClut = jamUtils.readJsonFile (clutFile);
				}
				catch (e)
				{
					alert ("Invalid JSON File:\r" + File.decode (clutFile.name));
				}
				if (newClut)
				{
					if (isMapping (newClut))
					{
						newClut = mappingToClut (newClut);
					}
					else if (isClut (newClut))
					{
						// Interleaved
					}
					else
					{
						newClut = null;
						alert ("Invalid color ramp file.");
					}
				}
			}
			else
			{
				if (clutFile.open ("r"))
				{
					clutFile.encoding = 'BINARY';
					// Work around an ugly bug, in case the binary file starts with a Unicode BOM sequence (for instance: 0xFF, 0xFE).
					clutFile.seek (0);
					newClut = [ ];
					if (isAmpFile (clutFile) || isLutFile (clutFile))
					{
						if (isLutFile (clutFile) && (clutFile.length === (headerClutSize + rawClutFileSize)))
						{
							clutFile.seek (headerClutSize, 1);	// Skip header
						}
						// Not interleaved
						var reds = clutFile.read (256);
						var greens = clutFile.read (256);
						var blues = clutFile.read (256);
						for (var index = 0; index < 256; index++)
						{
							newClut.push ([ reds.charCodeAt (index), greens.charCodeAt (index), blues.charCodeAt (index) ]);
						}
					}
					else if (isActFile (clutFile))
					{
						// Interleaved
						for (var index = 0; index < 256; index++)
						{
							var rgb = clutFile.read (3);
							newClut.push ([ rgb.charCodeAt (0), rgb.charCodeAt (1), rgb.charCodeAt (2) ]);
						}
					}
					else
					{
						alert ("Unrecognized color ramp file.");
					}
					clutFile.close ();
				}
			}
			if (newClut)
			{
				clut = newClut;
				clutName = File.decode (clutFile.name.replace (/\.(act|amp|json|lut)$/i, ''));
				reverse = false;
				clutNameText.text = clutName;
				curvesMap.notify ("onDraw");
				gradientMap.notify ("onDraw");
				colorTable.notify ("onDraw");
			}
		}
	};
	//
	var combinedLayersButton = inputPanel.add ('button', undefined, "Combine Selected Layers");
	combinedLayersButton.helpTip = "Get a color ramp from the selected layers of the currently open RGB document.";
	combinedLayersButton.enabled = (documentID > 0) && isLayeredDocument ();
	combinedLayersButton.onClick = function ()
	{
		function convert16to8 (val16)
		{
			return Math.round (val16 * 255 / 65535);
		}
		//
		function bytesToInt16 (bytes, bigEndian)
		{
			return (bigEndian) ? (bytes.charCodeAt (0) << 8) + bytes.charCodeAt (1) : (bytes.charCodeAt (1) << 8) + bytes.charCodeAt (0);
		}
		//
		var bigEndian = false;	// Doesn't really matter...
		//
		jamEngine.jsonPlay
		(
			"make",
			{
				"new":
				{
					"<object>":
					{
						"document":
						{
							"name": { "<string>": "Combined Layers" },
							"mode": { "<class>": "RGBColorMode" },
							"width": { "<unitDouble>": { "distanceUnit": 256 } },
							"height": { "<unitDouble>": { "distanceUnit": 1 } },
							"resolution": { "<unitDouble>": { "densityUnit": 72 } },
							"fill": { "<enumerated>": { "fill": "transparent" } },
							"depth": { "<integer>": 16 },
							"profile": { "<string>": "sRGB IEC61966-2.1" }	// "none", "sRGB IEC61966-2.1"
						}
					}
				}
			}
		);
		jamLayers.makeLayer
		(
			{
				"contentLayer":
				{
					"name": "Input Generator",
					"mode": "normal",
					"type":
					{
						"gradientLayer":
						{
							"type": "linear",
							"angle": 0,
							"scale": 100,
							"dither": false,
							"align": true,
							"gradient":
							{
								"name": "Linear Black to White",
								"gradientForm": "customStops",
								"interpolation": 0,
								"colors":
								[
									{
										"location": 0,
										"midpoint": 50,
										"type": "userStop",
										"color": { "red": 0, "green": 0, "blue": 0 }
									},
									{
										"location": 4080,	// 4096 * 255 / 256
										"midpoint": 50,
										"type": "userStop",
										"color": { "red": 255, "green": 255, "blue": 255 }
									}
								]
							}
						}
					}
				}
			}
		);
		jamEngine.meaningfulIds = true;
		resultDescriptorObj = jamEngine.jsonGet
		(
			[
				{ "property": { "<property>": "documentID" } },
				{ "document": { "<enumerated>": { "ordinal": "targetEnum" } } }
			]
		);
		var currentDocumentID = resultDescriptorObj["documentID"]["<integer>"];
		jamEngine.jsonPlay
		(
			"select",
			{
				"target": { "<reference>": [ { "document": { "<identifier>": documentID } } ] }
			}
		);
		jamEngine.jsonPlay
		(
			"duplicate",
			{
				"target": { "<reference>": [ { "layer": { "<enumerated>": { "ordinal": "targetEnum" } } } ] },
				"to": { "<reference>": [ { "document": { "<identifier>": currentDocumentID } } ] }
			}
		);
		jamEngine.jsonPlay
		(
			"select",
			{
				"target": { "<reference>": [ { "document": { "<identifier>": currentDocumentID } } ] }
			}
		);
		var tempLutFile = new File (Folder.temp + "/" + "temp-lut-file.raw");
		if (tempLutFile.exists)
		{
			tempLutFile.remove ();
		}
		var rawFormat =
		{
			"header": { "<integer>": 0 },
			"channelsInterleaved": { "<boolean>": true },
			"depth": { "<integer>": 16 },
			"byteOrder": { "<enumerated>": { "platform": (bigEndian) ? "macintosh" : "IBMPC" } }
		};
		jamEngine.jsonPlay
		(
			"save",
			{
				"as": { "<object>": { "rawFormat": rawFormat } },
				"in": { "<path>": tempLutFile.fsName },
				"copy": { "<boolean>": true }
			}
		);
		jamEngine.jsonPlay ("close", { "saving": { "<enumerated>": { "yesNo": "no" } } });
		//
		if (tempLutFile.open ("r"))
		{
			tempLutFile.encoding = "BINARY";
			// Work around an ugly bug, in case the binary file starts with a Unicode BOM sequence (for instance: 0xFF, 0xFE).
			tempLutFile.seek (0);
			clut = [ ];
			for (var index = 0; index < 256; index++)
			{
				var red = convert16to8 (bytesToInt16 (tempLutFile.read (2), bigEndian));
				var green = convert16to8 (bytesToInt16 (tempLutFile.read (2), bigEndian));
				var blue = convert16to8 (bytesToInt16 (tempLutFile.read (2), bigEndian));
				clut.push ([ red, green, blue ]);
			}
			tempLutFile.close ();
			tempLutFile.remove ();
			clutName = "Combined Layers";
			reverse = false;
			clutNameText.text = clutName;
			curvesMap.notify ("onDraw");
			gradientMap.notify ("onDraw");
			colorTable.notify ("onDraw");
		}
	};
	//
	var outputPanel = inputOutput.add ('panel', undefined, "Output", { borderStyle: "sunken" });
	outputPanel.alignChildren = [ "fill", "center" ];
	//
	var exportButton = outputPanel.add ('button', undefined, "Export Color Ramp...");
	exportButton.helpTip = "Export the current color ramp as a curves map file (.amp) or a color table (CLUT) file (.act).";
	exportButton.onClick = function ()
	{
		var exportFormat;
		//
		var exportDialog = new Window ('dialog', "Export Color Ramp");
		//
		var formats =
		[
			{
				label: "Photoshop Curves Map File (.amp)",
				helpTip: "Export the current color ramp as a curves map binary file (.amp).",
				name: "curvesMap"
			},
			{
				label: "Photoshop Color Table File (.act)",
				helpTip: "Export the current color ramp as a color table (CLUT) binary file (.act).",
				name: "colorTable"
			},
			{
				label: "JSON Text Curves Map File (.json)",
				helpTip: "Export the current color ramp as a curves map text file (.json).",
				name: "jsonCurvesMap"
			},
			{
				label: "JSON Text Color Table File (.json)",
				helpTip: "Export the current color ramp as a color table (CLUT) text file (.json).",
				name: "jsonColorTable"
			}
		];
		//
		var formatPanel = exportDialog.add ('panel', undefined, "File Format");
		formatPanel.alignChildren = [ "left", "top" ];
		var formatButtons = [ ];
		for (var index = 0; index < formats.length; index++)
		{
			formatButtons[index] = formatPanel.add ('radiobutton', undefined, formats[index].label);
			formatButtons[index].helpTip = formats[index].helpTip;
			formatButtons[index].name = formats[index].name;
			formatButtons[index].value = (formatButtons[index].name === customOptions.exportFormat);
		}
		var standardButtonsGroup = exportDialog.add ('group');
		standardButtonsGroup.alignment = [ "right", "bottom" ];
		standardButtonsGroup.orientation = "row";
		exportDialog.cancelBtn = standardButtonsGroup.add ('button', undefined, 'Cancel', { name: "cancel" });
		exportDialog.cancelBtn.onClick = function () { exportDialog.close (false); };
		exportDialog.OKBtn = standardButtonsGroup.add ('button', undefined, 'OK', { name: "ok" });
		exportDialog.OKBtn.onClick = function ()
		{
			for (var index = 0; index < formatButtons.length; index++)
			{
				if (formatButtons[index].value)
				{
					exportFormat = formatButtons[index].name;
					break;
				}
			}
			customOptions.exportFormat = exportFormat;
			exportDialog.close (true);
		};
		//
		if (exportDialog.show ())
		{
			var fileName = sanitizeFileName (clutName);
			switch (exportFormat)
			{
				case "curvesMap":
				case "jsonCurvesMap":
					var extension = (exportFormat === "jsonCurvesMap") ? '.json' : '.amp';
					var defaultOutFile = new File (new Folder (customOptions.defaultOutFolder) + '/' + fileName + ((reverse) ? reverseSuffix : "") + extension);
					var curvesMapFile = defaultOutFile.saveDlg ("Save a curves map file:");
					if (curvesMapFile)
					{
						customOptions.defaultOutFolder = curvesMapFile.parent.fsName;
						if (exportFormat === "jsonCurvesMap")
						{
							jamUtils.writeJsonFile (curvesMapFile, clutToMapping (clut), '\t');
						}
						else
						{
							if (curvesMapFile.open ("w", "8BLT", "8BIM"))
							{
								curvesMapFile.encoding = 'BINARY';
								// Not interleaved
								var reds = "";
								var greens = "";
								var blues = "";
								for (var index = 0; index < 256; index++)
								{
									var rgb = clut[index];
									reds += String.fromCharCode (rgb[0]);
									greens += String.fromCharCode (rgb[1]);
									blues += String.fromCharCode (rgb[2]);
								}
								curvesMapFile.write (reds);
								curvesMapFile.write (greens);
								curvesMapFile.write (blues);
								curvesMapFile.close ();
							}
						}
					}
					break;
				case "colorTable":
				case "jsonColorTable":
					var extension = (exportFormat === "jsonColorTable") ? '.json' : '.act';
					var defaultOutFile = new File (new Folder (customOptions.defaultOutFolder) + '/' + fileName + ((reverse) ? reverseSuffix : "") + extension);
					var colorTableFile = defaultOutFile.saveDlg ("Save a color table (CLUT) file:");
					if (colorTableFile)
					{
						customOptions.defaultOutFolder = colorTableFile.parent.fsName;
						if (exportFormat === "jsonColorTable")
						{
							jamUtils.writeJsonFile (colorTableFile, clut, '\t');
						}
						else
						{
							if (colorTableFile.open ("w", "8BCT", "8BIM"))
							{
								colorTableFile.encoding = 'BINARY';
								// Interleaved
								for (var index = 0; index < 256; index++)
								{
									var rgb = clut[index];
									colorTableFile.write (String.fromCharCode (rgb[0]) + String.fromCharCode (rgb[1]) + String.fromCharCode (rgb[2]));
								}
								colorTableFile.close ();
							}
						}
					}
					break;
			}
		}
	};
	//
	var createButton = outputPanel.add ('button', undefined, "Create Adjustment Layer...");
	createButton.helpTip = "Create an adjustment layer in the currently open RGB document.";
	createButton.enabled = (documentID > 0);
	createButton.onClick = function ()
	{
		var createDialog = new Window ('dialog', "Create Adjustment Layer");
		//
		var adjustmentLayers =
		[
			"Curves Map",
			"Gradient Map"
		];
		var createMenu = createDialog.add ('dropdownlist', undefined, adjustmentLayers);
		createMenu.helpTip = "Select the type of adjustment layer to create.";
		createMenu.onChange = function ()
		{
			switch (createMenu.selection.index)
			{
				case 0:
					curvesMapOptions.visible = true;
					gradientMapOptions.visible = false;
					break;
				case 1:
					curvesMapOptions.visible = false;
					gradientMapOptions.visible = true;
					break;
			}
		};
		//
		var optionsGroup = createDialog.add ('group');
		optionsGroup.alignChildren = [ "fill", "fill" ];
		optionsGroup.orientation = "stack";
		//
		var curvesMapOptions = optionsGroup.add ('panel', undefined, "Options");
		curvesMapOptions.alignChildren = [ "left", "center" ];
		var emulateCheck = curvesMapOptions.add ('checkbox', undefined, "Emulate Gradient Map");
		emulateCheck.helpTip = "Create first a linear grayscale gradient map adjustment layer.";
		emulateCheck.value = customOptions.createOptions["curvesMap"].emulateGradientMap;
		//
		var gradientMapOptions = optionsGroup.add ('panel', undefined, "Options");
		gradientMapOptions.alignChildren = [ "left", "center" ];
		var colorStopsGroup = gradientMapOptions.add ('group');
		colorStopsGroup.add ('statictext', undefined, "Color Stops:");
		var colorStopsCount = customOptions.createOptions["gradientMap"].colorStopsCount;
		var colorStopsSlider = colorStopsGroup.add ('slider', undefined, colorStopsCount, 2, 100);
		colorStopsSlider.size = [ 128, 16 ];
		colorStopsSlider.helpTip = "Select the number of color stops of the gradient, between 2 and 100.";
		var colorStopsEdit = colorStopsGroup.add ('edittext', undefined, colorStopsCount, { readonly: true });
		colorStopsEdit.characters = 3;
		colorStopsSlider.onChanging = function ()
		{
			colorStopsEdit.text = Math.floor (this.value);
		};
		var smoothnessGroup = gradientMapOptions.add ('group');
		smoothnessGroup.add ('statictext', undefined, "Smoothness:");
		var smoothness = customOptions.createOptions["gradientMap"].smoothness;
		var smoothnessSlider = smoothnessGroup.add ('slider', undefined, smoothness, 0, 100);
		smoothnessSlider.size = [ 128, 16 ];
		smoothnessSlider.helpTip = "Select the smoothness of the gradient, between 0% and 100%.";
		var smoothnessEdit = smoothnessGroup.add ('edittext', undefined, smoothness, { readonly: true });
		smoothnessEdit.characters = 3;
		smoothnessGroup.add ('statictext', undefined, "%");
		smoothnessSlider.onChanging = function ()
		{
			smoothnessEdit.text = Math.floor (this.value);
		};
		//
		var standardButtonsGroup = createDialog.add ('group');
		standardButtonsGroup.alignment = [ "right", "bottom" ];
		standardButtonsGroup.orientation = "row";
		standardButtonsGroup.alignChildren = "fill";
		createDialog.cancelBtn = standardButtonsGroup.add ('button', undefined, 'Cancel', { name: "cancel" });
		createDialog.cancelBtn.onClick = function () { createDialog.close (false); };
		createDialog.OKBtn = standardButtonsGroup.add ('button', undefined, 'OK', { name: "ok" });
		createDialog.OKBtn.onClick = function ()
		{
			customOptions.createFormat = (createMenu.selection.index === 0) ? "curvesMap" : "gradientMap";
			customOptions.createOptions["curvesMap"].emulateGradientMap = emulateCheck.value;
			customOptions.createOptions["gradientMap"].colorStopsCount = Number (colorStopsEdit.text);
			customOptions.createOptions["gradientMap"].smoothness = Number (smoothnessEdit.text);
			createDialog.close (true);
		};
		//
		createDialog.onShow = function ()
		{
			if (customOptions.createFormat === "curvesMap")
			{
				createMenu.selection = createMenu.find (adjustmentLayers[0]);
				curvesMapOptions.visible = true;
				gradientMapOptions.visible = false;
			}
			else if (customOptions.createFormat === "gradientMap")
			{
				createMenu.selection = createMenu.find (adjustmentLayers[1]);
				curvesMapOptions.visible = false;
				gradientMapOptions.visible = true;
			}
		};
		//
		if (createDialog.show ())
		{
			switch (customOptions.createFormat)
			{
				case "curvesMap":
					var emulateGradientMap = customOptions.createOptions["curvesMap"].emulateGradientMap;
					if (emulateGradientMap)
					{
						jamLayers.makeLayer
						(
							{
								"adjustmentLayer":
								{
									"name": "Linear Grayscale",
									"type": 
									{
										"gradientMapClass":
										{
											"reverse": false,
											"dither": false,
											"gradient":
											{
												"name": "Linear Grayscale",
												"gradientForm": "customStops",
												"interpolation": 0,
												"colors":
												[
													{
														"location": 0, "midpoint": 50, "type": "userStop",
														"color": { "red": 0, "green": 0, "blue": 0 }
													},
													{
														"location": 4096, "midpoint": 50, "type": "userStop",
														"color": { "red": 255, "green": 255, "blue": 255 }
													}
												]
											}
										}
									}
								}
							}
						);
					}
					var mapping = clutToMapping (clut);
					jamLayers.makeLayer
					(
						{
							"adjustmentLayer":
							{
								"name": clutName + ((reverse) ? reverseSuffix : ""),
								"group": emulateGradientMap,
								"type":
								{
									"curves":
									{
										"adjustment":
										[
											{ "channel": "red", "mapping": mapping[0] },
											{ "channel": "green", "mapping": mapping[1] },
											{ "channel": "blue", "mapping": mapping[2] }
										]
									}
								}
							}
						}
					);
					break;
				case "gradientMap":
					var colorStopsCount = customOptions.createOptions["gradientMap"].colorStopsCount;
					var colorStops = [ ];	// colorStops.length <= 100
					for (var index = 0; index < colorStopsCount; index++)
					{
						var rgbIndex = Math.round (index * 255 / (colorStopsCount - 1));
						var colorStop =
						{
							"color":
							{
								"red": clut[rgbIndex][0],
								"green": clut[rgbIndex][1],
								"blue": clut[rgbIndex][2]
							},
							"type": "userStop",
							"location": Math.round (index * 4096 / (colorStopsCount - 1)),
							"midpoint": 50
						};
						colorStops.push (colorStop);
					}
					var smoothness = customOptions.createOptions["gradientMap"].smoothness;
					jamLayers.makeLayer
					(
						{
							"adjustmentLayer":
							{
								"name": clutName + ((reverse) ? reverseSuffix : ""),
								"type":
								{
									"gradientMapClass":
									{
										"gradient":
										{
											"name": clutName + ((reverse) ? reverseSuffix : ""),
											"gradientForm": "customStops",
											"interpolation": Math.round (smoothness * 4096 / 100),
											"colors": colorStops
										}
									}
								}
							}
						}
					);
					break;
			}
			app.refresh ();
			combinedLayersButton.enabled = true;
		}
	};
	//
	var colorRampPanel = panels.add ('panel', undefined, "Color Ramp", { borderStyle: "sunken" });
	colorRampPanel.alignChildren = [ "center", "center" ];
	function reverseClutListener (event)
	{
		if (!event.altKey)
		{
			if (reverseOnSimpleClick || (event.detail === 2))	// detail = 1 : simple click, 2 : double-click
			{
				reverse = !reverse;
				clut = reverseClut (clut);
				clutNameText.text = clutName + ((reverse) ? reverseSuffix : "");
				curvesMap.notify ("onDraw");
				gradientMap.notify ("onDraw");
				colorTable.notify ("onDraw");
			}
		}
	}
	//
	var clutNameText = colorRampPanel.add ('edittext', undefined, "", { readonly: true });
	clutNameText.helpTip = "Name of the color ramp.";
	clutNameText.characters = 28;
	clutNameText.justify = "left";
	//
	var curvesMapPanel = colorRampPanel.add ('group', undefined, undefined);
	curvesMapPanel.margins = [ 2, 2, 2, 2 ];
	curvesMapPanel.onDraw = function ()
	{
		var g = this.graphics;
		g.newPath ();
		g.rectPath (0, 0, this.size.width, this.size.height);
		g.closePath ();
		g.strokePath (g.newPen (g.PenType.SOLID_COLOR, [ 0, 0, 0, 1 ], 1));
	};
	var curvesMap = curvesMapPanel.add ('customview');
	curvesMap.size = [ 256, 256 ];
	curvesMap.onDraw = function ()
	{
		var g = this.graphics;
		// Background
		g.newPath ();
		g.rectPath (0, 0, this.size.width, this.size.height);
		g.closePath ();
		g.fillPath (g.newBrush (g.BrushType.SOLID_COLOR, [ 1, 1, 1, 1 ]));
		// Grid
		var unitCount = (detailedGrid) ? detailedUnitCount : simpleUnitCount;
		for (var row = 0; row <= unitCount; row++)
		{
			g.newPath ();
			g.rectPath (0, (this.size.height / unitCount * row) - 1, this.size.width, 2);
			g.closePath ();
			g.fillPath (g.newBrush (g.BrushType.SOLID_COLOR, [ 0.9, 0.9, 0.9, 1 ]));
		}
		for (var column = 0; column <= unitCount; column++)
		{
			g.newPath ();
			g.rectPath ((this.size.width / unitCount * column) - 1, 0, 2, this.size.height);
			g.closePath ();
			g.fillPath (g.newBrush (g.BrushType.SOLID_COLOR, [ 0.9, 0.9, 0.9, 1 ]));
		}
		// RGB curves map
		for (var index = 0; index < 256; index++)
		{
			var rgb = clut[index];
			if ((rgb[0] === rgb[1]) && (rgb[1] === rgb[2]))
			{
				g.newPath ();
				g.rectPath (index, 255 - rgb[0], 1, 1);
				g.closePath ();
				g.fillPath (g.newBrush (g.BrushType.SOLID_COLOR, [ 0, 0, 0, 1 ]));
			}
			else
			{
				g.newPath ();
				g.rectPath (index, 255 - rgb[0], 1, 1);
				g.closePath ();
				g.fillPath (g.newBrush (g.BrushType.SOLID_COLOR, [ 1, (rgb[0] === rgb[1]) ? 1 : 0, (rgb[0] === rgb[2]) ? 1 : 0, 1 ]));
				g.newPath ();
				g.rectPath (index, 255 - rgb[1], 1, 1);
				g.closePath ();
				g.fillPath (g.newBrush (g.BrushType.SOLID_COLOR, [ (rgb[1] === rgb[0]) ? 1 : 0, 1, (rgb[1] === rgb[2]) ? 1 : 0, 1 ]));
				g.newPath ();
				g.rectPath (index, 255 - rgb[2], 1, 1);
				g.closePath ();
				g.fillPath (g.newBrush (g.BrushType.SOLID_COLOR, [ (rgb[2] === rgb[0]) ? 1 : 0, (rgb[2] === rgb[1]) ? 1 : 0, 1, 1 ]));
			}
		}
	};
	curvesMap.addEventListener ('click', reverseClutListener);
	function toggleGridsListener (event)
	{
		if (event.altKey)
		{
			detailedGrid = !detailedGrid;
			this.notify ("onDraw");
		}
	}
	curvesMap.addEventListener ('click', toggleGridsListener);
	//
	var gradientMapPanel = colorRampPanel.add ('group', undefined, undefined);
	gradientMapPanel.margins = [ 2, 2, 2, 2 ];
	gradientMapPanel.onDraw = function ()
	{
		var g = this.graphics;
		g.newPath ();
		g.rectPath (0, 0, this.size.width, this.size.height);
		g.closePath ();
		g.strokePath (g.newPen (g.PenType.SOLID_COLOR, [ 0, 0, 0, 1 ], 1));
	};
	var gradientMap = gradientMapPanel.add ('customview');
	gradientMap.size = [ 256, 48 ];
	gradientMap.onDraw = function ()
	{
		var g = this.graphics;
		for (var index = 0; index < 256; index++)
		{
			var rgb = clut[index];
			g.newPath ();
			g.rectPath (index, 0, 1, this.size.height);
			g.closePath ();
			g.fillPath (g.newBrush (g.BrushType.SOLID_COLOR, [ rgb[0] / 255, rgb[1] / 255, rgb[2] / 255, 1 ]));
		}
	};
	gradientMap.addEventListener ('click', reverseClutListener);
	//
	var colorTablePanel = colorRampPanel.add ('group', undefined, undefined);
	colorTablePanel.margins = [ 2, 2, 2, 2 ];
	colorTablePanel.onDraw = function ()
	{
		var g = this.graphics;
		g.newPath ();
		g.rectPath (0, 0, this.size.width, this.size.height);
		g.closePath ();
		g.strokePath (g.newPen (g.PenType.SOLID_COLOR, [ 0, 0, 0, 1 ], 1));
	};
	var colorTable = colorTablePanel.add ('customview');
	colorTable.size = [ 256, 256 ];
	colorTable.onDraw = function ()
	{
		var g = this.graphics;
		for (var index = 0, row = 0, column = 0; index < 256; index++)
		{
			var rgb = clut[index];
			g.newPath ();
			g.rectPath (row, column, 16, 16);
			g.closePath ();
			g.fillPath (g.newBrush (g.BrushType.SOLID_COLOR, [ rgb[0] / 255, rgb[1] / 255, rgb[2] / 255, 1 ]));
			row += 16;
			if (row >= this.size.width)
			{
				column += 16;
				row = 0;
			}
		}
		for (var index = 0, row = 0, column = 0; index < 256; index++)
		{
			g.newPath ();
			g.rectPath (row, column, 16, 16);
			g.closePath ();
			g.strokePath (g.newPen (g.PenType.SOLID_COLOR, [ 1, 1, 1, 1 ], 1));
			row += 16;
			if (row >= this.size.width)
			{
				column += 16;
				row = 0;
			}
		}
	};
	colorTable.addEventListener ('click', reverseClutListener);
	//
	var buttonsGroup = dialog.add ('group');
	buttonsGroup.alignment = [ "right", "bottom" ];
	buttonsGroup.orientation = "row";
	buttonsGroup.alignChildren = "fill";
	dialog.cancelBtn = buttonsGroup.add ('button', undefined, 'Cancel', { name: "cancel" });
	dialog.cancelBtn.onClick = function () { dialog.close (false); };
	dialog.OKBtn = buttonsGroup.add ('button', undefined, 'OK', { name: "ok" });
	dialog.OKBtn.onClick = function ()
	{
		customOptions.dialogX = dialog.location.x;
		customOptions.dialogY = dialog.location.y;
		customOptions.clut = clut;
		customOptions.clutName = clutName;
		customOptions.reverse = reverse;
		customOptions.detailedGrid = detailedGrid;
		//
		customOptions.singleLineSteps = singleLineSteps;
		customOptions.displayFormatSteps = displayFormatSteps;
		//
		var formulaFormats;
		//
		formulaFormats = customOptions.formulaFormats["components"];
		formulaFormats.name = componentsOptions.formulaNameText.text;
		formulaFormats.colorModel = componentsOptions.formulaMenu.selection.text;
		formulaFormats.components =
		[
			componentsOptions.component[0].formulaText.text,
			componentsOptions.component[1].formulaText.text,
			componentsOptions.component[2].formulaText.text
		];
		formulaFormats.floatRange = componentsOptions.floatRangeCheck.value;
		formulaFormats.steps = componentsOptions.stepsMenu.selection.index;
		formulaFormats.alignment = componentsOptions.alignmentMenu.selection.text.toLowerCase ();
		//
		formulaFormats = customOptions.formulaFormats["indexedColors"];
		formulaFormats.name = indexedColorsOptions.formulaNameText.text;
		formulaFormats.indexedColors = indexedColorsOptions.formulaText.text;
		formulaFormats.steps = indexedColorsOptions.stepsMenu.selection.index;
		formulaFormats.alignment = indexedColorsOptions.alignmentMenu.selection.text.toLowerCase ();
		//
		customOptions.formulaFormat = (formatsMenu.selection.index === 1) ? "indexedColors" : "components";
		//
		dialog.close (true);
	};
	dialog.onShow = function ()
	{
		var x = customOptions.dialogX;
		var y = customOptions.dialogY;
		if ((x !== 0) || (y !== 0))
		{
			this.location.x = x;
			this.location.y = y;
		}
		if (customOptions.clut && customOptions.clutName)
		{
			clut = customOptions.clut;
			clutName = customOptions.clutName;
		}
		else
		{
			clut = linearGrayscaleClut;
			clutName = linearGrayscaleClutName;
		}
		reverse = customOptions.reverse;
		clutNameText.text = clutName + ((reverse) ? reverseSuffix : "");
		detailedGrid = customOptions.detailedGrid;
		//
		singleLineSteps = customOptions.singleLineSteps;
		displayFormatSteps = customOptions.displayFormatSteps;
		//
		var formulaFormats;
		//
		formulaFormats = customOptions.formulaFormats["components"];
		componentsOptions.formulaNameText.text = formulaFormats.name;
		componentsOptions.formulaMenu.selection = componentsOptions.formulaMenu.find (formulaFormats.colorModel) || 0;
		componentsOptions.component[0].formulaText.text = formulaFormats.components[0];
		componentsOptions.component[1].formulaText.text = formulaFormats.components[1];
		componentsOptions.component[2].formulaText.text = formulaFormats.components[2];
		componentsOptions.floatRangeCheck.value = formulaFormats.floatRange;
		componentsOptions.stepsMenu.selection = componentsOptions.stepsMenu.find (formulaFormats.steps) || 0;
		componentsOptions.alignmentMenu.selection = componentsOptions.alignmentMenu.find (capitalizeString (formulaFormats.alignment)) || 0;
		changeComponentsFormula ();
		//
		formulaFormats = customOptions.formulaFormats["indexedColors"];
		indexedColorsOptions.formulaNameText.text = formulaFormats.name;
		indexedColorsOptions.formulaText.text = formulaFormats.indexedColors;
		indexedColorsOptions.stepsMenu.selection = indexedColorsOptions.stepsMenu.find (formulaFormats.steps) || 0;
		indexedColorsOptions.alignmentMenu.selection = indexedColorsOptions.alignmentMenu.find (capitalizeString (formulaFormats.alignment)) || 0;
		changeIndexedColorsFormula ();
		//
		switch (customOptions.formulaFormat)
		{
			case "components":
				formatsMenu.selection = 0;
				break;
			case "indexedColors":
				formatsMenu.selection = 1;
				break;
		}
	};
	//
	return dialog.show ();
}

//------------------------------------------------------------------------------

var signature = "json-action-manager-create-color-ramp-options";
var defaultOptions =
{
	dialogX: 0,
	dialogY: 0,
	clut: null,
	clutName: null,
	reverse: false,
	detailedGrid: false,
	singleLineSteps: false,
	displayFormatSteps: "hexUpper",
	formulaFormat: "components",
	formulaFormats:
	{
		"components":
		{
			name: "Linear Grayscale",
			colorModel: "RGB",
			components:
			[
				"x",
				"x",
				"x"
			],
			floatRange: false
		},
		"indexedColors":
		{
			name: "Linear Grayscale",
			indexedColors: "[ x, x, x ]"
		}
	},
	defaultInFolder: "~/Desktop",
	defaultOutFolder: "~/Desktop",
	formulasFolder: "~/Desktop",
	exportFormat: "curvesMap",
	createFormat: "curvesMap",
	createOptions:
	{
		"curvesMap":
		{
			emulateGradientMap: false
		},
		"gradientMap":
		{
			colorStopsCount: 16,
			smoothness: 100
		}
	}
};
var appVersion = parseInt (app.version);
if (appVersion >= 11)	// CS4
{
	var customOptions = jamUtils.getCustomOptions (signature, defaultOptions);
	if (getParameters ())
	{
		jamUtils.putCustomOptions (signature, customOptions, true);
	}
}
else
{
	alert ("Sorry, this script requires Photoshop CS4 or later.");
}

//------------------------------------------------------------------------------

