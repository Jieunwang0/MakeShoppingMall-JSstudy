```js
import {$} from "@eunjae-lee/mini-query";

$(".btn").click((e) => {
     console.log("this is clicked", e.target);

});

console.log("number of buttons", $(".btn").length());
```