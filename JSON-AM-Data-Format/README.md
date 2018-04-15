# JSON AM Data Format

## JSON AM descriptor

A descriptor in **JSON AM Data Format** is represented as a **JSON object { }** (not to be confused with the Photoshop API *Object* type, whose tag is `"<object>"` as described below), where each item in the descriptor is expressed as a unique key **unified ID string** associated with a “typed value”:

Typed&nbsp;Value | Parameters | ActionDescriptor&nbsp;Methods
-----------------|------------|------------------------------
<code>{&nbsp;"&lt;boolean&gt;":&nbsp;<em>Boolean</em>&nbsp;}</code><br>or<br><code>[&nbsp;"&lt;boolean&gt;",&nbsp;<em>Boolean</em>&nbsp;]</code> | *Boolean* : `true` or `false` | `desc.getBoolean`<br>`desc.putBoolean`
<code>{&nbsp;"&lt;class&gt;":&nbsp;<em>Class</em>&nbsp;}</code><br>or<br><code>[&nbsp;"&lt;class&gt;",&nbsp;<em>Class</em>&nbsp;]</code> | *Class* : class **unified ID string** | `desc.getClass`<br>`desc.putClass`
<code>{&nbsp;"&lt;data&gt;":&nbsp;<em>Data</em>&nbsp;}</code><br>or<br><code>[&nbsp;"&lt;data&gt;",&nbsp;<em>Data</em>&nbsp;]</code> | *Data* : raw byte data string | `desc.getData`<br>`desc.putData`<br>*(only from CS2)*
<code>{&nbsp;"&lt;double&gt;":&nbsp;<em>Double</em>&nbsp;}</code><br>or<br><code>[&nbsp;"&lt;double&gt;",&nbsp;<em>Double</em>&nbsp;]</code> | *Double* : number | `desc.getDouble`<br>`desc.putDouble`
<code>{&nbsp;"&lt;enumerated&gt;":&nbsp;{&nbsp;<em>EnumType</em>:&nbsp;<em>EnumValue</em>&nbsp;}&nbsp;}</code><br>or<br><code>[&nbsp;"&lt;enumerated&gt;",&nbsp;[&nbsp;<em>EnumType</em>,&nbsp;<em>EnumValue</em>&nbsp;]&nbsp;]</code> | *EnumType* : enumType **unified ID string**<br>*EnumValue* : enumValue **unified ID string** | `desc.getEnumerationType`<br>`desc.getEnumerationValue`<br>`desc.putEnumerated`
<code>{&nbsp;"&lt;integer&gt;":&nbsp;<em>Integer</em>&nbsp;}</code><br>or<br><code>[&nbsp;"&lt;integer&gt;",&nbsp;<em>Integer</em>&nbsp;]</code> | *Integer* : number (signed integer) | `desc.getInteger`<br>`desc.putInteger`
<code>{&nbsp;"&lt;largeInteger&gt;":&nbsp;<em>LargeInteger</em>&nbsp;}</code><br>or<br><code>[&nbsp;"&lt;largeInteger&gt;",&nbsp;<em>LargeInteger</em>&nbsp;]</code> | *LargeInteger* : number (signed integer) | `desc.getLargeInteger`<br>`desc.putLargeInteger`<br>*(only from CS6)*
<code>{&nbsp;"&lt;list&gt;":&nbsp;<em>List</em>&nbsp;}</code><br>or<br><code>[&nbsp;"&lt;list&gt;",&nbsp;<em>List</em>&nbsp;]</code> | *List* : **JSON AM list** array | `desc.getList`<br>`desc.putList`
<code>{&nbsp;"&lt;object&gt;":&nbsp;{&nbsp;<em>Class</em>:&nbsp;<em>Descriptor</em>&nbsp;}&nbsp;}</code><br>or<br><code>[&nbsp;"&lt;object&gt;",&nbsp;[&nbsp;<em>Class</em>,&nbsp;<em>Descriptor</em>&nbsp;]&nbsp;]</code> | *Class* : class **unified ID string**<br>*Descriptor* : **JSON AM descriptor** object | `desc.getObjectType`<br>`desc.getObjectValue`<br>`desc.putObject`
<code>{&nbsp;"&lt;path&gt;":&nbsp;<em>Path</em>&nbsp;}</code><br>or<br><code>[&nbsp;"&lt;path&gt;",&nbsp;<em>Path</em>&nbsp;]</code> | *Path* : file system path string | `desc.getPath`<br>`desc.putPath`
<code>{&nbsp;"&lt;reference&gt;":&nbsp;<em>Reference</em>&nbsp;}</code><br>or<br><code>[&nbsp;"&lt;reference&gt;",&nbsp;<em>Reference</em>&nbsp;]</code> | *Reference* : **JSON AM reference** array | `desc.getReference`<br>`desc.putReference`
<code>{&nbsp;"&lt;string&gt;":&nbsp;<em>String</em>&nbsp;}</code><br>or<br><code>[&nbsp;"&lt;string&gt;",&nbsp;<em>String</em>&nbsp;]</code> | *String* : string | `desc.getString`<br>`desc.putString`
<code>{&nbsp;"&lt;unitDouble&gt;":&nbsp;{&nbsp;<em>Unit</em>:&nbsp;<em>Double</em>&nbsp;}&nbsp;}</code><br>or<br><code>[&nbsp;"&lt;unitDouble&gt;",&nbsp;[&nbsp;<em>Unit</em>,&nbsp;<em>Double</em>&nbsp;]&nbsp;]</code> | *Unit* : unit **unified ID string**<br>*Double* : number | `desc.getUnitDoubleType`<br>`desc.getUnitDoubleValue`<br>`desc.putUnitDouble`

