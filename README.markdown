Requirejs Bundle Types
===============
> This example project is inspired by [a question from StackOverflow](http://stackoverflow.com/questions/17035609/most-efficient-multipage-requirejs-and-almond-setup)

## 3 ways to optimize requirejs bundle files
> 1. Optimize a single JS file for the whole site (w/ or w/o Almond)
2. Optimize a single JS file for each page (w/ or w/o Almond)
3. Optimize one JS file for common modules, and then another for each specific page. (Almond doesn't fit in with this way)

## Naming them for easier understanding
1. Centralized / Centralized-Almond
2. Independent / Independent-Almond
3. Shared

## What does this project have?
_It contains 2 pages, 1 common module, 2 individual modules and corresponding 2 template files_

### Folder structure
```
src
├── app/
│   ├── bower_components/
│   │   ├── backbone/
│   │   ├── jquery/
│   │   ├── requirejs/
│   │   ├── requirejs-text/
│   │   └── underscore/
│   ├── hello/
│   │   ├── main.js
│   │   └── main.template.txt
│   └── world/
│       ├── main.js
│       └── main.template.txt
├── common.js
├── hello.html
└── world.html
```

#### 1. Pages
> Including requirejs library and data-main script

- src/hello.html
- src/world.html

#### 2. Common module
> including requirejs.config({}) and callback() to launch app

- src/common.js

#### 3. Individual modules and corresponding template files
> Individual module and its dependencies

- src/app/hello/main.js
  - src/app/hello/main.template.txt
- src/app/world/main.js
  - src/app/world/main.template.txt
  
#### 4. Vendor resources
> External static libraries

_Every library has its own short module/path name in requirejs.config({}) definition_

_They are installed by [Bower](http://bower.io) which is not important here_
- src/app/bower_components/*

Building bundle files
===============

### 1. Requirejs native build file or grunt-requirejs task?

_                    | Share common configurations | Almond support | Script tag substitution
---------------------| :-------------------------: | :------------: | :---------------------:
build file           | No                          | Yes            | No
grunt-requirejs task | Yes                         | Yes            | Yes

> [grunt-requirejs](https://github.com/asciidisco/grunt-requirejs) wins!

### 2. Predefined grunt tasks
- `grunt requirejs:centralized` and `grunt requirejs:centralizedAlmond`
- `grunt requirejs:independent` and `grunt requirejs:independentAlmond`
- `grunt requirejs:shared`

### 3. Before optimization
#### Every page has 8 requests.

![Before](https://f.cloud.github.com/assets/44489/1102603/ad0ceeae-1838-11e3-9251-21c1090a58a4.png)

### 4. After optimization

##### `grunt requirejs:centralized`

> All modules are bundled into one file

> Every page shares this bundule file

> Reduced to 3 requests

> ![grunt requirejs:centralized](https://f.cloud.github.com/assets/44489/1102618/686bcf52-183a-11e3-9839-443fb87c7927.png)

##### `grunt requirejs:centralizedAlmond`

> All modules are bundled into one file (including Almond)

> Every page shares this bundule file without additional require.js

> Reduced to 2 requests

> ![grunt requirejs:centralizedAlmond](https://f.cloud.github.com/assets/44489/1102617/686ba19e-183a-11e3-857d-e239073b53fc.png)

#### `grunt requirejs:independent`

> Every individual module is bundle with common modules into its own bundle file

> Every page loads its own bundule file

> Reduced to 3 requests

> ![grunt requirejs:independent](https://f.cloud.github.com/assets/44489/1103240/66e31342-1895-11e3-83aa-efb0466cf1a3.png)


#### `grunt requirejs:independentAlmond`
> Every individual module is bundled with common modules into its own bundle file (including Almond)

> Every page loads its own bundule file without additional require.js

> Reduced to 2 requests
 
> ![grunt requirejs:independentAlmond](https://f.cloud.github.com/assets/44489/1103232/de79d3ec-1894-11e3-8e21-879434dc1a41.png)

#### `grunt requirejs:shared`
> Every individual module is bundled into its own bundle file without common modules

> All common modules are bundled into another file which is shared for all pages

> Reduced to 4 requests
 
> ![grunt requirejs:shared](https://f.cloud.github.com/assets/44489/1103256/1cf532a4-1897-11e3-9055-f13dcdc65ff6.png)

Which one is better?
===============

### It depends on your requirement actually.

- `grunt requirejs:shared` is most efficient at getting rid of duplicated downloading and utilizing cache as much as possible.
- `grunt requirejs:centralized` is sutiable for small bundle file or mobile site. Download once, use everywhere.
- `grunt requirejs:independent` has least usage scenarios. Might suitable for one-off project.

Notes
===============
## Prefer `paths` rather than `maps` configuration if possible

It's better to use `paths` to achieve same objective.

```
paths: {
    'text': 'requirejs-text/text',
},
```
Utilizing `paths` rather than `maps` is better for bundle in some cases.
Because Almond doesn't support `maps` configuration.

```
map: {
    '*': {
        'text': 'requirejs-text/text'
    }
},
```

## Write `rerquire.config({})` once, use everywhere

- Development and build environment share same configuration
- Other environments, for example, test environment can use it as well
- `common.js` is right place to hold it
- **Keep DRY**
