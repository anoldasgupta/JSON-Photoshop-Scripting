/*

<javascriptresource>
<name>Get Nearest Book Color...</name>
<about>"Get Nearest Book Color" v1.1

Get the nearest book color from RGB.

Utility script using the "JSON Action Manager" scripting library.
© 2016 Michel MARIANI.
</about>
<type>automate</type>
<menu>automate</menu>
<category>JSON Action Manager Color Books Utility</category>
</javascriptresource>

*/

//------------------------------------------------------------------------------
// File: Get Nearest Book Color.js
// Version: 1.1
// Release Date: 2016-10-21
// Copyright: © 2016 Michel MARIANI <http://www.tonton-pixel.com/blog/>
// Licence: GPL <http://www.gnu.org/licenses/gpl.html>
//------------------------------------------------------------------------------
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
// 
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.
//------------------------------------------------------------------------------
// Version History:
//  1.1:
//  - Fixed Solid Color bug in Lab mode conversion for a and b components.
//  - Added support for several color difference methods.
//  - Added display of number of colors in color book.
//  1.0:
//  - Initial release.
//------------------------------------------------------------------------------

// jamBooks.jsxinc v4.5.1 (minified)
if(typeof jamBooks!=='object') {var jamBooks={};(function() {jamBooks.isColorBookFile=function(file) {return(file.type==='8BCB')||file.name.match(/\.acb$/i);};jamBooks.dataFromColorBookFile=function(colorBookFile,actualComponents) {var file;if(typeof colorBookFile==='string') {file=new File(colorBookFile);} else if(colorBookFile instanceof File) {file=colorBookFile;} var colorBookData;if(file.open("r")) {try {file.encoding='BINARY';var magicNumber=file.read(4);if(magicNumber==='8BCB') {function readBEInt(file,byteCount) {var bytes=file.read(byteCount);var intValue=0;for(var index=0;index<byteCount;index++) {intValue=(intValue<<8)+bytes.charCodeAt(index);} return intValue;} function readUnicodeString(file) {var unicodeString="";var unicodeLength=readBEInt(file,4);for(var index=0;index<unicodeLength;index++) {var unicodeChar=readBEInt(file,2);if(unicodeChar!==0) {unicodeString+=String.fromCharCode(unicodeChar);}} return unicodeString;} var formatVersion=readBEInt(file,2);if(formatVersion===1) {var colorBook={};colorBook["bookID"]=readBEInt(file,2);colorBook["bookName"]=readUnicodeString(file);colorBook["colorNamePrefix"]=readUnicodeString(file);colorBook["colorNameSuffix"]=readUnicodeString(file);colorBook["bookDescription"]=readUnicodeString(file);var colorCount=readBEInt(file,2);colorBook["colorsPerPage"]=readBEInt(file,2);colorBook["keyColorIndex"]=readBEInt(file,2);var colorSpace=readBEInt(file,2);var colorSpaces=["RGB",null,"CMYK",null,null,null,null,"Lab"];if((colorSpace<0)||(colorSpace>colorSpaces.length)) {throw new Error("[jamBooks.dataFromColorBookFile] Invalid color space: "+colorSpace);} else {colorBook["colorSpace"]=colorSpaces[colorSpace];} var colors=[];for(var colorIndex=0;colorIndex<colorCount;colorIndex++) {var color={};color["colorName"]=readUnicodeString(file);color["colorKey"]=file.read(6);var components=file.read((colorSpace===2)?4:3);var componentArr=[];for(componentIndex=0;componentIndex<components.length;componentIndex++) {var componentValue=components.charCodeAt(componentIndex);if(actualComponents) {switch(colorSpace) {case 2:componentValue=(255-componentValue)/255*100;break;case 7:if(componentIndex>0) {componentValue-=128;} else {componentValue=componentValue/255*100;} break;}} componentArr.push(componentValue);} color[(actualComponents)?"actualComponents":"rawComponents"]=componentArr;colors.push(color);} colorBook["colors"]=colors;if(!file.eof) {colorBook["spotProcess"]=file.read(8);} colorBookData=colorBook;} else {throw new Error("[jamBooks.dataFromColorBookFile] Unrecognized format version: "+formatVersion);}} else {throw new Error("[jamBooks.dataFromColorBookFile] Unrecognized magic number: "+magicNumber);}} catch(e) {colorBookData=e.message;} finally {file.close();}} else {colorBookData="[jamBooks.dataFromColorBookFile] Cannot open file";} return colorBookData;};jamBooks.dataToColorBookFile=function(colorBookFile,colorBookData) {var file;if(typeof colorBookFile==='string') {file=new File(colorBookFile);} else if(colorBookFile instanceof File) {file=colorBookFile;} var result="";if(file.open('w','8BCB','8BIM')) {try {function writeBEInt(file,byteCount,intValue) {var bytes="";for(var index=0;index<byteCount;index++) {bytes=String.fromCharCode(intValue&0xFF)+bytes;intValue>>=8;} file.write(bytes);} function writeUnicodeString(file,unicodeString) {var unicodeLength=unicodeString.length;writeBEInt(file,4,unicodeLength);for(var index=0;index<unicodeLength;index++) {writeBEInt(file,2,unicodeString.charCodeAt(index));}} file.encoding="BINARY";file.write('8BCB');writeBEInt(file,2,1);writeBEInt(file,2,colorBookData["bookID"]);writeUnicodeString(file,colorBookData["bookName"]);writeUnicodeString(file,colorBookData["colorNamePrefix"]);writeUnicodeString(file,colorBookData["colorNameSuffix"]);writeUnicodeString(file,colorBookData["bookDescription"]);var colors=colorBookData["colors"];var colorCount=colors.length;writeBEInt(file,2,colorCount);writeBEInt(file,2,colorBookData["colorsPerPage"]);if("keyColorIndex"in colorBookData) {writeBEInt(file,2,colorBookData["keyColorIndex"]);} else if("keyColorPage"in colorBookData) {writeBEInt(file,2,colorBookData["keyColorPage"]);} var colorSpace=colorBookData["colorSpace"];var colorSpaces={"RGB":0,"CMYK":2,"Lab":7};if(colorSpace in colorSpaces) {writeBEInt(file,2,colorSpaces[colorSpace]);} else {throw new Error("[jamBooks.dataToColorBookFile] Invalid color space: "+jamJSON.stringify(colorSpace));} for(var colorIndex=0;colorIndex<colorCount;colorIndex++) {var color=colors[colorIndex];writeUnicodeString(file,color["colorName"]);var colorKey=color["colorKey"];if(colorKey.length===6) {file.write(colorKey);} else {throw new Error("[jamBooks.dataToColorBookFile] Invalid color key: "+jamJSON.stringify(colorKey));} if("actualComponents"in color) {var components=color["actualComponents"];for(componentIndex=0;componentIndex<components.length;componentIndex++) {var componentValue=components[componentIndex];switch(colorSpace) {case"CMYK":componentValue=255-Math.round(componentValue*255/100);break;case"Lab":if(componentIndex>0) {componentValue=Math.round(componentValue)+128;} else {componentValue=Math.round(componentValue*255/100);} break;case"RGB":componentValue=Math.round(componentValue);break;} file.write(String.fromCharCode(componentValue));}} else if("rawComponents"in color) {var components=color["rawComponents"];for(componentIndex=0;componentIndex<components.length;componentIndex++) {file.write(String.fromCharCode(components[componentIndex]));}} else if("components"in color) {var components=color["components"];for(componentIndex=0;componentIndex<components.length;componentIndex++) {file.write(String.fromCharCode(components[componentIndex]));}}} if("spotProcess"in colorBookData) {file.write(colorBookData["spotProcess"]);}} catch(e) {result=e.message;} finally {file.close();}} else {result="[jamBooks.dataToColorBookFile] Cannot open file";} return result;};jamBooks.getColorBookFileColors=function(colorBookFile,roundComponents) {var colorBookColors=null;var colorBookData=this.dataFromColorBookFile(colorBookFile,true);if(colorBookData!=='string') {colorBookColors={};colorBookColors["bookFile"]=File.decode(colorBookFile.name);colorBookColors["bookName"]=localize(colorBookData["bookName"]);colorBookColors["bookDescription"]=localize(colorBookData["bookDescription"]);var colorNamePrefix=localize(colorBookData["colorNamePrefix"]);var colorNameSuffix=localize(colorBookData["colorNameSuffix"]);var colorSpace=colorBookData["colorSpace"];var colors=colorBookData["colors"];bookColors=[];for(var i=0;i<colors.length;i++) {var bookColor={};var colorName=localize(colors[i]["colorName"]);if(colorName) {bookColor["name"]=colorNamePrefix+colorName+colorNameSuffix;var components=colors[i]["actualComponents"];var color={};switch(colorSpace) {case"CMYK":color["C"]=(roundComponents)?Math.round(components[0]):components[0];color["M"]=(roundComponents)?Math.round(components[1]):components[1];color["Y"]=(roundComponents)?Math.round(components[2]):components[2];color["K"]=(roundComponents)?Math.round(components[3]):components[3];break;case"Lab":color["L"]=(roundComponents)?Math.round(components[0]):components[0];color["a"]=components[1];color["b"]=components[2];break;case"RGB":color["R"]=components[0];color["G"]=components[1];color["B"]=components[2];break;} bookColor["color"]=color;bookColors.push(bookColor);}} colorBookColors["bookColors"]=bookColors;} return colorBookColors;};}());}
// jamEngine.jsxinc v4.5 (minified)
if(typeof jamEngine!=='object') {var jamEngine={};(function() {var that;jamEngine.meaningfulIds=false;jamEngine.parseFriendly=false;jamEngine.displayDialogs=DialogModes.ERROR;var conflictingStringIdStrs={"'Algn'":["align","alignment"],"'AntA'":["antiAlias","antiAliasedPICTAcquire"],"'BckL'":["backgroundLayer","backgroundLevel"],"'BlcG'":["blackGenerationType","blackGenerationCurve"],"'BlcL'":["blackLevel","blackLimit"],"'Blks'":["blacks","blocks"],"'BlrM'":["blurMethod","blurMore"],"'BrgC'":["brightnessEvent","brightnessContrast"],"'BrsD'":["brushDetail","brushesDefine"],"'Brsh'":["brush","brushes"],"'Clcl'":["calculation","calculations"],"'ClrP'":["colorPalette","coloredPencil"],"'Cnst'":["constant","constrain"],"'CntC'":["centerCropMarks","conteCrayon"],"'Cntr'":["center","contrast"],"'CrtD'":["createDroplet","createDuplicate"],"'CstP'":["customPalette","customPhosphors"],"'Cstm'":["custom","customPattern"],"'Drkn'":["darken","darkness"],"'Dstr'":["distort","distortion","distribute","distribution"],"'Dstt'":["desaturate","destWhiteMax"],"'FlIn'":["fileInfo","fillInverse"],"'Gd  '":["good","guide"],"'GnrP'":["generalPreferences","generalPrefs","preferencesClass"],"'GrSt'":["grainStippled","graySetup"],"'Grdn'":["gradientClassEvent","gridMinor"],"'Grn '":["grain","green"],"'Grns'":["graininess","greens"],"'HstP'":["historyPreferences","historyPrefs"],"'HstS'":["historyState","historyStateSourceType"],"'ImgP'":["imageCachePreferences","imagePoint"],"'In  '":["in","stampIn"],"'IntW'":["interfaceWhite","intersectWith"],"'Intr'":["interfaceIconFrameDimmed","interlace","interpolation","intersect"],"'JPEG'":["JPEG","JPEGFormat"],"'LghD'":["lightDirection","lightDirectional"],"'LghO'":["lightOmni","lightenOnly"],"'LghS'":["lightSource","lightSpot"],"'Lns '":["lens","lines"],"'Mgnt'":["magenta","magentas"],"'MrgL'":["mergeLayers","mergedLayers"],"'Mxm '":["maximum","maximumQuality"],"'NTSC'":["NTSC","NTSCColors"],"'NmbL'":["numberOfLayers","numberOfLevels"],"'PlgP'":["pluginPicker","pluginPrefs"],"'Pncl'":["pencilEraser","pencilWidth"],"'Pnt '":["paint","point"],"'Prsp'":["perspective","perspectiveIndex"],"'PrvM'":["previewMacThumbnail","previewMagenta"],"'Pstr'":["posterization","posterize"],"'RGBS'":["RGBSetup","RGBSetupSource"],"'Rds '":["radius","reds"],"'ScrD'":["scratchDisks","screenDot"],"'ShdI'":["shadingIntensity","shadowIntensity"],"'ShpC'":["shapeCurveType","shapingCurve"],"'ShrE'":["sharpenEdges","shearEd"],"'Shrp'":["sharpen","sharpness"],"'SplC'":["splitChannels","supplementalCategories"],"'Spot'":["spot","spotColor"],"'SprS'":["separationSetup","sprayedStrokes"],"'StrL'":["strokeLength","strokeLocation"],"'Strt'":["saturation","start"],"'TEXT'":["char","textType"],"'TIFF'":["TIFF","TIFFFormat"],"'TglO'":["toggleOptionsPalette","toggleOthers"],"'TrnG'":["transparencyGamutPreferences","transparencyGrid","transparencyGridSize"],"'TrnS'":["transferSpec","transparencyShape","transparencyStop"],"'Trns'":["transparency","transparent"],"'TxtC'":["textClickPoint","textureCoverage"],"'TxtF'":["textureFile","textureFill"],"'UsrM'":["userMaskEnabled","userMaskOptions"],"'c@#^'":["inherits","pInherits"],"'comp'":["comp","sInt64"],"'doub'":["floatType","IEEE64BitFloatingPoint","longFloat"],"'long'":["integer","longInteger","sInt32"],"'magn'":["magnitude","uInt32"],"'null'":["null","target"],"'shor'":["sInt16","sMInt","shortInteger"],"'sing'":["IEEE32BitFloatingPoint","sMFloat","shortFloat"]};jamEngine.getConflictingStringIdStrs=function(charIdStr) {return conflictingStringIdStrs[charIdStr]||null;};jamEngine.uniIdStrToId=function(uniIdStr) {var id=0;if(typeof uniIdStr==='string') {if((uniIdStr.length===(1+4+1))&&(uniIdStr.charAt(0)==="'")&&(uniIdStr.charAt(5)==="'")) {id=app.charIDToTypeID(uniIdStr.substring(1,5));} else {id=app.stringIDToTypeID(uniIdStr);}} return id;};var smallestHashValue=app.charIDToTypeID("    ");jamEngine.idToUniIdStrs=function(id) {var charIdStr="";var stringIdStr=app.typeIDToStringID(id);if(id>=smallestHashValue) {charIdStr="'"+app.typeIDToCharID(id)+"'";if(stringIdStr!=="") {if(charIdStr in conflictingStringIdStrs) {stringIdStr=conflictingStringIdStrs[charIdStr];}}} return[charIdStr,stringIdStr];};jamEngine.equivalentUniIdStrs=function(uniIdStr1,uniIdStr2) {return this.uniIdStrToId(uniIdStr1)===this.uniIdStrToId(uniIdStr2);};function putInReference(ref,containers) {if(containers.constructor===Array) {var count=containers.length;for(var i=0;i<count;i++) {var container=that.parseCompact(containers[i]);var desiredClassId=that.uniIdStrToId(container[0]);var typedValue=that.parseCompact(container[1]);var form=typedValue[0];var value=typedValue[1];switch(form) {case"<class>":ref.putClass(desiredClassId);break;case"<enumerated>":var enumerated=that.parseCompact(value);ref.putEnumerated(desiredClassId,that.uniIdStrToId(enumerated[0]),that.uniIdStrToId(enumerated[1]));break;case"<identifier>":ref.putIdentifier(desiredClassId,value);break;case"<index>":ref.putIndex(desiredClassId,value);break;case"<name>":ref.putName(desiredClassId,value);break;case"<offset>":ref.putOffset(desiredClassId,value);break;case"<property>":ref.putProperty(desiredClassId,that.uniIdStrToId(value));break;default:throw new Error("[jamEngine putInReference] Unknown reference form: "+form);break;}}} else {throw new Error("[jamEngine putInReference] JavaScript array expected");}} function putInList(list,items) {if(items.constructor===Array) {var count=items.length;for(var i=0;i<count;i++) {var item=that.parseCompact(items[i]);var type=item[0];var value=item[1];switch(type) {case"<boolean>":list.putBoolean(value);break;case"<class>":list.putClass(that.uniIdStrToId(value));break;case"<data>":list.putData(value);break;case"<double>":list.putDouble(value);break;case"<enumerated>":var enumerated=that.parseCompact(value);list.putEnumerated(that.uniIdStrToId(enumerated[0]),that.uniIdStrToId(enumerated[1]));break;case"<integer>":list.putInteger(value);break;case"<largeInteger>":list.putLargeInteger(value);break;case"<list>":var actionList=new ActionList();putInList(actionList,value);list.putList(actionList);break;case"<object>":var object=that.parseCompact(value);if(object[1]) {var actionDescriptor=new ActionDescriptor();putInDescriptor(actionDescriptor,object[1]);list.putObject(that.uniIdStrToId(object[0]),actionDescriptor);} else {list.putClass(that.uniIdStrToId(object[0]));} break;case"<path>":var fileRef=new File(value);list.putPath(fileRef);break;case"<reference>":var actionReference=new ActionReference();putInReference(actionReference,value);list.putReference(actionReference);break;case"<string>":list.putString(value);break;case"<unitDouble>":var unitDouble=that.parseCompact(value);list.putUnitDouble(that.uniIdStrToId(unitDouble[0]),unitDouble[1]);break;default:throw new Error("[jamEngine putInList] Unknown list type: "+type);break;}}} else {throw new Error("[jamEngine putInList] JavaScript array expected");}} function putInDescriptor(desc,members) {if(members.constructor===Object) {for(var key in members) {if(members.hasOwnProperty(key)) {var keyID=that.uniIdStrToId(key);var member=that.parseCompact(members[key]);var type=member[0];var value=member[1];switch(type) {case"<boolean>":desc.putBoolean(keyID,value);break;case"<class>":desc.putClass(keyID,that.uniIdStrToId(value));break;case"<data>":desc.putData(keyID,value);break;case"<double>":desc.putDouble(keyID,value);break;case"<enumerated>":var enumerated=that.parseCompact(value);desc.putEnumerated(keyID,that.uniIdStrToId(enumerated[0]),that.uniIdStrToId(enumerated[1]));break;case"<integer>":desc.putInteger(keyID,value);break;case"<largeInteger>":desc.putLargeInteger(keyID,value);break;case"<list>":var actionList=new ActionList();putInList(actionList,value);desc.putList(keyID,actionList);break;case"<object>":var object=that.parseCompact(value);if(object[1]) {var actionDescriptor=new ActionDescriptor();putInDescriptor(actionDescriptor,object[1]);desc.putObject(keyID,that.uniIdStrToId(object[0]),actionDescriptor);} else {desc.putClass(keyID,that.uniIdStrToId(object[0]));} break;case"<path>":var fileRef=new File(value);desc.putPath(keyID,fileRef);break;case"<reference>":var actionReference=new ActionReference();putInReference(actionReference,value);desc.putReference(keyID,actionReference);break;case"<string>":desc.putString(keyID,value);break;case"<unitDouble>":var unitDouble=that.parseCompact(value);desc.putUnitDouble(keyID,that.uniIdStrToId(unitDouble[0]),unitDouble[1]);break;default:throw new Error("[jamEngine putInDescriptor] Unknown descriptor type: "+type);break;}}}} else {throw new Error("[jamEngine putInDescriptor] JavaScript object expected");}} var contextRules={"'Algn'":{"<classKey>":{"bevelEmboss":"align","frameFX":"align","gradientFill":"align","gradientLayer":"align","patternFill":"align","patternLayer":"align"},"<event>":"align","<key>":"alignment"},"'AntA'":{"<class>":"antiAliasedPICTAcquire","<key>":"antiAlias"},"'BckL'":{"<class>":"backgroundLayer","<key>":"backgroundLevel"},"'BlcG'":{"<enumType>":"blackGenerationType","<key>":"blackGenerationCurve"},"'BlcL'":{"<classKey>":{"'GEfc'":"blackLevel","CMYKSetup":"blackLimit"},"<eventKey>":{"reticulation":"blackLevel"}},"'Blks'":{"<typeValue>":{"colors":"blacks","extrudeType":"blocks"}},"'BlrM'":{"<enumType>":"blurMethod","<event>":"blurMore","<key>":"blurMethod"},"'BrgC'":{"<class>":"brightnessContrast","<event>":"brightnessContrast"},"'BrsD'":{"<enumValue>":"brushesDefine","<key>":"brushDetail"},"'Brsh'":{"<class>":"brush","<classKey>":{"brushPreset":"brush","currentToolOptions":"brush","displayPrefs":"brush"},"<key>":"brushes"},"'Clcl'":{"<class>":"calculation","<enumValue>":"calculations","<key>":"calculation"},"'ClrP'":{"<typeValue>":{"'GEft'":"coloredPencil"},"<enumType>":"colorPalette","<event>":"coloredPencil"},"'Cnst'":{"<classKey>":{"channelMatrix":"constant"},"<unknown>":"constrain"},"'CntC'":{"<typeValue>":{"'GEft'":"conteCrayon"},"<event>":"conteCrayon","<key>":"centerCropMarks"},"'Cntr'":{"<classKey>":{"'GEfc'":"contrast","brightnessContrast":"contrast","document":"center","polygon":"center","quadrilateral":"center"},"<eventKey>":{"adaptCorrect":"contrast","brightnessEvent":"contrast","grain":"contrast","halftoneScreen":"contrast","sumie":"contrast","tornEdges":"contrast","waterPaper":"contrast"},"<enumValue>":"center"},"'CrtD'":{"<enumValue>":"createDuplicate","<event>":"createDroplet"},"'CstP'":{"<class>":"customPhosphors","<key>":"customPalette"},"'Cstm'":{"<enumValue>":"customPattern","<event>":"custom","<key>":"custom"},"'Drkn'":{"<enumValue>":"darken","<key>":"darkness"},"'Dstr'":{"<classKey>":{"'GEfc'":"distortion"},"<eventKey>":{"glass":"distortion","addNoise":"distribution"},"<enumType>":"distribution","<enumValue>":"distort","<event>":"distribute"},"'Dstt'":{"<enumValue>":"desaturate","<event>":"desaturate","<key>":"destWhiteMax"},"'FlIn'":{"<typeValue>":{"fillColor":"fillInverse","menuItemType":"fileInfo"},"<class>":"fileInfo","<key>":"fileInfo"},"'Gd  '":{"<class>":"guide","<enumValue>":"good"},"'GnrP'":{"<class>":"preferencesClass","<enumValue>":"generalPreferences","<key>":"generalPrefs"},"'GrSt'":{"<class>":"graySetup","<enumValue>":"grainStippled","<key>":"graySetup"},"'Grdn'":{"<class>":"gradientClassEvent","<event>":"gradientClassEvent","<key>":"gridMinor"},"'Grn '":{"<typeValue>":{"'GEft'":"grain"},"<classKey>":{"'GEfc'":"grain","RGBColor":"green","blackAndWhite":"green","channelMatrix":"green","channelMixer":"green"},"<eventKey>":{"blackAndWhite":"green","channelMixer":"green","filmGrain":"grain"},"<enumValue>":"green","<event>":"grain"},"'Grns'":{"<enumValue>":"greens","<key>":"graininess"},"'HstP'":{"<enumValue>":"historyPreferences","<key>":"historyPrefs"},"'HstS'":{"<class>":"historyState","<enumType>":"historyStateSourceType"},"'ImgP'":{"<class>":"imagePoint","<enumValue>":"imageCachePreferences"},"'In  '":{"<enumValue>":"stampIn","<key>":"in"},"'IntW'":{"<event>":"intersectWith","<key>":"interfaceWhite"},"'Intr'":{"<typeValue>":{"shapeOperation":"intersect"},"<classKey>":{"GIFFormat":"interlace","SaveForWeb":"interlace","application":"interfaceIconFrameDimmed","computedBrush":"interpolation","dBrush":"interpolation","gradientClassEvent":"interpolation","photoshopEPSFormat":"interpolation","sampledBrush":"interpolation"},"<eventKey>":{"convertMode":"interpolation","imageSize":"interpolation","transform":"interpolation"},"<event>":"intersect"},"'JPEG'":{"<class>":"JPEGFormat","<enumValue>":"JPEG"},"'LghD'":{"<enumType>":"lightDirection","<enumValue>":"lightDirectional","<key>":"lightDirection"},"'LghO'":{"<typeValue>":{"diffuseMode":"lightenOnly","lightType":"lightOmni"}},"'LghS'":{"<class>":"lightSource","<enumValue>":"lightSpot","<key>":"lightSource"},"'Lns '":{"<enumType>":"lens","<enumValue>":"lines","<key>":"lens"},"'Mgnt'":{"<typeValue>":{"channel":"magenta","colors":"magentas","guideGridColor":"magenta"},"<key>":"magenta"},"'MrgL'":{"<enumValue>":"mergedLayers","<event>":"mergeLayers"},"'Mxm '":{"<enumValue>":"maximumQuality","<event>":"maximum","<key>":"maximum"},"'NTSC'":{"<enumValue>":"NTSC","<event>":"NTSCColors"},"'NmbL'":{"<classKey>":{"'GEfc'":"numberOfLevels","document":"numberOfLayers"},"<eventKey>":{"cutout":"numberOfLevels"}},"'PlgP'":{"<class>":"pluginPrefs","<enumValue>":"pluginPicker","<key>":"pluginPrefs"},"'Pncl'":{"<enumValue>":"pencilEraser","<key>":"pencilWidth"},"'Pnt '":{"<typeValue>":{"textType":"point"},"<class>":"point","<event>":"paint"},"'Prsp'":{"<enumValue>":"perspective","<key>":"perspectiveIndex"},"'PrvM'":{"<enumValue>":"previewMagenta","<key>":"previewMacThumbnail"},"'Pstr'":{"<class>":"posterize","<event>":"posterize","<key>":"posterization"},"'RGBS'":{"<enumType>":"RGBSetupSource","<key>":"RGBSetup"},"'Rds '":{"<enumValue>":"reds","<key>":"radius"},"'ScrD'":{"<enumValue>":"screenDot","<key>":"scratchDisks"},"'ShdI'":{"<classKey>":{"'GEfc'":"shadowIntensity"},"<eventKey>":{"watercolor":"shadowIntensity"},"<unknown>":"shadingIntensity"},"'ShpC'":{"<classKey>":{"application":"shapingCurve"},"<class>":"shapingCurve","<key>":"shapeCurveType"},"'ShrE'":{"<event>":"sharpenEdges","<key>":"shearEd"},"'Shrp'":{"<event>":"sharpen","<key>":"sharpness"},"'SplC'":{"<event>":"splitChannels","<key>":"supplementalCategories"},"'Spot'":{"<enumValue>":"spotColor","<key>":"spot"},"'SprS'":{"<typeValue>":{"'GEft'":"sprayedStrokes"},"<enumValue>":"separationSetup","<event>":"sprayedStrokes"},"'StrL'":{"<enumType>":"strokeLocation","<key>":"strokeLength"},"'Strt'":{"<classKey>":{"currentToolOptions":"saturation","fileNamingRules":"start","HSBColorClass":"saturation","hueSatAdjustment":"saturation","hueSatAdjustmentV2":"saturation","lineClass":"start","range":"start","vibrance":"saturation"},"<eventKey>":{"replaceColor":"saturation","variations":"saturation","vibrance":"saturation"},"<enumValue>":"saturation"},"'TEXT'":{"<enumType>":"textType","<key>":"textType"},"'TIFF'":{"<class>":"TIFFFormat","<enumValue>":"TIFF"},"'TglO'":{"<enumValue>":"toggleOptionsPalette","<key>":"toggleOthers"},"'TrnG'":{"<classKey>":{"application":"transparencyGrid","transparencyPrefs":"transparencyGridSize"},"<enumType>":"transparencyGridSize","<enumValue>":"transparencyGamutPreferences"},"'TrnS'":{"<classKey>":{"bevelEmboss":"transparencyShape","dropShadow":"transparencyShape","innerGlow":"transparencyShape","innerShadow":"transparencyShape","outerGlow":"transparencyShape"},"<class>":"transparencyStop","<unknown>":"transferSpec"},"'Trns'":{"<enumValue>":"transparent","<key>":"transparency"},"'TxtC'":{"<classKey>":{"'GEfc'":"textureCoverage","textLayer":"textClickPoint"},"<eventKey>":{"underpainting":"textureCoverage"}},"'TxtF'":{"<event>":"textureFill","<key>":"textureFile"},"'UsrM'":{"<enumType>":"userMaskOptions","<key>":"userMaskEnabled"},"'null'":{"<class>":"null","<enumValue>":"null","<event>":"null","<key>":"target"}};function getFromId(context,parentContext) {var uniIdStr;var kind=context[0];var id=context[1];if(id<smallestHashValue) {uniIdStr=app.typeIDToStringID(id);} else {uniIdStr="'"+app.typeIDToCharID(id)+"'";if(that.meaningfulIds) {if(uniIdStr in contextRules) {function resolveIdStr(candidates) {var idStr="";for(var parentString in candidates) {if(candidates.hasOwnProperty(parentString)) {if(parentContext[1]===that.uniIdStrToId(parentString)) {idStr=candidates[parentString];break;}}} return idStr;} var resolvedIdStr="";var rule=contextRules[uniIdStr];if(parentContext) {switch(kind) {case"<key>":if((parentContext[0]==="<class>")&&("<classKey>"in rule)) {resolvedIdStr=resolveIdStr(rule["<classKey>"]);} else if((parentContext[0]==="<event>")&&("<eventKey>"in rule)) {resolvedIdStr=resolveIdStr(rule["<eventKey>"]);} break;case"<enumValue>":if((parentContext[0]==="<enumType>")&&("<typeValue>"in rule)) {resolvedIdStr=resolveIdStr(rule["<typeValue>"]);} break;}} if(resolvedIdStr!=="") {uniIdStr=resolvedIdStr;} else if(kind in rule) {uniIdStr=rule[kind];}} else {var stringIDStr=app.typeIDToStringID(id);if(stringIDStr!=="") {uniIdStr=stringIDStr;}}}} return uniIdStr;} var incompatiblePlatformPath="";var getEventId=app.stringIDToTypeID("get");var targetKeyId=app.stringIDToTypeID("target");var propertyClassId=app.stringIDToTypeID("property");function getFromReference(ref) {var propertyId=0;var arr=[];do {try{var desiredClassId=ref.getDesiredClass();}catch(e){break;} if(propertyId!==0) {var propertyCompact=that.buildCompact("<property>",getFromId(["<key>",propertyId],["<class>",desiredClassId]));arr.push(that.buildCompact(getFromId(["<class>",propertyClassId]),propertyCompact));propertyId=0;} var desiredCompact;var aFormID=ref.getForm();switch(aFormID) {case ReferenceFormType.CLASSTYPE:desiredCompact=that.buildCompact("<class>",null);break;case ReferenceFormType.ENUMERATED:var enumTypeContext=["<enumType>",ref.getEnumeratedType()];var enumValueContext=["<enumValue>",ref.getEnumeratedValue()];desiredCompact=that.buildCompact("<enumerated>",that.buildCompact(getFromId(enumTypeContext),getFromId(enumValueContext,enumTypeContext)));break;case ReferenceFormType.IDENTIFIER:desiredCompact=that.buildCompact("<identifier>",ref.getIdentifier());break;case ReferenceFormType.INDEX:desiredCompact=that.buildCompact("<index>",ref.getIndex());break;case ReferenceFormType.NAME:desiredCompact=that.buildCompact("<name>",ref.getName());break;case ReferenceFormType.OFFSET:desiredCompact=that.buildCompact("<offset>",ref.getOffset());break;case ReferenceFormType.PROPERTY:if(desiredClassId===propertyClassId) {propertyId=ref.getProperty();} else {desiredCompact=that.buildCompact("<property>",getFromId(["<key>",ref.getProperty()],["<class>",desiredClassId]));} break;default:throw new Error("[jamEngine getFromReference] Unknown reference form type: "+aFormID);break;} if(desiredClassId!==propertyClassId) {arr.push(that.buildCompact(getFromId(["<class>",desiredClassId]),desiredCompact));} ref=ref.getContainer();} while(ref);return arr;} function getFromList(list) {var arr=[];var itemCount=list.count;for(var itemIndex=0;itemIndex<itemCount;itemIndex++) {var itemCompact;var typeID;try{typeID=list.getType(itemIndex);}catch(e){continue;} switch(typeID) {case DescValueType.BOOLEANTYPE:itemCompact=that.buildCompact("<boolean>",list.getBoolean(itemIndex));break;case DescValueType.CLASSTYPE:itemCompact=that.buildCompact("<class>",getFromId(["<class>",list.getClass(itemIndex)]));break;case DescValueType.DOUBLETYPE:itemCompact=that.buildCompact("<double>",list.getDouble(itemIndex));break;case DescValueType.ENUMERATEDTYPE:var enumTypeContext=["<enumType>",list.getEnumerationType(itemIndex)];var enumValueContext=["<enumValue>",list.getEnumerationValue(itemIndex)];itemCompact=that.buildCompact("<enumerated>",that.buildCompact(getFromId(enumTypeContext),getFromId(enumValueContext,enumTypeContext)));break;case DescValueType.INTEGERTYPE:itemCompact=that.buildCompact("<integer>",list.getInteger(itemIndex));break;case DescValueType.LISTTYPE:itemCompact=that.buildCompact("<list>",getFromList(list.getList(itemIndex)));break;case DescValueType.OBJECTTYPE:var objectTypeContext=["<class>",list.getObjectType(itemIndex)];var objectValue=list.getObjectValue(itemIndex);itemCompact=that.buildCompact("<object>",that.buildCompact(getFromId(objectTypeContext),getFromDescriptor(objectValue,objectTypeContext)));break;case DescValueType.ALIASTYPE:try {var fileRef=list.getPath(itemIndex);itemCompact=that.buildCompact("<path>",fileRef.fsName);} catch(e) {itemCompact=that.buildCompact("<path>",incompatiblePlatformPath);} break;case DescValueType.REFERENCETYPE:itemCompact=that.buildCompact("<reference>",getFromReference(list.getReference(itemIndex)));break;case DescValueType.STRINGTYPE:itemCompact=that.buildCompact("<string>",list.getString(itemIndex));break;case DescValueType.UNITDOUBLE:var unitTypeContext=["<unit>",list.getUnitDoubleType(itemIndex)];var doubleValue=list.getUnitDoubleValue(itemIndex);itemCompact=that.buildCompact("<unitDouble>",that.buildCompact(getFromId(unitTypeContext),doubleValue));break;default:var isRawType;var isLargeIntegerType;try{isRawType=(typeID===DescValueType.RAWTYPE);}catch(e){} try{isLargeIntegerType=(typeID===DescValueType.LARGEINTEGERTYPE);}catch(e){} if(isRawType) {itemCompact=that.buildCompact("<data>",list.getData(itemIndex));} else if(isLargeIntegerType) {itemCompact=that.buildCompact("<largeInteger>",list.getLargeInteger(itemIndex));} else {throw new Error("[jamEngine getFromList] Unknown descriptor value type: "+typeID);} break;} arr[itemIndex]=itemCompact;} return arr;} function getFromDescriptor(desc,parentContext) {if(desc) {var obj={};var keyCount;try{keyCount=desc.count;}catch(e){return null;} for(var keyIndex=0;keyIndex<keyCount;keyIndex++) {var keyID=desc.getKey(keyIndex);var keyString=getFromId(["<key>",keyID],parentContext);var keyCompact;var typeID;try{typeID=desc.getType(keyID);}catch(e){continue;} switch(typeID) {case DescValueType.BOOLEANTYPE:keyCompact=that.buildCompact("<boolean>",desc.getBoolean(keyID));break;case DescValueType.CLASSTYPE:keyCompact=that.buildCompact("<class>",getFromId(["<class>",desc.getClass(keyID)]));break;case DescValueType.DOUBLETYPE:keyCompact=that.buildCompact("<double>",desc.getDouble(keyID));break;case DescValueType.ENUMERATEDTYPE:var enumTypeContext=["<enumType>",desc.getEnumerationType(keyID)];var enumValueContext=["<enumValue>",desc.getEnumerationValue(keyID)];keyCompact=that.buildCompact("<enumerated>",that.buildCompact(getFromId(enumTypeContext),getFromId(enumValueContext,enumTypeContext)));break;case DescValueType.INTEGERTYPE:keyCompact=that.buildCompact("<integer>",desc.getInteger(keyID));break;case DescValueType.LISTTYPE:keyCompact=that.buildCompact("<list>",getFromList(desc.getList(keyID)));break;case DescValueType.OBJECTTYPE:var objectTypeContext=["<class>",desc.getObjectType(keyID)];var objectValue=desc.getObjectValue(keyID);keyCompact=that.buildCompact("<object>",that.buildCompact(getFromId(objectTypeContext),getFromDescriptor(objectValue,objectTypeContext)));break;case DescValueType.ALIASTYPE:try {var fileRef=desc.getPath(keyID);keyCompact=that.buildCompact("<path>",fileRef.fsName);} catch(e) {keyCompact=that.buildCompact("<path>",incompatiblePlatformPath);} break;case DescValueType.REFERENCETYPE:keyCompact=that.buildCompact("<reference>",getFromReference(desc.getReference(keyID)));break;case DescValueType.STRINGTYPE:keyCompact=that.buildCompact("<string>",desc.getString(keyID));break;case DescValueType.UNITDOUBLE:var unitTypeContext=["<unit>",desc.getUnitDoubleType(keyID)];var doubleValue=desc.getUnitDoubleValue(keyID);keyCompact=that.buildCompact("<unitDouble>",that.buildCompact(getFromId(unitTypeContext),doubleValue));break;default:var isRawType;var isLargeIntegerType;try{isRawType=(typeID===DescValueType.RAWTYPE);}catch(e){} try{isLargeIntegerType=(typeID===DescValueType.LARGEINTEGERTYPE);}catch(e){} if(isRawType) {keyCompact=that.buildCompact("<data>",desc.getData(keyID));} else if(isLargeIntegerType) {keyCompact=that.buildCompact("<largeInteger>",desc.getLargeInteger(keyID));} else {throw new Error("[jamEngine getFromDescriptor] Unknown descriptor value type: "+typeID);} break;} obj[keyString]=keyCompact;} return obj;} else {return null;}} jamEngine.jsonToActionDescriptor=function(descriptorObj) {that=this;var actionDescriptor;if(descriptorObj) {actionDescriptor=new ActionDescriptor();putInDescriptor(actionDescriptor,descriptorObj);} return actionDescriptor;};jamEngine.jsonToActionReference=function(referenceArr) {that=this;var actionReference;if(referenceArr) {actionReference=new ActionReference();putInReference(actionReference,referenceArr);} return actionReference;};jamEngine.eventIdAndActionDescriptorToJson=function(eventId,actionDescriptor) {that=this;var eventIdContext=["<event>",eventId];return{"<event>":getFromId(eventIdContext),"<descriptor>":getFromDescriptor(actionDescriptor,eventIdContext)};};jamEngine.classIdAndActionDescriptorToJson=function(classId,actionDescriptor) {that=this;var classIdContext=["<class>",classId];return{"<class>":getFromId(classIdContext),"<descriptor>":getFromDescriptor(actionDescriptor,classIdContext)};};jamEngine.actionReferenceToJson=function(actionReference) {that=this;return getFromReference(actionReference);};function getReferenceClassId(ref) {classId=0;do {try{var desiredClassId=ref.getDesiredClass();}catch(e){break;} if(desiredClassId!==propertyClassId) {classId=desiredClassId;break;} ref=ref.getContainer();} while(ref);return classId;} jamEngine.jsonPlay=function(eventUniIdStr,descriptorObj,displayDialogs) {var eventId=this.uniIdStrToId(eventUniIdStr);var desc=this.jsonToActionDescriptor(descriptorObj);var parentContext;if(eventId===getEventId) {var ref=desc.getReference(targetKeyId);parentContext=["<class>",getReferenceClassId(ref)];} else {parentContext=["<event>",eventId];} return getFromDescriptor(app.executeAction(eventId,desc,displayDialogs||this.displayDialogs),parentContext);};jamEngine.jsonGet=function(referenceArr) {var ref=this.jsonToActionReference(referenceArr);return getFromDescriptor(app.executeActionGet(ref),["<class>",getReferenceClassId(ref)]);};jamEngine.normalizeJsonItem=function(item,options) {function normalizeItem(item) {var explicit=that.parseCompact(item);var type=explicit[0];var value=explicit[1];var normalizedValue;switch(type) {case"<boolean>":case"<data>":case"<double>":case"<identifier>":case"<index>":case"<integer>":case"<largeInteger>":case"<name>":case"<offset>":case"<path>":case"<string>":normalizedValue=value;break;case"<class>":normalizedValue=value&&getFromId(["<class>",that.uniIdStrToId(value)]);break;case"<enumerated>":var enumerated=that.parseCompact(value);var enumTypeContext=["<enumType>",that.uniIdStrToId(enumerated[0])];var enumValueContext=["<enumValue>",that.uniIdStrToId(enumerated[1])];normalizedValue=that.buildCompact(getFromId(enumTypeContext),getFromId(enumValueContext,enumTypeContext));break;case"<list>":normalizedValue=[];for(var i=0;i<value.length;i++) {normalizedValue.push(normalizeItem(value[i]));} break;case"<object>":var object=that.parseCompact(value);var objectClassContext=["<class>",that.uniIdStrToId(object[0])];var objectDescriptor=object[1];var normalizedDescriptor;if(objectDescriptor===null) {normalizedDescriptor=null;} else {normalizedDescriptor={};for(var key in objectDescriptor) {if(objectDescriptor.hasOwnProperty(key)) {var objectKeyContext=["<key>",that.uniIdStrToId(key)];normalizedDescriptor[getFromId(objectKeyContext,objectClassContext)]=normalizeItem(objectDescriptor[key]);}}} normalizedValue=that.buildCompact(getFromId(objectClassContext),normalizedDescriptor);break;case"<property>":normalizedValue=getFromId(["<key>",that.uniIdStrToId(value)]);break;case"<reference>":normalizedValue=[];for(var i=0;i<value.length;i++) {var container=that.parseCompact(value[i]);normalizedValue.push(that.buildCompact(getFromId(["<class>",that.uniIdStrToId(container[0])]),normalizeItem(container[1])));} break;case"<unitDouble>":var unitDouble=that.parseCompact(value);var unitTypeContext=["<unit>",that.uniIdStrToId(unitDouble[0])];normalizedValue=that.buildCompact(getFromId(unitTypeContext),unitDouble[1]);break;default:throw new Error("[jamEngine.normalizeJsonItem] Unknown item type: "+type);break;} return that.buildCompact(type,normalizedValue);} that=this;var saveMeaningfulIds=this.meaningfulIds;var saveParseFriendly=this.parseFriendly;if(options&&(options.constructor===Object)) {if(typeof options.meaningfulIds!=='undefined') {this.meaningfulIds=options.meaningfulIds;} if(typeof options.parseFriendly!=='undefined') {this.parseFriendly=options.parseFriendly;}} var normalizedItem=normalizeItem(item);this.meaningfulIds=saveMeaningfulIds;this.parseFriendly=saveParseFriendly;return normalizedItem;};function simplifyRef(ref) {var simplifiedRef=[];for(var i=0;i<ref.length;i++) {var element=ref[i];var simplifiedElement={};var desiredClass=element[0];var form=element[1][0];var value=element[1][1];switch(form) {case"<class>":case"<identifier>":case"<index>":case"<name>":case"<offset>":case"<property":simplifiedElement[desiredClass]=value;break;case"<enumerated>":simplifiedElement[desiredClass]=value[1];break;default:throw new Error("[jamEngine simplifyRef] Unexpected element form: "+form);break;} simplifiedRef.push(simplifiedElement);} return simplifiedRef;} function simplifyItem(item,hook) {var simplifiedItem;var type=item[0];var value=item[1];switch(type) {case"<boolean>":case"<class>":case"<data>":case"<double>":case"<integer>":case"<largeInteger>":case"<path>":case"<string>":simplifiedItem=value;break;case"<list>":simplifiedItem=simplifyList(value,hook);break;case"<enumerated>":case"<unitDouble>":simplifiedItem=value[1];break;case"<object>":simplifiedItem=simplifyDesc(value[1],hook);break;case"<reference>":simplifiedItem=simplifyRef(value);break;default:throw new Error("[jamEngine simplifyItem] Unexpected item type: "+type);break;} return simplifiedItem;} function simplifyList(list,hook) {var simplifiedList=[];for(var i=0;i<list.length;i++) {simplifiedList.push(simplifyItem(list[i],hook));} return simplifiedList;} function simplifyDesc(desc,hook) {var getDefaultValue=function(desc,key){return simplifyItem(desc[key],hook);};var simplifiedDesc={};for(var key in desc) {if(desc.hasOwnProperty(key)) {var value=undefined;if(typeof hook==='function') {value=hook(desc,key,getDefaultValue);} if(typeof value==='undefined') {value=simplifyItem(desc[key],hook);} simplifiedDesc[key]=value;}} return simplifiedDesc;} jamEngine.simplifyObject=function(object,hookFunction) {return simplifyDesc((this.normalizeJsonItem(object,{meaningfulIds:true,parseFriendly:true}))[1][1],hookFunction);};jamEngine.simplifyList=function(list,hookFunction) {return simplifyList((this.normalizeJsonItem(list,{meaningfulIds:true,parseFriendly:true}))[1],hookFunction);};jamEngine.parseCompact=function(compact) {var result=[];if(compact.constructor===Object) {var keys=[];for(var k in compact) {if(compact.hasOwnProperty(k)) {keys.push(k);}} if(keys.length===1) {result[0]=keys[0];result[1]=compact[keys[0]];} else {throw new Error("[jamEngine.parseCompact] Syntax error: "+compact.toSource());}} else if(compact.constructor===Array) {if(compact.length===2) {result[0]=compact[0];result[1]=compact[1];} else {throw new Error("[jamEngine.parseCompact] Syntax error: "+compact.toSource());}} else {throw new Error("[jamEngine.parseCompact] JavaScript object or array expected");} return result;};jamEngine.compactToExplicit=function(compact,typeKey,valueKey) {var explicit={};var typeValue=this.parseCompact(compact);explicit[typeKey||"<type>"]=typeValue[0];explicit[valueKey||"<value>"]=typeValue[1];return explicit;};jamEngine.buildCompact=function(type,value) {var compact;if(typeof type==='string') {if(this.parseFriendly) {compact=[type,value];} else {compact={};compact[type]=value;}} else {throw new Error("[jamEngine.buildCompact] String expected");} return compact;};jamEngine.explicitToCompact=function(explicit,typeKey,valueKey) {var compact;if(explicit.constructor===Object) {compact=this.buildCompact(explicit[typeKey||"<type>"],explicit[valueKey||"<value>"]);} else {throw new Error("[jamEngine.explicitToCompact] JavaScript object expected");} return compact;};for(var charIdStr in conflictingStringIdStrs) {if(conflictingStringIdStrs.hasOwnProperty(charIdStr)) {var stringIdStrs=conflictingStringIdStrs[charIdStr];for(var index=stringIdStrs.length-1;index>=0;index--) {var stringIdStr=stringIdStrs[index];if(!(app.charIDToTypeID(charIdStr.substring(1,5))===app.stringIDToTypeID(stringIdStr))) {stringIdStrs.splice(index,1);}} if(stringIdStrs.length<2) {delete conflictingStringIdStrs[charIdStr];}}} for(var charIdStr in contextRules) {if(contextRules.hasOwnProperty(charIdStr)) {if(charIdStr in conflictingStringIdStrs) {var rule=contextRules[charIdStr];for(var kind in rule) {if(rule.hasOwnProperty(kind)) {switch(kind) {case"<class>":case"<event>":case"<enumType>":case"<enumValue>":case"<key>":case"<unknown>":if(app.charIDToTypeID(charIdStr.substring(1,5))!=app.stringIDToTypeID(rule[kind])) {throw new Error("[jamEngine] "+"\""+charIdStr+"\" and \""+rule[kind]+"\" are not equivalent ID strings");} break;case"<classKey>":case"<eventKey>":case"<typeValue>":for(var parent in rule[kind]) {if(rule[kind].hasOwnProperty(parent)) {if(app.charIDToTypeID(charIdStr.substring(1,5))!=app.stringIDToTypeID(rule[kind][parent])) {throw new Error("[jamEngine] "+"\""+charIdStr+"\" and \""+rule[kind][parent]+"\" are not equivalent ID strings");}}} break;}}}} else {delete contextRules[charIdStr];}}}}());}
// jamJSON.jsxinc v4.5 (minified)
if(typeof jamJSON!=='object') {var jamJSON={};(function() {var state;var stack;var container;var key;var value;var escapes={'\\':'\\','"':'"','/':'/','t':'\t','n':'\n','r':'\r','f':'\f','b':'\b'};var action={'{':{go:function() {stack.push({state:'ok'});container={};state='firstokey';},ovalue:function() {stack.push({container:container,state:'ocomma',key:key});container={};state='firstokey';},firstavalue:function() {stack.push({container:container,state:'acomma'});container={};state='firstokey';},avalue:function() {stack.push({container:container,state:'acomma'});container={};state='firstokey';}},'}':{firstokey:function() {var pop=stack.pop();value=container;container=pop.container;key=pop.key;state=pop.state;},ocomma:function() {var pop=stack.pop();container[key]=value;value=container;container=pop.container;key=pop.key;state=pop.state;}},'[':{go:function() {stack.push({state:'ok'});container=[];state='firstavalue';},ovalue:function() {stack.push({container:container,state:'ocomma',key:key});container=[];state='firstavalue';},firstavalue:function() {stack.push({container:container,state:'acomma'});container=[];state='firstavalue';},avalue:function() {stack.push({container:container,state:'acomma'});container=[];state='firstavalue';}},']':{firstavalue:function() {var pop=stack.pop();value=container;container=pop.container;key=pop.key;state=pop.state;},acomma:function() {var pop=stack.pop();container.push(value);value=container;container=pop.container;key=pop.key;state=pop.state;}},':':{colon:function() {if(container.hasOwnProperty(key)) {throw new SyntaxError("[jamJSON.parse] Duplicate key: “"+key+"”");} state='ovalue';}},',':{ocomma:function() {container[key]=value;state='okey';},acomma:function() {container.push(value);state='avalue';}},'true':{go:function() {value=true;state='ok';},ovalue:function() {value=true;state='ocomma';},firstavalue:function() {value=true;state='acomma';},avalue:function() {value=true;state='acomma';}},'false':{go:function() {value=false;state='ok';},ovalue:function() {value=false;state='ocomma';},firstavalue:function() {value=false;state='acomma';},avalue:function() {value=false;state='acomma';}},'null':{go:function() {value=null;state='ok';},ovalue:function() {value=null;state='ocomma';},firstavalue:function() {value=null;state='acomma';},avalue:function() {value=null;state='acomma';}}};var number={go:function() {state='ok';},ovalue:function() {state='ocomma';},firstavalue:function() {state='acomma';},avalue:function() {state='acomma';}};var string={go:function() {state='ok';},firstokey:function() {key=value;state='colon';},okey:function() {key=value;state='colon';},ovalue:function() {state='ocomma';},firstavalue:function() {state='acomma';},avalue:function() {state='acomma';}};var commentFunc=function(){};function debackslashify(text) {return text.replace(/\\(?:u(.{4})|([^u]))/g,function(a,b,c){return(b)?String.fromCharCode(parseInt(b,16)):escapes[c];});} jamJSON.parse=function(text,validate,allowComments) {if(validate) {var tx=/^[\x20\t\n\r]*(?:([,:\[\]{}]|true|false|null)|(-?(?:0|[1-9][0-9]*)(?:\.[0-9]+)?(?:[eE][+\-]?[0-9]+)?)|"((?:[^\r\n\t\\\"]|\\(?:["\\\/trnfb]|u[0-9a-fA-F]{4}))*)")/;var txc=/^[\x20\t\n\r]*(?:(\/(?:\/.*|\*(?:.|[\r\n])*?\*\/))|([,:\[\]{}]|true|false|null)|(-?(?:0|[1-9][0-9]*)(?:\.[0-9]+)?(?:[eE][+\-]?[0-9]+)?)|"((?:[^\r\n\t\\\"]|\\(?:["\\\/trnfb]|u[0-9a-fA-F]{4}))*)")/;var r;var i;var actionFunc;state='go';stack=[];try {while(true) {i=(allowComments)?1:0;r=(allowComments)?txc.exec(text):tx.exec(text);if(!r) {break;} if(allowComments&&r[1]) {actionFunc=commentFunc;} else if(r[i+1]) {actionFunc=action[r[i+1]][state];} else if(r[i+2]) {value=+r[i+2];actionFunc=number[state];} else {value=debackslashify(r[i+3]);actionFunc=string[state];} if(actionFunc) {actionFunc();text=text.slice(r[0].length);} else {break;}}} catch(e) {state=e;} if(state!=='ok'||/[^\x20\t\n\r]/.test(text)) {throw state instanceof SyntaxError?state:new SyntaxError("[jamJSON.parse] Invalid JSON");} return value;} else {return eval('('+text+')');}};var escapable=/[\\\"\x00-\x1F\x7F-\x9F\u00AD\u0600-\u0604\u070F\u17B4\u17B5\u200C-\u200F\u2028-\u202F\u2060-\u206F\uFEFF\uFFF0-\uFFFF]/g;var meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'};var gap;var indent;var prefixIndent;function quote(string) {escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return(typeof c==='string')?c:'\\u'+('0000'+a.charCodeAt(0).toString(16).toUpperCase()).slice(-4);})+'"':'"'+string+'"';} function str(value) {var i;var k;var v;var mind=gap;var partial;switch(typeof value) {case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value) {return'null';} gap+=indent;partial=[];if(value.constructor===Array) {for(i=0;i<value.length;i++) {partial[i]=str(value[i]);} v=(partial.length===0)?(gap?'[\n'+prefixIndent+mind+']':'[ ]'):(gap?'[\n'+prefixIndent+gap+partial.join(',\n'+prefixIndent+gap)+'\n'+prefixIndent+mind+']':'[ '+partial.join(', ')+' ]');gap=mind;return v;} else {for(k in value) {if(value.hasOwnProperty(k)) {v=str(value[k]);if(v) {partial.push(quote(k)+(gap&&((v.charAt(0)==='{')||(v.charAt(0)==='['))?':\n'+prefixIndent+gap:': ')+v);}}} v=(partial.length===0)?(gap?'{\n'+prefixIndent+mind+'}':'{ }'):(gap?'{\n'+prefixIndent+gap+partial.join(',\n'+prefixIndent+gap)+'\n'+prefixIndent+mind+'}':'{ '+partial.join(', ')+' }');gap=mind;return v;} default:throw new SyntaxError("[jamJSON.stringify] Invalid JSON");}} jamJSON.stringify=function(value,space,prefix) {var i;gap='';indent='';prefixIndent='';if(typeof space==='number') {for(i=0;i<space;i++) {indent+=' ';}} else if(typeof space==='string') {indent=space;} if(typeof prefix==='number') {for(i=0;i<prefix;i++) {prefixIndent+=' ';}} else if(typeof prefix==='string') {prefixIndent=prefix;} return prefixIndent+str(value);};}());}
// jamUtils.jsxinc v4.5 (minified)
if(typeof jamUtils!=='object') {var jamUtils={};(function() {jamUtils.toDistanceUnit=function(amount,amountBasePerInch) {return(amount/amountBasePerInch)*72.0;};jamUtils.fromDistanceUnit=function(amount,amountBasePerInch) {return(amount/72.0)*amountBasePerInch;};jamUtils.fontExists=function(fontPostScriptName) {var useDOM=true;var found=false;if(useDOM) {for(var i=0;i<app.fonts.length;i++) {if(app.fonts[i].postScriptName===fontPostScriptName) {found=true;break;}}} else {var saveMeaningfulIds=jamEngine.meaningfulIds;var saveParseFriendly=jamEngine.parseFriendly;jamEngine.meaningfulIds=true;jamEngine.parseFriendly=true;var resultDescriptorObj=jamEngine.jsonGet ([["property",["<property>","fontList"]],["application",["<enumerated>",["ordinal","targetEnum"]]]]);var fontPostScriptNameArr=resultDescriptorObj["fontList"][1][1]["fontPostScriptName"][1];for(var i=0;i<fontPostScriptNameArr.length;i++) {if(fontPostScriptNameArr[i][1]===fontPostScriptName) {found=true;break;}} jamEngine.meaningfulIds=saveMeaningfulIds;jamEngine.parseFriendly=saveParseFriendly;} return found;};jamUtils.loadAction=function(action,actionSet,actionsFilePath) {try {jamEngine.jsonGet([["action",["<name>",action]],["actionSet",["<name>",actionSet]]]);var found=true;} catch(e) {var found=false;} if(!found) {jamEngine.jsonPlay("open",{"target":["<path>",actionsFilePath]});}};jamUtils.loadActionSet=function(actionSet,actionsFilePath) {try {jamEngine.jsonGet([["actionSet",["<name>",actionSet]]]);var found=true;} catch(e) {var found=false;} if(!found) {jamEngine.jsonPlay("open",{"target":["<path>",actionsFilePath]});}};jamUtils.loadPreset=function(presetProperty,presetName,presetFilePath) {var useDOM=false;var useOpen=true;var classes={"brush":"brush","colors":"color","gradientClassEvent":"gradientClassEvent","style":"styleClass","pattern":"'PttR'","shapingCurve":"shapingCurve","customShape":"customShape","toolPreset":"toolPreset"};var presetClass=classes[presetProperty];var saveMeaningfulIds=jamEngine.meaningfulIds;var saveParseFriendly=jamEngine.parseFriendly;jamEngine.meaningfulIds=true;jamEngine.parseFriendly=true;var found=false;var resultDescriptorObj=jamEngine.jsonGet ([["property",["<property>","presetManager"]],["application",["<enumerated>",["ordinal","targetEnum"]]]]);var presetManagerArr=resultDescriptorObj["presetManager"][1];for(var i=0;i<presetManagerArr.length;i++) {var presets=presetManagerArr[i][1];if(presets[0]===presetClass) {var presetsArr=presets[1]["name"][1];for(var j=0;j<presetsArr.length;j++) {if(presetsArr[j][1]===presetName) {found=true;break;}} break;}} if(!found) {if(useDOM) {app.load(new File(presetFilePath));} else if(useOpen) {jamEngine.jsonPlay("open",{"target":["<path>",presetFilePath]});} else {jamEngine.jsonPlay ("set",{"target":["<reference>",[["property",["<property>",presetProperty]],["application",["<enumerated>",["ordinal","targetEnum"]]]]],"to":["<path>",presetFilePath],"append":["<boolean>",true]});}} jamEngine.meaningfulIds=saveMeaningfulIds;jamEngine.parseFriendly=saveParseFriendly;};function getFileObject(file) {var fileObject;if(file instanceof File) {fileObject=file;} else if(typeof file==='string') {fileObject=new File(file);} else {throw new Error('[jamUtils getFileObject] Invalid argument');} return fileObject;} jamUtils.readTextFile=function(textFile) {var text=null;var file=getFileObject(textFile);if(file.open("r")) {text=file.read();file.close();} return text;};jamUtils.readJsonFile=function(jsonFile) {return jamJSON.parse(this.readTextFile(jsonFile),true);};jamUtils.writeTextFile=function(textFile,text) {var file=getFileObject(textFile);if(file.open('w','TEXT')) {file.encoding='UTF-8';file.lineFeed='unix';file.write('\uFEFF');file.write(text);file.close();}};jamUtils.writeJsonFile=function(jsonFile,data,space) {this.writeTextFile(jsonFile,jamJSON.stringify(data,space));};jamUtils.cloneData=function(data) {var clone;if(data===null) {clone=data;} else if(data.constructor===Object) {clone={};for(var k in data) {if(data.hasOwnProperty(k)) {clone[k]=this.cloneData(data[k]);}}} else if(data.constructor===Array) {clone=[];for(var i=0;i<data.length;i++) {clone.push(this.cloneData(data[i]));}} else {clone=data;} return clone;};jamUtils.mergeData=function(data,defaultData) {for(var k in defaultData) {if(defaultData.hasOwnProperty(k)) {if(k in data) {if((defaultData[k]!==null)&&(defaultData[k].constructor===Object)) {data[k]=this.mergeData(data[k],defaultData[k]);}} else {data[k]=this.cloneData(defaultData[k]);}}} return data;};var jsonCustomOptionsStringKey="jsonCustomOptions";jamUtils.getCustomOptions=function(signature,defaultOptions) {var saveMeaningfulIds=jamEngine.meaningfulIds;var saveParseFriendly=jamEngine.parseFriendly;jamEngine.meaningfulIds=true;jamEngine.parseFriendly=false;try {var resultObj=jamEngine.classIdAndActionDescriptorToJson(jamEngine.uniIdStrToId(signature),app.getCustomOptions(signature));var customOptions=jamJSON.parse(resultObj["<descriptor>"][jsonCustomOptionsStringKey]["<string>"],true)} catch(e) {var customOptions={};} jamEngine.meaningfulIds=saveMeaningfulIds;jamEngine.parseFriendly=saveParseFriendly;return this.mergeData(customOptions,defaultOptions);};jamUtils.putCustomOptions=function(signature,customOptions,persistent) {var descriptorObj={};descriptorObj[jsonCustomOptionsStringKey]=["<string>",jamJSON.stringify(customOptions)];app.putCustomOptions(signature,jamEngine.jsonToActionDescriptor(descriptorObj),persistent);};jamUtils.eraseCustomOptions=function(signature) {app.eraseCustomOptions(signature);};jamUtils.dataToHexaString=function(dataString,lowercase) {var hexaDigits=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"];var hexaString="";var length=dataString.length;for(var index=0;index<length;index++) {var dataByte=dataString.charCodeAt(index);if((dataByte>=0x00)&&(dataByte<=0xFF)) {hexaString+=hexaDigits[(dataByte&0xF0)>>4]+hexaDigits[dataByte&0x0F];} else {throw new Error("[jamUtils.dataToHexaString] Invalid data string");}} if(lowercase) {hexaString=hexaString.toLowerCase();} return hexaString;};jamUtils.hexaToDataString=function(hexaString) {var dataString="";var length=hexaString.length;if(((length%2)===0)&&(/^[0-9A-Fa-f]*$/.test(hexaString))) {for(var index=0;index<length;index+=2) {var byteString=hexaString.slice(index,index+2);dataString+=String.fromCharCode(parseInt(byteString,16));}} else {throw new Error("[jamUtils.hexaToDataString] Invalid hexa string");} return dataString;};}());}

//------------------------------------------------------------------------------

var signature = "json-action-manager-get-nearest-book-color-options";

var presetsFolderName = app.path + '/' + Folder.encode (localize ("$$$/ApplicationPresetsFolder/Presets=Presets"));
var deltaEMethods =
[
	"CIE 1976",
	"CIE 1994 (Graphics Arts)",
	"CIE 1994 (Textiles)",
	"-",
	"CMC (2:1)",
	"CMC (1:1)"
];
var defaultOptions =
{
	colorBooksFolderName: null,
	colorBookFileName: "",
	rgbColor: [ 0, 0, 0 ],
	deltaEMethod: deltaEMethods[0]
};

var colorBooksFolder = null;
var colorBookFile = null;
var acbFiles = null;
var rgbColor = null;
var labColor = null;
var labColors = null;
var bookColor = [ 0, 0, 0 ];
var colorBookColors = null;
var deltaEfunction = null;

//------------------------------------------------------------------------------

// <https://en.wikipedia.org/wiki/Color_difference>
// <http://www.colorwiki.com/wiki/Delta_E:_The_Color_Difference>
// <http://zschuessler.github.io/DeltaE/learn/>
// <http://www.brucelindbloom.com/index.html?Eqn_DeltaE_CIE76.html>
// <http://www.brucelindbloom.com/index.html?Eqn_DeltaE_CIE94.html>
// <http://www.brucelindbloom.com/index.html?Eqn_DeltaE_CMC.html>
// <http://www.easyrgb.com/index.php?X=DELT>

//------------------------------------------------------------------------------

function deltaE76 (labColor1, labColor2)
{
	//	Simple, fast Euclidean distance
	var deltaL = labColor1[0] - labColor2[0];
	var deltaA = labColor1[1] - labColor2[1];
	var deltaB = labColor1[2] - labColor2[2];
	return Math.sqrt ((deltaL * deltaL) + (deltaA * deltaA) + (deltaB * deltaB));
}

function deltaE94 (labColor1, labColor2, textiles)
{
	var k1 = (textiles) ? 0.048 : 0.045;
	var k2 = (textiles) ? 0.014 : 0.015;
	var kL = (textiles) ? 2 : 1;
	var kC = 1;
	var kH = 1;
	var deltaL = labColor1[0] - labColor2[0];
	var deltaA = labColor1[1] - labColor2[1];
	var deltaB = labColor1[2] - labColor2[2];
	var c1 = Math.sqrt ((labColor1[1] * labColor1[1]) + (labColor1[2] * labColor1[2]));
	var c2 = Math.sqrt ((labColor2[1] * labColor2[1]) + (labColor2[2] * labColor2[2]));
	var deltaC = c1 - c2;
	var deltaH2 = (deltaA * deltaA) + (deltaB * deltaB) - (deltaC * deltaC);
	var deltaH = (deltaH2 > 0) ? Math.sqrt (deltaH2) : 0;
	var sL = 1;
	var sC = 1 + (k1 * c1);
	var sH = 1 + (k2 * c1);
	var vL = deltaL / (kL * sL);
	var vC = deltaC / (kC * sC);
	var vH = deltaH / (kH * sH);
	return Math.sqrt ((vL * vL) + (vC * vC) + (vH * vH));
}

function deltaE94GraphicArts (labColor1, labColor2)
{
	return deltaE94 (labColor1, labColor2, false);
}

function deltaE94Textiles (labColor1, labColor2)
{
	return deltaE94 (labColor1, labColor2, true);
}

function deltaECMC (labColor1, labColor2, lightness, chroma)
{
	// Note: CMC l:c is designed to be used with D65 and the CIE Supplementary Observer (Wikipedia).
	// However, Photoshop uses D50 for Lab...
	var deltaL = labColor1[0] - labColor2[0];
	var deltaA = labColor1[1] - labColor2[1];
	var deltaB = labColor1[2] - labColor2[2];
	var c1 = Math.sqrt ((labColor1[1] * labColor1[1]) + (labColor1[2] * labColor1[2]));
	var c2 = Math.sqrt ((labColor2[1] * labColor2[1]) + (labColor2[2] * labColor2[2]));
	var deltaC = c1 - c2;
	var deltaH2 = (deltaA * deltaA) + (deltaB * deltaB) - (deltaC * deltaC);
	var deltaH = (deltaH2 > 0) ? Math.sqrt (deltaH2) : 0;
	var h1 = Math.atan2 (labColor1[2], labColor1[1]) * 180 / Math.PI;
	if (h1 < 0)
	{
		h1 += 360;
	}
	var t = ((h1 >= 164) && (h1 <= 345)) ?
				0.56 + Math.abs (0.2 * Math.cos ((h1 + 168) * Math.PI / 180)) :
				0.36 + Math.abs (0.4 * Math.cos ((h1 + 35) * Math.PI / 180));
	var c4 = c1 * c1 * c1 * c1;
	var f = Math.sqrt (c4 / (c4 + 1900));
	var sL = (labColor1[0] < 16) ? 0.511 : (0.040975 * labColor1[0]) / (1 + (0.01765 * labColor1[0]));
	var sC = ((0.0638 * c1) / (1 + (0.0131 * c1))) + 0.638;
	var sH = sC * ((f * t) + 1 - f);
	var vL = deltaL / (lightness * sL);
	var vC = deltaC / (chroma * sC);
	var vH = deltaH / sH;
	return Math.sqrt ((vL * vL) + (vC * vC) + (vH * vH));
}

function deltaECMC21 (labColor1, labColor2)
{
	return deltaECMC (labColor1, labColor2, 2, 1);
}

function deltaECMC11 (labColor1, labColor2)
{
	return deltaECMC (labColor1, labColor2, 1, 1);
}

//------------------------------------------------------------------------------

function nearestLabColor (refLabColor, labColors, deltaEFunction)
{
	var minDeltaE = Number.MAX_VALUE;
	var nearestColor = null;
	for (var i = 0; i < labColors.length; i++)
	{
		var labColor = labColors[i];
		var deltaE = deltaEFunction (refLabColor, labColor);
		if (deltaE < minDeltaE)
		{
			nearestColor = { };
			nearestColor["deltaE"] = minDeltaE = deltaE;
			nearestColor["index"] = i;
		}
	}
	return nearestColor;
}

//------------------------------------------------------------------------------
// When converting to and from Lab, a and b component values are slighly off 
// and must be fixed to match color picker values.
// Cf. <http://www.rags-int-inc.com/PhotoTechStuff/ColorCalculator/>
// and <http://www.rags-int-inc.com/PhotoTechStuff/ColorCalculator/AdobeMath.html>
//------------------------------------------------------------------------------

// Conversion to Lab

function rgbToLab (rgbColor)
{
	var solidColor = new SolidColor ();
	solidColor.rgb.red = rgbColor[0];
	solidColor.rgb.green = rgbColor[1];
	solidColor.rgb.blue = rgbColor[2];
	return [ solidColor.lab.l, (solidColor.lab.a + 0.5) * 256 / 255, (solidColor.lab.b + 0.5) * 256 / 255 ];
}
function cmykToLab (cmykColor)
{
	var solidColor = new SolidColor ();
	solidColor.cmyk.cyan = cmykColor[0];
	solidColor.cmyk.magenta = cmykColor[1];
	solidColor.cmyk.yellow = cmykColor[2];
	solidColor.cmyk.black = cmykColor[3];
	return [ solidColor.lab.l, (solidColor.lab.a + 0.5) * 256 / 255, (solidColor.lab.b + 0.5) * 256 / 255 ];
}
function hsbToLab (hsbColor)
{
	var solidColor = new SolidColor ();
	solidColor.hsb.hue = hsbColor[0];
	solidColor.hsb.saturation = hsbColor[1];
	solidColor.hsb.brightness = hsbColor[2];
	return [ solidColor.lab.l, (solidColor.lab.a + 0.5) * 256 / 255, (solidColor.lab.b + 0.5) * 256 / 255 ];
}

// Conversion to RGB

function cmykToRgb (cmykColor)
{
	var solidColor = new SolidColor ();
	solidColor.cmyk.cyan = cmykColor[0];
	solidColor.cmyk.magenta = cmykColor[1];
	solidColor.cmyk.yellow = cmykColor[2];
	solidColor.cmyk.black = cmykColor[3];
	return [ solidColor.rgb.red, solidColor.rgb.green, solidColor.rgb.blue ];
}
function hsbToRgb (hsbColor)
{
	var solidColor = new SolidColor ();
	solidColor.hsb.hue = hsbColor[0];
	solidColor.hsb.saturation = hsbColor[1];
	solidColor.hsb.brightness = hsbColor[2];
	return [ solidColor.rgb.red, solidColor.rgb.green, solidColor.rgb.blue ];
}
function labToRgb (labColor)
{
	var solidColor = new SolidColor ();
	solidColor.lab.l = labColor[0];
	solidColor.lab.a = (labColor[1] * 255 / 256) - 0.5;
	solidColor.lab.b = (labColor[2] * 255 / 256) - 0.5;
	return [ solidColor.rgb.red, solidColor.rgb.green, solidColor.rgb.blue ];
}

//------------------------------------------------------------------------------

function getRgbColor (color)
{
	var rgbColor = "[ 0, 0, 0 ]";
	if ("C" in color)
	{
		rgbColor = cmykToRgb ([ color["C"], color["M"], color["Y"], color["K"] ]);
	}
	else if ("L" in color)
	{
		rgbColor = labToRgb ([ color["L"], color["a"], color["b"] ]);
	}
	else if ("R" in color)
	{
		rgbColor = [ color["R"], color["G"], color["B"] ];
	}
	return rgbColor;
}

//------------------------------------------------------------------------------

function makeInfoString (color)
{
	var infoString = "";
	if ("C" in color)
	{
		infoString =
			"C: " + Math.round (color["C"]) + ",  " +
			"M: " + Math.round (color["M"]) + ",  " +
			"Y: " + Math.round (color["Y"]) + ",  " +
			"K: " + Math.round (color["K"]);
	}
	else if ("L" in color)
	{
		infoString = "L: " + Math.round (color["L"]) + ",  a: " + Math.round (color["a"]) + ",  b: " + Math.round (color["b"]);
	}
	else if ("R" in color)
	{
		infoString = "R: " + Math.round (color["R"]) + ",  G: " + Math.round (color["G"]) + ",  B: " + Math.round (color["B"]);
	}
	return infoString;
}

//------------------------------------------------------------------------------

function createSlider (parent, label, start, min, max, reset, step, digits, characters, onChange, suffix)
{
	function toFixed (num, digits)
	{
		return (digits > 0) ? num.toFixed (digits) : num.toString ();	// To avoid "-0"
	}
	function updateTextBox ()
	{
		var value = Math.round (sliderGroup.data.slider.value) * step;
		sliderGroup.data.textBox.text = (((min * max) < 0) && (value > 0) ? "+" : "") + toFixed (value, digits);
		sliderGroup.data.value = Number (sliderGroup.data.textBox.text);
	}
	function updateSlider ()
	{
		sliderGroup.data.slider.value = Number (sliderGroup.data.textBox.text) / step;
	}
	function resetSlider (event)
	{
		if (event.detail === 2) // detail = 1 : simple click, 2 : double-click
		{
			sliderGroup.data.slider.notify ('change');
			sliderGroup.data.slider.value = reset / step;
			sliderGroup.data.textBox.notify ();	// ??
		}
	}
	var sliderGroup = parent.add ('group');
	sliderGroup.alignChildren = [ "fill", "center" ];
	sliderGroup.data = { };
	var labelText = sliderGroup.add ('statictext', undefined, label);
	labelText.addEventListener ('click', resetSlider);
	sliderGroup.data.label = label;
	sliderGroup.data.slider = sliderGroup.add ('slider', undefined, start / step, min / step, max / step);
	sliderGroup.data.slider.minimumSize = [ 256, -1 ];
	sliderGroup.data.textBox = sliderGroup.add ('edittext', undefined, start.toFixed (digits));
	sliderGroup.data.textBox.characters = characters;
	updateTextBox ();
	if (suffix)
	{
		sliderGroup.add ('statictext', undefined, suffix);
	}
	sliderGroup.data.slider.onChange = sliderGroup.data.slider.onChanging = function ()
	{
		updateTextBox ();
		if (onChange) onChange ();
	};
	sliderGroup.data.textBox.onChange = sliderGroup.data.textBox.onChanging = function ()
	{
		var error = null;
		var value = Number (sliderGroup.data.textBox.text);
		if (isNaN (value))
		{
			error = "A number between " + min.toFixed (digits) + " and " + max.toFixed (digits) + " is required. Previous value inserted.";
			value = sliderGroup.data.value;
		}
		else if (value < min)
		{
			error = "A number between " + min.toFixed (digits) + " and " + max.toFixed (digits) + " is required. Closest value inserted.";
			value = min;
		}
		else if (value > max)
		{
			error = "A number between " + min.toFixed (digits) + " and " + max.toFixed (digits) + " is required. Closest value inserted.";
			value = max;
		}
		sliderGroup.data.textBox.text = (((min * max) < 0) && (value > 0) ? "+" : "") + value.toFixed (digits);
		sliderGroup.data.value = Number (sliderGroup.data.textBox.text);
		updateSlider ();
		if (error)
		{
			alert (error);
		}
		if (onChange) onChange ();
	};
	return sliderGroup;
}

//------------------------------------------------------------------------------

function displayDialog ()
{
	function updateBook ()
	{
		if (colorBooksFolder && colorBooksFolder.exists)
		{
			dialog.folderName.text = File.decode (colorBooksFolder.name);
			dialog.folderName.helpTip = colorBooksFolder.fsName;
			dialog.booksMenu.removeAll ();
			dialog.booksMenu.enabled = true;
			for (var i = 0; i < acbFiles.length; i++)
			{
				dialog.booksMenu.add ('item', File.decode (acbFiles[i].name));
			}
			if (colorBookFile && colorBookFile.exists)
			{
				dialog.booksMenu.selection = dialog.booksMenu.find (File.decode (colorBookFile.name)) || 0;
				dialog.bookName.text = colorBookColors["bookName"];
			}
			else
			{
				dialog.booksMenu.enabled = false;
				dialog.booksMenu.selection = null;
				dialog.bookName.text = "";
				dialog.bookName.enabled = false;
			}
		}
		else
		{
			dialog.booksMenu.enabled = false;
			dialog.booksMenu.selection = null;
		}
	}
	var dialog = new Window ('dialog', "Get Nearest Book Color");
	dialog.orientation = "column";
	var folderGroup = dialog.add ('group');
	folderGroup.alignment = [ "fill", "center" ];
	folderGroup.orientation = "row";
	folderGroup.alignChildren = [ "fill", "center" ];
	folderGroup.add ('statictext', undefined, "Folder:");
	dialog.folderName = folderGroup.add ('edittext', undefined, "", { readonly: true });
	dialog.folderName.characters = 35;
	var chooseFolderButton = folderGroup.add ('button', undefined, "Choose...");
	chooseFolderButton.helpTip = "Choose a color books folder";
	chooseFolderButton.onClick = function ()
	{
		var presetFolder = colorBooksFolder.exists ? colorBooksFolder : new Folder (presetsFolderName);
		var inFolder = presetFolder.selectDlg ("Choose a color books folder:");
		if (inFolder !== null)
		{
			colorBooksFolder = inFolder;
			acbFiles = colorBooksFolder.getFiles ("*.acb");
			colorBookFile = (acbFiles.length > 0) ? acbFiles[0] : null;
			updateBook ();
		}
	};
	var menusGroup = dialog.add ('group');
	menusGroup.alignment = [ "fill", "center" ];
	menusGroup.orientation = "row";
	menusGroup.add ('statictext', undefined, "Color Book File:");
	dialog.booksMenu = menusGroup.add ('dropdownlist');
	dialog.booksMenu.helpTip = "Select a color book file";
	dialog.booksMenu.alignment = [ "fill", "center" ];
	dialog.booksMenu.onChange = function ()
	{
		colorBookFile = new File (colorBooksFolder + '/' + File.encode (this.selection.text));
		colorBookColors = (colorBookFile.exists) ? jamBooks.getColorBookFileColors (colorBookFile) : null;
		if (colorBookColors)
		{
			labColors = [ ];
			var colors = colorBookColors["bookColors"];
			var colorCount = colors.length;
			dialog.colorCount.text = "Colors: " + colorCount;
			for (var i = 0; i < colorCount; i++)
			{
				var color = colors[i]["color"];
				if ("C" in color)
				{
					labColors.push (cmykToLab ([ color["C"], color["M"], color["Y"], color["K"] ]));
				}
				else if ("L" in color)
				{
					labColors.push ([ color["L"], color["a"], color["b"] ]);
				}
				else if ("R" in color)
				{
					labColors.push (rgbToLab ([ color["R"], color["G"], color["B"] ]));
				}
			}
			var nearestColor = nearestLabColor (labColor, labColors, deltaEFunction);
			if (nearestColor)
			{
				var index = nearestColor["index"];
				var deltaE = nearestColor["deltaE"];
				dialog.colorName.text = colors[index]["name"];
				dialog.deltaE.text = "∆E: " + deltaE.toFixed (2);
				dialog.colorInfo.text = makeInfoString (colors[index]["color"]);
				bookColor = getRgbColor (colors[index]["color"]);
				bookColorSwatch.helpTip = makeInfoString ({ "L": labColors[index][0], "a": labColors[index][1], "b": labColors[index][2] });
				bookColorSwatch.notify ("onDraw");
			}
			dialog.bookName.text = colorBookColors["bookName"];
		}
	};
	dialog.colorCount = menusGroup.add ('statictext');
	dialog.colorCount.alignment = [ "right", "center" ];
	dialog.colorCount.characters = 12;
	dialog.colorCount.justify = "center";	// "right"
	dialog.deltaGroup = dialog.add ('group');
	dialog.deltaGroup.alignment = [ "fill", "center" ];
	dialog.deltaGroup.add ('statictext', undefined, "Color Difference Method:");
	dialog.deltaEMethodMenu = dialog.deltaGroup.add ('dropdownlist', undefined, deltaEMethods);
	dialog.deltaEMethodMenu.helpTip = "Select the color difference (Delta E) method";
	dialog.deltaEMethodMenu.onChange = function ()
	{
		switch (this.selection.text)
		{
			case "CIE 1976":
			default:
				deltaEFunction = deltaE76;
				break;
			case "CIE 1994 (Graphics Arts)":
				deltaEFunction = deltaE94GraphicArts;
				break;
			case "CIE 1994 (Textiles)":
				deltaEFunction = deltaE94Textiles;
				break;
			case "CMC (2:1)":
				deltaEFunction = deltaECMC21;
				break;
			case "CMC (1:1)":
				deltaEFunction = deltaECMC11;
				break;
		}
		onRGBChange ();
	};
	dialog.deltaEMethodMenu.selection = dialog.deltaEMethodMenu.find (customOptions.deltaEMethod) || 0;
	dialog.deltaE = dialog.deltaGroup.add ('statictext');
	dialog.deltaE.characters = 10;
	dialog.deltaE.alignment = [ "right", "center" ];
	dialog.deltaE.justify = "left";
	rgbColor = customOptions.rgbColor;
	labColor = rgbToLab (rgbColor);
	var rgbPanel = dialog.add ('panel');
	rgbPanel.orientation = "row";
	rgbPanel.alignment = [ "fill", "center" ];
	rgbPanel.alignChildren = [ "right", "center" ];
	rgbPanel.spacing = 16;
	var slidersGroup = rgbPanel.add ('group');
	slidersGroup.orientation = "column";
	slidersGroup.justify = "right";
	slidersGroup.alignChildren = [ "right", "center" ];
	function onRGBChange ()
	{
		rgbColor = [ redSlider.data.value, greenSlider.data.value, blueSlider.data.value ];
		labColor = rgbToLab (rgbColor);
		rgbSwatch.helpTip = makeInfoString ({ "L": labColor[0], "a": labColor[1], "b": labColor[2] });
		rgbSwatch.notify ("onDraw");
		var colors = colorBookColors["bookColors"];
		var nearestColor = nearestLabColor (labColor, labColors, deltaEFunction);
		if (nearestColor)
		{
			var index = nearestColor["index"];
			var deltaE = nearestColor["deltaE"];
			dialog.colorName.text = colors[index]["name"];
			dialog.deltaE.text = "∆E: " + deltaE.toFixed (2);
			dialog.colorInfo.text = makeInfoString (colors[index]["color"]);
			bookColor = getRgbColor (colors[index]["color"]);
			bookColorSwatch.helpTip = makeInfoString ({ "L": labColors[index][0], "a": labColors[index][1], "b": labColors[index][2] });
			bookColorSwatch.notify ("onDraw");
		}
	}
	var redSlider = createSlider (slidersGroup, "Red:", rgbColor[0], 0, 255, 0, 1, 0, 3, onRGBChange);
	var greenSlider = createSlider (slidersGroup, "Green:", rgbColor[1], 0, 255, 0, 1, 0, 3, onRGBChange);
	var blueSlider = createSlider (slidersGroup, "Blue:", rgbColor[2], 0, 255, 0, 1, 0, 3, onRGBChange);
	var rgbSwatchPanel = rgbPanel.add ('panel', undefined, undefined, { borderStyle: "sunken" });
	rgbSwatchPanel.margins = [ 0, 0, 0, 0 ];
	var rgbSwatch = rgbSwatchPanel.add ('customview');
	rgbSwatch.size = [ 80, 80 ];
	rgbSwatch.onDraw = function ()
	{
		var g = this.graphics;
		g.newPath ();
		g.rectPath (0, 0, this.size.width, this.size.height);
		g.closePath ();
		g.fillPath (g.newBrush (g.BrushType.SOLID_COLOR, [ rgbColor[0] / 255, rgbColor[1] / 255, rgbColor[2] / 255, 1 ]));
	};
	rgbSwatch.helpTip = makeInfoString ({ "L": labColor[0], "a": labColor[1], "b": labColor[2] });
	var bookPanel = dialog.add ('panel');
	bookPanel.alignment = [ "fill", "center" ];
	bookPanel.orientation = "row";
	bookPanel.spacing = 16;
	var bookNames = bookPanel.add ('group');
	bookNames.orientation = "column";
	bookNames.alignment = [ "right", "center" ];
	bookNames.spacing = 12;
	var bookGroup = bookNames.add ('group');
	bookGroup.alignment = [ "right", "center" ];
	bookGroup.orientation = "row";
	bookGroup.alignChildren = [ "right", "center" ];
	bookGroup.add ('statictext', undefined, "Book Name:");
	dialog.bookName = bookGroup.add ('edittext', undefined, "", { readonly: true });
	dialog.bookName.characters = 30;
	var colorGroup = bookNames.add ('group');
	colorGroup.alignment = [ "right", "center" ];
	colorGroup.orientation = "row";
	colorGroup.alignChildren = [ "right", "center" ];
	colorGroup.add ('statictext', undefined, "Color Name:");
	dialog.colorName = colorGroup.add ('edittext', undefined, "", { readonly: true });
	dialog.colorName.characters = 30;
	dialog.bookInfoGroup = bookNames.add ('group');
	dialog.bookInfoGroup.alignment = [ "right", "center" ];
	dialog.bookInfoGroup.orientation = "row";
	dialog.colorInfo = dialog.bookInfoGroup.add ('statictext');
	dialog.colorInfo.characters = 30;
	dialog.colorInfo.justify = "right";
	dialog.colorInfo.alignment = [ "right", "center" ];
	var bookColorPanel = bookPanel.add ('panel', undefined, undefined, { borderStyle: "sunken" });
	bookColorPanel.margins = [ 0, 0, 0, 0 ];
	var bookColorSwatch = bookColorPanel.add ('customview');
	bookColorSwatch.size = [ 80, 80 ];
	bookColorSwatch.onDraw = function ()
	{
		var g = this.graphics;
		g.newPath ();
		g.rectPath (0, 0, this.size.width, this.size.height);
		g.closePath ();
		g.fillPath (g.newBrush (g.BrushType.SOLID_COLOR, [ bookColor[0] / 255, bookColor[1] / 255, bookColor[2] / 255, 1 ]));
	};
	var buttonsGroup = dialog.add ('group');
	buttonsGroup.alignment = [ "right", "center" ];
	buttonsGroup.orientation = "row";
	buttonsGroup.alignChildren = "fill";
	var cancelButton = buttonsGroup.add ('button', undefined, 'Cancel', { name: "cancel" });
	cancelButton.onClick = function ()
	{
		dialog.close (false);
	};
	var okButton = buttonsGroup.add ('button', undefined, 'OK', { name: "ok" });
	okButton.onClick = function ()
	{
		customOptions.colorBooksFolderName = colorBooksFolder.fsName;
		customOptions.colorBookFileName = dialog.booksMenu.selection.text;
		customOptions.rgbColor = rgbColor;
		customOptions.deltaEMethod = dialog.deltaEMethodMenu.selection.text;
		dialog.close (true);
	};
	dialog.onShow = function ()
	{
		colorBooksFolder = new Folder (customOptions.colorBooksFolderName);
		if (!colorBooksFolder.exists)
		{
			colorBooksFolder = new Folder (presetsFolderName);
		}
		if (customOptions.colorBookFileName)
		{
			colorBookFile = new File (colorBooksFolder + '/' + File.encode (customOptions.colorBookFileName));
		}
		acbFiles = colorBooksFolder.getFiles ("*.acb");
		updateBook ();
	};
	dialog.center ();
	return dialog.show ();
}

//------------------------------------------------------------------------------

var appVersion = parseInt (app.version);
if (appVersion >= 10)	// CS3
{
	var customOptions = jamUtils.getCustomOptions (signature, defaultOptions);
	if (displayDialog ())
	{
		jamUtils.putCustomOptions (signature, customOptions, true);
	}
}
else
{
	alert ("Sorry, this script requires Photoshop CS3 or later.");
}

//------------------------------------------------------------------------------