### Example

```json
{
    "mode": { "<class>": "RGBColorMode" },
    "width": { "<unitDouble>": { "distanceUnit": 512 } },
    "height": { "<unitDouble>": { "distanceUnit": 512 } },
    "resolution": { "<unitDouble>": { "densityUnit": 72 } },
    "pixelScaleFactor": { "<double>": 1 },
    "fill": { "<enumerated>": { "fill": "white" } },
    "depth": { "<integer>": 8 },
    "profile": { "<string>": "sRGB IEC61966-2.1" }
}
```
or
```json
{
    "mode": [ "<class>", "RGBColorMode" ],
    "width": [ "<unitDouble>", [ "distanceUnit", 512 ] ],
    "height": [ "<unitDouble>", [ "distanceUnit", 512 ] ],
    "resolution": [ "<unitDouble>", [ "densityUnit", 72 ] ],
    "pixelScaleFactor": [ "<double>", 1 ],
    "fill": [ "<enumerated>", [ "fill", "white" ] ],
    "depth": [ "<integer>", 8 ],
    "profile": [ "<string>", "sRGB IEC61966-2.1" ]
}
```

## JSON AM list

A list in **JSON AM Data Format** is represented as a **JSON array [ ]**, where each element of the array is a “typed value”:

Typed&nbsp;Value | Parameters | ActionList&nbsp;Methods
-----------------|------------|------------------------
<code>{&nbsp;"&lt;boolean&gt;":&nbsp;<em>Boolean</em>&nbsp;}</code><br>or<br><code>[&nbsp;"&lt;boolean&gt;",&nbsp;<em>Boolean</em>&nbsp;]</code> | *Boolean* : `true` or `false` | `list.getBoolean`<br>`list.putBoolean`
<code>{&nbsp;"&lt;class&gt;":&nbsp;<em>Class</em>&nbsp;}</code><br>or<br><code>[&nbsp;"&lt;class&gt;",&nbsp;<em>Class</em>&nbsp;]</code> | *Class* : class **unified ID string** | `list.getClass`<br>`list.putClass`
<code>{&nbsp;"&lt;data&gt;":&nbsp;<em>Data</em>&nbsp;}</code><br>or<br><code>[&nbsp;"&lt;data&gt;",&nbsp;<em>Data</em>&nbsp;]</code> | *Data* : raw byte data string | `list.getData`<br>`list.putData`<br>*(only from CS2)*
<code>{&nbsp;"&lt;double&gt;":&nbsp;<em>Double</em>&nbsp;}</code><br>or<br><code>[&nbsp;"&lt;double&gt;",&nbsp;<em>Double</em>&nbsp;]</code> | *Double* : number | `list.getDouble`<br>`list.putDouble`
<code>{&nbsp;"&lt;enumerated&gt;":&nbsp;{&nbsp;<em>EnumType</em>:&nbsp;<em>EnumValue</em>&nbsp;}&nbsp;}</code><br>or<br><code>[&nbsp;"&lt;enumerated&gt;",&nbsp;[&nbsp;<em>EnumType</em>,&nbsp;<em>EnumValue</em>&nbsp;]&nbsp;]</code> | *EnumType* : enumType **unified ID string**<br>*EnumValue* : enumValue **unified ID string** | `list.getEnumerationType`<br>`list.getEnumerationValue`<br>`list.putEnumerated`
<code>{&nbsp;"&lt;integer&gt;":&nbsp;<em>Integer</em>&nbsp;}</code><br>or<br><code>[&nbsp;"&lt;integer&gt;",&nbsp;<em>Integer</em>&nbsp;]</code> | *Integer* : number (signed integer) | `list.getInteger`<br>`list.putInteger`
<code>{&nbsp;"&lt;largeInteger&gt;":&nbsp;<em>LargeInteger</em>&nbsp;}</code><br>or<br><code>[&nbsp;"&lt;largeInteger&gt;",&nbsp;<em>LargeInteger</em>&nbsp;]</code> | *LargeInteger* : number (signed integer) | `list.getLargeInteger`<br>`list.putLargeInteger`<br>*(only from CS6)*
<code>{&nbsp;"&lt;list&gt;":&nbsp;<em>List</em>&nbsp;}</code><br>or<br><code>[&nbsp;"&lt;list&gt;",&nbsp;<em>List</em>&nbsp;]</code> | *List* : **JSON AM list** array | `list.getList`<br>`list.putList`
<code>{&nbsp;"&lt;object&gt;":&nbsp;{&nbsp;<em>Class</em>:&nbsp;<em>Descriptor</em>&nbsp;}&nbsp;}</code><br>or<br><code>[&nbsp;"&lt;object&gt;",&nbsp;[&nbsp;<em>Class</em>,&nbsp;<em>Descriptor</em>&nbsp;]&nbsp;]</code> | *Class* : class **unified ID string**<br>*Descriptor* : **JSON AM descriptor** object | `list.getObjectType`<br>`list.getObjectValue`<br>`list.putObject`
<code>{&nbsp;"&lt;path&gt;":&nbsp;<em>Path</em>&nbsp;}</code><br>or<br><code>[&nbsp;"&lt;path&gt;",&nbsp;<em>Path</em>&nbsp;]</code> | *Path* : file system path string | `list.getPath`<br>`list.putPath`
<code>{&nbsp;"&lt;reference&gt;":&nbsp;<em>Reference</em>&nbsp;}</code><br>or<br><code>[&nbsp;"&lt;reference&gt;",&nbsp;<em>Reference</em>&nbsp;]</code> | *Reference* : **JSON AM reference** array | `list.getReference`<br>`list.putReference`
<code>{&nbsp;"&lt;string&gt;":&nbsp;<em>String</em>&nbsp;}</code><br>or<br><code>[&nbsp;"&lt;string&gt;",&nbsp;<em>String</em>&nbsp;]</code> | *String* : string | `list.getString`<br>`list.putString`
<code>{&nbsp;"&lt;unitDouble&gt;":&nbsp;{&nbsp;<em>Unit</em>:&nbsp;<em>Double</em>&nbsp;}&nbsp;}</code><br>or<br><code>[&nbsp;"&lt;unitDouble&gt;",&nbsp;[&nbsp;<em>Unit</em>,&nbsp;<em>Double</em>&nbsp;]&nbsp;]</code> | *Unit* : unit **unified ID string**<br>*Double* : number | `list.getUnitDoubleType`<br>`list.getUnitDoubleValue`<br>`list.putUnitDouble`

