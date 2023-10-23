import test from "./test.json";
import { findElement } from "./utils";

export function getProductElement(product, count = 0) {
    const element = document.createElement("div");
    element.classList.add("product");
    element.setAttribute("data-product-id", product.id);
    element.innerHTML = `
    <img src="${product.images[0]}" alt="Image of ${product.name}" />
  <p>${product.name}</p>
  <div class="flex items-center justify-between"><span>Price: ${
      product.regularPrice
  }</span>
  <div>
  <button type="button" class="btn-decrease  bg-green-200 hover:bg-green-300 text-green-800 py-1 px-3 rounded-full">-</button>
  <span class="cart-count text-green-800">${count === 0 ? "" : count}</span>
  <button type="button" class="btn-increase bg-green-200 hover:bg-green-300 text-green-800 py-1 px-3 rounded-full">+</button>
</div>
  </div>
    `;
    return element;
}

async function getProducts() {
    if (process.env.NODE_ENV === "development") {
        return test;
    } else {
        const response = await fetch(
            "https://learnwitheunjae.dev/api/sinabro-js/ecommerce"
        );
        return await response.json();
    }
}

export async function setupProducts({
    container,
    decreaseClick,
    increaseClick,
}) {
    const products = await getProducts();
    const productMap = {};
    products.forEach((product) => {
        productMap[product.id] = product;
    });

    products.forEach((product) => {
        const productElement = getProductElement(product);
        container.appendChild(productElement);
    });

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
    const getProductById = ({ productId }) => {
        return productMap[productId];
    };
    return { updateCount, getProductById };
}
