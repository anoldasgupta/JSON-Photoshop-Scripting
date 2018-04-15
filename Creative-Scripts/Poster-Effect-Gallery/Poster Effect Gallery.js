/*

<javascriptresource>
<name>Poster Effect Gallery...</name>
<about>"Poster Effect Gallery" v1.4

Apply a color posterization effect on an existing image.

Creative script using the "JSON Action Manager" scripting library.
© 2015-2016 Michel MARIANI.
</about>
<menu>automate</menu>
<category>JSON Action Manager Special Effects</category>
<enableinfo>in (PSHOP_ImageMode, RGBMode, RGB48Mode) || (in (PSHOP_ImageMode, GrayScaleMode, Gray16Mode) &amp;&amp; (PSHOP_NumTrueChannels >= 3))</enableinfo>
</javascriptresource>

*/

//------------------------------------------------------------------------------
// File: Poster Effect Gallery.js
// Version: 1.4
// Release Date: 2016-03-22
// Copyright: © 2015-2016 Michel MARIANI <http://www.tonton-pixel.com/blog/>
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
//  1.4:
//  - Added possibility of defining a contour using low and high expand values 
//    for transparency mask.
//  - Added more presets.
//  1.3:
//  - Improved grayscale conversion.
//  - Added equalize in pre-process.
//  1.2:
//  - Fixed numerical glitch in sliders.
//  - Deferred saving transparency after pre-process and grayscale conversion.
//  1.1:
//  - Used new version 4.4.4 of jamEngine scripting library module.
//  - Fixed incorrect handling of patterns file binary string.
//  - Improved syntax for global options and masks.
//  1.0:
//  - Initial release.
//------------------------------------------------------------------------------

