/*

<javascriptresource>
<name>Get Binary File Data String...</name>
<about>"Get Binary File Data String" v1.2

Get data string from a binary file.

Utility script using the "JSON Action Manager" scripting library.
© 2015-2016 Michel MARIANI.
</about>
<menu>automate</menu>
<category>JSON Action Manager Miscellaneous Utility</category>
</javascriptresource>

*/

//------------------------------------------------------------------------------
// File: Get Binary File Data String.js
// Version: 1.2
// Release Date: 2016-04-06
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
//  1.2:
//  - Added file name in dialog.
//  1.1:
//  - Fixed error handling.
//  1.0:
//  - Initial release.
//------------------------------------------------------------------------------

// jamJSON.jsxinc v4.4 (minified)
if(typeof jamJSON!=='object') {var jamJSON={};(function() {var state;var stack;var container;var key;var value;var escapes={'\\':'\\','"':'"','/':'/','t':'\t','n':'\n','r':'\r','f':'\f','b':'\b'};var action={'{':{go:function() {stack.push({state:'ok'});container={};state='firstokey';},ovalue:function() {stack.push({container:container,state:'ocomma',key:key});container={};state='firstokey';},firstavalue:function() {stack.push({container:container,state:'acomma'});container={};state='firstokey';},avalue:function() {stack.push({container:container,state:'acomma'});container={};state='firstokey';}},'}':{firstokey:function() {var pop=stack.pop();value=container;container=pop.container;key=pop.key;state=pop.state;},ocomma:function() {var pop=stack.pop();container[key]=value;value=container;container=pop.container;key=pop.key;state=pop.state;}},'[':{go:function() {stack.push({state:'ok'});container=[];state='firstavalue';},ovalue:function() {stack.push({container:container,state:'ocomma',key:key});container=[];state='firstavalue';},firstavalue:function() {stack.push({container:container,state:'acomma'});container=[];state='firstavalue';},avalue:function() {stack.push({container:container,state:'acomma'});container=[];state='firstavalue';}},']':{firstavalue:function() {var pop=stack.pop();value=container;container=pop.container;key=pop.key;state=pop.state;},acomma:function() {var pop=stack.pop();container.push(value);value=container;container=pop.container;key=pop.key;state=pop.state;}},':':{colon:function() {if(container.hasOwnProperty(key)) {throw new SyntaxError("[jamJSON.parse] Duplicate key: “"+key+"”");} state='ovalue';}},',':{ocomma:function() {container[key]=value;state='okey';},acomma:function() {container.push(value);state='avalue';}},'true':{go:function() {value=true;state='ok';},ovalue:function() {value=true;state='ocomma';},firstavalue:function() {value=true;state='acomma';},avalue:function() {value=true;state='acomma';}},'false':{go:function() {value=false;state='ok';},ovalue:function() {value=false;state='ocomma';},firstavalue:function() {value=false;state='acomma';},avalue:function() {value=false;state='acomma';}},'null':{go:function() {value=null;state='ok';},ovalue:function() {value=null;state='ocomma';},firstavalue:function() {value=null;state='acomma';},avalue:function() {value=null;state='acomma';}}};var number={go:function() {state='ok';},ovalue:function() {state='ocomma';},firstavalue:function() {state='acomma';},avalue:function() {state='acomma';}};var string={go:function() {state='ok';},firstokey:function() {key=value;state='colon';},okey:function() {key=value;state='colon';},ovalue:function() {state='ocomma';},firstavalue:function() {state='acomma';},avalue:function() {state='acomma';}};var commentFunc=function(){};function debackslashify(text) {return text.replace(/\\(?:u(.{4})|([^u]))/g,function(a,b,c){return(b)?String.fromCharCode(parseInt(b,16)):escapes[c];});} jamJSON.parse=function(text,validate,allowComments) {if(validate) {var tx=/^[\x20\t\n\r]*(?:([,:\[\]{}]|true|false|null)|(-?(?:0|[1-9][0-9]*)(?:\.[0-9]+)?(?:[eE][+\-]?[0-9]+)?)|"((?:[^\r\n\t\\\"]|\\(?:["\\\/trnfb]|u[0-9a-fA-F]{4}))*)")/;var txc=/^[\x20\t\n\r]*(?:(\/(?:\/.*|\*(?:.|[\r\n])*?\*\/))|([,:\[\]{}]|true|false|null)|(-?(?:0|[1-9][0-9]*)(?:\.[0-9]+)?(?:[eE][+\-]?[0-9]+)?)|"((?:[^\r\n\t\\\"]|\\(?:["\\\/trnfb]|u[0-9a-fA-F]{4}))*)")/;var r;var i;var actionFunc;state='go';stack=[];try {while(true) {i=(allowComments)?1:0;r=(allowComments)?txc.exec(text):tx.exec(text);if(!r) {break;} if(allowComments&&r[1]) {actionFunc=commentFunc;} else if(r[i+1]) {actionFunc=action[r[i+1]][state];} else if(r[i+2]) {value=+r[i+2];actionFunc=number[state];} else {value=debackslashify(r[i+3]);actionFunc=string[state];} if(actionFunc) {actionFunc();text=text.slice(r[0].length);} else {break;}}} catch(e) {state=e;} if(state!=='ok'||/[^\x20\t\n\r]/.test(text)) {throw state instanceof SyntaxError?state:new SyntaxError("[jamJSON.parse] Invalid JSON");} return value;} else {return eval('('+text+')');}};var escapable=/[\\\"\x00-\x1F\x7F-\x9F\u00AD\u0600-\u0604\u070F\u17B4\u17B5\u200C-\u200F\u2028-\u202F\u2060-\u206F\uFEFF\uFFF0-\uFFFF]/g;var meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'};var gap;var indent;var prefixIndent;function quote(string) {escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return(typeof c==='string')?c:'\\u'+('0000'+a.charCodeAt(0).toString(16).toUpperCase()).slice(-4);})+'"':'"'+string+'"';} function str(value) {var i;var k;var v;var mind=gap;var partial;switch(typeof value) {case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value) {return'null';} gap+=indent;partial=[];if(value.constructor===Array) {for(i=0;i<value.length;i++) {partial[i]=str(value[i]);} v=(partial.length===0)?(gap?'[\n'+prefixIndent+mind+']':'[ ]'):(gap?'[\n'+prefixIndent+gap+partial.join(',\n'+prefixIndent+gap)+'\n'+prefixIndent+mind+']':'[ '+partial.join(', ')+' ]');gap=mind;return v;} else {for(k in value) {if(value.hasOwnProperty(k)) {v=str(value[k]);if(v) {partial.push(quote(k)+(gap&&((v.charAt(0)==='{')||(v.charAt(0)==='['))?':\n'+prefixIndent+gap:': ')+v);}}} v=(partial.length===0)?(gap?'{\n'+prefixIndent+mind+'}':'{ }'):(gap?'{\n'+prefixIndent+gap+partial.join(',\n'+prefixIndent+gap)+'\n'+prefixIndent+mind+'}':'{ '+partial.join(', ')+' }');gap=mind;return v;} default:throw new SyntaxError("[jamJSON.stringify] Invalid JSON");}} jamJSON.stringify=function(value,space,prefix) {var i;gap='';indent='';prefixIndent='';if(typeof space==='number') {for(i=0;i<space;i++) {indent+=' ';}} else if(typeof space==='string') {indent=space;} if(typeof prefix==='number') {for(i=0;i<prefix;i++) {prefixIndent+=' ';}} else if(typeof prefix==='string') {prefixIndent=prefix;} return prefixIndent+str(value);};}());}

//------------------------------------------------------------------------------

var appVersion = parseInt (app.version);

//------------------------------------------------------------------------------

function displayDialog (binaryFile, binaryData)
{
	if (appVersion >= 10)	// CS3
	{
		// Get an available UI font among a list of favorites
		function getAvailableUIFont (fontsArray)
		{
			// List all fonts available in Photoshop in JSON format
			var fontsObj = { };
			for (var i = 0; i < app.fonts.length; i++)
			{
				var family = app.fonts[i].family;
				if (!(family in fontsObj))
				{
					fontsObj[family] = { };
				}
				fontsObj[family][app.fonts[i].style] =
				{
					"name": app.fonts[i].name
				};
			}
			var availableFont;
			var fontFamily;
			var fontStyle;
			var fontSize;
			for (var i = 0; i < fontsArray.length; i++)
			{
				fontFamily = fontsArray[i][0];
				if (fontFamily in fontsObj)
				{
					fontStyle = fontsArray[i][1];
					if (fontStyle in fontsObj[fontFamily])
					{
						fontSize = fontsArray[i][2];
						availableFont = ScriptUI.newFont (fontFamily, fontStyle, fontSize)
						break;
					}
				}
			}
			return availableFont;
		}
		var monospacedFont =
		getAvailableUIFont
		(
			[
				[ "Monaco", "Regular", 12 ],
				[ "Lucida Sans Typewriter", "Regular", 14 ],
				[ "Courier", "Regular", 16 ],
				[ "Courier New", "Regular", 14 ]
			]
		);
	}
	var hGap = 16;
	var vGap = 12;
	var nameHeight = 20;
	var codeHeight = 480;
	var buttonWidth = 80;
	var buttonHeight = 20;
	var dialogWidth = 600;
	var dialogHeight = 512;	// Overridden anyway...
	var dialog = new Window ('dialog', "Get Binary File Data String", [ 0, 0, dialogWidth, dialogHeight ]);
	var nameProperties = { };
	if (appVersion >= 9)	// CS2
	{
		nameProperties.readonly = true;
	}
	var nameText = dialog.add ('edittext', [ hGap, vGap, dialogWidth - hGap, vGap + nameHeight ], File.decode (binaryFile.name), nameProperties);
	nameText.justify = "center";
	nameText.helpTip = binaryFile.fsName;
	var areaProperties = { };
	areaProperties.multiline = true;
	if (appVersion >= 9)	// CS2
	{
		areaProperties.readonly = true;
	}
	var dataStringCode = dialog.add ('edittext', [ hGap, vGap + nameHeight + vGap, dialogWidth - hGap, vGap + nameHeight + vGap + codeHeight ], "", areaProperties);
	if (monospacedFont)
	{
		dataStringCode.graphics.font = monospacedFont;
	}
	var doneButton = dialog.add ('button', [ (dialogWidth - buttonWidth) / 2, dataStringCode.bounds.bottom + vGap, (dialogWidth + buttonWidth) / 2, dataStringCode.bounds.bottom + vGap + buttonHeight ], 'Done', { name: "ok" });
	dialog.bounds.bottom = doneButton.bounds.bottom + vGap;
	dialog.onShow = function ()
	{
		dataStringCode.text = jamJSON.stringify (binaryData);
	};
	dialog.center ();
	return dialog.show ();
}

//------------------------------------------------------------------------------

function main ()
{
	var binaryFile = File.openDialog ("Open binary file:");
	if (binaryFile)
	{
		var readonly = binaryFile.readonly;	// Let's work around an odd Photoshop CS bug after a file selection dialog !!
		if (binaryFile.length <= (100 * 1024))
		{
			if (binaryFile.open ('r'))
			{
				binaryFile.encoding = 'BINARY';
				// Work around an ugly bug, in case the binary file starts with a Unicode BOM sequence (for instance: 0xFF, 0xFE).
				binaryFile.seek (0);
				var binaryData = binaryFile.read ();
				binaryFile.close ();
				displayDialog (binaryFile, binaryData);
			}
			else
			{
				alert ("Error: cannot open binary file.");
			}
		}
		else
		{
			alert ("Error: binary file too big.");
		}
	}
}

//------------------------------------------------------------------------------

main ();

//------------------------------------------------------------------------------