### Example

```json
[
    { "<string>": "Times" },
    { "<string>": "Helvetica" },
    { "<string>": "Monaco" }
]
```
or
```json
[
    [ "<string>", "Times" ],
    [ "<string>", "Helvetica" ],
    [ "<string>", "Monaco" ]
]
```

## JSON AM reference

A reference in **JSON AM Data Format** is represented as a **JSON array [ ]**, where each element of the array is either:
<br>
<code>{&nbsp;<em>DesiredClass</em>:&nbsp;<em>TypedValue</em>&nbsp;}</code>
<br>
or
<br>
<code>[&nbsp;<em>DesiredClass</em>,&nbsp;<em>TypedValue</em>&nbsp;]</code>

*DesiredClass* is a class **unified ID string**, and *TypedValue* is a “typed value”:

Typed&nbsp;Value | Parameters | ActionReference&nbsp;Methods
-----------------|------------|-----------------------------
<code>{&nbsp;"&lt;class&gt;":&nbsp;null&nbsp;}</code><br>or<br><code>[&nbsp;"&lt;class&gt;",&nbsp;null&nbsp;]</code> | (none) | (none)<br>`ref.putClass`
<code>{&nbsp;"&lt;enumerated&gt;":&nbsp;{&nbsp;<em>EnumType</em>:&nbsp;<em>EnumValue</em>&nbsp;}&nbsp;}</code><br>or<br><code>[&nbsp;"&lt;enumerated&gt;",&nbsp;[&nbsp;<em>EnumType</em>,&nbsp;<em>EnumValue</em>&nbsp;]&nbsp;]</code> | *EnumType* : enumType **unified ID string**<br>*EnumValue* : enumValue **unified ID string** | `ref.getEnumeratedType`<br>`ref.getEnumeratedValue`<br>`ref.putEnumerated`
<code>{&nbsp;"&lt;identifier&gt;":&nbsp;<em>Identifier</em>&nbsp;}</code><br>or<br><code>[&nbsp;"&lt;identifier&gt;",&nbsp;<em>Identifier</em>&nbsp;]</code> | *Identifier* : number (unsigned integer) | `ref.getIdentifier`<br>`ref.putIdentifier`
<code>{&nbsp;"&lt;index&gt;":&nbsp;<em>Index</em>&nbsp;}</code><br>or<br><code>[&nbsp;"&lt;index&gt;",&nbsp;<em>Index</em>&nbsp;]</code> | *Index* : number (unsigned integer) | `ref.getIndex`<br>`ref.putIndex`
<code>{&nbsp;"&lt;name&gt;":&nbsp;<em>Name</em>&nbsp;}</code><br>or<br><code>[&nbsp;"&lt;name&gt;",&nbsp;<em>Name</em>&nbsp;]</code> | *Name* : string | `ref.getName`<br>`ref.putName`
<code>{&nbsp;"&lt;offset&gt;":&nbsp;<em>Offset</em>&nbsp;}</code><br>or<br><code>[&nbsp;"&lt;offset&gt;",&nbsp;<em>Offset</em>&nbsp;]</code> | *Offset* : number (signed integer) | `ref.getOffset`<br>`ref.putOffset`
<code>{&nbsp;"&lt;property&gt;":&nbsp;<em>Property</em>&nbsp;}</code><br>or<br><code>[&nbsp;"&lt;property&gt;",&nbsp;<em>Property</em>&nbsp;]</code> | *Property* : property (key) **unified ID string** | `ref.getProperty`<br>`ref.putProperty`

