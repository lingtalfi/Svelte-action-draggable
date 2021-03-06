Svelte action draggable
==========
2020-05-04 -> 2020-05-05


A draggable action for svelte.


Adapted from here https://svelte.dev/tutorial/actions.


Install
---------
```bash
npm i svelte-action-draggable
```





Playground
-------

// Test.svelte

```html
<script>

    import {draggable} from './draggable.js';
    import {writable} from 'svelte/store';

    const coords = writable({x: 0, y: 0});

    const styleId = "my-draggable-tmp-style";

    let debug = {
        x: 0,
        y: 0,
        dx: 0,
        dy: 0,
    };


    function handleDragMove(event) {

        debug = event.detail;

        coords.update($coords => ({
            x: $coords.x + event.detail.dx,
            y: $coords.y + event.detail.dy
        }));
    }

    function handleDragStart(event) {

        let elStyle = document.getElementById(styleId);
        if (null === elStyle) {
            var elHead = document.getElementsByTagName('head')[0];
            elStyle = document.createElement('style');
            elStyle.type = 'text/css';
            elHead.appendChild(elStyle);
            elStyle.id = styleId;
            elStyle.innerHTML = '.draggable-unselectable > * {\n' +
                    '    user-select: none;\n' +
                    '}';
        }

        this.classList.add('draggable-unselectable');
    }

    function handleDragEnd(event) {
        this.classList.remove('draggable-unselectable');
        let elStyle = document.getElementById(styleId);
        if (null !== elStyle) {
            elStyle.remove();
        }
    }


</script>


<div class="debug">
    <span>x: {debug.x}</span><br>
    <span>y: {debug.y}</span><br>
    <span>dx: {debug.dx}</span><br>
    <span>dy: {debug.dy}</span><br>
</div>


<h1>Here</h1>
<h1>Here</h1>
<h1>Here</h1>
<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum nisi soluta tempore. Aliquid cum, cupiditate eius enim
    in maiores molestias nam natus nulla quidem quis reprehenderit similique ut, veritatis voluptates!</p>
<h1>Here</h1>
<h1>Here</h1>


<div class="box"
     use:draggable
     on:dragstart={handleDragStart}
     on:dragmove={handleDragMove}
     on:dragend={handleDragEnd}
     style="transform: translate({$coords.x}px,{$coords.y}px)"
>
    <span>Drag me</span>
</div>


<style>


    .box {
        width: 100px;
        height: 100px;
        border-radius: 4px;
        background-color: #ff3e00;
        cursor: move;
    }


</style>



```



// main.js

```js

import Component from './Test.svelte';


window.Test = function () {
    return new Component({
        target: document.body
    });
};

```


History Log
===============
    
- 1.2.0 -- 2020-05-05

    - add onStartDragBefore user callback
    
- 1.1.0 -- 2020-05-04

    - add mouse button filtering option

- 1.0.0 -- 2020-05-04

    - initial commit
    




