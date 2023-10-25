import { setupProducts } from "./products";
import { setupCounter } from "./counter";
import { setupCart } from "./cart";

// NODE_ENV는 빌드할 때 파일에 내용이 들어가지 않음.
// = tree shaking!

async function main() {
    const { updateCount: updateProductCount, getProductById } =
        await setupProducts({
            container: document.querySelector("#products"),
            decreaseClick,
            increaseClick,
            
        });

    const {
        addProduct: addProductToCart,
        removeProduct: removeProductFromCart,
        updateCount: updateCartCount,
    } = setupCart({
        container: document.querySelector(".cart-items"),
        decreaseClick,
        increaseClick,
    });

        const { increase, decrease, getTotalCount, getCountByProductId } = setupCounter();

    const updateTotalCount = (totalCount) => {
        document.querySelector(".total-count").innerHTML = `(${totalCount})`;
    };

    function increaseClick({productId}) {
       
        if (getCountByProductId({productId}) === 0) {
            addProductToCart({ product: getProductById({ productId }) });
        }
        increase({ productId });
        updateTotalCount(getTotalCount());
    };

    // 호이스트 개념! function과 화살표함수 차이
   function decreaseClick({productId}) {
        const count = decrease({ productId });
        if (count === 0) {
            removeProductFromCart({ product: getProductById({ productId }) });
        }
        updateTotalCount(getTotalCount());
    };

    document.querySelector(".btn-cart").addEventListener("click", () => {
        document.body.classList.add("displaying_cart");
    });

    document.querySelector(".btn-close-cart").addEventListener("click", () => {
        document.body.classList.remove("displaying_cart");
    });
    document.querySelector(".cart-dimmed-bg").addEventListener("click", () => {
        document.body.classList.remove("displaying_cart");
    });
}

main();