### Example

```json
[
    { "property": { "<property>": "histogram" } },
    { "channel": { "<enumerated>": { "channel": "green" } } },
    { "layer": { "<name>": "Hulk" } },
    { "document": { "<index>": 1 } }
]
```
or
```json
[
    [ "property", [ "<property>", "histogram" ] ],
    [ "channel", [ "<enumerated>", [ "channel", "green" ] ] ],
    [ "layer", [ "<name>", "Hulk" ] ],
    [ "document", [ "<index>", 1 ] ]
]
```

## Unified ID string

ID&nbsp;String | Unified&nbsp;Syntax | Examples | Application&nbsp;Methods
---------------|---------------------|----------|-------------------------
CharID | Four-letter “mnemonic” string<br>surrounded by single quotation marks:<br>`"'xxxx'"` | `"'Rd  '"`<br>`"'Grn '"`<br>`"'Bl  '"`<br>`"'H   '"`<br>`"'Axis'"`<br>`"'#Pxl'"` | `app.charIDToTypeID`<br>`app.typeIDToCharID`
StringID | Plain “human-readable” text string:<br>`"xxxxxxxx"` | `"red"`<br>`"green"`<br>`"blue"`<br>`"hue"`<br>`"axis"`<br>`"pixelsUnit"` | `app.stringIDToTypeID`<br>`app.typeIDToStringID`

**Note**: In Photoshop, all internal IDs are strictly positive integers; they are normally represented by more “readable” strings known as CharIDs and StringIDs, converted to numerical IDs by `app.charIDToTypeID` and `app.stringIDToTypeID` respectively. Any CharID or StringID can actually be used as long as they are equivalent, i.e., they get converted to the same numerical ID.

## Notes

- A **JSON object** is an unordered collection of name/value pairs. It begins with **\{** (*left brace*) and ends with **\}** (*right brace*). Each name is a string followed by **:** (*colon*) and the name/value pairs are separated by **,** (*comma*).

- A **JSON array** is an ordered sequence of values. It begins with **\[** (*left bracket*) and ends with **\]** (*right bracket*). Values are separated by **,** (*comma*).

- A value can only be: a **string**, a **number**, an **object**, an **array**, or `true`, `false` and `null`.

- All strings must be enclosed in *double* quotes.

- As an extra reminder, it should be noted that the following JavaScript statements:

```javascript
var myObject = { };
var myArray = [ ];
```

are strictly equivalent to:

```javascript
var myObject = new Object ();
var myArray = new Array ();
```
