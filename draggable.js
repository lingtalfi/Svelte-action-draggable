export function draggable(node, _options = {}) {
    let x;
    let y;
    let options = Object.assign({
        /**
         *
         * Defines which mouse button(s) will initiate the drag.
         *
         * https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button
         * - main: left
         * - aux: middle wheel
         * - secondary: right
         *
         * You can pass an array.
         */
        startClick: "main",
    }, _options);
    let isDragging = false;



    function handleMousedown(event) {

        //----------------------------------------
        // MOUSE BUTTON FILTERING
        //----------------------------------------
        let startClick = options.startClick;
        if (false === Array.isArray(options.startClick)) {
            startClick = [options.startClick];
        }
        startClick = startClick.map(btn => {
            let ret;
            switch (btn) {
                case 'main':
                    ret = 0;
                    break;
                case 'aux':
                    ret = 1;
                    break;
                case 'secondary':
                    ret = 2;
                    break;
            }
            return ret;
        });
        if (false === startClick.includes(event.button)) {
            return;
        }
        isDragging = true;


        //----------------------------------------
        //
        //----------------------------------------

        x = event.clientX;
        y = event.clientY;

        node.dispatchEvent(new CustomEvent('dragstart', {
            detail: { x, y }
        }));


        window.addEventListener('mousemove', handleMousemove);
        window.addEventListener('mouseup', handleMouseup);

        // document.body.addEventListener('mouseleave', handleMouseLeave);
        // document.body.addEventListener('mouseenter', handleMouseEnter);


        document.body


    }

    function handleMouseLeave(event) {
        console.log("mouse leaving body");
    }

    function handleMouseEnter(event) {
        console.log("mouse enters body");
    }



    function handleMousemove(event) {
        if (false === isDragging) {
            return;
        }

        const dx = event.clientX - x;
        const dy = event.clientY - y;
        x = event.clientX;
        y = event.clientY;

        node.dispatchEvent(new CustomEvent('dragmove', {
            detail: { x, y, dx, dy }
        }));
    }

    function handleMouseup(event) {
        isDragging = false;        
        x = event.clientX;
        y = event.clientY;

        node.dispatchEvent(new CustomEvent('dragend', {
            detail: { x, y }
        }));

        window.removeEventListener('mousemove', handleMousemove);
        window.removeEventListener('mouseup', handleMouseup);
    }

    node.addEventListener('mousedown', handleMousedown);

    return {
        destroy() {
            node.removeEventListener('mousedown', handleMousedown);
        }
    };
}