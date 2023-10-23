import { getProductElement } from "./products";
import { findElement } from "./utils";

export function setupCart({ container, decreaseClick, increaseClick }) {
    container.addEventListener("click", (e) => {
        const targetElement = e.target;
        const productElement = findElement(targetElement, ".product");
        const productId = productElement.getAttribute("data-product-id");
    
        if (
            targetElement.matches(".btn-decrease") ||
            targetElement.matches(".btn-increase")
        ) {
            if (targetElement.matches(".btn-decrease")) {
                decreaseClick({productId});
            } else if (targetElement.matches(".btn-increase")) {
                increaseClick({productId});
            }
        }
    });

    const addProduct = ({ product }) => {
        const productElement = getProductElement(product);
        container.appendChild(productElement);
        // appendChild는 element를 받도록 되어잇음
    };

    const removeProduct = ({ product }) => {
        const productElement = container.querySelector(
            `.product[data-product-id='${product.id}']`
        );
        productElement.remove();
    };

    const updateCount = ({ productId, count }) => {
        const productElement = container.querySelector(
            `.product[data-product-id='${productId}']`
        );
        const cartCountElement = productElement.querySelector(".cart-count");
        cartCountElement.innerHTML = count;
        if (count === 0) {
            cartCountElement.innerHTML = "";
        }
    };

    return {
        addProduct,
        removeProduct,
        updateCount,
    };
}