// jamEngine.jsxinc v4.4.4 (minified)
if(typeof jamEngine!=='object') {var jamEngine={};(function() {var that;jamEngine.meaningfulIds=false;jamEngine.parseFriendly=false;jamEngine.displayDialogs=DialogModes.ERROR;var conflictingStringIdStrs={"'Algn'":["align","alignment"],"'AntA'":["antiAlias","antiAliasedPICTAcquire"],"'BckL'":["backgroundLayer","backgroundLevel"],"'BlcG'":["blackGenerationType","blackGenerationCurve"],"'BlcL'":["blackLevel","blackLimit"],"'Blks'":["blacks","blocks"],"'BlrM'":["blurMethod","blurMore"],"'BrgC'":["brightnessEvent","brightnessContrast"],"'BrsD'":["brushDetail","brushesDefine"],"'Brsh'":["brush","brushes"],"'Clcl'":["calculation","calculations"],"'ClrP'":["colorPalette","coloredPencil"],"'Cnst'":["constant","constrain"],"'CntC'":["centerCropMarks","conteCrayon"],"'Cntr'":["center","contrast"],"'CrtD'":["createDroplet","createDuplicate"],"'CstP'":["customPalette","customPhosphors"],"'Cstm'":["custom","customPattern"],"'Drkn'":["darken","darkness"],"'Dstr'":["distort","distortion","distribute","distribution"],"'Dstt'":["desaturate","destWhiteMax"],"'FlIn'":["fileInfo","fillInverse"],"'Gd  '":["good","guide"],"'GnrP'":["generalPreferences","generalPrefs","preferencesClass"],"'GrSt'":["grainStippled","graySetup"],"'Grdn'":["gradientClassEvent","gridMinor"],"'Grn '":["grain","green"],"'Grns'":["graininess","greens"],"'HstP'":["historyPreferences","historyPrefs"],"'HstS'":["historyState","historyStateSourceType"],"'ImgP'":["imageCachePreferences","imagePoint"],"'In  '":["in","stampIn"],"'IntW'":["interfaceWhite","intersectWith"],"'Intr'":["interfaceIconFrameDimmed","interlace","interpolation","intersect"],"'JPEG'":["JPEG","JPEGFormat"],"'LghD'":["lightDirection","lightDirectional"],"'LghO'":["lightOmni","lightenOnly"],"'LghS'":["lightSource","lightSpot"],"'Lns '":["lens","lines"],"'Mgnt'":["magenta","magentas"],"'MrgL'":["mergeLayers","mergedLayers"],"'Mxm '":["maximum","maximumQuality"],"'NTSC'":["NTSC","NTSCColors"],"'NmbL'":["numberOfLayers","numberOfLevels"],"'PlgP'":["pluginPicker","pluginPrefs"],"'Pncl'":["pencilEraser","pencilWidth"],"'Pnt '":["paint","point"],"'Prsp'":["perspective","perspectiveIndex"],"'PrvM'":["previewMacThumbnail","previewMagenta"],"'Pstr'":["posterization","posterize"],"'RGBS'":["RGBSetup","RGBSetupSource"],"'Rds '":["radius","reds"],"'ScrD'":["scratchDisks","screenDot"],"'ShdI'":["shadingIntensity","shadowIntensity"],"'ShpC'":["shapeCurveType","shapingCurve"],"'ShrE'":["sharpenEdges","shearEd"],"'Shrp'":["sharpen","sharpness"],"'SplC'":["splitChannels","supplementalCategories"],"'Spot'":["spot","spotColor"],"'SprS'":["separationSetup","sprayedStrokes"],"'StrL'":["strokeLength","strokeLocation"],"'Strt'":["saturation","start"],"'TEXT'":["char","textType"],"'TIFF'":["TIFF","TIFFFormat"],"'TglO'":["toggleOptionsPalette","toggleOthers"],"'TrnG'":["transparencyGamutPreferences","transparencyGrid","transparencyGridSize"],"'TrnS'":["transferSpec","transparencyShape","transparencyStop"],"'Trns'":["transparency","transparent"],"'TxtC'":["textClickPoint","textureCoverage"],"'TxtF'":["textureFile","textureFill"],"'UsrM'":["userMaskEnabled","userMaskOptions"],"'c@#^'":["inherits","pInherits"],"'comp'":["comp","sInt64"],"'doub'":["floatType","IEEE64BitFloatingPoint","longFloat"],"'long'":["integer","longInteger","sInt32"],"'magn'":["magnitude","uInt32"],"'null'":["null","target"],"'shor'":["sInt16","sMInt","shortInteger"],"'sing'":["IEEE32BitFloatingPoint","sMFloat","shortFloat"]};jamEngine.getConflictingStringIdStrs=function(charIdStr) {return conflictingStringIdStrs[charIdStr]||null;};jamEngine.uniIdStrToId=function(uniIdStr) {var id=0;if(typeof uniIdStr==='string') {if((uniIdStr.length===(1+4+1))&&(uniIdStr.charAt(0)==="'")&&(uniIdStr.charAt(5)==="'")) {id=app.charIDToTypeID(uniIdStr.substring(1,5));} else {id=app.stringIDToTypeID(uniIdStr);}} return id;};var smallestHashValue=app.charIDToTypeID("    ");jamEngine.idToUniIdStrs=function(id) {var charIdStr="";var stringIdStr=app.typeIDToStringID(id);if(id>=smallestHashValue) {charIdStr="'"+app.typeIDToCharID(id)+"'";if(stringIdStr!=="") {if(charIdStr in conflictingStringIdStrs) {stringIdStr=conflictingStringIdStrs[charIdStr];}}} return[charIdStr,stringIdStr];};jamEngine.equivalentUniIdStrs=function(uniIdStr1,uniIdStr2) {return this.uniIdStrToId(uniIdStr1)===this.uniIdStrToId(uniIdStr2);};function putInReference(ref,containers) {if(containers.constructor===Array) {var count=containers.length;for(var i=0;i<count;i++) {var container=that.parseCompact(containers[i]);var desiredClassId=that.uniIdStrToId(container[0]);var typedValue=that.parseCompact(container[1]);var form=typedValue[0];var value=typedValue[1];switch(form) {case"<class>":ref.putClass(desiredClassId);break;case"<enumerated>":var enumerated=that.parseCompact(value);ref.putEnumerated(desiredClassId,that.uniIdStrToId(enumerated[0]),that.uniIdStrToId(enumerated[1]));break;case"<identifier>":ref.putIdentifier(desiredClassId,value);break;case"<index>":ref.putIndex(desiredClassId,value);break;case"<name>":ref.putName(desiredClassId,value);break;case"<offset>":ref.putOffset(desiredClassId,value);break;case"<property>":ref.putProperty(desiredClassId,that.uniIdStrToId(value));break;default:throw new Error("[jamEngine putInReference] Unknown reference form: "+form);break;}}} else {throw new Error("[jamEngine putInReference] JavaScript array expected");}} function putInList(list,items) {if(items.constructor===Array) {var count=items.length;for(var i=0;i<count;i++) {var item=that.parseCompact(items[i]);var type=item[0];var value=item[1];switch(type) {case"<boolean>":list.putBoolean(value);break;case"<class>":list.putClass(that.uniIdStrToId(value));break;case"<data>":list.putData(value);break;case"<double>":list.putDouble(value);break;case"<enumerated>":var enumerated=that.parseCompact(value);list.putEnumerated(that.uniIdStrToId(enumerated[0]),that.uniIdStrToId(enumerated[1]));break;case"<integer>":list.putInteger(value);break;case"<largeInteger>":list.putLargeInteger(value);break;case"<list>":var actionList=new ActionList();putInList(actionList,value);list.putList(actionList);break;case"<object>":var object=that.parseCompact(value);if(object[1]) {var actionDescriptor=new ActionDescriptor();putInDescriptor(actionDescriptor,object[1]);list.putObject(that.uniIdStrToId(object[0]),actionDescriptor);} else {list.putClass(that.uniIdStrToId(object[0]));} break;case"<path>":var fileRef=new File(value);list.putPath(fileRef);break;case"<reference>":var actionReference=new ActionReference();putInReference(actionReference,value);list.putReference(actionReference);break;case"<string>":list.putString(value);break;case"<unitDouble>":var unitDouble=that.parseCompact(value);list.putUnitDouble(that.uniIdStrToId(unitDouble[0]),unitDouble[1]);break;default:throw new Error("[jamEngine putInList] Unknown list type: "+type);break;}}} else {throw new Error("[jamEngine putInList] JavaScript array expected");}} function putInDescriptor(desc,members) {if(members.constructor===Object) {for(var key in members) {if(members.hasOwnProperty(key)) {var keyID=that.uniIdStrToId(key);var member=that.parseCompact(members[key]);var type=member[0];var value=member[1];switch(type) {case"<boolean>":desc.putBoolean(keyID,value);break;case"<class>":desc.putClass(keyID,that.uniIdStrToId(value));break;case"<data>":desc.putData(keyID,value);break;case"<double>":desc.putDouble(keyID,value);break;case"<enumerated>":var enumerated=that.parseCompact(value);desc.putEnumerated(keyID,that.uniIdStrToId(enumerated[0]),that.uniIdStrToId(enumerated[1]));break;case"<integer>":desc.putInteger(keyID,value);break;case"<largeInteger>":desc.putLargeInteger(keyID,value);break;case"<list>":var actionList=new ActionList();putInList(actionList,value);desc.putList(keyID,actionList);break;case"<object>":var object=that.parseCompact(value);if(object[1]) {var actionDescriptor=new ActionDescriptor();putInDescriptor(actionDescriptor,object[1]);desc.putObject(keyID,that.uniIdStrToId(object[0]),actionDescriptor);} else {desc.putClass(keyID,that.uniIdStrToId(object[0]));} break;case"<path>":var fileRef=new File(value);desc.putPath(keyID,fileRef);break;case"<reference>":var actionReference=new ActionReference();putInReference(actionReference,value);desc.putReference(keyID,actionReference);break;case"<string>":desc.putString(keyID,value);break;case"<unitDouble>":var unitDouble=that.parseCompact(value);desc.putUnitDouble(keyID,that.uniIdStrToId(unitDouble[0]),unitDouble[1]);break;default:throw new Error("[jamEngine putInDescriptor] Unknown descriptor type: "+type);break;}}}} else {throw new Error("[jamEngine putInDescriptor] JavaScript object expected");}} var contextRules={"'Algn'":{"<classKey>":{"bevelEmboss":"align","frameFX":"align","gradientFill":"align","gradientLayer":"align","patternFill":"align","patternLayer":"align"},"<event>":"align","<key>":"alignment"},"'AntA'":{"<class>":"antiAliasedPICTAcquire","<key>":"antiAlias"},"'BckL'":{"<class>":"backgroundLayer","<key>":"backgroundLevel"},"'BlcG'":{"<enumType>":"blackGenerationType","<key>":"blackGenerationCurve"},"'BlcL'":{"<classKey>":{"'GEfc'":"blackLevel","CMYKSetup":"blackLimit"},"<eventKey>":{"reticulation":"blackLevel"}},"'Blks'":{"<typeValue>":{"colors":"blacks","extrudeType":"blocks"}},"'BlrM'":{"<enumType>":"blurMethod","<event>":"blurMore","<key>":"blurMethod"},"'BrgC'":{"<class>":"brightnessContrast","<event>":"brightnessContrast"},"'BrsD'":{"<enumValue>":"brushesDefine","<key>":"brushDetail"},"'Brsh'":{"<class>":"brush","<key>":"brushes"},"'Clcl'":{"<class>":"calculation","<enumValue>":"calculations","<key>":"calculation"},"'ClrP'":{"<typeValue>":{"'GEft'":"coloredPencil"},"<enumType>":"colorPalette","<event>":"coloredPencil"},"'Cnst'":{"<classKey>":{"channelMatrix":"constant"},"<unknown>":"constrain"},"'CntC'":{"<typeValue>":{"'GEft'":"conteCrayon"},"<event>":"conteCrayon","<key>":"centerCropMarks"},"'Cntr'":{"<classKey>":{"'GEfc'":"contrast","brightnessContrast":"contrast","document":"center","polygon":"center","quadrilateral":"center"},"<eventKey>":{"adaptCorrect":"contrast","brightnessEvent":"contrast","grain":"contrast","halftoneScreen":"contrast","sumie":"contrast","tornEdges":"contrast","waterPaper":"contrast"},"<enumValue>":"center"},"'CrtD'":{"<enumValue>":"createDuplicate","<event>":"createDroplet"},"'CstP'":{"<class>":"customPhosphors","<key>":"customPalette"},"'Cstm'":{"<enumValue>":"customPattern","<event>":"custom","<key>":"custom"},"'Drkn'":{"<enumValue>":"darken","<key>":"darkness"},"'Dstr'":{"<classKey>":{"'GEfc'":"distortion"},"<eventKey>":{"glass":"distortion","addNoise":"distribution"},"<enumType>":"distribution","<enumValue>":"distort","<event>":"distribute"},"'Dstt'":{"<enumValue>":"desaturate","<event>":"desaturate","<key>":"destWhiteMax"},"'FlIn'":{"<typeValue>":{"fillColor":"fillInverse","menuItemType":"fileInfo"},"<class>":"fileInfo","<key>":"fileInfo"},"'Gd  '":{"<class>":"guide","<enumValue>":"good"},"'GnrP'":{"<class>":"preferencesClass","<enumValue>":"generalPreferences","<key>":"generalPrefs"},"'GrSt'":{"<class>":"graySetup","<enumValue>":"grainStippled","<key>":"graySetup"},"'Grdn'":{"<class>":"gradientClassEvent","<event>":"gradientClassEvent","<key>":"gridMinor"},"'Grn '":{"<typeValue>":{"'GEft'":"grain"},"<classKey>":{"'GEfc'":"grain","RGBColor":"green","blackAndWhite":"green","channelMatrix":"green","channelMixer":"green"},"<eventKey>":{"blackAndWhite":"green","channelMixer":"green","filmGrain":"grain"},"<enumValue>":"green","<event>":"grain"},"'Grns'":{"<enumValue>":"greens","<key>":"graininess"},"'HstP'":{"<enumValue>":"historyPreferences","<key>":"historyPrefs"},"'HstS'":{"<class>":"historyState","<enumType>":"historyStateSourceType"},"'ImgP'":{"<class>":"imagePoint","<enumValue>":"imageCachePreferences"},"'In  '":{"<enumValue>":"stampIn","<key>":"in"},"'IntW'":{"<event>":"intersectWith","<key>":"interfaceWhite"},"'Intr'":{"<typeValue>":{"shapeOperation":"intersect"},"<classKey>":{"GIFFormat":"interlace","SaveForWeb":"interlace","application":"interfaceIconFrameDimmed","computedBrush":"interpolation","dBrush":"interpolation","gradientClassEvent":"interpolation","photoshopEPSFormat":"interpolation","sampledBrush":"interpolation"},"<eventKey>":{"convertMode":"interpolation","imageSize":"interpolation","transform":"interpolation"},"<event>":"intersect"},"'JPEG'":{"<class>":"JPEGFormat","<enumValue>":"JPEG"},"'LghD'":{"<enumType>":"lightDirection","<enumValue>":"lightDirectional","<key>":"lightDirection"},"'LghO'":{"<typeValue>":{"diffuseMode":"lightenOnly","lightType":"lightOmni"}},"'LghS'":{"<class>":"lightSource","<enumValue>":"lightSpot","<key>":"lightSource"},"'Lns '":{"<enumType>":"lens","<enumValue>":"lines","<key>":"lens"},"'Mgnt'":{"<typeValue>":{"channel":"magenta","colors":"magentas","guideGridColor":"magenta"},"<key>":"magenta"},"'MrgL'":{"<enumValue>":"mergedLayers","<event>":"mergeLayers"},"'Mxm '":{"<enumValue>":"maximumQuality","<event>":"maximum","<key>":"maximum"},"'NTSC'":{"<enumValue>":"NTSC","<event>":"NTSCColors"},"'NmbL'":{"<classKey>":{"'GEfc'":"numberOfLevels","document":"numberOfLayers"},"<eventKey>":{"cutout":"numberOfLevels"}},"'PlgP'":{"<class>":"pluginPrefs","<enumValue>":"pluginPicker","<key>":"pluginPrefs"},"'Pncl'":{"<enumValue>":"pencilEraser","<key>":"pencilWidth"},"'Pnt '":{"<typeValue>":{"textType":"point"},"<class>":"point","<event>":"paint"},"'Prsp'":{"<enumValue>":"perspective","<key>":"perspectiveIndex"},"'PrvM'":{"<enumValue>":"previewMagenta","<key>":"previewMacThumbnail"},"'Pstr'":{"<class>":"posterize","<event>":"posterize","<key>":"posterization"},"'RGBS'":{"<enumType>":"RGBSetupSource","<key>":"RGBSetup"},"'Rds '":{"<enumValue>":"reds","<key>":"radius"},"'ScrD'":{"<enumValue>":"screenDot","<key>":"scratchDisks"},"'ShdI'":{"<classKey>":{"'GEfc'":"shadowIntensity"},"<eventKey>":{"watercolor":"shadowIntensity"},"<unknown>":"shadingIntensity"},"'ShpC'":{"<classKey>":{"application":"shapingCurve"},"<class>":"shapingCurve","<key>":"shapeCurveType"},"'ShrE'":{"<event>":"sharpenEdges","<key>":"shearEd"},"'Shrp'":{"<event>":"sharpen","<key>":"sharpness"},"'SplC'":{"<event>":"splitChannels","<key>":"supplementalCategories"},"'Spot'":{"<enumValue>":"spotColor","<key>":"spot"},"'SprS'":{"<typeValue>":{"'GEft'":"sprayedStrokes"},"<enumValue>":"separationSetup","<event>":"sprayedStrokes"},"'StrL'":{"<enumType>":"strokeLocation","<key>":"strokeLength"},"'Strt'":{"<classKey>":{"currentToolOptions":"saturation","fileNamingRules":"start","HSBColorClass":"saturation","hueSatAdjustment":"saturation","hueSatAdjustmentV2":"saturation","lineClass":"start","range":"start","vibrance":"saturation"},"<eventKey>":{"replaceColor":"saturation","variations":"saturation","vibrance":"saturation"},"<enumValue>":"saturation"},"'TEXT'":{"<enumType>":"textType","<key>":"textType"},"'TIFF'":{"<class>":"TIFFFormat","<enumValue>":"TIFF"},"'TglO'":{"<enumValue>":"toggleOptionsPalette","<key>":"toggleOthers"},"'TrnG'":{"<classKey>":{"application":"transparencyGrid","transparencyPrefs":"transparencyGridSize"},"<enumType>":"transparencyGridSize","<enumValue>":"transparencyGamutPreferences"},"'TrnS'":{"<classKey>":{"bevelEmboss":"transparencyShape","dropShadow":"transparencyShape","innerGlow":"transparencyShape","innerShadow":"transparencyShape","outerGlow":"transparencyShape"},"<class>":"transparencyStop","<unknown>":"transferSpec"},"'Trns'":{"<enumValue>":"transparent","<key>":"transparency"},"'TxtC'":{"<classKey>":{"'GEfc'":"textureCoverage","textLayer":"textClickPoint"},"<eventKey>":{"underpainting":"textureCoverage"}},"'TxtF'":{"<event>":"textureFill","<key>":"textureFile"},"'UsrM'":{"<enumType>":"userMaskOptions","<key>":"userMaskEnabled"},"'null'":{"<class>":"null","<enumValue>":"null","<event>":"null","<key>":"target"}};function getFromId(context,parentContext) {var uniIdStr;var kind=context[0];var id=context[1];if(id<smallestHashValue) {uniIdStr=app.typeIDToStringID(id);} else {uniIdStr="'"+app.typeIDToCharID(id)+"'";if(that.meaningfulIds) {if(uniIdStr in contextRules) {function resolveIdStr(candidates) {var idStr="";for(var parentString in candidates) {if(candidates.hasOwnProperty(parentString)) {if(parentContext[1]===that.uniIdStrToId(parentString)) {idStr=candidates[parentString];break;}}} return idStr;} var resolvedIdStr="";var rule=contextRules[uniIdStr];if(parentContext) {switch(kind) {case"<key>":if((parentContext[0]==="<class>")&&("<classKey>"in rule)) {resolvedIdStr=resolveIdStr(rule["<classKey>"]);} else if((parentContext[0]==="<event>")&&("<eventKey>"in rule)) {resolvedIdStr=resolveIdStr(rule["<eventKey>"]);} break;case"<enumValue>":if((parentContext[0]==="<enumType>")&&("<typeValue>"in rule)) {resolvedIdStr=resolveIdStr(rule["<typeValue>"]);} break;}} if(resolvedIdStr!=="") {uniIdStr=resolvedIdStr;} else if(kind in rule) {uniIdStr=rule[kind];}} else {var stringIDStr=app.typeIDToStringID(id);if(stringIDStr!=="") {uniIdStr=stringIDStr;}}}} return uniIdStr;} var incompatiblePlatformPath="";var getEventId=app.stringIDToTypeID("get");var targetKeyId=app.stringIDToTypeID("target");var propertyClassId=app.stringIDToTypeID("property");function getFromReference(ref) {var propertyId=0;var arr=[];do {try{var desiredClassId=ref.getDesiredClass();}catch(e){break;} if(propertyId!==0) {var propertyCompact=that.buildCompact("<property>",getFromId(["<key>",propertyId],["<class>",desiredClassId]));arr.push(that.buildCompact(getFromId(["<class>",propertyClassId]),propertyCompact));propertyId=0;} var desiredCompact;var aFormID=ref.getForm();switch(aFormID) {case ReferenceFormType.CLASSTYPE:desiredCompact=that.buildCompact("<class>",null);break;case ReferenceFormType.ENUMERATED:var enumTypeContext=["<enumType>",ref.getEnumeratedType()];var enumValueContext=["<enumValue>",ref.getEnumeratedValue()];desiredCompact=that.buildCompact("<enumerated>",that.buildCompact(getFromId(enumTypeContext),getFromId(enumValueContext,enumTypeContext)));break;case ReferenceFormType.IDENTIFIER:desiredCompact=that.buildCompact("<identifier>",ref.getIdentifier());break;case ReferenceFormType.INDEX:desiredCompact=that.buildCompact("<index>",ref.getIndex());break;case ReferenceFormType.NAME:desiredCompact=that.buildCompact("<name>",ref.getName());break;case ReferenceFormType.OFFSET:desiredCompact=that.buildCompact("<offset>",ref.getOffset());break;case ReferenceFormType.PROPERTY:if(desiredClassId===propertyClassId) {propertyId=ref.getProperty();} else {desiredCompact=that.buildCompact("<property>",getFromId(["<key>",ref.getProperty()],["<class>",desiredClassId]));} break;default:throw new Error("[jamEngine getFromReference] Unknown reference form type: "+aFormID);break;} if(desiredClassId!==propertyClassId) {arr.push(that.buildCompact(getFromId(["<class>",desiredClassId]),desiredCompact));} ref=ref.getContainer();} while(ref);return arr;} function getFromList(list) {var arr=[];var itemCount=list.count;for(var itemIndex=0;itemIndex<itemCount;itemIndex++) {var itemCompact;var typeID;try{typeID=list.getType(itemIndex);}catch(e){continue;} switch(typeID) {case DescValueType.BOOLEANTYPE:itemCompact=that.buildCompact("<boolean>",list.getBoolean(itemIndex));break;case DescValueType.CLASSTYPE:itemCompact=that.buildCompact("<class>",getFromId(["<class>",list.getClass(itemIndex)]));break;case DescValueType.DOUBLETYPE:itemCompact=that.buildCompact("<double>",list.getDouble(itemIndex));break;case DescValueType.ENUMERATEDTYPE:var enumTypeContext=["<enumType>",list.getEnumerationType(itemIndex)];var enumValueContext=["<enumValue>",list.getEnumerationValue(itemIndex)];itemCompact=that.buildCompact("<enumerated>",that.buildCompact(getFromId(enumTypeContext),getFromId(enumValueContext,enumTypeContext)));break;case DescValueType.INTEGERTYPE:itemCompact=that.buildCompact("<integer>",list.getInteger(itemIndex));break;case DescValueType.LISTTYPE:itemCompact=that.buildCompact("<list>",getFromList(list.getList(itemIndex)));break;case DescValueType.OBJECTTYPE:var objectTypeContext=["<class>",list.getObjectType(itemIndex)];var objectValue=list.getObjectValue(itemIndex);itemCompact=that.buildCompact("<object>",that.buildCompact(getFromId(objectTypeContext),getFromDescriptor(objectValue,objectTypeContext)));break;case DescValueType.ALIASTYPE:try {var fileRef=list.getPath(itemIndex);itemCompact=that.buildCompact("<path>",fileRef.fsName);} catch(e) {itemCompact=that.buildCompact("<path>",incompatiblePlatformPath);} break;case DescValueType.REFERENCETYPE:itemCompact=that.buildCompact("<reference>",getFromReference(list.getReference(itemIndex)));break;case DescValueType.STRINGTYPE:itemCompact=that.buildCompact("<string>",list.getString(itemIndex));break;case DescValueType.UNITDOUBLE:var unitTypeContext=["<unit>",list.getUnitDoubleType(itemIndex)];var doubleValue=list.getUnitDoubleValue(itemIndex);itemCompact=that.buildCompact("<unitDouble>",that.buildCompact(getFromId(unitTypeContext),doubleValue));break;default:var isRawType;var isLargeIntegerType;try{isRawType=(typeID===DescValueType.RAWTYPE);}catch(e){} try{isLargeIntegerType=(typeID===DescValueType.LARGEINTEGERTYPE);}catch(e){} if(isRawType) {itemCompact=that.buildCompact("<data>",list.getData(itemIndex));} else if(isLargeIntegerType) {itemCompact=that.buildCompact("<largeInteger>",list.getLargeInteger(itemIndex));} else {throw new Error("[jamEngine getFromList] Unknown descriptor value type: "+typeID);} break;} arr[itemIndex]=itemCompact;} return arr;} function getFromDescriptor(desc,parentContext) {if(desc) {var obj={};var keyCount;try{keyCount=desc.count;}catch(e){return null;} for(var keyIndex=0;keyIndex<keyCount;keyIndex++) {var keyID=desc.getKey(keyIndex);var keyString=getFromId(["<key>",keyID],parentContext);var keyCompact;var typeID;try{typeID=desc.getType(keyID);}catch(e){continue;} switch(typeID) {case DescValueType.BOOLEANTYPE:keyCompact=that.buildCompact("<boolean>",desc.getBoolean(keyID));break;case DescValueType.CLASSTYPE:keyCompact=that.buildCompact("<class>",getFromId(["<class>",desc.getClass(keyID)]));break;case DescValueType.DOUBLETYPE:keyCompact=that.buildCompact("<double>",desc.getDouble(keyID));break;case DescValueType.ENUMERATEDTYPE:var enumTypeContext=["<enumType>",desc.getEnumerationType(keyID)];var enumValueContext=["<enumValue>",desc.getEnumerationValue(keyID)];keyCompact=that.buildCompact("<enumerated>",that.buildCompact(getFromId(enumTypeContext),getFromId(enumValueContext,enumTypeContext)));break;case DescValueType.INTEGERTYPE:keyCompact=that.buildCompact("<integer>",desc.getInteger(keyID));break;case DescValueType.LISTTYPE:keyCompact=that.buildCompact("<list>",getFromList(desc.getList(keyID)));break;case DescValueType.OBJECTTYPE:var objectTypeContext=["<class>",desc.getObjectType(keyID)];var objectValue=desc.getObjectValue(keyID);keyCompact=that.buildCompact("<object>",that.buildCompact(getFromId(objectTypeContext),getFromDescriptor(objectValue,objectTypeContext)));break;case DescValueType.ALIASTYPE:try {var fileRef=desc.getPath(keyID);keyCompact=that.buildCompact("<path>",fileRef.fsName);} catch(e) {keyCompact=that.buildCompact("<path>",incompatiblePlatformPath);} break;case DescValueType.REFERENCETYPE:keyCompact=that.buildCompact("<reference>",getFromReference(desc.getReference(keyID)));break;case DescValueType.STRINGTYPE:keyCompact=that.buildCompact("<string>",desc.getString(keyID));break;case DescValueType.UNITDOUBLE:var unitTypeContext=["<unit>",desc.getUnitDoubleType(keyID)];var doubleValue=desc.getUnitDoubleValue(keyID);keyCompact=that.buildCompact("<unitDouble>",that.buildCompact(getFromId(unitTypeContext),doubleValue));break;default:var isRawType;var isLargeIntegerType;try{isRawType=(typeID===DescValueType.RAWTYPE);}catch(e){} try{isLargeIntegerType=(typeID===DescValueType.LARGEINTEGERTYPE);}catch(e){} if(isRawType) {keyCompact=that.buildCompact("<data>",desc.getData(keyID));} else if(isLargeIntegerType) {keyCompact=that.buildCompact("<largeInteger>",desc.getLargeInteger(keyID));} else {throw new Error("[jamEngine getFromDescriptor] Unknown descriptor value type: "+typeID);} break;} obj[keyString]=keyCompact;} return obj;} else {return null;}} jamEngine.jsonToActionDescriptor=function(descriptorObj) {that=this;var actionDescriptor;if(descriptorObj) {actionDescriptor=new ActionDescriptor();putInDescriptor(actionDescriptor,descriptorObj);} return actionDescriptor;};jamEngine.jsonToActionReference=function(referenceArr) {that=this;var actionReference;if(referenceArr) {actionReference=new ActionReference();putInReference(actionReference,referenceArr);} return actionReference;};jamEngine.eventIdAndActionDescriptorToJson=function(eventId,actionDescriptor) {that=this;var eventIdContext=["<event>",eventId];return{"<event>":getFromId(eventIdContext),"<descriptor>":getFromDescriptor(actionDescriptor,eventIdContext)};};jamEngine.classIdAndActionDescriptorToJson=function(classId,actionDescriptor) {that=this;var classIdContext=["<class>",classId];return{"<class>":getFromId(classIdContext),"<descriptor>":getFromDescriptor(actionDescriptor,classIdContext)};};jamEngine.actionReferenceToJson=function(actionReference) {that=this;return getFromReference(actionReference);};function getReferenceClassId(ref) {classId=0;do {try{var desiredClassId=ref.getDesiredClass();}catch(e){break;} if(desiredClassId!==propertyClassId) {classId=desiredClassId;break;} ref=ref.getContainer();} while(ref);return classId;} jamEngine.jsonPlay=function(eventUniIdStr,descriptorObj,displayDialogs) {var eventId=this.uniIdStrToId(eventUniIdStr);var desc=this.jsonToActionDescriptor(descriptorObj);var parentContext;if(eventId===getEventId) {var ref=desc.getReference(targetKeyId);parentContext=["<class>",getReferenceClassId(ref)];} else {parentContext=["<event>",eventId];} return getFromDescriptor(app.executeAction(eventId,desc,displayDialogs||this.displayDialogs),parentContext);};jamEngine.jsonGet=function(referenceArr) {var ref=this.jsonToActionReference(referenceArr);return getFromDescriptor(app.executeActionGet(ref),["<class>",getReferenceClassId(ref)]);};jamEngine.normalizeJsonItem=function(item,options) {function normalizeItem(item) {var explicit=that.parseCompact(item);var type=explicit[0];var value=explicit[1];var normalizedValue;switch(type) {case"<boolean>":case"<data>":case"<double>":case"<identifier>":case"<index>":case"<integer>":case"<largeInteger>":case"<name>":case"<offset>":case"<path>":case"<string>":normalizedValue=value;break;case"<class>":normalizedValue=value&&getFromId(["<class>",that.uniIdStrToId(value)]);break;case"<enumerated>":var enumerated=that.parseCompact(value);var enumTypeContext=["<enumType>",that.uniIdStrToId(enumerated[0])];var enumValueContext=["<enumValue>",that.uniIdStrToId(enumerated[1])];normalizedValue=that.buildCompact(getFromId(enumTypeContext),getFromId(enumValueContext,enumTypeContext));break;case"<list>":normalizedValue=[];for(var i=0;i<value.length;i++) {normalizedValue.push(normalizeItem(value[i]));} break;case"<object>":var object=that.parseCompact(value);var objectClassContext=["<class>",that.uniIdStrToId(object[0])];var objectDescriptor=object[1];var normalizedDescriptor;if(objectDescriptor===null) {normalizedDescriptor=null;} else {normalizedDescriptor={};for(var key in objectDescriptor) {if(objectDescriptor.hasOwnProperty(key)) {var objectKeyContext=["<key>",that.uniIdStrToId(key)];normalizedDescriptor[getFromId(objectKeyContext,objectClassContext)]=normalizeItem(objectDescriptor[key]);}}} normalizedValue=that.buildCompact(getFromId(objectClassContext),normalizedDescriptor);break;case"<property>":normalizedValue=getFromId(["<key>",that.uniIdStrToId(value)]);break;case"<reference>":normalizedValue=[];for(var i=0;i<value.length;i++) {var container=that.parseCompact(value[i]);normalizedValue.push(that.buildCompact(getFromId(["<class>",that.uniIdStrToId(container[0])]),normalizeItem(container[1])));} break;case"<unitDouble>":var unitDouble=that.parseCompact(value);var unitTypeContext=["<unit>",that.uniIdStrToId(unitDouble[0])];normalizedValue=that.buildCompact(getFromId(unitTypeContext),unitDouble[1]);break;default:throw new Error("[jamEngine.normalizeJsonItem] Unknown item type: "+type);break;} return that.buildCompact(type,normalizedValue);} that=this;var saveMeaningfulIds=this.meaningfulIds;var saveParseFriendly=this.parseFriendly;if(options&&(options.constructor===Object)) {if(typeof options.meaningfulIds!=='undefined') {this.meaningfulIds=options.meaningfulIds;} if(typeof options.parseFriendly!=='undefined') {this.parseFriendly=options.parseFriendly;}} var normalizedItem=normalizeItem(item);this.meaningfulIds=saveMeaningfulIds;this.parseFriendly=saveParseFriendly;return normalizedItem;};function simplifyRef(ref) {var simplifiedRef=[];for(var i=0;i<ref.length;i++) {var element=ref[i];var simplifiedElement={};var desiredClass=element[0];var form=element[1][0];var value=element[1][1];switch(form) {case"<class>":case"<identifier>":case"<index>":case"<name>":case"<offset>":case"<property":simplifiedElement[desiredClass]=value;break;case"<enumerated>":simplifiedElement[desiredClass]=value[1];break;default:throw new Error("[jamEngine simplifyRef] Unexpected element form: "+form);break;} simplifiedRef.push(simplifiedElement);} return simplifiedRef;} function simplifyItem(item,hook) {var simplifiedItem;var type=item[0];var value=item[1];switch(type) {case"<boolean>":case"<class>":case"<data>":case"<double>":case"<integer>":case"<largeInteger>":case"<path>":case"<string>":simplifiedItem=value;break;case"<list>":simplifiedItem=simplifyList(value,hook);break;case"<enumerated>":case"<unitDouble>":simplifiedItem=value[1];break;case"<object>":simplifiedItem=simplifyDesc(value[1],hook);break;case"<reference>":simplifiedItem=simplifyRef(value);break;default:throw new Error("[jamEngine simplifyItem] Unexpected item type: "+type);break;} return simplifiedItem;} function simplifyList(list,hook) {var simplifiedList=[];for(var i=0;i<list.length;i++) {simplifiedList.push(simplifyItem(list[i],hook));} return simplifiedList;} function simplifyDesc(desc,hook) {var getDefaultValue=function(desc,key){return simplifyItem(desc[key],hook);};var simplifiedDesc={};for(var key in desc) {if(desc.hasOwnProperty(key)) {var value=undefined;if(typeof hook==='function') {value=hook(desc,key,getDefaultValue);} if(typeof value==='undefined') {value=simplifyItem(desc[key],hook);} simplifiedDesc[key]=value;}} return simplifiedDesc;} jamEngine.simplifyObject=function(object,hookFunction) {return simplifyDesc((this.normalizeJsonItem(object,{meaningfulIds:true,parseFriendly:true}))[1][1],hookFunction);};jamEngine.simplifyList=function(list,hookFunction) {return simplifyList((this.normalizeJsonItem(list,{meaningfulIds:true,parseFriendly:true}))[1],hookFunction);};jamEngine.parseCompact=function(compact) {var result=[];if(compact.constructor===Object) {var keys=[];for(var k in compact) {if(compact.hasOwnProperty(k)) {keys.push(k);}} if(keys.length===1) {result[0]=keys[0];result[1]=compact[keys[0]];} else {throw new Error("[jamEngine.parseCompact] Syntax error: "+compact.toSource());}} else if(compact.constructor===Array) {if(compact.length===2) {result[0]=compact[0];result[1]=compact[1];} else {throw new Error("[jamEngine.parseCompact] Syntax error: "+compact.toSource());}} else {throw new Error("[jamEngine.parseCompact] JavaScript object or array expected");} return result;};jamEngine.compactToExplicit=function(compact,typeKey,valueKey) {var explicit={};var typeValue=this.parseCompact(compact);explicit[typeKey||"<type>"]=typeValue[0];explicit[valueKey||"<value>"]=typeValue[1];return explicit;};jamEngine.buildCompact=function(type,value) {var compact;if(typeof type==='string') {if(this.parseFriendly) {compact=[type,value];} else {compact={};compact[type]=value;}} else {throw new Error("[jamEngine.buildCompact] String expected");} return compact;};jamEngine.explicitToCompact=function(explicit,typeKey,valueKey) {var compact;if(explicit.constructor===Object) {compact=this.buildCompact(explicit[typeKey||"<type>"],explicit[valueKey||"<value>"]);} else {throw new Error("[jamEngine.explicitToCompact] JavaScript object expected");} return compact;};for(var charIdStr in conflictingStringIdStrs) {if(conflictingStringIdStrs.hasOwnProperty(charIdStr)) {var stringIdStrs=conflictingStringIdStrs[charIdStr];for(var index=stringIdStrs.length-1;index>=0;index--) {var stringIdStr=stringIdStrs[index];if(!(app.charIDToTypeID(charIdStr.substring(1,5))===app.stringIDToTypeID(stringIdStr))) {stringIdStrs.splice(index,1);}} if(stringIdStrs.length<2) {delete conflictingStringIdStrs[charIdStr];}}} for(var charIdStr in contextRules) {if(contextRules.hasOwnProperty(charIdStr)) {if(charIdStr in conflictingStringIdStrs) {var rule=contextRules[charIdStr];for(var kind in rule) {if(rule.hasOwnProperty(kind)) {switch(kind) {case"<class>":case"<event>":case"<enumType>":case"<enumValue>":case"<key>":case"<unknown>":if(app.charIDToTypeID(charIdStr.substring(1,5))!=app.stringIDToTypeID(rule[kind])) {throw new Error("[jamEngine] "+"\""+charIdStr+"\" and \""+rule[kind]+"\" are not equivalent ID strings");} break;case"<classKey>":case"<eventKey>":case"<typeValue>":for(var parent in rule[kind]) {if(rule[kind].hasOwnProperty(parent)) {if(app.charIDToTypeID(charIdStr.substring(1,5))!=app.stringIDToTypeID(rule[kind][parent])) {throw new Error("[jamEngine] "+"\""+charIdStr+"\" and \""+rule[kind][parent]+"\" are not equivalent ID strings");}}} break;}}}} else {delete contextRules[charIdStr];}}}}());}
// jamHelpers.jsxinc v4.4 (minified)
if(typeof jamHelpers!=='object') {var jamHelpers={};(function() {jamHelpers.toColorObject=function(color) {var colorObject;if(color.constructor===Object) {function restoreDesc(desc) {var restoredDesc={};for(var key in desc) {if(desc.hasOwnProperty(key)) {var value=desc[key];var typedValue=null;switch(key) {case"book":case"name":typedValue=["<string>",localize(value)];break;case"bookKey":typedValue=["<data>",value];break;case"bookID":typedValue=["<integer>",value];break;case"a":case"b":case"black":case"blue":case"brightness":case"cyan":case"gray":case"green":case"luminance":case"magenta":case"red":case"saturation":case"yellowColor":typedValue=["<double>",value];break;case"hue":typedValue=["<unitDouble>",["angleUnit",value]];break;case"color":var colorClass;if((("book"in value)&&("name"in value))||(("bookID"in value)&&("bookKey"in value))) {colorClass="bookColor";} else if(("cyan"in value)&&("magenta"in value)&&("yellowColor"in value)&&("black"in value)) {colorClass="CMYKColorClass";} else if("gray"in value) {colorClass="grayscale";} else if(("hue"in value)&&("saturation"in value)&&("brightness"in value)) {colorClass="HSBColorClass";} else if(("luminance"in value)&&("a"in value)&&("b"in value)) {colorClass="labColor";} else if(("red"in value)&&("green"in value)&&("blue"in value)) {colorClass="RGBColor";} typedValue=["<object>",[colorClass,restoreDesc(value)]];break;} if(typedValue) {restoredDesc[key]=typedValue;}}} return restoredDesc;} colorObject=restoreDesc({"color":color})["color"];} else if(color.constructor===Array) {var colorClass=color[0];switch(jamEngine.uniIdStrToId(colorClass)) {case jamEngine.uniIdStrToId("bookColor"):switch(color[1].length) {case 2:if(typeof color[1][0]==='string') {colorObject=["<object>",["bookColor",{"book":["<string>",color[1][0]],"name":["<string>",color[1][1]]}]];} else if(typeof color[1][0]==='number') {colorObject=["<object>",["bookColor",{"bookID":["<integer>",color[1][0]],"bookKey":["<data>",color[1][1]]}]];} break;case 4:colorObject=["<object>",["bookColor",{"book":["<string>",color[1][0]],"name":["<string>",color[1][1]],"bookID":["<integer>",color[1][2]],"bookKey":["<data>",color[1][3]]}]];break;} break;case jamEngine.uniIdStrToId("CMYKColorClass"):colorObject=["<object>",["CMYKColorClass",{"cyan":["<double>",color[1][0]],"magenta":["<double>",color[1][1]],"yellowColor":["<double>",color[1][2]],"black":["<double>",color[1][3]]}]];break;case jamEngine.uniIdStrToId("grayscale"):colorObject=["<object>",["grayscale",{"gray":["<double>",(color[1].constructor===Array)?color[1][0]:color[1]]}]];break;case jamEngine.uniIdStrToId("HSBColorClass"):colorObject=["<object>",["HSBColorClass",{"hue":["<unitDouble>",["angleUnit",color[1][0]]],"saturation":["<double>",color[1][1]],"brightness":["<double>",color[1][2]]}]];break;case jamEngine.uniIdStrToId("labColor"):colorObject=["<object>",["labColor",{"luminance":["<double>",color[1][0]],"a":["<double>",color[1][1]],"b":["<double>",color[1][2]]}]];break;case jamEngine.uniIdStrToId("RGBColor"):colorObject=["<object>",["RGBColor",{"red":["<double>",color[1][0]],"green":["<double>",color[1][1]],"blue":["<double>",color[1][2]]}]];break;default:throw new Error("[jamHelpers.toColorObject] Unrecognized color class: "+colorClass);break;}} return colorObject;};jamHelpers.fromColorObject=function(colorObject,explicit) {var color;if(explicit) {color=jamEngine.simplifyObject(colorObject);} else {var normalizedColorObject=jamEngine.normalizeJsonItem(colorObject,{meaningfulIds:true,parseFriendly:true});var colorClass=normalizedColorObject[1][0];var colorDesc=normalizedColorObject[1][1];switch(colorClass) {case"bookColor":var book=colorDesc["book"][1];var name=colorDesc["name"][1];if(("bookID"in colorDesc)&&("bookKey"in colorDesc)) {var bookID=colorDesc["bookID"][1];var bookKey=colorDesc["bookKey"][1];color=[colorClass,[book,name,bookID,bookKey]];} else {color=[colorClass,[book,name]];} break;case"CMYKColorClass":var cyan=colorDesc["cyan"][1];var magenta=colorDesc["magenta"][1];var yellowColor=colorDesc["yellowColor"][1];var black=colorDesc["black"][1];color=[colorClass,[cyan,magenta,yellowColor,black]];break;case"grayscale":var gray=colorDesc["gray"][1];color=[colorClass,[gray]];break;case"HSBColorClass":var hue=colorDesc["hue"][1][1];var saturation=colorDesc["saturation"][1];var brightness=colorDesc["brightness"][1];color=[colorClass,[hue,saturation,brightness]];break;case"labColor":var luminance=colorDesc["luminance"][1];var a=colorDesc["a"][1];var b=colorDesc["b"][1];color=[colorClass,[luminance,a,b]];break;case"RGBColor":var red=colorDesc["red"][1];var green=colorDesc["green"][1];var blue=colorDesc["blue"][1];color=[colorClass,[red,green,blue]];break;default:throw new Error("[jamHelpers.fromColorObject] Unrecognized color class: "+colorClass);break;}} return color;};jamHelpers.nameToColorObject=function(setName,colorName) {return this.toColorObject(jamColors.nameToColor(setName,colorName));};jamHelpers.hexToColorObject=function(hexColorString) {return this.toColorObject(["RGBColor",jamColors.hexToRgb(hexColorString)]);};jamHelpers.hexFromColorObject=function(colorObject,noSign,lowercase) {var color=this.fromColorObject(colorObject);return(color[0]==="RGBColor")?jamColors.rgbToHex(color[1],noSign,lowercase):null;};jamHelpers.toGradientObject=function(gradient) {var gradientObject;if(gradient.constructor===Object) {var that=this;function restoreDesc(desc) {var restoredDesc={};for(var key in desc) {if(desc.hasOwnProperty(key)) {var value=desc[key];var typedValue=null;var restoredList;switch(key) {case"showTransparency":case"vectorColor":typedValue=["<boolean>",value];break;case"name":typedValue=["<string>",localize(value)];break;case"gradientForm":typedValue=["<enumerated>",["gradientForm",value]];break;case"type":typedValue=["<enumerated>",["colorStopType",value]];break;case"colorSpace":typedValue=["<enumerated>",["colorSpace",value]];break;case"location":case"midpoint":case"randomSeed":case"smoothness":typedValue=["<integer>",value];break;case"interpolation":typedValue=["<double>",value];break;case"opacity":typedValue=["<unitDouble>",["percentUnit",value]];break;case"colors":restoredList=[];for(var i=0;i<value.length;i++) {restoredList.push(["<object>",["colorStop",restoreDesc(value[i])]]);} typedValue=["<list>",restoredList];break;case"transparency":restoredList=[];for(var i=0;i<value.length;i++) {restoredList.push(["<object>",["transparencyStop",restoreDesc(value[i])]]);} typedValue=["<list>",restoredList];break;case"minimum":case"maximum":restoredList=[];for(var i=0;i<value.length;i++) {restoredList.push(["<integer>",value[i]]);} typedValue=["<list>",restoredList];break;case"color":typedValue=that.toColorObject(value);break;case"gradient":typedValue=["<object>",["gradientClassEvent",restoreDesc(value)]];break;} if(typedValue) {restoredDesc[key]=typedValue;}}} return restoredDesc;} gradientObject=restoreDesc({"gradient":gradient})["gradient"];} else if(gradient.constructor===Array) {var gradientObj={};var gradientName=gradient[0];if(gradientName) {gradientObj["name"]=["<string>",gradientName];} var gradientForm=gradient[1];gradientObj["gradientForm"]=["<enumerated>",["gradientForm",gradientForm]];switch(jamEngine.uniIdStrToId(gradientForm)) {case jamEngine.uniIdStrToId("customStops"):gradientObj["interpolation"]=["<double>",gradient[2]];var colorStops=gradient[3];var colorsArr=[];for(var i=0;i<colorStops.length;i++) {var colorStopObj={};colorStopObj["location"]=["<integer>",colorStops[i][0]];colorStopObj["midpoint"]=["<integer>",colorStops[i][1]];var type=colorStops[i][2];colorStopObj["type"]=["<enumerated>",["colorStopType",type]];switch(jamEngine.uniIdStrToId(type)) {case jamEngine.uniIdStrToId("userStop"):colorStopObj["color"]=this.toColorObject(colorStops[i][3]);break;case jamEngine.uniIdStrToId("backgroundColor"):case jamEngine.uniIdStrToId("foregroundColor"):break;default:throw new Error("[jamHelpers.toGradientObject] Unrecognized color stop type: "+type);break;} colorsArr.push(["<object>",["colorStop",colorStopObj]]);} gradientObj["colors"]=["<list>",colorsArr];var transparencyStops=gradient[4];if(typeof transparencyStops!=='undefined') {var transparencyArr=[];for(var j=0;j<transparencyStops.length;j++) {var transparencyStopObj={};transparencyStopObj["location"]=["<integer>",transparencyStops[j][0]];transparencyStopObj["midpoint"]=["<integer>",transparencyStops[j][1]];transparencyStopObj["opacity"]=["<unitDouble>",["percentUnit",transparencyStops[j][2]]];transparencyArr.push(["<object>",["transparencyStop",transparencyStopObj]]);} gradientObj["transparency"]=["<list>",transparencyArr];} break;case jamEngine.uniIdStrToId("colorNoise"):gradientObj["randomSeed"]=["<integer>",gradient[2]];gradientObj["showTransparency"]=["<boolean>",gradient[3]];gradientObj["vectorColor"]=["<boolean>",gradient[4]];gradientObj["smoothness"]=["<integer>",gradient[5]];var colorSpace=gradient[6];gradientObj["colorSpace"]=["<enumerated>",["colorSpace",colorSpace]];switch(jamEngine.uniIdStrToId(colorSpace)) {case jamEngine.uniIdStrToId("RGBColor"):case jamEngine.uniIdStrToId("HSBColorEnum"):case jamEngine.uniIdStrToId("labColor"):break;default:throw new Error("[jamHelpers.toGradientObject] Unrecognized color space: "+colorSpace);break;} gradientObj["minimum"]=this.toIntegerList(gradient[7]);gradientObj["maximum"]=this.toIntegerList(gradient[8]);break;default:throw new Error("[jamHelpers.toGradientObject] Unrecognized gradient form: "+gradientForm);break;} gradientObject=["<object>",["gradientClassEvent",gradientObj]];} return gradientObject;};jamHelpers.fromGradientObject=function(gradientObject,explicit) {var gradient;if(explicit) {gradient=jamEngine.simplifyObject(gradientObject);} else {gradient=[];var normalizedGradientObject=jamEngine.normalizeJsonItem(gradientObject,{meaningfulIds:true,parseFriendly:true});var gradientDesc=normalizedGradientObject[1][1];var name=gradientDesc["name"];gradient.push((name)?name[1]:null);var gradientForm=gradientDesc["gradientForm"][1][1];gradient.push(gradientForm);switch(gradientForm) {case"customStops":gradient.push(gradientDesc["interpolation"][1]);var colors=gradientDesc["colors"][1];var colorStops=[];for(var i=0;i<colors.length;i++) {var colorStop=colors[i][1][1];var colorStopArr=[];colorStopArr.push(colorStop["location"][1]);colorStopArr.push(colorStop["midpoint"][1]);var type=colorStop["type"][1][1];colorStopArr.push(type);switch(type) {case"userStop":colorStopArr.push(this.fromColorObject(colorStop["color"]));break;case"backgroundColor":case"foregroundColor":break;default:throw new Error("[jamHelpers.fromGradientObject] Unrecognized color stop type: "+type);break;} colorStops.push(colorStopArr);} gradient.push(colorStops);var transparency=gradientDesc["transparency"][1];var transparencyStops=[];for(var j=0;j<transparency.length;j++) {var transparencyStop=transparency[j][1][1];var transparencyStopArr=[];transparencyStopArr.push(transparencyStop["location"][1]);transparencyStopArr.push(transparencyStop["midpoint"][1]);transparencyStopArr.push(transparencyStop["opacity"][1][1]);transparencyStops.push(transparencyStopArr);} gradient.push(transparencyStops);break;case"colorNoise":gradient.push(gradientDesc["randomSeed"][1]);gradient.push(gradientDesc["showTransparency"][1]);gradient.push(gradientDesc["vectorColor"][1]);gradient.push(gradientDesc["smoothness"][1]);var colorSpace=gradientDesc["colorSpace"][1][1] gradient.push(colorSpace);switch(colorSpace) {case"RGBColor":case"HSBColorEnum":case"labColor":break;default:throw new Error("[jamHelpers.fromGradientObject] Unrecognized color space: "+colorSpace);break;} gradient.push(this.fromIntegerList(gradientDesc["minimum"]));gradient.push(this.fromIntegerList(gradientDesc["maximum"]));break;default:throw new Error("[jamHelpers.fromGradientObject] Unrecognized gradient form: "+gradientForm);break;}} return gradient;};jamHelpers.toCurvesAdjustmentList=function(curvesAdjustmentsArr) {var curvesAdjustmentListArr=[];for(var i=0;i<curvesAdjustmentsArr.length;i++) {var curvesAdjustment=curvesAdjustmentsArr[i];var channel=["<reference>",[["channel",["<enumerated>",["channel",curvesAdjustment[0]]]]]];var info=curvesAdjustment[1];var type=info[0];var points=info[1];var pointArr=[];switch(jamEngine.uniIdStrToId(type)) {case jamEngine.uniIdStrToId("mapping"):for(var j=0;j<points.length;j++) {pointArr.push(["<integer>",points[j]]);} var mapping=["<list>",pointArr];curvesAdjustmentListArr.push(["<object>",["curvesAdjustment",{"channel":channel,"mapping":mapping}]]);break;case jamEngine.uniIdStrToId("curve"):for(var j=0;j<points.length;j++) {var point=["<object>",["point",{"horizontal":["<double>",points[j][0]],"vertical":["<double>",points[j][1]]}]];pointArr.push(point);} var curve=["<list>",pointArr];curvesAdjustmentListArr.push(["<object>",["curvesAdjustment",{"channel":channel,"curve":curve}]]);break;default:throw new Error("[jamHelpers.toCurvesAdjustmentList] Unrecognized curve type");break;}} return["<list>",curvesAdjustmentListArr];};jamHelpers.toHueSatAdjustmentV2List=function(hueSatAdjustmentsArr) {var hueSatAdjustmentListArr=[];for(var i=0;i<hueSatAdjustmentsArr.length;i++) {var hueSatAdjustmentArr=hueSatAdjustmentsArr[i];var hueSatAdjustmentObj;if((hueSatAdjustmentArr.length===3)&&(i===0)) {hueSatAdjustmentObj={"hue":["<integer>",hueSatAdjustmentArr[0]],"saturation":["<integer>",hueSatAdjustmentArr[1]],"lightness":["<integer>",hueSatAdjustmentArr[2]]};} else if(hueSatAdjustmentArr.length===(1+4+3)) {hueSatAdjustmentObj={"localRange":["<integer>",hueSatAdjustmentArr[0]],"beginRamp":["<integer>",hueSatAdjustmentArr[1]],"beginSustain":["<integer>",hueSatAdjustmentArr[2]],"endSustain":["<integer>",hueSatAdjustmentArr[3]],"endRamp":["<integer>",hueSatAdjustmentArr[4]],"hue":["<integer>",hueSatAdjustmentArr[5]],"saturation":["<integer>",hueSatAdjustmentArr[6]],"lightness":["<integer>",hueSatAdjustmentArr[7]]};} hueSatAdjustmentListArr.push(["<object>",["hueSatAdjustmentV2",hueSatAdjustmentObj]]);} return["<list>",hueSatAdjustmentListArr];};jamHelpers.toBlendRangeList=function(blendRanges) {var blendRangeListArr=[];var blendRangeObject;for(var i=0;i<blendRanges.length;i++) {var blendRange=blendRanges[i];if(blendRange.constructor===Object) {function restoreDesc(desc) {var restoredDesc={};for(var key in desc) {if(desc.hasOwnProperty(key)) {var value=desc[key];var typedValue=null;switch(key) {case"channel":typedValue=["<reference>",[["channel",["<enumerated>",["channel",value]]]]];break;case"srcBlackMin":case"srcBlackMax":case"srcWhiteMin":case"srcWhiteMax":case"destBlackMin":case"destBlackMax":case"destWhiteMin":case"destWhiteMax":typedValue=["<integer>",value];break;case"blendRange":typedValue=["<object>",["blendRange",restoreDesc(value)]];break;} if(typedValue) {restoredDesc[key]=typedValue;}}} return restoredDesc;} blendRangeObject=restoreDesc({"blendRange":blendRange})["blendRange"];} else if(blendRange.constructor===Array) {blendRangeObject=["<object>",["blendRange",{"channel":["<reference>",[["channel",["<enumerated>",["channel",blendRange[0]]]]]],"srcBlackMin":["<integer>",blendRange[1]],"srcBlackMax":["<integer>",blendRange[2]],"srcWhiteMin":["<integer>",blendRange[3]],"srcWhiteMax":["<integer>",blendRange[4]],"destBlackMin":["<integer>",blendRange[5]],"destBlackMax":["<integer>",blendRange[6]],"destWhiteMin":["<integer>",blendRange[7]],"destWhiteMax":["<integer>",blendRange[8]]}]];} blendRangeListArr.push(blendRangeObject);} return["<list>",blendRangeListArr];};jamHelpers.fromBlendRangeList=function(blendRangeList,explicit) {var blendRanges;if(explicit) {var replaceChannelHook=function(desc,key,getDefaultValue) {var replacedValue=undefined;if(key==="channel") {var value=getDefaultValue(desc,key);replacedValue=value[0]["channel"];} return replacedValue;};blendRanges=jamEngine.simplifyList(blendRangeList,replaceChannelHook);} else {blendRanges=[];var normalizedBlendRangeList=jamEngine.normalizeJsonItem(blendRangeList,{meaningfulIds:true,parseFriendly:true});for(index=0;index<normalizedBlendRangeList[1].length;index++) {var blendRange=normalizedBlendRangeList[1][index][1][1];var blendRangeArr=[blendRange["channel"][1][0][1][1][1],blendRange["srcBlackMin"][1],blendRange["srcBlackMax"][1],blendRange["srcWhiteMin"][1],blendRange["srcWhiteMax"][1],blendRange["destBlackMin"][1],blendRange["destBlackMax"][1],blendRange["destWhiteMin"][1],blendRange["destWhiteMax"][1]];blendRanges.push(blendRangeArr);}} return blendRanges;};jamHelpers.toIntegerList=function(integersArr) {var integerListArr=[];for(var i=0;i<integersArr.length;i++) {integerListArr.push(["<integer>",integersArr[i]]);} return["<list>",integerListArr];};jamHelpers.fromIntegerList=function(integerList) {var normalizedIntegerList=jamEngine.normalizeJsonItem(integerList,{meaningfulIds:true,parseFriendly:true});var integersArr=[];var integers=normalizedIntegerList[1];for(var i=0;i<integers.length;i++) {integersArr.push(integers[i][1]);} return integersArr;};function toUnitDouble(value,unit) {return(typeof unit==='undefined')?["<double>",value]:["<unitDouble>",[unit,value]];} jamHelpers.toPointObject=function(pointArr) {var data=pointArr[0];var unit=pointArr[1];var pointObject=["<object>",["point",{"horizontal":toUnitDouble(data[0],unit),"vertical":toUnitDouble(data[1],unit)}]];return pointObject;};jamHelpers.toPointList=function(pointsArr) {var data=pointsArr[0];var unit=pointsArr[1];var pointListArr=[];for(var i=0;i<data.length;i++) {pointListArr.push (["<object>",["point",{"horizontal":toUnitDouble(data[i][0],unit),"vertical":toUnitDouble(data[i][1],unit)}]]);} return["<list>",pointListArr];};jamHelpers.fromPointList=function(pointList) {var pointsArr=[];var normalizedPointList=jamEngine.normalizeJsonItem(pointList,{meaningfulIds:true,parseFriendly:true});var data=[];var unit;function getValue(coordinate) {var value;switch(coordinate[0]) {case"<unitDouble>":unit=coordinate[1][0];value=coordinate[1][1];break;case"<double>":unit=undefined;value=coordinate[1];break;} return value;} var pointListArr=normalizedPointList[1];for(var i=0;i<pointListArr.length;i++) {data.push([getValue(pointListArr[i][1][1]["horizontal"]),getValue(pointListArr[i][1][1]["vertical"])]);} pointsArr.push(data);if(unit) {pointsArr.push(unit);} return pointsArr;};jamHelpers.toOffsetObject=function(offsetArr) {var data=offsetArr[0];var unit=offsetArr[1];var offsetObject=["<object>",["offset",{"horizontal":toUnitDouble(data[0],unit),"vertical":toUnitDouble(data[1],unit)}]];return offsetObject;};jamHelpers.toRectangleObject=function(rectangleArr) {var data=rectangleArr[0];var unit=rectangleArr[1];var rectangleObj={"left":toUnitDouble(data[0],unit),"top":toUnitDouble(data[1],unit),"right":toUnitDouble(data[2],unit),"bottom":toUnitDouble(data[3],unit)};if(data.length===5) {rectangleObj["radius"]=toUnitDouble(data[4],unit);} return["<object>",["rectangle",rectangleObj]];};jamHelpers.toEllipseObject=function(ellipseArr) {var data=ellipseArr[0];var unit=ellipseArr[1];var ellipseObject=["<object>",["ellipse",{"left":toUnitDouble(data[0],unit),"top":toUnitDouble(data[1],unit),"right":toUnitDouble(data[2],unit),"bottom":toUnitDouble(data[3],unit)}]];return ellipseObject;};jamHelpers.toCustomShapeObject=function(customShapeArr) {var data=customShapeArr[0];var unit=customShapeArr[1];var customShapeObject=["<object>",["customShape",{"name":["<string>",data[0]],"left":toUnitDouble(data[1],unit),"top":toUnitDouble(data[2],unit),"right":toUnitDouble(data[3],unit),"bottom":toUnitDouble(data[4],unit)}]];return customShapeObject;};jamHelpers.toCurvePointList=function(curvePoints) {var curvePointListArr=[];var curvePointObject;for(var i=0;i<curvePoints.length;i++) {var curvePoint=curvePoints[i];if(curvePoint.constructor===Object) {function restoreDesc(desc) {var restoredDesc={};for(var key in desc) {if(desc.hasOwnProperty(key)) {var value=desc[key];var typedValue=null;switch(key) {case"continuity":typedValue=["<boolean>",value];break;case"horizontal":case"vertical":typedValue=["<double>",value];break;case"curvePoint":typedValue=["<object>",["curvePoint",restoreDesc(value)]];break;} if(typedValue) {restoredDesc[key]=typedValue;}}} return restoredDesc;} curvePointObject=restoreDesc({"curvePoint":curvePoint})["curvePoint"];} else if(curvePoint.constructor===Array) {switch(curvePoint.length) {case 2:curvePointObject=["<object>",["curvePoint",{"horizontal":["<double>",curvePoint[0]],"vertical":["<double>",curvePoint[1]]}]];break;case 3:curvePointObject=["<object>",["curvePoint",{"horizontal":["<double>",curvePoint[0]],"vertical":["<double>",curvePoint[1]],"continuity":["<boolean>",curvePoint[2]]}]];break;}} curvePointListArr.push(curvePointObject);} return["<list>",curvePointListArr];};jamHelpers.fromCurvePointList=function(curvePointList,explicit) {var curvePoints;if(explicit) {curvePoints=jamEngine.simplifyList(curvePointList);} else {curvePoints=[];var normalizedCurvePointList=jamEngine.normalizeJsonItem(curvePointList,{meaningfulIds:true,parseFriendly:true});for(index=0;index<normalizedCurvePointList[1].length;index++) {var curvePoint=normalizedCurvePointList[1][index][1][1];var curvePointArr=[curvePoint["horizontal"][1],curvePoint["vertical"][1]];if("continuity"in curvePoint) {curvePointArr.push(curvePoint["continuity"][1]);} curvePoints.push(curvePointArr);}} return curvePoints;};jamHelpers.toRationalPointList=function(rationalPointsArr) {var data=rationalPointsArr[0];var unit=rationalPointsArr[1];var rationalPointListArr=[];for(var i=0;i<data.length;i++) {rationalPointListArr.push (["<object>",["rationalPoint",{"horizontal":toUnitDouble(data[i][0],unit),"vertical":toUnitDouble(data[i][1],unit)}]]);} return["<list>",rationalPointListArr];};jamHelpers.toPathComponentList=function(pathComponents) {var pathComponentList;if(pathComponents.constructor===Object) {var unit;if("unit"in pathComponents) {unit=pathComponents["unit"];} var data=pathComponents["pathComponents"];function restoreDesc(desc) {var restoredDesc={};for(var key in desc) {if(desc.hasOwnProperty(key)) {var value=desc[key];var typedValue=null;var restoredList;switch(key) {case"closedSubpath":case"smooth":case"windingFill":typedValue=["<boolean>",value];break;case"shapeOperation":typedValue=["<enumerated>",["shapeOperation",value]];break;case"horizontal":case"vertical":typedValue=toUnitDouble(value,unit);break;case"anchor":case"backward":case"forward":typedValue=["<object>",["point",restoreDesc(value)]];break;case"subpathListKey":restoredList=[];for(var i=0;i<value.length;i++) {restoredList.push(["<object>",["subpathsList",restoreDesc(value[i])]]);} typedValue=["<list>",restoredList];break;case"points":restoredList=[];for(var i=0;i<value.length;i++) {restoredList.push(["<object>",["pathPoint",restoreDesc(value[i])]]);} typedValue=["<list>",restoredList];break;case"pathComponents":restoredList=[];for(var i=0;i<value.length;i++) {restoredList.push(["<object>",["pathComponent",restoreDesc(value[i])]]);} typedValue=["<list>",restoredList];break;} if(typedValue) {restoredDesc[key]=typedValue;}}} return restoredDesc;} pathComponentList=restoreDesc({"pathComponents":data})["pathComponents"];} else if(pathComponents.constructor===Array) {var pathComponentListArr=[];var data=pathComponents[0];var unit=pathComponents[1];for(var i=0;i<data.length;i++) {var shapeOperation=data[i][0];var subpaths=data[i][1];var windingFill=data[i][2];var subpathArr=[];for(var j=0;j<subpaths.length;j++) {var points=subpaths[j][0];var closedSubpath=subpaths[j][1];var pointArr=[];for(var k=0;k<points.length;k++) {var point=points[k];switch(point.length) {case 1:pointArr.push (["<object>",["pathPoint",{"anchor":["<object>",["point",{"horizontal":toUnitDouble(point[0][0],unit),"vertical":toUnitDouble(point[0][1],unit)}]]}]]);break;case 3:case 4:pointArr.push (["<object>",["pathPoint",{"anchor":["<object>",["point",{"horizontal":toUnitDouble(point[0][0],unit),"vertical":toUnitDouble(point[0][1],unit)}]],"forward":["<object>",["point",{"horizontal":toUnitDouble(point[1][0],unit),"vertical":toUnitDouble(point[1][1],unit)}]],"backward":["<object>",["point",{"horizontal":toUnitDouble(point[2][0],unit),"vertical":toUnitDouble(point[2][1],unit)}]],"smooth":["<boolean>",point[3]||false]}]]);break;}} var subpath={};if(closedSubpath) {subpath["closedSubpath"]=["<boolean>",closedSubpath];} subpath["points"]=["<list>",pointArr];subpathArr.push(["<object>",["subpathsList",subpath]]);} var pathComponent={};pathComponent["shapeOperation"]=["<enumerated>",["shapeOperation",shapeOperation]];if(windingFill) {pathComponent["windingFill"]=["<boolean>",windingFill];} pathComponent["subpathListKey"]=["<list>",subpathArr];pathComponentListArr.push(["<object>",["pathComponent",pathComponent]]);} pathComponentList=["<list>",pathComponentListArr];} return pathComponentList;};jamHelpers.fromPathComponentList=function(pathComponentList,explicit) {var pathComponents;if(explicit) {pathComponents={};var unit;var done=false;function getUnitHook(desc,key) {if(!done) {if(key==="horizontal") {var value=desc[key];if(value[0]==="<unitDouble>") {unit=value[1][0];} done=true;}} return undefined;} pathComponents["pathComponents"]=jamEngine.simplifyList(pathComponentList,getUnitHook);if(unit) {pathComponents["unit"]=unit;}} else {pathComponents=[];var normalizedPathComponentList=jamEngine.normalizeJsonItem(pathComponentList,{meaningfulIds:true,parseFriendly:true});var data=[];var unit;function getValue(coordinate) {var value;switch(coordinate[0]) {case"<unitDouble>":unit=coordinate[1][0];value=coordinate[1][1];break;case"<double>":unit=undefined;value=coordinate[1];break;} return value;} var pathComponentListArr=normalizedPathComponentList[1];for(var i=0;i<pathComponentListArr.length;i++) {var pathComponent=pathComponentListArr[i][1][1];var shapeOperation=pathComponent["shapeOperation"][1][1];var windingFill=("windingFill"in pathComponent)?pathComponent["windingFill"][1]:false;var subpathsArr=[];var subpathListArr=pathComponent["subpathListKey"][1];for(var j=0;j<subpathListArr.length;j++) {var subpathsList=subpathListArr[j][1][1];var closedSubpath=("closedSubpath"in subpathsList)?subpathsList["closedSubpath"][1]:false;var pathPointsArr=[];var pointsArr=subpathsList["points"][1];for(var k=0;k<pointsArr.length;k++) {var pathPoint=pointsArr[k][1][1];var pathPointArr=[];var anchor=pathPoint["anchor"][1][1];pathPointArr.push([getValue(anchor["horizontal"]),getValue(anchor["vertical"])]);if("forward"in pathPoint) {var forward=pathPoint["forward"][1][1];pathPointArr.push([getValue(forward["horizontal"]),getValue(forward["vertical"])]);} if("backward"in pathPoint) {var backward=pathPoint["backward"][1][1];pathPointArr.push([getValue(backward["horizontal"]),getValue(backward["vertical"])]);} var smooth=("smooth"in pathPoint)?pathPoint["smooth"][1]:false;if(smooth) {pathPointArr.push(smooth);} pathPointsArr.push(pathPointArr);} var subpathArr=[];subpathArr.push(pathPointsArr);if(closedSubpath) {subpathArr.push(closedSubpath);} subpathsArr.push(subpathArr);} var pathComponentArr=[];pathComponentArr.push(shapeOperation);pathComponentArr.push(subpathsArr);if(windingFill) {pathComponentArr.push(windingFill);} data.push(pathComponentArr);} pathComponents.push(data);if(unit) {pathComponents.push(unit);}} return pathComponents;};}());}
// jamJSON.jsxinc v4.4 (minified)
if(typeof jamJSON!=='object') {var jamJSON={};(function() {var state;var stack;var container;var key;var value;var escapes={'\\':'\\','"':'"','/':'/','t':'\t','n':'\n','r':'\r','f':'\f','b':'\b'};var action={'{':{go:function() {stack.push({state:'ok'});container={};state='firstokey';},ovalue:function() {stack.push({container:container,state:'ocomma',key:key});container={};state='firstokey';},firstavalue:function() {stack.push({container:container,state:'acomma'});container={};state='firstokey';},avalue:function() {stack.push({container:container,state:'acomma'});container={};state='firstokey';}},'}':{firstokey:function() {var pop=stack.pop();value=container;container=pop.container;key=pop.key;state=pop.state;},ocomma:function() {var pop=stack.pop();container[key]=value;value=container;container=pop.container;key=pop.key;state=pop.state;}},'[':{go:function() {stack.push({state:'ok'});container=[];state='firstavalue';},ovalue:function() {stack.push({container:container,state:'ocomma',key:key});container=[];state='firstavalue';},firstavalue:function() {stack.push({container:container,state:'acomma'});container=[];state='firstavalue';},avalue:function() {stack.push({container:container,state:'acomma'});container=[];state='firstavalue';}},']':{firstavalue:function() {var pop=stack.pop();value=container;container=pop.container;key=pop.key;state=pop.state;},acomma:function() {var pop=stack.pop();container.push(value);value=container;container=pop.container;key=pop.key;state=pop.state;}},':':{colon:function() {if(container.hasOwnProperty(key)) {throw new SyntaxError("[jamJSON.parse] Duplicate key: “"+key+"”");} state='ovalue';}},',':{ocomma:function() {container[key]=value;state='okey';},acomma:function() {container.push(value);state='avalue';}},'true':{go:function() {value=true;state='ok';},ovalue:function() {value=true;state='ocomma';},firstavalue:function() {value=true;state='acomma';},avalue:function() {value=true;state='acomma';}},'false':{go:function() {value=false;state='ok';},ovalue:function() {value=false;state='ocomma';},firstavalue:function() {value=false;state='acomma';},avalue:function() {value=false;state='acomma';}},'null':{go:function() {value=null;state='ok';},ovalue:function() {value=null;state='ocomma';},firstavalue:function() {value=null;state='acomma';},avalue:function() {value=null;state='acomma';}}};var number={go:function() {state='ok';},ovalue:function() {state='ocomma';},firstavalue:function() {state='acomma';},avalue:function() {state='acomma';}};var string={go:function() {state='ok';},firstokey:function() {key=value;state='colon';},okey:function() {key=value;state='colon';},ovalue:function() {state='ocomma';},firstavalue:function() {state='acomma';},avalue:function() {state='acomma';}};var commentFunc=function(){};function debackslashify(text) {return text.replace(/\\(?:u(.{4})|([^u]))/g,function(a,b,c){return(b)?String.fromCharCode(parseInt(b,16)):escapes[c];});} jamJSON.parse=function(text,validate,allowComments) {if(validate) {var tx=/^[\x20\t\n\r]*(?:([,:\[\]{}]|true|false|null)|(-?(?:0|[1-9][0-9]*)(?:\.[0-9]+)?(?:[eE][+\-]?[0-9]+)?)|"((?:[^\r\n\t\\\"]|\\(?:["\\\/trnfb]|u[0-9a-fA-F]{4}))*)")/;var txc=/^[\x20\t\n\r]*(?:(\/(?:\/.*|\*(?:.|[\r\n])*?\*\/))|([,:\[\]{}]|true|false|null)|(-?(?:0|[1-9][0-9]*)(?:\.[0-9]+)?(?:[eE][+\-]?[0-9]+)?)|"((?:[^\r\n\t\\\"]|\\(?:["\\\/trnfb]|u[0-9a-fA-F]{4}))*)")/;var r;var i;var actionFunc;state='go';stack=[];try {while(true) {i=(allowComments)?1:0;r=(allowComments)?txc.exec(text):tx.exec(text);if(!r) {break;} if(allowComments&&r[1]) {actionFunc=commentFunc;} else if(r[i+1]) {actionFunc=action[r[i+1]][state];} else if(r[i+2]) {value=+r[i+2];actionFunc=number[state];} else {value=debackslashify(r[i+3]);actionFunc=string[state];} if(actionFunc) {actionFunc();text=text.slice(r[0].length);} else {break;}}} catch(e) {state=e;} if(state!=='ok'||/[^\x20\t\n\r]/.test(text)) {throw state instanceof SyntaxError?state:new SyntaxError("[jamJSON.parse] Invalid JSON");} return value;} else {return eval('('+text+')');}};var escapable=/[\\\"\x00-\x1F\x7F-\x9F\u00AD\u0600-\u0604\u070F\u17B4\u17B5\u200C-\u200F\u2028-\u202F\u2060-\u206F\uFEFF\uFFF0-\uFFFF]/g;var meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'};var gap;var indent;var prefixIndent;function quote(string) {escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return(typeof c==='string')?c:'\\u'+('0000'+a.charCodeAt(0).toString(16).toUpperCase()).slice(-4);})+'"':'"'+string+'"';} function str(value) {var i;var k;var v;var mind=gap;var partial;switch(typeof value) {case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value) {return'null';} gap+=indent;partial=[];if(value.constructor===Array) {for(i=0;i<value.length;i++) {partial[i]=str(value[i]);} v=(partial.length===0)?(gap?'[\n'+prefixIndent+mind+']':'[ ]'):(gap?'[\n'+prefixIndent+gap+partial.join(',\n'+prefixIndent+gap)+'\n'+prefixIndent+mind+']':'[ '+partial.join(', ')+' ]');gap=mind;return v;} else {for(k in value) {if(value.hasOwnProperty(k)) {v=str(value[k]);if(v) {partial.push(quote(k)+(gap&&((v.charAt(0)==='{')||(v.charAt(0)==='['))?':\n'+prefixIndent+gap:': ')+v);}}} v=(partial.length===0)?(gap?'{\n'+prefixIndent+mind+'}':'{ }'):(gap?'{\n'+prefixIndent+gap+partial.join(',\n'+prefixIndent+gap)+'\n'+prefixIndent+mind+'}':'{ '+partial.join(', ')+' }');gap=mind;return v;} default:throw new SyntaxError("[jamJSON.stringify] Invalid JSON");}} jamJSON.stringify=function(value,space,prefix) {var i;gap='';indent='';prefixIndent='';if(typeof space==='number') {for(i=0;i<space;i++) {indent+=' ';}} else if(typeof space==='string') {indent=space;} if(typeof prefix==='number') {for(i=0;i<prefix;i++) {prefixIndent+=' ';}} else if(typeof prefix==='string') {prefixIndent=prefix;} return prefixIndent+str(value);};}());}
// jamLayers.jsxinc v4.4.3 (minified)
if(typeof jamLayers!=='object') {var jamLayers={};(function() {function getObjectClass(object) {return(jamEngine.parseCompact(object))[0];} function toBlackAndWhite(desc) {function restoreDesc(desc) {var restoredDesc={};for(var key in desc) {if(desc.hasOwnProperty(key)) {var value=desc[key];var typedValue=null;switch(key) {case"using":typedValue=["<path>",value];break;case"useTint":typedValue=["<boolean>",value];break;case"blue":case"cyan":case"green":case"magenta":case"red":case"yellow":typedValue=["<integer>",value];break;case"tintColor":typedValue=jamHelpers.toColorObject(value);break;} if(typedValue) {restoredDesc[key]=typedValue;}}} return restoredDesc;} return restoreDesc(desc);} function toBrightnessContrast(desc) {function restoreDesc(desc) {var restoredDesc={};for(var key in desc) {if(desc.hasOwnProperty(key)) {var value=desc[key];var typedValue=null;switch(key) {case"useLegacy":typedValue=["<boolean>",value];break;case"brightness":case"contrast":typedValue=["<integer>",value];break;} if(typedValue) {restoredDesc[key]=typedValue;}}} return restoredDesc;} return restoreDesc(desc);} function toChannelMixer(desc) {function restoreDesc(desc,hintData) {var restoredDesc={};for(var key in desc) {if(desc.hasOwnProperty(key)) {var value=desc[key];var typedValue=null;switch(key) {case"using":typedValue=["<path>",value];break;case"monochromatic":typedValue=["<boolean>",value];break;case"black":case"blue":case"cyan":case"green":case"magenta":case"red":case"yellowColor":if(hintData) {typedValue=["<unitDouble>",[hintData,value]];} else {typedValue=["<object>",["channelMatrix",restoreDesc(value,"percentUnit")]];} break;case"gray":typedValue=["<object>",["channelMatrix",restoreDesc(value,"percentUnit")]];break;case"constant":typedValue=["<unitDouble>",[hintData,value]];break;} if(typedValue) {restoredDesc[key]=typedValue;}}} return restoredDesc;} return restoreDesc(desc);} function toColorBalance(desc) {function restoreDesc(desc) {var restoredDesc={};for(var key in desc) {if(desc.hasOwnProperty(key)) {var value=desc[key];var typedValue=null;var restoredList;switch(key) {case"preserveLuminosity":typedValue=["<boolean>",value];break;case"shadowLevels":case"midtoneLevels":case"highlightLevels":restoredList=[];for(var i=0;i<value.length;i++) {restoredList.push(["<integer>",value[i]]);} typedValue=["<list>",restoredList];break;} if(typedValue) {restoredDesc[key]=typedValue;}}} return restoredDesc;} return restoreDesc(desc);} function toCurves(desc) {function restoreDesc(desc) {var restoredDesc={};for(var key in desc) {if(desc.hasOwnProperty(key)) {var value=desc[key];var typedValue=null;var restoredList;switch(key) {case"using":typedValue=["<path>",value];break;case"horizontal":case"vertical":typedValue=["<double>",value];break;case"adjustment":restoredList=[];for(var i=0;i<value.length;i++) {restoredList.push(["<object>",["curvesAdjustment",restoreDesc(value[i])]]);} typedValue=["<list>",restoredList];break;case"curve":restoredList=[];for(var i=0;i<value.length;i++) {restoredList.push(["<object>",["point",restoreDesc(value[i])]]);} typedValue=["<list>",restoredList];break;case"mapping":restoredList=[];for(var i=0;i<value.length;i++) {restoredList.push(["<integer>",value[i]]);} typedValue=["<list>",restoredList];break;case"channel":typedValue=["<reference>",[["channel",["<enumerated>",["channel",value]]]]];break;} if(typedValue) {restoredDesc[key]=typedValue;}}} return restoredDesc;} return restoreDesc(desc);} function toExposure(desc) {function restoreDesc(desc) {var restoredDesc={};for(var key in desc) {if(desc.hasOwnProperty(key)) {var value=desc[key];var typedValue=null;switch(key) {case"using":typedValue=["<path>",value];break;case"exposure":case"gammaCorrection":case"offset":typedValue=["<double>",value];break;} if(typedValue) {restoredDesc[key]=typedValue;}}} return restoredDesc;} return restoreDesc(desc);} function toGradientMap(desc) {function restoreDesc(desc) {var restoredDesc={};for(var key in desc) {if(desc.hasOwnProperty(key)) {var value=desc[key];var typedValue=null;switch(key) {case"dither":case"reverse":typedValue=["<boolean>",value];break;case"gradient":typedValue=jamHelpers.toGradientObject(value);break;} if(typedValue) {restoredDesc[key]=typedValue;}}} return restoredDesc;} return restoreDesc(desc);} function toHueSaturation(desc) {function restoreDesc(desc) {var restoredDesc={};for(var key in desc) {if(desc.hasOwnProperty(key)) {var value=desc[key];var typedValue=null;var restoredList;switch(key) {case"using":typedValue=["<path>",value];break;case"colorize":typedValue=["<boolean>",value];break;case"beginRamp":case"beginSustain":case"endRamp":case"endSustain":case"hue":case"lightness":case"localRange":case"saturation":typedValue=["<integer>",value];break;case"adjustment":restoredList=[];for(var i=0;i<value.length;i++) {restoredList.push(["<object>",["hueSatAdjustmentV2",restoreDesc(value[i])]]);} typedValue=["<list>",restoredList];break;case"channel":typedValue=["<reference>",[["channel",["<enumerated>",["channel",value]]]]];break;} if(typedValue) {restoredDesc[key]=typedValue;}}} return restoredDesc;} return restoreDesc(desc);} function toLevels(desc) {function restoreDesc(desc) {var restoredDesc={};for(var key in desc) {if(desc.hasOwnProperty(key)) {var value=desc[key];var typedValue=null;var restoredList;switch(key) {case"using":typedValue=["<path>",value];break;case"auto":case"autoBlackWhite":case"autoContrast":case"autoNeutrals":typedValue=["<boolean>",value];break;case"blackClip":case"gamma":case"whiteClip":typedValue=["<double>",value];break;case"input":case"output":restoredList=[];for(var i=0;i<value.length;i++) {restoredList.push(["<integer>",value[i]]);} typedValue=["<list>",restoredList];break;case"adjustment":restoredList=[];for(var i=0;i<value.length;i++) {restoredList.push(["<object>",["levelsAdjustment",restoreDesc(value[i])]]);} typedValue=["<list>",restoredList];break;case"channel":typedValue=["<reference>",[["channel",["<enumerated>",["channel",value]]]]];break;} if(typedValue) {restoredDesc[key]=typedValue;}}} return restoredDesc;} return restoreDesc(desc);} function toPhotoFilter(desc) {function restoreDesc(desc) {var restoredDesc={};for(var key in desc) {if(desc.hasOwnProperty(key)) {var value=desc[key];var typedValue=null;switch(key) {case"preserveLuminosity":typedValue=["<boolean>",value];break;case"density":typedValue=["<integer>",value];break;case"color":typedValue=jamHelpers.toColorObject(value);break;} if(typedValue) {restoredDesc[key]=typedValue;}}} return restoredDesc;} return restoreDesc(desc);} function toPosterize(desc) {function restoreDesc(desc) {var restoredDesc={};for(var key in desc) {if(desc.hasOwnProperty(key)) {var value=desc[key];var typedValue=null;switch(key) {case"levels":typedValue=["<integer>",value];break;} if(typedValue) {restoredDesc[key]=typedValue;}}} return restoredDesc;} return restoreDesc(desc);} function toSelectiveColor(desc) {function restoreDesc(desc) {var restoredDesc={};for(var key in desc) {if(desc.hasOwnProperty(key)) {var value=desc[key];var typedValue=null;var restoredList;switch(key) {case"using":typedValue=["<path>",value];break;case"colors":typedValue=["<enumerated>",["colors",value]];break;case"method":typedValue=["<enumerated>",["correctionMethod",value]];break;case"black":case"cyan":case"magenta":case"yellowColor":typedValue=["<unitDouble>",["percentUnit",value]];break;case"colorCorrection":restoredList=[];for(var i=0;i<value.length;i++) {restoredList.push(["<object>",["colorCorrection",restoreDesc(value[i])]]);} typedValue=["<list>",restoredList];break;} if(typedValue) {restoredDesc[key]=typedValue;}}} return restoredDesc;} return restoreDesc(desc);} function toThreshold(desc) {function restoreDesc(desc) {var restoredDesc={};for(var key in desc) {if(desc.hasOwnProperty(key)) {var value=desc[key];var typedValue=null;switch(key) {case"level":typedValue=["<integer>",value];break;} if(typedValue) {restoredDesc[key]=typedValue;}}} return restoredDesc;} return restoreDesc(desc);} function toVibrance(desc) {function restoreDesc(desc) {var restoredDesc={};for(var key in desc) {if(desc.hasOwnProperty(key)) {var value=desc[key];var typedValue=null;switch(key) {case"vibrance":case"saturation":typedValue=["<integer>",value];break;} if(typedValue) {restoredDesc[key]=typedValue;}}} return restoredDesc;} return restoreDesc(desc);} function toGradient(desc) {function restoreDesc(desc,hintData) {var restoredDesc={};for(var key in desc) {if(desc.hasOwnProperty(key)) {var value=desc[key];var typedValue=null;switch(key) {case"align":case"dither":case"reverse":typedValue=["<boolean>",value];break;case"angle":typedValue=["<unitDouble>",["angleUnit",value]];break;case"scale":typedValue=["<unitDouble>",["percentUnit",value]];break;case"horizontal":case"vertical":typedValue=["<unitDouble>",[hintData,value]];break;case"offset":typedValue=["<object>",["point",restoreDesc(value,"percentUnit")]];break;case"type":typedValue=["<enumerated>",["gradientType",value]];break;case"gradient":typedValue=jamHelpers.toGradientObject(value);break;} if(typedValue) {restoredDesc[key]=typedValue;}}} return restoredDesc;} return restoreDesc(desc);} function toPattern(desc) {function restoreDesc(desc,hintData) {var restoredDesc={};for(var key in desc) {if(desc.hasOwnProperty(key)) {var value=desc[key];var typedValue=null;switch(key) {case"align":typedValue=["<boolean>",value];break;case"ID":case"name":typedValue=["<string>",value];break;case"scale":typedValue=["<unitDouble>",["percentUnit",value]];break;case"horizontal":case"vertical":typedValue=["<double>",value];break;case"phase":typedValue=["<object>",["point",restoreDesc(value)]];break;case"pattern":typedValue=["<object>",["pattern",restoreDesc(value)]];break;} if(typedValue) {restoredDesc[key]=typedValue;}}} return restoredDesc;} return restoreDesc(desc);} function toSolidColor(desc) {function restoreDesc(desc) {var restoredDesc={};for(var key in desc) {if(desc.hasOwnProperty(key)) {var value=desc[key];var typedValue=null;switch(key) {case"color":typedValue=jamHelpers.toColorObject(value);break;} if(typedValue) {restoredDesc[key]=typedValue;}}} return restoredDesc;} return restoreDesc(desc);} jamLayers.toLayerTypeObject=function(layerType) {var result=null;var typeArr=jamEngine.parseCompact(layerType);var kind=typeArr[0];var desc=typeArr[1];var toAdjustmentFunctions={"blackAndWhite":toBlackAndWhite,"brightnessContrast":toBrightnessContrast,"channelMixer":toChannelMixer,"colorBalance":toColorBalance,"curves":toCurves,"exposure":toExposure,"gradientMapClass":toGradientMap,"hueSaturation":toHueSaturation,"invert":null,"levels":toLevels,"photoFilter":toPhotoFilter,"posterize":toPosterize,"selectiveColor":toSelectiveColor,"thresholdClassEvent":toThreshold,"vibrance":toVibrance,"gradientLayer":toGradient,"patternLayer":toPattern,"solidColorLayer":toSolidColor};if(kind in toAdjustmentFunctions) {result=(desc)?["<object>",[kind,(toAdjustmentFunctions[kind])(desc)]]:["<class>",kind];} return result;};jamLayers.toLayerObject=function(layer) {var that=this;function restoreDesc(desc) {var restoredDesc={};for(var key in desc) {if(desc.hasOwnProperty(key)) {var value=desc[key];var typedValue=null;var restoredList;switch(key) {case"group":case"blendClipped":case"blendInterior":case"fillNeutral":case"layerMaskAsGlobalMask":case"protectAll":case"protectComposite":case"protectPosition":case"protectTransparency":case"transparencyShapesLayer":case"vectorMaskAsGlobalMask":typedValue=["<boolean>",value];break;case"name":typedValue=["<string>",value];break;case"srcBlackMin":case"srcBlackMax":case"srcWhiteMin":case"srcWhiteMax":case"destBlackMin":case"destBlackMax":case"destWhiteMin":case"destWhiteMax":typedValue=["<integer>",value];break;case"fillOpacity":case"opacity":case"userMaskDensity":case"vectorMaskDensity":typedValue=["<unitDouble>",["percentUnit",value]];break;case"userMaskFeather":case"vectorMaskFeather":typedValue=["<unitDouble>",["pixelsUnit",value]];break;case"mode":typedValue=["<enumerated>",["blendMode",value]];break;case"color":typedValue=["<enumerated>",["color",value]];break;case"knockout":typedValue=["<enumerated>",["knockout",value]];break;case"channel":typedValue=["<reference>",[["channel",["<enumerated>",["channel",value]]]]];break;case"layerLocking":typedValue=["<object>",["layerLocking",restoreDesc(value)]];break;case"blendRange":restoredList=[];for(var i=0;i<value.length;i++) {restoredList.push(["<object>",["blendRange",restoreDesc(value[i])]]);} typedValue=["<list>",restoredList];break;case"channelRestrictions":restoredList=[];for(var i=0;i<value.length;i++) {restoredList.push(["<enumerated>",["channel",value[i]]]);} typedValue=["<list>",restoredList];break;case"type":typedValue=that.toLayerTypeObject(value);break;} if(typedValue) {restoredDesc[key]=typedValue;}}} return restoredDesc;} var layerClass=getObjectClass(layer);return["<object>",[layerClass,restoreDesc(layer[layerClass])]];};jamLayers.fromLayerObject=function(layerObject) {var layer={};function layerHook(desc,key,getDefaultValue) {var replacedValue=undefined;switch(key) {case"layerObject":case"type":if(desc[key][0]==="<object>") {replacedValue={};replacedValue[desc[key][1][0]]=getDefaultValue(desc,key);} else if(desc[key][0]==="<class>") {replacedValue={};replacedValue[desc[key][1]]=null;} break;case"channel":var value=getDefaultValue(desc,key);replacedValue=value[0]["channel"];break;} return replacedValue;} return jamEngine.simplifyObject(["<object>",["layerObject",{"layerObject":layerObject}]],layerHook)["layerObject"];};jamLayers.toLayerClassReference=function(layer) {return["<reference>",[[getObjectClass(layer),["<class>",null]]]];};jamLayers.makeLayer=function(layer,below) {var makeDesc={"target":this.toLayerClassReference(layer),"using":this.toLayerObject(layer)};if(below) {makeDesc["below"]=["<boolean>",below];} jamEngine.jsonPlay("make",makeDesc);};jamLayers.toLayerReference=function(layer) {return["<reference>",[[getObjectClass(layer),["<enumerated>",["ordinal","targetEnum"]]]]];};jamLayers.setLayerProperties=function(layerProperties) {var layer={"layer":layerProperties};var setDesc={"target":this.toLayerReference(layer),"to":this.toLayerObject(layer)};jamEngine.jsonPlay("set",setDesc);};jamLayers.toLayerTypeReference=function(layerType) {var layerTypeClasses={"blackAndWhite":"adjustmentLayer","brightnessContrast":"adjustmentLayer","channelMixer":"adjustmentLayer","colorBalance":"adjustmentLayer","curves":"adjustmentLayer","exposure":"adjustmentLayer","gradientMapClass":"adjustmentLayer","hueSaturation":"adjustmentLayer","invert":"adjustmentLayer","levels":"adjustmentLayer","photoFilter":"adjustmentLayer","posterize":"adjustmentLayer","selectiveColor":"adjustmentLayer","thresholdClassEvent":"adjustmentLayer","vibrance":"adjustmentLayer","gradientLayer":"contentLayer","patternLayer":"contentLayer","solidColorLayer":"contentLayer"};return["<reference>",[[layerTypeClasses[getObjectClass(layerType)],["<enumerated>",["ordinal","targetEnum"]]]]];};jamLayers.setLayerType=function(layerType) {var setDesc={"target":this.toLayerTypeReference(layerType),"to":this.toLayerTypeObject(layerType)};jamEngine.jsonPlay("set",setDesc);};jamLayers.groupLayer=function() {jamEngine.jsonPlay("groupEvent");};jamLayers.ungroupLayer=function() {jamEngine.jsonPlay("ungroup");};}());}
// jamStyles.jsxinc v4.4.2 (minified)
if(typeof jamStyles!=='object') {var jamStyles={};(function() {jamStyles.isStylesFile=function(file) {return(file.type==='8BSL')||file.name.match(/\.asl$/i);};jamStyles.isStylesPalette=function(file) {return file.name.match(/^Styles.psp$/i);};jamStyles.toLayerEffectsObject=function(layerEffects) {function restoreDesc(desc,hintData) {var restoredDesc={};for(var key in desc) {if(desc.hasOwnProperty(key)) {var value=desc[key];var typedValue=null;var restoredList;switch(key) {case"align":case"antiAlias":case"antialiasGloss":case"continuity":case"dither":case"enabled":case"invert":case"invertTexture":case"layerConceals":case"linked":case"reverse":case"showTransparency":case"useGlobalAngle":case"useShape":case"useTexture":case"vectorColor":typedValue=["<boolean>",value];break;case"book":case"ID":case"name":typedValue=["<string>",localize(value)];break;case"bookKey":typedValue=["<data>",value];break;case"bookID":case"location":case"midpoint":case"randomSeed":case"smoothness":typedValue=["<integer>",value];break;case"a":case"b":case"black":case"blue":case"brightness":case"cyan":case"gray":case"green":case"interpolation":case"luminance":case"magenta":case"red":case"saturation":case"yellowColor":typedValue=["<double>",value];break;case"angle":case"hue":case"localLightingAngle":case"localLightingAltitude":typedValue=["<unitDouble>",["angleUnit",value]];break;case"chokeMatte":case"highlightOpacity":case"inputRange":case"noise":case"opacity":case"scale":case"shadingNoise":case"shadowOpacity":case"strengthRatio":case"textureDepth":typedValue=["<unitDouble>",["percentUnit",value]];break;case"blur":case"distance":case"size":case"softness":typedValue=["<unitDouble>",["pixelsUnit",value]];break;case"horizontal":case"vertical":typedValue=(hintData)?["<unitDouble>",[hintData,value]]:["<double>",value];break;case"type":var enumType;switch(value) {case"linear":case"radial":case"angle":case"reflected":case"diamond":case"shapeburst":enumType="gradientType";break;case"foregroundColor":case"backgroundColor":case"userStop":enumType="colorStopType";break;} typedValue=["<enumerated>",[enumType,value]];break;case"colorSpace":typedValue=["<enumerated>",["colorSpace",value]];break;case"gradientForm":typedValue=["<enumerated>",["gradientForm",value]];break;case"paintType":typedValue=["<enumerated>",["frameFill",value]];break;case"bevelDirection":typedValue=["<enumerated>",["bevelEmbossStampStyle",value]];break;case"bevelStyle":typedValue=["<enumerated>",["bevelEmbossStyle",value]];break;case"bevelTechnique":typedValue=["<enumerated>",["bevelTechnique",value]];break;case"glowTechnique":typedValue=["<enumerated>",["matteTechnique",value]];break;case"innerGlowSource":typedValue=["<enumerated>",["innerGlowSourceType",value]];break;case"style":typedValue=["<enumerated>",["frameStyle",value]];break;case"highlightMode":case"mode":case"shadowMode":typedValue=["<enumerated>",["blendMode",value]];break;case"bevelEmboss":case"chromeFX":case"dropShadow":case"frameFX":case"gradientFill":case"innerGlow":case"innerShadow":case"outerGlow":case"pattern":case"patternFill":case"solidFill":typedValue=["<object>",[key,restoreDesc(value)]];break;case"color":case"highlightColor":case"shadowColor":var colorClass;if((("book"in value)&&("name"in value))||(("bookID"in value)&&("bookKey"in value))) {colorClass="bookColor";} else if(("cyan"in value)&&("magenta"in value)&&("yellowColor"in value)&&("black"in value)) {colorClass="CMYKColorClass";} else if("gray"in value) {colorClass="grayscale";} else if(("hue"in value)&&("saturation"in value)&&("brightness"in value)) {colorClass="HSBColorClass";} else if(("luminance"in value)&&("a"in value)&&("b"in value)) {colorClass="labColor";} else if(("red"in value)&&("green"in value)&&("blue"in value)) {colorClass="RGBColor";} typedValue=["<object>",[colorClass,restoreDesc(value)]];break;case"gradient":typedValue=["<object>",["gradientClassEvent",restoreDesc(value)]];break;case"mappingShape":case"transparencyShape":typedValue=["<object>",["shapingCurve",restoreDesc(value)]];break;case"offset":typedValue=["<object>",["point",restoreDesc(value,"percentUnit")]];break;case"phase":typedValue=["<object>",["point",restoreDesc(value)]];break;case"minimum":case"maximum":restoredList=[];for(var i=0;i<value.length;i++) {restoredList.push(["<integer>",value[i]]);} typedValue=["<list>",restoredList];break;case"colors":restoredList=[];for(var i=0;i<value.length;i++) {restoredList.push(["<object>",["colorStop",restoreDesc(value[i])]]);} typedValue=["<list>",restoredList];break;case"transparency":restoredList=[];for(var i=0;i<value.length;i++) {restoredList.push(["<object>",["transparencyStop",restoreDesc(value[i])]]);} typedValue=["<list>",restoredList];break;case"curve":restoredList=[];for(var i=0;i<value.length;i++) {restoredList.push(["<object>",["curvePoint",restoreDesc(value[i])]]);} typedValue=["<list>",restoredList];break;case"layerEffects":typedValue=["<object>",["layerEffects",restoreDesc(value)]];break;} if(typedValue) {restoredDesc[key]=typedValue;}}} return restoredDesc;} return restoreDesc({"layerEffects":layerEffects})["layerEffects"];};jamStyles.fromLayerEffectsObject=function(layerEffectsObject) {return jamEngine.simplifyObject(layerEffectsObject);};jamStyles.toBlendOptionsObject=function(blendOptions) {function restoreDesc(desc) {var restoredDesc={};for(var key in desc) {if(desc.hasOwnProperty(key)) {var value=desc[key];var typedValue=null;var restoredList;switch(key) {case"blendClipped":case"blendInterior":case"layerMaskAsGlobalMask":case"transparencyShapesLayer":case"vectorMaskAsGlobalMask":typedValue=["<boolean>",value];break;case"srcBlackMin":case"srcBlackMax":case"srcWhiteMin":case"srcWhiteMax":case"destBlackMin":case"destBlackMax":case"destWhiteMin":case"destWhiteMax":typedValue=["<integer>",value];break;case"fillOpacity":case"opacity":typedValue=["<unitDouble>",["percentUnit",value]];break;case"mode":typedValue=["<enumerated>",["blendMode",value]];break;case"knockout":typedValue=["<enumerated>",["knockout",value]];break;case"channel":typedValue=["<reference>",[["channel",["<enumerated>",["channel",value]]]]];break;case"blendRange":restoredList=[];for(var i=0;i<value.length;i++) {restoredList.push(["<object>",["blendRange",restoreDesc(value[i])]]);} typedValue=["<list>",restoredList];break;case"channelRestrictions":restoredList=[];for(var i=0;i<value.length;i++) {restoredList.push(["<enumerated>",["channel",value[i]]]);} typedValue=["<list>",restoredList];break;case"blendOptions":typedValue=["<object>",["blendOptions",restoreDesc(value)]];break;} if(typedValue) {restoredDesc[key]=typedValue;}}} return restoredDesc;} return restoreDesc({"blendOptions":blendOptions})["blendOptions"];};jamStyles.fromBlendOptionsObject=function(blendOptionsObject) {var replaceChannelHook=function(desc,key,getDefaultValue) {var replacedValue=undefined;if(key==="channel") {var value=getDefaultValue(desc,key);replacedValue=value[0]["channel"];} return replacedValue;};return jamEngine.simplifyObject(blendOptionsObject,replaceChannelHook);};jamStyles.toDocumentModeObject=function(documentMode) {function restoreDesc(desc) {var restoredDesc={};for(var key in desc) {if(desc.hasOwnProperty(key)) {var value=desc[key];var typedValue=null;switch(key) {case"colorSpace":typedValue=["<enumerated>",["colorSpace",value]];break;case"depth":typedValue=["<integer>",value];break;case"documentMode":typedValue=["<object>",["documentMode",restoreDesc(value)]];break;} if(typedValue) {restoredDesc[key]=typedValue;}}} return restoredDesc;} return restoreDesc({"documentMode":documentMode})["documentMode"];};jamStyles.fromDocumentModeObject=function(documentModeObject) {return jamEngine.simplifyObject(documentModeObject);};function getDocumentMode() {var documentMode={};var saveMeaningfulIds=jamEngine.meaningfulIds;var saveParseFriendly=jamEngine.parseFriendly;jamEngine.meaningfulIds=true;jamEngine.parseFriendly=true;var resultDescObj;resultDescObj=jamEngine.jsonGet ([["property",["<property>","mode"]],["document",["<enumerated>",["ordinal","targetEnum"]]]]);documentMode["colorSpace"]=resultDescObj["mode"][1][1];resultDescObj=jamEngine.jsonGet ([["property",["<property>","depth"]],["document",["<enumerated>",["ordinal","targetEnum"]]]]);documentMode["depth"]=resultDescObj["depth"][1];jamEngine.meaningfulIds=saveMeaningfulIds;jamEngine.parseFriendly=saveParseFriendly;return documentMode;} function getDocumentResolution() {var saveMeaningfulIds=jamEngine.meaningfulIds;var saveParseFriendly=jamEngine.parseFriendly;jamEngine.meaningfulIds=true;jamEngine.parseFriendly=true;var resultDescObj=jamEngine.jsonGet ([["property",["<property>","resolution"]],["document",["<enumerated>",["ordinal","targetEnum"]]]]);jamEngine.meaningfulIds=saveMeaningfulIds;jamEngine.parseFriendly=saveParseFriendly;return resultDescObj["resolution"][1][1];} jamStyles.setLayerStyle=function(layerStyleObj,ignoreScale) {if(layerStyleObj&&(("blendOptions"in layerStyleObj)||("layerEffects"in layerStyleObj))) {var layerDesc={};if("blendOptions"in layerStyleObj) {defaultBlendOptionsObj={"mode":"normal","opacity":100,"fillOpacity":100,"channelRestrictions":[],"knockout":"none","blendInterior":false,"blendClipped":true,"transparencyShapesLayer":true,"layerMaskAsGlobalMask":false,"vectorMaskAsGlobalMask":false,"blendRange":[]};var documentMode=getDocumentMode();var channelRestrictions;var blendRangeChannels;switch(documentMode["colorSpace"]) {case"CMYKColorEnum":case"CMYK64":channelRestrictions=["cyan","magenta","yellow","black"];blendRangeChannels=["gray","cyan","magenta","yellow","black"];break;case"duotone":case"grayScale":case"gray16":channelRestrictions=["black"];blendRangeChannels=["black"];break;case"labColor":case"lab48":channelRestrictions=["lightness","a","b"];blendRangeChannels=["lightness","a","b"];break;case"RGBColor":case"RGB48":channelRestrictions=["red","green","blue"];blendRangeChannels=["gray","red","green","blue"];break;} defaultBlendOptionsObj["channelRestrictions"]=channelRestrictions;for(var i=0;i<blendRangeChannels.length;i++) {defaultBlendRangeObj={"channel":blendRangeChannels[i],"srcBlackMin":0,"srcBlackMax":0,"srcWhiteMin":255,"srcWhiteMax":255,"destBlackMin":0,"destBlackMax":0,"destWhiteMin":255,"destWhiteMax":255};defaultBlendOptionsObj["blendRange"].push(defaultBlendRangeObj);} var blendOptionsObj=jamUtils.mergeData(layerStyleObj["blendOptions"],defaultBlendOptionsObj);var blendOptionsDesc=this.toBlendOptionsObject(blendOptionsObj)[1][1];for(var key in blendOptionsDesc) {if(blendOptionsDesc.hasOwnProperty(key)) {layerDesc[key]=blendOptionsDesc[key];}}} var layerEffects;if("layerEffects"in layerStyleObj) {layerEffects=layerStyleObj["layerEffects"];layerDesc["layerEffects"]=this.toLayerEffectsObject(layerEffects);} jamEngine.jsonPlay ("set",{"target":["<reference>",[["layer",["<enumerated>",["ordinal","targetEnum"]]]]],"to":["<object>",["layer",layerDesc]]});if(layerEffects) {if(("scale"in layerEffects)&&(!ignoreScale)) {this.scaleLayerEffects((getDocumentResolution()/72)/(layerEffects["scale"]/100)*100);}}} else {this.clearLayerStyle();}};function getPresetStylesCount() {var saveMeaningfulIds=jamEngine.meaningfulIds;var saveParseFriendly=jamEngine.parseFriendly;jamEngine.meaningfulIds=true;jamEngine.parseFriendly=true;var resultDescObj=jamEngine.jsonGet ([["property",["<property>","presetManager"]],["application",["<enumerated>",["ordinal","targetEnum"]]]]);var presetManagerArr=resultDescObj["presetManager"][1];var presetStylesCount;for(var i=0;i<presetManagerArr.length;i++) {var preset=presetManagerArr[i][1];if(preset[0]==="styleClass") {presetStylesCount=preset[1]["name"][1].length;break;}} jamEngine.meaningfulIds=saveMeaningfulIds;jamEngine.parseFriendly=saveParseFriendly;return presetStylesCount;} function isStyledLayer() {var saveMeaningfulIds=jamEngine.meaningfulIds;var saveParseFriendly=jamEngine.parseFriendly;jamEngine.meaningfulIds=true;jamEngine.parseFriendly=true;var isLayer=false;try {var resultDescObj=jamEngine.jsonGet ([["property",["<property>","background"]],["layer",["<enumerated>",["ordinal","targetEnum"]]]]);isLayer=!resultDescObj["background"][1];} catch(e) {} var saveMeaningfulIds=jamEngine.meaningfulIds;var saveParseFriendly=jamEngine.parseFriendly;return isLayer;} jamStyles.getLayerStyle=function() {var layerStyleObj=null;if(isStyledLayer()) {var presetStylesCountBefore=getPresetStylesCount();var date=new Date();var tempStyleName="Temp-Layer-Style-"+date.getTime();try {jamEngine.jsonPlay ("make",{"target":["<reference>",[["style",["<class>",null]]]],"name":["<string>",tempStyleName],"using":["<reference>",[["layer",["<enumerated>",["ordinal","targetEnum"]]]]],"blendOptions":["<boolean>",true],"layerEffects":["<boolean>",true]});} catch(e) {} var presetStylesCount=getPresetStylesCount();if(presetStylesCount===(presetStylesCountBefore+1)) {var tempStylesFile=new File(Folder.temp+"/"+tempStyleName+".asl");jamEngine.jsonPlay ("set",{"target":["<path>",tempStylesFile.fsName],"to":["<list>",[["<reference>",[["style",["<index>",presetStylesCount]]]]]]});jamEngine.jsonPlay ("delete",{"target":["<list>",[["<reference>",[["style",["<index>",presetStylesCount]]]]]]});var tempStylesFileData=this.dataFromStylesFile(tempStylesFile);if(typeof tempStylesFileData==='string') {alert(tempStylesFileData+"\n"+"Styles file: “"+File.decode(tempStylesFile.name)+"”");} else {layerStyleObj=tempStylesFileData["styles"][0];if("name"in layerStyleObj) {delete layerStyleObj["name"];} if("ID"in layerStyleObj) {delete layerStyleObj["ID"];} if("documentMode"in layerStyleObj) {delete layerStyleObj["documentMode"];} if("layerEffects"in layerStyleObj) {var layerEffects=layerStyleObj["layerEffects"];if("masterFXSwitch"in layerEffects) {delete layerEffects["masterFXSwitch"];}}} if(arguments.length>0) {var extraInfo=arguments[0];if(extraInfo&&(extraInfo.constructor===Object)) {if("patterns"in extraInfo) {var tempStylesFilePatterns=this.patternsFromStylesFile(tempStylesFile);if(typeof tempStylesFilePatterns==='string') {alert(tempStylesFilePatterns+"\n"+"Styles file: “"+File.decode(tempStylesFile.name)+"”");} else {extraInfo["patterns"]=tempStylesFilePatterns;}}}} tempStylesFile.remove();}} return layerStyleObj;};jamStyles.copyLayerStyle=function() {try {jamEngine.jsonPlay("copyEffects",null);} catch(e) {}};jamStyles.pasteLayerStyle=function() {try {jamEngine.jsonPlay("pasteEffects",{});} catch(e) {}};jamStyles.clearLayerStyle=function() {try {jamEngine.jsonPlay ("disableLayerStyle",{"target":["<reference>",[["layer",["<enumerated>",["ordinal","targetEnum"]]]]]});} catch(e) {}};jamStyles.applyLayerStyle=function(styleName,merge) {var descriptor={"target":["<reference>",[["style",["<name>",styleName]]]],"to":["<reference>",[["layer",["<enumerated>",["ordinal","targetEnum"]]]]]};if((typeof merge!=='undefined')&&merge) {descriptor["merge"]=["<boolean>",merge];} jamEngine.jsonPlay("applyStyle",descriptor);};jamStyles.scaleLayerEffects=function(scale) {jamEngine.jsonPlay("scaleEffectsEvent",{"scale":["<unitDouble>",["percentUnit",scale]]});};jamStyles.removeLayerEffect=function(effect) {try {jamEngine.jsonPlay ("disableSingleFX",{"target":["<reference>",[[effect,["<class>",null]],["layer",["<enumerated>",["ordinal","targetEnum"]]]]]});} catch(e) {}};jamStyles.removeLayerEffects=function(effects) {for(var i=0;i<effects.length;i++) {this.removeLayerEffect(effects[i]);}};jamStyles.removeAllLayerEffects=function() {try {jamEngine.jsonPlay ("disableLayerFX",{"target":["<reference>",[["layer",["<enumerated>",["ordinal","targetEnum"]]]]]});} catch(e) {}};jamStyles.showHideLayerEffects=function(effects,show) {var references=[];for(var i=0;i<effects.length;i++) {references.push (["<reference>",[[effects[i],["<class>",null]],["layer",["<enumerated>",["ordinal","targetEnum"]]]]]);} try {jamEngine.jsonPlay((show)?"show":"hide",{"target":["<list>",references]},DialogModes.NO);} catch(e) {}};jamStyles.showHideLayerEffect=function(effect,show) {this.showHideLayerEffects([effect],show);};jamStyles.showHideAllLayerEffects=function(show) {this.showHideLayerEffects(["layerEffects"],show);};jamStyles.showHideAllDocumentEffects=function(show) {jamEngine.jsonPlay ("set",{"target":["<reference>",[["property",["<property>","layerFXVisible"]],["document",["<enumerated>",["ordinal","targetEnum"]]]]],"to":["<object>",["layerFXVisible",{"layerFXVisible":["<boolean>",show||false]}]]});};function setGlobalAngle(target,globalLightingAngle,globalAltitude) {var globalAngle={"globalLightingAngle":["<unitDouble>",["angleUnit",globalLightingAngle]]};if(typeof globalAltitude!=='undefined') {globalAngle["globalAltitude"]=["<unitDouble>",["angleUnit",globalAltitude]];} jamEngine.jsonPlay ("set",{"target":["<reference>",[["property",["<property>","globalAngle"]],[target,["<enumerated>",["ordinal","targetEnum"]]]]],"to":["<object>",["globalAngle",globalAngle]]});};jamStyles.setApplicationGlobalAngle=function(globalLightingAngle,globalAltitude) {setGlobalAngle("application",globalLightingAngle,globalAltitude);};jamStyles.setDocumentGlobalAngle=function(globalLightingAngle,globalAltitude) {setGlobalAngle("document",globalLightingAngle,globalAltitude);};function readBEInt(file,byteCount) {var bytes=file.read(byteCount);var intValue=0;for(var index=0;index<byteCount;index++) {intValue=(intValue<<8)+bytes.charCodeAt(index);} return intValue;} function readUnicodeString(file) {var unicodeString="";var unicodeLength=readBEInt(file,4);for(var index=0;index<unicodeLength;index++) {var unicodeChar=readBEInt(file,2);if(unicodeChar!==0) {unicodeString+=String.fromCharCode(unicodeChar);}} return unicodeString;} function readBytes(file,byteCount) {return file.read(byteCount);} function readPascalString(file) {var stringLength=readBEInt(file,1);return readBytes(file,stringLength);} jamStyles.dataFromStylesFile=function(stylesFile,includePatternsInfo) {var imageModes=["Bitmap","Grayscale","Indexed","RGB","CMYK",null,null,"Multichannel","Duotone","Lab"];var file;if(typeof stylesFile==='string') {file=new File(stylesFile);} else if(stylesFile instanceof File) {file=stylesFile;} else {throw new Error('[jamStyles.dataFromStylesFile] Invalid argument');} var fileData;if(file.open("r")) {try {file.encoding='BINARY';var formatVersion;if(this.isStylesPalette(file)) {formatVersion=2;} else if(this.isStylesFile(file)) {formatVersion=readBEInt(file,2);} if(formatVersion===2) {var magicNumber=file.read(4);if(magicNumber==='8BSL') {var subVersion=readBEInt(file,2);if(subVersion===3) {var patternsLength=readBEInt(file,4);var patternsEnd=file.tell()+patternsLength;if(includePatternsInfo) {var patterns=[];while(file.tell()<patternsEnd) {var pattern={};var patternLength=readBEInt(file,4);var patternEnd=file.tell()+patternLength;var patternVersion=readBEInt(file,4);pattern["version"]=patternVersion;if(patternVersion===1) {pattern["imageMode"]=imageModes[readBEInt(file,4)];pattern["height"]=readBEInt(file,2);pattern["width"]=readBEInt(file,2);pattern["name"]=readUnicodeString(file);pattern["ID"]=readPascalString(file);} else {pattern["error"]="Unsupported version";} patterns.push(pattern);file.seek(patternEnd+((4-(patternLength%4))%4),0);}} file.seek(patternsEnd,0);var saveMeaningfulIds=jamEngine.meaningfulIds;var saveParseFriendly=jamEngine.parseFriendly;jamEngine.meaningfulIds=true;jamEngine.parseFriendly=true;var actionDescriptor;var jsonDesc;var styles=[];var styleCount=readBEInt(file,4);for(var i=0;i<styleCount;i++) {var style={};var styleLength=readBEInt(file,4);var styleEnd=file.tell()+styleLength;actionDescriptor=jamActions.readActionDescriptor(file);jsonDesc=jamEngine.classIdAndActionDescriptorToJson(0,actionDescriptor)["<descriptor>"];style["name"]=jsonDesc["name"][1];style["ID"]=jsonDesc["ID"][1];actionDescriptor=jamActions.readActionDescriptor(file);jsonDesc=jamEngine.classIdAndActionDescriptorToJson(0,actionDescriptor)["<descriptor>"];if("documentMode"in jsonDesc) {style["documentMode"]=this.fromDocumentModeObject(jsonDesc["documentMode"]);} if("blendOptions"in jsonDesc) {style["blendOptions"]=this.fromBlendOptionsObject(jsonDesc["blendOptions"]);} if("layerEffects"in jsonDesc) {style["layerEffects"]=this.fromLayerEffectsObject(jsonDesc["layerEffects"]);} styles.push(style);file.seek(styleEnd,0);} jamEngine.meaningfulIds=saveMeaningfulIds;jamEngine.parseFriendly=saveParseFriendly;fileData={};if(includePatternsInfo) {fileData["patterns"]=patterns;} fileData["styles"]=styles;} else {throw new Error("[jamStyles.dataFromStylesFile] Unrecognized styles file format! Sub-version: "+subVersion);}} else {throw new Error("[jamStyles.dataFromStylesFile] Unrecognized styles file format! Magic number: "+magicNumber);}} else {throw new Error("[jamStyles.dataFromStylesFile] Unrecognized styles file format! Format version: "+formatVersion);}} catch(e) {fileData=e.message;} finally {file.close();}} else {fileData="Cannot open file";} return fileData;};jamStyles.patternsFromStylesFile=function(stylesFile) {var file;if(typeof stylesFile==='string') {file=new File(stylesFile);} else if(stylesFile instanceof File) {file=stylesFile;} else {throw new Error('[jamStyles.patternsFromStylesFile] Invalid argument');} var patternsData;if(file.open("r")) {try {file.encoding='BINARY';var formatVersion;if(this.isStylesPalette(file)) {formatVersion=2;} else if(this.isStylesFile(file)) {formatVersion=readBEInt(file,2);} if(formatVersion===2) {var magicNumber=file.read(4);if(magicNumber==='8BSL') {var subVersion=readBEInt(file,2);if(subVersion===3) {var patternsLength=readBEInt(file,4);var patternsEnd=file.tell()+patternsLength;var patternsData=[];while(file.tell()<patternsEnd) {var patternLength=readBEInt(file,4);patternsData.push(readBytes(file,patternLength));file.seek((4-(patternLength%4))%4,1);}} else {throw new Error("[jamStyles.patternsFromStylesFile] Unrecognized styles file format! Sub-version: "+subVersion);}} else {throw new Error("[jamStyles.patternsFromStylesFile] Unrecognized styles file format! Magic number: "+magicNumber);}} else {throw new Error("[jamStyles.patternsFromStylesFile] Unrecognized styles file format! Format version: "+formatVersion);}} catch(e) {patternsData=e.message;} finally {file.close();}} else {patternsData="Cannot open file";} return patternsData;};jamStyles.patternsFileFromPatterns=function(patternsFile,patternsData) {var file;if(typeof patternsFile==='string') {file=new File(patternsFile);} else if(patternsFile instanceof File) {file=patternsFile;} else {throw new Error('[jamStyles.patternsFileFromPatterns] Invalid argument');} if(file.open('w','8BPT','8BIM')) {file.encoding="BINARY";file.write('8BPT');file.write('\x00\x01');var count=patternsData.length;file.write(String.fromCharCode((count>>24)&0xFF,(count>>16)&0xFF,(count>>8)&0xFF,count&0xFF));for(var index=0;index<count;index++) {file.write(patternsData[index]);} file.close();}};}());}
// jamUtils.jsxinc v4.4 (minified)
if(typeof jamUtils!=='object') {var jamUtils={};(function() {jamUtils.toDistanceUnit=function(amount,amountBasePerInch) {return(amount/amountBasePerInch)*72.0;};jamUtils.fromDistanceUnit=function(amount,amountBasePerInch) {return(amount/72.0)*amountBasePerInch;};jamUtils.fontExists=function(fontPostScriptName) {var useDOM=true;var found=false;if(useDOM) {for(var i=0;i<app.fonts.length;i++) {if(app.fonts[i].postScriptName===fontPostScriptName) {found=true;break;}}} else {var saveMeaningfulIds=jamEngine.meaningfulIds;var saveParseFriendly=jamEngine.parseFriendly;jamEngine.meaningfulIds=true;jamEngine.parseFriendly=true;var resultDescriptorObj=jamEngine.jsonGet ([["property",["<property>","fontList"]],["application",["<enumerated>",["ordinal","targetEnum"]]]]);var fontPostScriptNameArr=resultDescriptorObj["fontList"][1][1]["fontPostScriptName"][1];for(var i=0;i<fontPostScriptNameArr.length;i++) {if(fontPostScriptNameArr[i][1]===fontPostScriptName) {found=true;break;}} jamEngine.meaningfulIds=saveMeaningfulIds;jamEngine.parseFriendly=saveParseFriendly;} return found;};jamUtils.loadAction=function(action,actionSet,actionsFilePath) {try {jamEngine.jsonGet([["action",["<name>",action]],["actionSet",["<name>",actionSet]]]);var found=true;} catch(e) {var found=false;} if(!found) {jamEngine.jsonPlay("open",{"target":["<path>",actionsFilePath]});}};jamUtils.loadActionSet=function(actionSet,actionsFilePath) {try {jamEngine.jsonGet([["actionSet",["<name>",actionSet]]]);var found=true;} catch(e) {var found=false;} if(!found) {jamEngine.jsonPlay("open",{"target":["<path>",actionsFilePath]});}};jamUtils.loadPreset=function(presetProperty,presetName,presetFilePath) {var useDOM=false;var useOpen=true;var classes={"brush":"brush","colors":"color","gradientClassEvent":"gradientClassEvent","style":"styleClass","pattern":"'PttR'","shapingCurve":"shapingCurve","customShape":"customShape","toolPreset":"toolPreset"};var presetClass=classes[presetProperty];var saveMeaningfulIds=jamEngine.meaningfulIds;var saveParseFriendly=jamEngine.parseFriendly;jamEngine.meaningfulIds=true;jamEngine.parseFriendly=true;var found=false;var resultDescriptorObj=jamEngine.jsonGet ([["property",["<property>","presetManager"]],["application",["<enumerated>",["ordinal","targetEnum"]]]]);var presetManagerArr=resultDescriptorObj["presetManager"][1];for(var i=0;i<presetManagerArr.length;i++) {var presets=presetManagerArr[i][1];if(presets[0]===presetClass) {var presetsArr=presets[1]["name"][1];for(var j=0;j<presetsArr.length;j++) {if(presetsArr[j][1]===presetName) {found=true;break;}} break;}} if(!found) {if(useDOM) {app.load(new File(presetFilePath));} else if(useOpen) {jamEngine.jsonPlay("open",{"target":["<path>",presetFilePath]});} else {jamEngine.jsonPlay ("set",{"target":["<reference>",[["property",["<property>",presetProperty]],["application",["<enumerated>",["ordinal","targetEnum"]]]]],"to":["<path>",presetFilePath],"append":["<boolean>",true]});}} jamEngine.meaningfulIds=saveMeaningfulIds;jamEngine.parseFriendly=saveParseFriendly;};function getFileObject(file) {var fileObject;if(file instanceof File) {fileObject=file;} else if(typeof file==='string') {fileObject=new File(file);} else {throw new Error('[jamUtils getFileObject] Invalid argument');} return fileObject;} jamUtils.readTextFile=function(textFile) {var text=null;var file=getFileObject(textFile);if(file.open("r")) {text=file.read();file.close();} return text;};jamUtils.readJsonFile=function(jsonFile) {return jamJSON.parse(this.readTextFile(jsonFile),true);};jamUtils.writeTextFile=function(textFile,text) {var file=getFileObject(textFile);if(file.open('w','TEXT')) {file.encoding='UTF-8';file.lineFeed='unix';file.write('\uFEFF');file.write(text);file.close();}};jamUtils.writeJsonFile=function(jsonFile,data,space) {this.writeTextFile(jsonFile,jamJSON.stringify(data,space));};jamUtils.cloneData=function(data) {var clone;if(data===null) {clone=data;} else if(data.constructor===Object) {clone={};for(var k in data) {if(data.hasOwnProperty(k)) {clone[k]=this.cloneData(data[k]);}}} else if(data.constructor===Array) {clone=[];for(var i=0;i<data.length;i++) {clone.push(this.cloneData(data[i]));}} else {clone=data;} return clone;};jamUtils.mergeData=function(data,defaultData) {for(var k in defaultData) {if(defaultData.hasOwnProperty(k)) {if(k in data) {if((defaultData[k]!==null)&&(defaultData[k].constructor===Object)) {data[k]=this.mergeData(data[k],defaultData[k]);}} else {data[k]=this.cloneData(defaultData[k]);}}} return data;};var jsonCustomOptionsStringKey="jsonCustomOptions";jamUtils.getCustomOptions=function(signature,defaultOptions) {var saveMeaningfulIds=jamEngine.meaningfulIds;var saveParseFriendly=jamEngine.parseFriendly;jamEngine.meaningfulIds=true;jamEngine.parseFriendly=false;try {var resultObj=jamEngine.classIdAndActionDescriptorToJson(jamEngine.uniIdStrToId(signature),app.getCustomOptions(signature));var customOptions=jamJSON.parse(resultObj["<descriptor>"][jsonCustomOptionsStringKey]["<string>"],true)} catch(e) {var customOptions={};} jamEngine.meaningfulIds=saveMeaningfulIds;jamEngine.parseFriendly=saveParseFriendly;return this.mergeData(customOptions,defaultOptions);};jamUtils.putCustomOptions=function(signature,customOptions,persistent) {var descriptorObj={};descriptorObj[jsonCustomOptionsStringKey]=["<string>",jamJSON.stringify(customOptions)];app.putCustomOptions(signature,jamEngine.jsonToActionDescriptor(descriptorObj),persistent);};jamUtils.eraseCustomOptions=function(signature) {app.eraseCustomOptions(signature);};jamUtils.dataToHexaString=function(dataString,lowercase) {var hexaDigits=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"];var hexaString="";var length=dataString.length;for(var index=0;index<length;index++) {var dataByte=dataString.charCodeAt(index);if((dataByte>=0x00)&&(dataByte<=0xFF)) {hexaString+=hexaDigits[(dataByte&0xF0)>>4]+hexaDigits[dataByte&0x0F];} else {throw new Error("[jamUtils.dataToHexaString] Invalid data string");}} if(lowercase) {hexaString=hexaString.toLowerCase();} return hexaString;};jamUtils.hexaToDataString=function(hexaString) {var dataString="";var length=hexaString.length;if(((length%2)===0)&&(/^[0-9A-Fa-f]*$/.test(hexaString))) {for(var index=0;index<length;index+=2) {var byteString=hexaString.slice(index,index+2);dataString+=String.fromCharCode(parseInt(byteString,16));}} else {throw new Error("[jamUtils.hexaToDataString] Invalid hexa string");} return dataString;};}());}

//------------------------------------------------------------------------------

var signature = "json-action-manager-poster-effect-gallery-options";
var defaultOptions =
{
	"set": "~",
	"effect": "~",
	"equalize": false,
	"gamma": 1.0,
	"blur": 0.0,
	"smooth": 0,
	"expand": 0,
	"useVectorMasks": false,
	"tolerance": 0.5,
	"scaleEffects": 100
};
var reverseAllDocs = false;
var nameDocument = false;
var allEffectsInMenu = true;
var allEffects = "*Every Effect*";
var effects = { };
var patterns = { };
var customOptions;
//
var keepBaseLayer = true;
var showSourceLayer = true;
var useSuspendHistory = true;

//------------------------------------------------------------------------------

function createSlider (parent, label, start, min, max, reset, step, digits, characters, helpTip, suffix)
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
			sliderGroup.data.textBox.notify ();
		}
	}
	var sliderGroup = parent.add ('group');
	sliderGroup.alignment = [ "fill", "middle" ];
	sliderGroup.alignChildren = [ "fill", "middle" ];
	sliderGroup.data = { };
	var labelText = sliderGroup.add ('statictext', undefined, label);
	labelText.helpTip = "Double-click to reset to default";
	labelText.addEventListener ('click', resetSlider);
	sliderGroup.data.label = label;
	sliderGroup.data.slider = sliderGroup.add ('slider', undefined, start / step, min / step, max / step);
	sliderGroup.data.slider.minimumSize = [ 256, -1 ];
	sliderGroup.data.textBox = sliderGroup.add ('edittext', undefined, start.toFixed (digits));
	sliderGroup.data.textBox.characters = characters;
	if (helpTip)
	{
		sliderGroup.data.textBox.helpTip = helpTip;
	}
	updateTextBox ();
	if (suffix)
	{
		sliderGroup.add ('statictext', undefined, suffix);
	}
	sliderGroup.data.slider.onChange = function ()
	{
		updateTextBox ();
	};
	sliderGroup.data.slider.onChanging = function ()
	{
		updateTextBox ();
	};
	sliderGroup.data.textBox.onChange = function ()
	{
		var error = null;
		var value = Number (sliderGroup.data.textBox.text);
		if (isNaN (value))
		{
			error = "Invalid numeric entry. A number between " + min.toFixed (digits) + " and " + max.toFixed (digits) + " is required. Previous value inserted.";
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
	};
	return sliderGroup;
}

//------------------------------------------------------------------------------

function getParameters ()
{
	var dialog = new Window ('dialog', "Poster Effect Gallery");
	dialog.orientation = "column";
	dialog.alignChildren = "fill";
	var effectPanel = dialog.add ('panel', undefined, "Poster Effect");
	effectPanel.alignment = [ "fill", "middle" ];
	effectPanel.orientation = "row";
	effectPanel.alignChildren = [ "fill", "middle" ];
	var menusGroup = effectPanel.add ('group');
	menusGroup.alignment = [ "left", "bottom" ];
	menusGroup.orientation = "row";
	menusGroup.alignChildren = "fill";
	var setNameArr = [ ];
	var effectNameArr = [ ];
	for (var k in effects)
	{
		if (effects.hasOwnProperty (k))
		{
			setNameArr.push (k);
			for (var kk in effects[k])
			{
				if (effects[k].hasOwnProperty (kk))
				{
					effectNameArr.push (kk);
				}
			}
		}
	}
	dialog.setMenu = menusGroup.add ('dropdownlist', undefined, setNameArr);
	dialog.setMenu.helpTip = "Select the set of effects";
	dialog.effectMenu = menusGroup.add ('dropdownlist', undefined, effectNameArr);
	dialog.effectMenu.helpTip = "Select the effect";
	function updateEffectMenu ()
	{
		var effect = setNameArr[dialog.setMenu.selection.index];
		dialog.effectMenu.removeAll ();
		if (effect.length > 0)
		{
			dialog.setMenu.enabled = true;
			for (var k in effects[effect])
			{
				if (effects[effect].hasOwnProperty (k))
				{
					dialog.effectMenu.add ('item', k);
				}
			}
			if (allEffectsInMenu)
			{
				var effectCount = dialog.effectMenu.items.length;
				dialog.effectMenu.add ('separator');
				dialog.effectMenu.add ('item', allEffects);
				if (effectCount < 2)
				{
					dialog.effectMenu.find (allEffects).enabled = false;
				}
			}
			dialog.effectMenu.selection = 0;
		}
		else
		{
			dialog.effectMenu.enabled = false;
			dialog.effectMenu.selection = null;
		}
	}
	dialog.setMenu.onChange = updateEffectMenu;
	//
	var preProcessPanel = dialog.add ('panel', undefined, "Pre-Process");
	preProcessPanel.alignment = [ "fill", "middle" ];
	preProcessPanel.orientation = "column";
	preProcessPanel.alignChildren = [ "fill", "middle" ];
	dialog.equalizeCheckbox = preProcessPanel.add ('checkbox', undefined, "Equalize Brightness");
	dialog.equalizeCheckbox.value = customOptions["equalize"];
	dialog.equalizeCheckbox.helpTip = "Equalize the brigtness of the image by flattening its histogram";
	var gammaTip = "Gamma value, from 0.01 to 9.99 (1.0 by default: no gamma adjustment)";
	var gammaSlider = createSlider (preProcessPanel, "Gamma:", customOptions["gamma"], 0.01, 9.99, 1.0, 0.01, 2, 6, gammaTip);
	var blurTip = "Gaussian blur radius value (in pixels), from 0.0 (by default: no blur) to 250.0";
	var blurSlider = createSlider (preProcessPanel, "Blur:", customOptions["blur"], 0.0, 250.0, 0.0, 0.1, 1, 6, blurTip, "pixels");
	//
	var refinePanel = dialog.add ('panel', undefined, "Refine");
	refinePanel.alignment = [ "fill", "middle" ];
	refinePanel.orientation = "column";
	refinePanel.alignChildren = [ "fill", "middle" ];
	var smoothTip = "Selection smooth radius value (in pixels), from 0 (by default: no smoothing) to 100";
	var smoothSlider = createSlider (refinePanel, "Smooth:", customOptions["smooth"], 0, 100, 0, 1, 0, 4, smoothTip, "pixels");
	var expandTip = "Selection contract/expand by value (in pixels), from -100 to +100 (0 by default: no expansion)";
	var expandSlider = createSlider (refinePanel, "Expand:", customOptions["expand"], -100, 100, 0, 1, 0, 4, expandTip, "pixels");
	//
	var vectorizePanel = dialog.add ('panel', undefined, "Vectorize");
	vectorizePanel.alignment = [ "fill", "middle" ];
	vectorizePanel.orientation = "column";
	vectorizePanel.alignChildren = [ "fill", "middle" ];
	dialog.useVectorMasksCheckbox = vectorizePanel.add ('checkbox', undefined, "Use Vector Masks");
	dialog.useVectorMasksCheckbox.value = customOptions["useVectorMasks"];
	dialog.useVectorMasksCheckbox.helpTip = "Use vector masks instead of layer (pixel) masks";
	dialog.useVectorMasksCheckbox.onClick = function ()
	{
		toleranceSlider.enabled = this.value;
	};
	var toleranceTip = "Tolerance value (in pixels), from 0.5 to 10.0";
	var toleranceSlider = createSlider (vectorizePanel, "Tolerance:", customOptions["tolerance"], 0.5, 10.0, 0.5, 0.1, 1, 4, toleranceTip, "pixels");
	toleranceSlider.enabled = customOptions["useVectorMasks"];
	//
	var stylesPanel = dialog.add ('panel', undefined, "Styles");
	stylesPanel.alignment = [ "fill", "middle" ];
	stylesPanel.orientation = "row";
	stylesPanel.alignChildren = [ "fill", "middle" ];
	var scaleTip = "Scale effects, from 1 to 1000 % (100 by default: no scaling)";
	var scaleSlider = createSlider (stylesPanel, "Scale Effects:", customOptions["scaleEffects"], 1, 1000, 100, 1, 0, 4, scaleTip, "%");
	//
	var buttonsGroup = dialog.add ('group');
	buttonsGroup.alignment = [ "right", "bottom" ];
	buttonsGroup.orientation = "row";
	buttonsGroup.alignChildren = [ "fill", "middle" ];
	dialog.cancelBtn = buttonsGroup.add ('button', undefined, 'Cancel', { name: "cancel" });
	dialog.cancelBtn.onClick = function () { dialog.close (false); };
	dialog.OKBtn = buttonsGroup.add ('button', undefined, 'OK', { name: "ok" });
	dialog.OKBtn.onClick = function ()
	{
		customOptions["set"] = dialog.setMenu.selection.text;
		customOptions["effect"] = dialog.effectMenu.selection.text;
		customOptions["equalize"] = dialog.equalizeCheckbox.value;
		customOptions["gamma"] = gammaSlider.data.value;
		customOptions["blur"] = blurSlider.data.value;
		customOptions["smooth"] = smoothSlider.data.value;
		customOptions["expand"] = expandSlider.data.value;
		customOptions["useVectorMasks"] = dialog.useVectorMasksCheckbox.value;
		customOptions["tolerance"] = toleranceSlider.data.value;
		customOptions["scaleEffects"] = scaleSlider.data.value;
		dialog.close (true);
	};
	dialog.onShow = function ()
	{
		dialog.setMenu.selection = dialog.setMenu.find (customOptions["set"]) || 0;
		dialog.effectMenu.selection = dialog.effectMenu.find (customOptions["effect"]) || 0;
	};
	return dialog.show ();
}

//------------------------------------------------------------------------------

function errorDialog (file, message)
{
	var dialog = new Window ('dialog', "Error");
	dialog.orientation = "column";
	dialog.alignChildren = "fill";
	var messageText = dialog.add ('statictext', undefined, message, { multiline: true });
	var buttonsGroup = dialog.add ('group');
	buttonsGroup.alignment = [ "right", "bottom" ];
	buttonsGroup.orientation = "row";
	buttonsGroup.alignChildren = "fill";
	dialog.openBtn = buttonsGroup.add ('button', undefined, 'Open');
	dialog.openBtn.onClick = function ()
	{
		file.execute ();
		dialog.close (false);
	};
	dialog.dummyText = buttonsGroup.add ('statictext', undefined, ' ');
	dialog.dummyText.preferredSize = [ 32, -1 ];
	dialog.cancelBtn = buttonsGroup.add ('button', undefined, 'Stop', { name: "cancel" });
	dialog.cancelBtn.onClick = function ()
	{
		dialog.close (false);
	};
	dialog.OKBtn = buttonsGroup.add ('button', undefined, 'Continue', { name: "ok" });
	dialog.OKBtn.onClick = function ()
	{
		dialog.close (true);
	};
	dialog.onShow = function ()
	{
	};
	return dialog.show ();
}

//------------------------------------------------------------------------------

function removeAllChannelsAndPaths ()
{
	app.activeDocument.channels.removeAll ();
	app.activeDocument.pathItems.removeAll ();
}

//------------------------------------------------------------------------------

function getDocumentSize ()
{
	var resultDescriptorObj;
	resultDescriptorObj = jamEngine.jsonGet
	(
		[
			{ "property": { "<property>": "resolution" } },
			{ "document": { "<enumerated>": { "ordinal": "first" } } }
		]
	);
	var resolution = resultDescriptorObj["resolution"]["<unitDouble>"]["densityUnit"];
	resultDescriptorObj = jamEngine.jsonGet
	(
		[
			{ "property": { "<property>": "width" } },
			{ "document": { "<enumerated>": { "ordinal": "first" } } }
		]
	);
	var width = jamUtils.fromDistanceUnit (resultDescriptorObj["width"]["<unitDouble>"]["distanceUnit"], resolution);
	resultDescriptorObj = jamEngine.jsonGet
	(
		[
			{ "property": { "<property>": "height" } },
			{ "document": { "<enumerated>": { "ordinal": "first" } } }
		]
	);
	var height = jamUtils.fromDistanceUnit (resultDescriptorObj["height"]["<unitDouble>"]["distanceUnit"], resolution);
	return [ width, height ];
}

//------------------------------------------------------------------------------

function duplicateCurrentChannel (name)
{
	jamEngine.jsonPlay
	(
		"duplicate",
		{
			"target": { "<reference>": [ { "channel": { "<enumerated>": { "ordinal": "targetEnum" } } } ] },
			"name": { "<string>": name }
		}
	);
}

//------------------------------------------------------------------------------

function makeTransparencyChannel (name)
{
	jamEngine.jsonPlay
	(
		"make",
		{
			"new":
			{
				"<object>":
				{
					"channel":
					{
						"name": { "<string>": name },
						"colorIndicates": { "<enumerated>": { "maskIndicator": "maskedAreas" } }
					}
				}
			}
		}
	);
	try
	{
		jamEngine.jsonPlay
		(
			"applyImageEvent",
			{
				"with":
				{
					"<object>":
					{
						"calculation":
						{
							"to": { "<reference>": [ { "channel": { "<enumerated>": { "channel": "transparencyEnum" } } } ] }
						}
					}
				}
			}
		);
	}
	catch (e)
	{
		jamEngine.jsonPlay
		(
			"fill",
			{
				"using": { "<enumerated>": { "fillContents": "white" } }
			}
		);
	}
}

//------------------------------------------------------------------------------

function makeChannelFromLayer (name, layerName)
{
	jamEngine.jsonPlay
	(
		"make",
		{
			"new":
			{
				"<object>":
				{
					"channel":
					{
						"name": { "<string>": name },
						"colorIndicates": { "<enumerated>": { "maskIndicator": "selectedAreas" } }
					}
				}
			}
		}
	);
	jamEngine.jsonPlay
	(
		"applyImageEvent",
		{
			"with":
			{
				"<object>":
				{
					"calculation":
					{
						"to":
						{
							"<reference>":
							[
								{ "channel": { "<enumerated>": { "channel": "RGB" } } },
								{ "layer": { "<name>": layerName } }
							]
						}
					}
				}
			}
		}
	);
}

//------------------------------------------------------------------------------

function selectChannel (name)
{
	jamEngine.jsonPlay
	(
		"select",
		{
			"target": { "<reference>": [ { "channel": { "<name>": name } } ] }
		}
	);
}

//------------------------------------------------------------------------------

function deleteChannel (name)
{
	jamEngine.jsonPlay
	(
		"delete",
		{
			"target": { "<reference>": [ { "channel": { "<name>": name } } ] }
		}
	);
}

//------------------------------------------------------------------------------

function duplicateCurrentLayer (name)
{
	jamEngine.jsonPlay
	(
		"duplicate",
		{
			"target": { "<reference>": [ { "layer": { "<enumerated>": { "ordinal": "targetEnum" } } } ] },
			"name": { "<string>": name }
		}
	);
}

//------------------------------------------------------------------------------

function renameCurrentLayer (name)
{
	jamEngine.jsonPlay
	(
		"set",
		{
			"target": { "<reference>": [ { "layer": { "<enumerated>": { "ordinal": "targetEnum" } } } ] },
			"to": { "<object>": { "layer": { "name": { "<string>": name } } } }
		}
	);
}

//------------------------------------------------------------------------------

function deleteCurrentLayer ()
{
	jamEngine.jsonPlay
	(
		"delete",
		{
			"target": { "<reference>": [ { "layer": { "<enumerated>": { "ordinal": "targetEnum" } } } ] }
		}
	);
}

//------------------------------------------------------------------------------

function selectLayer (name)
{
	jamEngine.jsonPlay
	(
		"select",
		{
			"target": { "<reference>": [ { "layer": { "<name>": name } } ] }
		}
	);
}

//------------------------------------------------------------------------------

function hideLayer (name)
{
	jamEngine.jsonPlay
	(
		"hide",
		{
			"target": { "<reference>": [ { "layer": { "<name>": name } } ] }
		}
	);
}

//------------------------------------------------------------------------------

function deleteLayer (name)
{
	jamEngine.jsonPlay
	(
		"delete",
		{
			"target": { "<reference>": [ { "layer": { "<name>": name } } ] }
		}
	);
}

//------------------------------------------------------------------------------

function applyLayerMaxRGB (name, preserveTransparency)
{
	jamEngine.jsonPlay
	(
		"applyImageEvent",
		{
			"with":
			{
				"<object>":
				{
					"calculation":
					{
						"to":
						{
							"<reference>":
							[
								{ "channel": { "<enumerated>": { "channel": "red" } } },
								{ "layer": { "<name>": name } }
							]
						},
						"preserveTransparency": { "<boolean>": preserveTransparency || false },
						"calculation": { "<enumerated>": { "calculationType": "lighten" } }
					}
				}
			}
		}
	);
	jamEngine.jsonPlay
	(
		"applyImageEvent",
		{
			"with":
			{
				"<object>":
				{
					"calculation":
					{
						"to":
						{
							"<reference>":
							[
								{ "channel": { "<enumerated>": { "channel": "green" } } },
								{ "layer": { "<name>": name } }
							]
						},
						"preserveTransparency": { "<boolean>": preserveTransparency || false },
						"calculation": { "<enumerated>": { "calculationType": "lighten" } }
					}
				}
			}
		}
	);
	jamEngine.jsonPlay
	(
		"applyImageEvent",
		{
			"with":
			{
				"<object>":
				{
					"calculation":
					{
						"to":
						{
							"<reference>":
							[
								{ "channel": { "<enumerated>": { "channel": "blue" } } },
								{ "layer": { "<name>": name } }
							]
						},
						"preserveTransparency": { "<boolean>": preserveTransparency || false },
						"calculation": { "<enumerated>": { "calculationType": "lighten" } }
					}
				}
			}
		}
	);
}

//------------------------------------------------------------------------------

function applyMaximumBlackGrayscale ()
{
	jamEngine.jsonPlay
	(
		"blackAndWhite",
		{
			"red": { "<integer>": 0 },
			"yellow": { "<integer>": 0 },
			"green": { "<integer>": 0 },
			"cyan": { "<integer>": 0 },
			"blue": { "<integer>": 0 },
			"magenta": { "<integer>": 0 },
			"useTint": { "<boolean>": false }
		}
	);
}

//------------------------------------------------------------------------------

function applyMaximumWhiteGrayscale ()
{
	jamEngine.jsonPlay
	(
		"blackAndWhite",
		{
			"red": { "<integer>": 100 },
			"yellow": { "<integer>": 100 },
			"green": { "<integer>": 100 },
			"cyan": { "<integer>": 100 },
			"blue": { "<integer>": 100 },
			"magenta": { "<integer>": 100 },
			"useTint": { "<boolean>": false }
		}
	);
}

//------------------------------------------------------------------------------

function applyLumaGrayscale ()
{
	jamEngine.jsonPlay
	(
		"gradientMapEvent",
		{
			"gradient":
			{
				"<object>":
				{
					"gradientClassEvent":
					{
						"gradientForm": { "<enumerated>": { "gradientForm": "customStops" } },
						"interpolation": { "<double>": 0 },
						"colors":
						{
							"<list>":
							[
								{
									"<object>":
									{
										"colorStop":
										{
											"color": jamHelpers.toColorObject ({ "red": 0, "green": 0, "blue": 0 }),
											"type": { "<enumerated>": { "colorStopType": "userStop" } },
											"location": { "<integer>": 0 },
											"midpoint": { "<integer>": 50 }
										}
									}
								},
								{
									"<object>":
									{
										"colorStop":
										{
											"color": jamHelpers.toColorObject ({ "red": 255, "green": 255, "blue": 255 }),
											"type": { "<enumerated>": { "colorStopType": "userStop" } },
											"location": { "<integer>": 4096 },
											"midpoint": { "<integer>": 50 }
										}
									}
								}
							]
						}
					}
				}
			}
		}
	);
}

//------------------------------------------------------------------------------

function makeEmptyLayer (name)
{
	jamEngine.jsonPlay
	(
		"make",
		{
			"target": { "<reference>": [ { "layer": { "<class>": null } } ] },
			"using": { "<object>": { "layerSection": { "name": { "<string>": name } } } }
		}
	);
}

//------------------------------------------------------------------------------

function makeEmptyLayerSet (name)
{
	jamEngine.jsonPlay
	(
		"make",
		{
			"target": { "<reference>": [ { "layerSection": { "<class>": null } } ] },
			"using": { "<object>": { "layerSection": { "name": { "<string>": name } } } }
		}
	);
}

//------------------------------------------------------------------------------

function selectFrontLayerSet ()
{
	jamEngine.jsonPlay
	(
		"select",
		{ "target": { "<reference>": [ { "layerSection": { "<enumerated>": { "ordinal": "front" } } } ] } }
	);
}

//------------------------------------------------------------------------------

function applyThreshold (threshold)
{
	if (threshold <= 0)
	{
		jamEngine.jsonPlay ("fill", { "using": { "<enumerated>": { "fillContents": "white" } } });
	}
	else if (threshold > 255)
	{
		jamEngine.jsonPlay ("fill", { "using": { "<enumerated>": { "fillContents": "black" } } });
	}
	else
	{
		jamEngine.jsonPlay ("thresholdClassEvent", { "level": { "<integer>": threshold } });
	}
}

//------------------------------------------------------------------------------

function loadChannelAsSelection (name)
{
	jamEngine.jsonPlay
	(
		"set",
		{
			"target": { "<reference>": [ { "channel": { "<property>": "selection" } } ] },
			"to": { "<reference>": [ { "channel": { "<name>": name } } ] }
		}
	);
}

//------------------------------------------------------------------------------

function addChannelToSelection (name)
{
	jamEngine.jsonPlay
	(
		"add",
		{
			"target": { "<reference>": [ { "channel": { "<name>": name } } ] },
			"to": { "<reference>": [ { "channel": { "<property>": "selection" } } ] }
		}
	);
}

//------------------------------------------------------------------------------

function subtractChannelFromSelection (name)
{
	jamEngine.jsonPlay
	(
		"subtract",
		{
			"target": { "<reference>": [ { "channel": { "<name>": name } } ] },
			"from": { "<reference>": [ { "channel": { "<property>": "selection" } } ] }
		}
	);
}

//------------------------------------------------------------------------------

function intersectChannelWithSelection (name)
{
	jamEngine.jsonPlay
	(
		"intersect",
		{
			"target": { "<reference>": [ { "channel": { "<name>": name } } ] },
			"with": { "<reference>": [ { "channel": { "<property>": "selection" } } ] }
		}
	);
}

//------------------------------------------------------------------------------

function saveSelectionAsChannel (name)
{
	jamEngine.jsonPlay
	(
		"make",
		{
			"new":
			{
				"<object>":
				{
					"channel":
					{
						"name": { "<string>": name },
						"colorIndicates": { "<enumerated>": { "maskIndicator": "maskedAreas" } }
					}
				}
			},
			"using": { "<reference>": [ { "channel": { "<property>": "selection" } } ] }
		}
	);
}

//------------------------------------------------------------------------------

function smoothSelection (pixels, incremental)
{
	try
	{
		if (pixels > 0)
		{
			if (incremental)
			{
				for (var index = 0; index < pixels; index++)
				{
					jamEngine.jsonPlay ("smoothness", { "radius": { "<unitDouble>": { "pixelsUnit": 1 } } });
				}
			}
			else
			{
				jamEngine.jsonPlay ("smoothness", { "radius": { "<unitDouble>": { "pixelsUnit": pixels } } });
			}
		}
	}
	catch (e)
	{
	}
}

//------------------------------------------------------------------------------

function expandSelection (pixels)
{
	try
	{
		if (pixels > 0)
		{
			jamEngine.jsonPlay ("expand", { "by": { "<unitDouble>": { "pixelsUnit": pixels } } });
		}
		else if (pixels < 0)
		{
			jamEngine.jsonPlay ("contract", { "by": { "<unitDouble>": { "pixelsUnit": -pixels } } });
		}
	}
	catch (e)
	{
	}
}

//------------------------------------------------------------------------------

function makeWorkPathFromSelection (tolerance)
{
	try
	{
		jamEngine.jsonPlay
		(
			"make",
			{
				"target": { "<reference>": [ { "path": { "<class>": null } } ] },
				"from": { "<reference>": [ { "selectionClass": { "<property>": "selection" } } ] },
				"tolerance": { "<unitDouble>": { "pixelsUnit": tolerance } }
			}
		);
	}
	catch (e)
	{
	}
}

//------------------------------------------------------------------------------

function loadWorkPathAsSelection ()
{
	jamEngine.jsonPlay
	(
		"set",
		{
			"target": { "<reference>": [ { "channel": { "<property>": "selection" } } ] },
			"to": { "<reference>": [ { "path": { "<property>": "workPath" } } ] }
		}
	);
}

//------------------------------------------------------------------------------

function setFrameSelection (left, top, right, bottom)
{
	jamEngine.jsonPlay
	(
		"set",
		{
			"target": { "<reference>": [ { "channel": { "<property>": "selection" } } ] },
			"to": jamHelpers.toRectangleObject ([ [ left, top, right, bottom ], "pixelsUnit" ])
		}
	);
	jamEngine.jsonPlay ("inverse");
}

//------------------------------------------------------------------------------

function setRectangularSelection (rectangle)
{
	jamEngine.jsonPlay
	(
		"set",
		{
			"target": { "<reference>": [ { "channel": { "<property>": "selection" } } ] },
			"to": jamHelpers.toRectangleObject (rectangle)
		}
	);
}

//------------------------------------------------------------------------------

function setEllipticalSelection (ellipse)
{
	jamEngine.jsonPlay
	(
		"set",
		{
			"target": { "<reference>": [ { "channel": { "<property>": "selection" } } ] },
			"to": jamHelpers.toEllipseObject (ellipse),
			"antiAlias": { "<boolean>": true }
		}
	);
}

//------------------------------------------------------------------------------

function setPolygonalSelection (points)
{
	jamEngine.jsonPlay
	(
		"set",
		{
			"target": { "<reference>": [ { "channel": { "<property>": "selection" } } ] },
			"to": { "<object>": { "polygon": { "points": jamHelpers.toPointList (points) } } },
			"antiAlias": { "<boolean>": true }
		}
	);
}

//------------------------------------------------------------------------------

function selectWorkPath ()
{
	jamEngine.jsonPlay ("select", { "target": { "<reference>": [ { "path": { "<property>": "workPath" } } ] } });
}

//------------------------------------------------------------------------------

function deleteWorkPath ()
{
	try
	{
		jamEngine.jsonPlay ("delete", { "target": { "<reference>": [ { "path": { "<property>": "workPath" } } ] } });
	}
	catch (e)
	{
	}
}

//------------------------------------------------------------------------------

function deleteLayerMask ()
{
	try
	{
		jamEngine.jsonPlay ("delete", { "target": { "<reference>": [ { "channel": { "<enumerated>": { "channel": "mask" } } } ] } });
	}
	catch (e)
	{
	}
}

//------------------------------------------------------------------------------

function hasLayerMask ()
{
	var resultDescriptorObj;
	resultDescriptorObj = jamEngine.jsonGet
	(
		[
			{ "property": { "<property>": "hasUserMask" } },
			{ "layer": { "<enumerated>": { "ordinal": "targetEnum" } } }
		]
	);
	return resultDescriptorObj["hasUserMask"]["<boolean>"];
}

//------------------------------------------------------------------------------

function makeEmptyLayerMask ()
{
	jamEngine.jsonPlay
	(
		"make",
		{
			"new": { "<class>": "channel" },
			"at": { "<reference>": [ { "channel": { "<enumerated>": { "channel": "mask" } } } ] },
			"using": { "<enumerated>": { "userMaskOptions": "hideAll" } }
		}
	);
}

//------------------------------------------------------------------------------

function hasVectorMask ()
{
	var resultDescriptorObj;
	resultDescriptorObj = jamEngine.jsonGet
	(
		[
			{ "property": { "<property>": "hasVectorMask" } },
			{ "layer": { "<enumerated>": { "ordinal": "targetEnum" } } }
		]
	);
	return resultDescriptorObj["hasVectorMask"]["<boolean>"];
}

//------------------------------------------------------------------------------

function makeEmptyVectorMask ()
{
	jamEngine.jsonPlay
	(
		"make",
		{
			"target": { "<reference>": [ { "path": { "<class>": null } } ] },
			"at": { "<reference>": [ { "path": { "<enumerated>": { "path": "vectorMask" } } } ] },
			"using": { "<enumerated>": { "vectorMaskEnabled": "hideAll" } }
		}
	);
}

//------------------------------------------------------------------------------

function setCurrentLayerColor (color)
{
	jamEngine.jsonPlay
	(
		"set",
		{
			"target": { "<reference>": [ { "layer": { "<enumerated>": { "ordinal": "targetEnum" } } } ] },
			"to": { "<object>": { "layer": { "color": { "<enumerated>": { "color": color } } } } }
		}
	);
}

//------------------------------------------------------------------------------

function applyGaussianBlur (blur)
{
	if (blur > 0)
	{
		jamEngine.jsonPlay ("gaussianBlur", { "radius": { "<double>": blur } });
	}
}

//------------------------------------------------------------------------------

function applyGamma (gamma)
{
	if (gamma !== 1)
	{
		jamEngine.jsonPlay
		(
			"levels",
			{
				"adjustment":
				{
					"<list>":
					[
						{
							"<object>":
							{
								"levelsAdjustment":
								{
									"channel": { "<reference>": [ { "channel": { "<enumerated>": { "ordinal": "composite" } } } ] },
									"gamma": { "<double>": gamma }
								}
							}
						}
					]
				}
			}
		);
	}
}

//------------------------------------------------------------------------------

function setFileInfo (title, author, description)
{
	jamEngine.jsonPlay
	(
		"set",
		{
			"target":
			{
				"<reference>":
				[
					{ "property": { "<property>": "fileInfo" } },
					{ "document": { "<enumerated>": { "ordinal": "targetEnum" } } }
				]
			},
			"to":
			{
				"<object>":
				{
					"fileInfo":
					{
						"objectName": { "<string>": title },
						"byline": { "<string>": author },
						"caption": { "<string>": description }
					}
				}
			}
		}
	);
}

//------------------------------------------------------------------------------

function fillPattern (pattern)
{
	var name = pattern["name"];
	var ID = pattern["ID"];
	jamEngine.jsonPlay
	(
		"fill",
		{
			"using": { "<enumerated>": { "fillContents": "pattern" } },
			"pattern":
			{
				"<object>":
				{
					"pattern":
					{
						"name": { "<string>": name },
						"ID": { "<string>": ID }
					}
				}
			}
		}
	);
}

//------------------------------------------------------------------------------

function hasDocumentSelection ()
{
	var resultDescriptorObj = jamEngine.jsonGet
	(
		[
			{ "property": { "<property>": "selection" } },
			{ "document": { "<enumerated>": { "ordinal": "targetEnum" } } }
		]
	);
	return ("selection" in resultDescriptorObj);
}

//------------------------------------------------------------------------------

function inverseSelection ()
{
	jamEngine.jsonPlay ("inverse");
}

//------------------------------------------------------------------------------

function desaturate ()
{
	jamEngine.jsonPlay ("desaturate");
}

//------------------------------------------------------------------------------

function applyEqualize ()
{
	jamEngine.jsonPlay ("equalize");
}

//------------------------------------------------------------------------------

function applyEffect (desiredSet, desiredEffect, setEffectName)
{
	var sourceLayerName = "Source Layer";
	var baseLayerName = "Base Layer";
	var patternChannelName = "Pattern Channel";
	var patternLayerName = "Pattern Layer";
	var tempChannelName = "Temp Channel";
	var tempLayerName = "Temp Layer";
	var transparencyChannelName = "Transparency Channel";
	var thresholdChannelName = "Threshold Channel";
	var thresholdLayerName = "Threshold Layer";
	var lowChannelName = "Low Channel";
	var highChannelName = "High Channel";
	//
	var effectsObj = effects[desiredSet][desiredEffect];
	removeAllChannelsAndPaths ();
	var size = getDocumentSize ();
	renameCurrentLayer (sourceLayerName);
	duplicateCurrentLayer (baseLayerName);
	if (!showSourceLayer)
	{
		hideLayer (sourceLayerName);
	}
	if (customOptions["equalize"])
	{
		applyEqualize ();
	}
	applyGamma (customOptions["gamma"]);
	applyGaussianBlur (customOptions["blur"]);
	if ("grayscale" in effectsObj)
	{
		var grayscale = effectsObj["grayscale"];
		switch (grayscale)
		{
			case "legacy":
				duplicateCurrentLayer (tempLayerName);
				selectLayer (baseLayerName);
				applyLayerMaxRGB (tempLayerName);
				deleteLayer (tempLayerName);
				desaturate ();
				break;
			case "maxRGB":
				applyMaximumWhiteGrayscale ();
				break;
			case "minRGB":
				applyMaximumBlackGrayscale ();
				break;
			case "luma":
			default:
				applyLumaGrayscale ();
				break;
		}
	}
	else
	{
		applyLumaGrayscale ();
	}
	makeTransparencyChannel (transparencyChannelName);
	makeEmptyLayerSet (setEffectName);
	if ("layers" in effectsObj)
	{
		var layers = effectsObj["layers"];
		for (var layerIndex = 0; layerIndex < layers.length; layerIndex++)
		{
			var layer = layers[layerIndex];
			var mask = null;
			if ("mask" in layer)
			{
				mask = layer["mask"];
			}
			if (mask)
			{
				var type = mask["type"];
				if ("imageThreshold" in type)
				{
					selectLayer (baseLayerName);
					duplicateCurrentLayer (thresholdLayerName);
					applyThreshold (type["imageThreshold"]);
					makeChannelFromLayer (thresholdChannelName, thresholdLayerName);
					applyThreshold (128);
					loadChannelAsSelection (thresholdChannelName);
					smoothSelection (customOptions["smooth"]);
					expandSelection (customOptions["expand"]);
					deleteChannel (thresholdChannelName);
					deleteLayer (thresholdLayerName);
				}
				else if ("imageTransparency" in type)
				{
					var imageTransparency = type["imageTransparency"];
					selectChannel (transparencyChannelName);
					duplicateCurrentChannel (tempChannelName);
					applyThreshold (128);
					loadChannelAsSelection (tempChannelName);
					smoothSelection (customOptions["smooth"]);
					expandSelection (customOptions["expand"]);
					if (imageTransparency)
					{
						if ((imageTransparency.constructor === Array) && (imageTransparency.length === 2))
						{
							saveSelectionAsChannel (highChannelName);
							expandSelection (Math.round (imageTransparency[0] * customOptions["scaleEffects"] / 100));
							saveSelectionAsChannel (lowChannelName);
							loadChannelAsSelection (highChannelName);
							expandSelection (Math.round (imageTransparency[1] * customOptions["scaleEffects"] / 100));
							subtractChannelFromSelection (lowChannelName);
							deleteChannel (lowChannelName);
							deleteChannel (highChannelName);
						}
						else
						{
							expandSelection (Math.round (imageTransparency * customOptions["scaleEffects"] / 100));
						}
					}
					deleteChannel (tempChannelName);
				}
				else if ("pattern" in type)
				{
					makeEmptyLayer (patternLayerName);
					fillPattern (type["pattern"]);
					makeChannelFromLayer (patternChannelName, patternLayerName);
					applyThreshold (128);
					loadChannelAsSelection (patternChannelName);
					deleteChannel (patternChannelName);
					deleteLayer (patternLayerName);
				}
				else if ("frame" in type)
				{
					var frame = type["frame"];
					setFrameSelection (frame, frame, size[0] - frame, size[1] - frame);
				}
				else if ("rectangularSelection" in type)
				{
					setRectangularSelection (type["rectangularSelection"]);
				}
				else if ("ellipticalSelection" in type)
				{
					setEllipticalSelection (type["ellipticalSelection"]);
				}
				else if ("polygonalSelection" in type)
				{
					setPolygonalSelection (type["polygonalSelection"]);
				}
				else
				{
					mask = null;
				}
			}
			if (mask)
			{
				if (("inverse" in mask) && mask["inverse"])
				{
					inverseSelection ();
				}
			}
			var hasSelection = hasDocumentSelection ();
			var useVectorMask = customOptions["useVectorMasks"];
			if (mask)
			{
				if (useVectorMask)
				{
					makeWorkPathFromSelection (customOptions["tolerance"]);
				}
			}
			selectFrontLayerSet ();
			try
			{
				var saveDisplayDialogs = jamEngine.displayDialogs;
				jamEngine.displayDialogs = DialogModes.NO;
				jamLayers.makeLayer (layer["layer"]);
			}
			catch (e)
			{
				if (e.number === -25430)	// Path is too complex for thumbnail preview
				{
					if (mask)
					{
						if (useVectorMask)
						{
							deleteCurrentLayer ();
							loadWorkPathAsSelection ();
							deleteWorkPath ();
							jamLayers.makeLayer (layer["layer"]);
							setCurrentLayerColor ("red");
							useVectorMask = false;
						}
					}
				}
				else if (e.number === -25923)	// Parameters for command Make are not currently valid (unknown pattern)
				{
					throw e;
				}
			}
			finally
			{
				jamEngine.displayDialogs = saveDisplayDialogs;
			}
			if (mask)
			{
				if (!hasSelection)
				{
					deleteLayerMask ();
				}
				if (useVectorMask)
				{
					if (!hasVectorMask ())
					{
						makeEmptyVectorMask ();
					}
				}
				else
				{
					if (!hasLayerMask ())
					{
						makeEmptyLayerMask ();
					}
				}
				if ("style" in layer)
				{
					jamStyles.setLayerStyle (layer["style"], true);
					jamStyles.scaleLayerEffects (customOptions["scaleEffects"]);
				}
				else if ("style" in effectsObj)
				{
					jamStyles.setLayerStyle (effectsObj["style"], true);
					jamStyles.scaleLayerEffects (customOptions["scaleEffects"]);
				}
				if (useVectorMask)
				{
					deleteWorkPath ();
				}
			}
			else
			{
				deleteLayerMask ();
			}
		}
	}
	deleteChannel (transparencyChannelName);
	if (keepBaseLayer)
	{
		hideLayer (baseLayerName);
	}
	else
	{
		deleteLayer (baseLayerName);
	}
	selectFrontLayerSet ();
	var saveOptions = jamUtils.cloneData (customOptions);
	saveOptions["effect"] = desiredEffect;
	setFileInfo
	(
		setEffectName,
		"Generated by “Poster Effect Gallery.js” © Michel MARIANI <http://www.tonton-pixel.com/blog/>",
		jamJSON.stringify (saveOptions)
	);
}

//------------------------------------------------------------------------------

function processEffect (desiredSet, desiredEffect)
{
	var setEffectName = desiredSet + " | " + desiredEffect;
	var duplicateDesc = 
	{
		"target": { "<reference>": [ { "document": { "<enumerated>": { "ordinal": "first" } } } ] },
		"merged": { "<boolean>": true }
	};
	if (nameDocument)
	{
		duplicateDesc["name"] = { "<string>": setEffectName };
	}
	jamEngine.jsonPlay ("duplicate", duplicateDesc);
	if (useSuspendHistory)
	{
		app.activeDocument.suspendHistory (setEffectName, "applyEffect (desiredSet, desiredEffect, setEffectName);");
	}
	else
	{
		applyEffect (desiredSet, desiredEffect, setEffectName);
	}
}

//------------------------------------------------------------------------------

function getPresetPatternsCount ()
{
	var saveMeaningfulIds = jamEngine.meaningfulIds;
	var saveParseFriendly = jamEngine.parseFriendly;
	jamEngine.meaningfulIds = true;
	jamEngine.parseFriendly = true;
	var resultDescObj = jamEngine.jsonGet
	(
		[
			[ "property", [ "<property>", "presetManager" ] ],
			[ "application", [ "<enumerated>", [ "ordinal", "targetEnum" ] ] ]
		]
	);
	var presetManagerArr = resultDescObj["presetManager"][1];
	var presetPatternsCount;
	for (var i = 0; i < presetManagerArr.length; i++)
	{
		var preset = presetManagerArr[i][1];
		if (preset[0] === "'PttR'")
		{
			presetPatternsCount = preset[1]["name"][1].length;
			break;
		}
	}
	jamEngine.meaningfulIds = saveMeaningfulIds;
	jamEngine.parseFriendly = saveParseFriendly;
	return presetPatternsCount;
}

//------------------------------------------------------------------------------

function loadPatternsFile (patternsFile)
{
	try
	{
		jamEngine.jsonPlay
		(
			"set",
			{
				"target":
				[
					"<reference>",
					[
						[ "property", [ "<property>", "pattern" ] ],	// *Not* "'PttR'" !
						[ "application", [ "<enumerated>", [ "ordinal", "targetEnum" ] ] ]
					]
				],
				"to": [ "<path>", patternsFile.fsName ],
				"append": [ "<boolean>", true ]
			},
			DialogModes.NO
		);
	}
	catch (e)
	{
	}
}

//------------------------------------------------------------------------------

function loadPatterns (patternsFileBinary)
{
	var presetPatternsCountBefore = getPresetPatternsCount ();
	var date = new Date ();
	var tempPatternsName = "Temp-Poster-Effets-Patterns-" + date.getTime ();
	var tempPatternsFile = new File (Folder.temp + "/" + tempPatternsName + ".pat");
	if (tempPatternsFile.open ("w"))
	{
		tempPatternsFile.encoding = 'BINARY';
		tempPatternsFile.write (patternsFileBinary);
		tempPatternsFile.close ();
	}
	loadPatternsFile (tempPatternsFile);
	tempPatternsFile.remove ();
	var presetPatternsCountAfter = getPresetPatternsCount ();
	var patternsIndexList = [ ];
	var indexCount = presetPatternsCountAfter - presetPatternsCountBefore;
	for (var index = 0; index < indexCount; index++)
	{
		patternsIndexList.push (presetPatternsCountBefore + index + 1);
	}
	return patternsIndexList;
}

//------------------------------------------------------------------------------

function deletePatterns (patternsIndexList)
{
	var deleteDescriptor = { "target": { "<list>": [ ] } };
	for (var index = 0; index < patternsIndexList.length; index++)
	{
		deleteDescriptor["target"]["<list>"].push ({ "<reference>": [ { "pattern": { "<index>": patternsIndexList[index] } } ] });
	}
	jamEngine.jsonPlay ("delete", deleteDescriptor);
}

//------------------------------------------------------------------------------

function unloadPatterns (patternsIndexList)
{
	deletePatterns (patternsIndexList);
}

//------------------------------------------------------------------------------

function main ()
{
	var appVersion = parseInt (app.version);
	if (appVersion >= 11)	// CS4
	{
		if (app.documents.length > 0)
		{
			Folder.current = (new File ($.fileName)).parent;
			var presetsFolder = new Folder ("Presets");
			var jsonFiles = presetsFolder.getFiles ("*.json");
			if (jsonFiles.length > 0)
			{
				var stop = false;
				for (var i = 0; i < jsonFiles.length; i++)
				{
					var jsonFile = jsonFiles[i];
					var leafName = File.decode (jsonFile.name);
					if (leafName[0] !== '~') // Skip files whose name begins with a tilde character
					{
						var setName = leafName.match (/(.*)\.json$/i)
						if (setName && setName[1])
						{
							try
							{
								var preset = jamUtils.readJsonFile (jsonFile);
								if ("posterEffects" in preset)
								{
									var effectSet = preset["posterEffects"];
									var effectCount = 0;
									for (var effect in effectSet)
									{
										if (effectSet.hasOwnProperty (effect))
										{
											if (effect[0] === '~')	// Discard effects whose name begins with a tilde character
											{
												delete effectSet[effect];
											}
											else
											{
												effectCount ++;
											}
										}
									}
									if (effectCount > 0)	// If set not empty
									{
										effects[setName[1]] = effectSet;
										patterns[setName[1]] = ("patternsFileBinary" in preset) ? preset["patternsFileBinary"] : null;
									}
								}
							}
							catch (e)
							{
								stop = !errorDialog (jsonFile, "Cannot parse JSON file:\r" + leafName);
							}
						}
					}
					if (stop) break;
				}
				if (!stop)
				{
					jamEngine.meaningfulIds = true;
					jamEngine.parseFriendly = false;
					var resultDescriptorObj = jamEngine.jsonGet
					(
						[
							{ "property": { "<property>": "mode" } },
							{ "document": { "<enumerated>": { "ordinal": "first" } } }
						]
					);
					var colorSpace = resultDescriptorObj["mode"]["<enumerated>"]["colorSpace"];
					if (colorSpace === "RGBColor")
					{
						customOptions = jamUtils.getCustomOptions (signature, defaultOptions);
						if (getParameters ())
						{
							jamUtils.putCustomOptions (signature, customOptions, true);
							var desiredSet = customOptions["set"];
							var desiredEffect = customOptions["effect"];
							var patternsFileBinary = patterns[desiredSet];
							if (patternsFileBinary)
							{
								var patternsIndexList = loadPatterns (patternsFileBinary);
							}
							if (allEffectsInMenu && (desiredEffect === allEffects))
							{
								resultDescriptorObj = jamEngine.jsonGet
								(
									[
										{ "property": { "<property>": "documentID" } },
										{ "document": { "<enumerated>": { "ordinal": "first" } } }
									]
								);
								var docId = resultDescriptorObj["documentID"]["<integer>"];
								var docIds = [ ];
								for (var k in effects[desiredSet])
								{
									if (effects[desiredSet].hasOwnProperty (k))
									{
										jamEngine.jsonPlay
										(
											"select",
											{ "target": { "<reference>": [ { "document": { "<identifier>": docId } } ] } }
										);
										processEffect (desiredSet, k);
										resultDescriptorObj = jamEngine.jsonGet
										(
											[
												{ "property": { "<property>": "documentID" } },
												{ "document": { "<enumerated>": { "ordinal": "first" } } }
											]
										);
										docIds.unshift (resultDescriptorObj["documentID"]["<integer>"]);
									}
								}
								if (reverseAllDocs)
								{
									docIds.reverse ();
								}
								for (var i = 0; i < docIds.length; i++)
								{
									jamEngine.jsonPlay
									(
										"select",
										{ "target": { "<reference>": [ { "document": { "<identifier>": docIds[i] } } ] } }
									);
								}
							}
							else
							{
								processEffect (desiredSet, desiredEffect);
							}
							if (patternsFileBinary && (patternsIndexList.length > 0))
							{
								unloadPatterns (patternsIndexList);
							}
						}
					}
					else
					{
						alert ("Unsupported color space.");
					}
				}
			}
			else
			{
				alert ("No preset files available.");
			}
		}
	}
	else
	{
		alert ("Sorry, this script requires Photoshop CS4 or later.");
	}
}

//------------------------------------------------------------------------------

try
{
	main ();
}
catch (e)
{
	alert (e);
}

//------------------------------------------------------------------------------

