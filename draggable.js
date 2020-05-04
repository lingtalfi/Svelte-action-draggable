export function draggable(node) {
    let x;
    let y;

    function handleMousedown(event) {
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
        const dx = event.clientX - x;
        const dy = event.clientY - y;
        x = event.clientX;
        y = event.clientY;

        node.dispatchEvent(new CustomEvent('dragmove', {
            detail: { x, y, dx, dy }
        }));
    }

    function handleMouseup(event) {
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