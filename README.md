# Smithy [![Build Status](https://travis-ci.org/adamcarr/forge-di-smithy.svg?branch=master)](https://travis-ci.org/adamcarr/forge-di-smithy)

An extension library to [nkohari/forge](https://github.com/nkohari/forge) inversion of control framework.

**Table of contents**

- [Intent](#intent)
- [Getting started](#getting-started)
- [Components](#components)
  - [Equipment](#equipment)
  - [Blacksmith](#blacksmith)
  - [Tools](#tools)
    - [Type Tool](#type-tool)
    - [Function Tool](#function-tool)
    - [Instance Tool](#instance-tool)
- [Example](#example)
- [Tasks](#tasks)

## Intent

The intent of this framework is to provide a set of useful extensions on forge by allowing a user to register tools within an equipment object. The Blacksmith class takes a dependency on a forge instance and will read in equipment instances to add configured bindings.

This should allow you to separate your binding mappings and organize them as desired.

## Getting started

You can install Smithy from npm: (not yet published)

```
$ npm install forge-di-smithy
```

## Components

### Equipment

An array of tools that can be ready by the Blacksmith. `blacksmith.registerEquipment(equipment);`

### Blacksmith

The main container that will wrap a forge instance and register equipment to bindings on the forge instance. `new Smithy.Blacksmith(forge);`

### Tools

A tool is a mapping for a binding. There are 3 different types of tools. Each tool requires a name and a target to be passed as the first 2 arguments respectively. After that, you can pass in a lifecycle, hint, binding arguments, and a when predicate. These are currently configured in 9 different overloads. Will refactor these out into an options object soon.

#### Type Tool

The type tool is a mapping to the `forge.bind(...).to.type(...);` registration.

#### Function Tool

The function tool is a mapping to the `forge.bind(...).to.function(...);` registration.

#### Instance Tool

The instance tool is a mapping to the `forge.bind(...).to.instance(...);` registration.

## Example

Here is a brief example. Best example can be found by going to [specs/lib/](specs/lib/)

**TypeScript**
```typescript
import Forge = require('forge-di');
import Smithy = require('forge-di-smithy');

class Foo { }
class Foo2 extends Foo { }
class Bar {
  constructor(foo: Foo) {...}
}
class Blah {
  constructor(public dependency: Foo) {
    "dependency->foo2";
  }
}

var equipment: Smithy.IEquipment = [
  new Smithy.Tools.Type('foo', Foo),
  new Smithy.Tools.Type('foo2', Foo2),
  new Smithy.Tools.Type('bar', Bar),
  new Smithy.Tools.Type('blah', Blah)
};

...

var forge = new Forge();
var blacksmith = new Blacksmith(forge);

blacksmith.registerEquipment(equipment);

...

var boo = forge.get('foo');
var blah = forge.get('blah');

expect(boo).to.be.an.instanceOf(Foo);
expect(blah).to.be.an.instanceOf(Blah);
expect(blah.dependency).to.be.an.instanceOf(Foo2);
```

**JavaScript**
```javascript
var Forge = require('forge-di');
var Smithy = require('forge-di-smithy');

function Foo () { }
function Foo2 () { }
function Bar (foo) {
  this.foo = foo;
}
function Blah (dependency) {
  "dependency->foo2";
  this.dependency = dependency;
}

var equipment: Smithy.IEquipment = [
  new Smithy.Tools.Type('foo', Foo),
  new Smithy.Tools.Type('foo2', Foo2),
  new Smithy.Tools.Type('bar', Bar),
  new Smithy.Tools.Type('blah', Blah)
};

...

var forge = new Forge();
var blacksmith = new Blacksmith(forge);

blacksmith.registerEquipment(equipment);

...

var boo = forge.get('foo');
var blah = forge.get('blah');

expect(boo).to.be.an.instanceOf(Foo);
expect(blah).to.be.an.instanceOf(Blah);
expect(blah.dependency).to.be.an.instanceOf(Foo2);
```

## Tasks

- [ ] Refactor overloads for tools into an options argument for named arguments
- [ ] Add ability to configure a tool to auto register a func resolver based on the current binding name + 'Func' for factory.
