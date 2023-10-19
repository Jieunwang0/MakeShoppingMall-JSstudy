import test from "./test.json";

// 여기 NODE_ENV는 빌드할 때 파일에 내용이 들어가지 않음.
// = tree shaking!

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

function findElement(startingElement, selector) {
    let currentElement = startingElement;
    while (currentElement) {
        if (currentElement.matches(selector)) {
            return currentElement;
        }
        currentElement = currentElement.parentElement;
    }
    return null;
}

function sumAllCount(countMap) {
    let sum = 0;
    Object.values(countMap).forEach((number) => {
        sum += number;
    });
    return sum;
}
function getProductHTML(product, count = 0) {
    return `
  <div class="product" data-product-id="${product.id}">
  <img src="${product.images[0]}" alt="Image of ${product.name}" />
  <p>${product.name}</p>
  <div class="flex items-center justify-between"><span>Price: ${
      product.regularPrice
  }</span>
  <button type="button" class="btn-decrease  bg-green-200 hover:bg-green-300 text-green-800 py-1 px-3 rounded-full">-</button>
  <span class="cart-count text-green-800">${count === 0 ? 0 : count}</span>
  <button type="button" class="btn-increase bg-green-200 hover:bg-green-300 text-green-800 py-1 px-3 rounded-full">+</button>

  </div>
  </div>`;
}

async function main() {
    const products = await getProducts();
    const productMap = {};
    products.forEach((product) => {
        productMap[product.id] = product;
    });
    const countMap = {};

    const updateProductCount = (productId) => {
        const productElement = document.querySelector(
            `.product[data-product-id='${productId}']`
        );
        const cartCount = productElement.querySelector(".cart-count");
        cartCount.innerHTML = countMap[productId];
        if (countMap[productId] === 0) {
            cartCount.innerHTML = "";
        }
    };

    const updateCart = () => {
        const productIds = Object.keys(countMap);

        document.querySelector(".cart-items").innerHTML = productIds
            .map((productId) => {
                const productInCart = productMap[productId];
                if (countMap[productId] === 0) {
                    return "";
                }
                return getProductHTML(productInCart, countMap[productId]);
            })
            .join("");

        document.querySelector(".total_count").innerHTML = `(${sumAllCount(
            countMap
        )})`;
    };

    const increaseCount = (productId) => {
        if (countMap[productId] === undefined) {
            countMap[productId] = 0;
        }
        countMap[productId] += 1;
        updateProductCount(productId);
        updateCart();
    };

    const decreaseCount = (productId) => {
        if (countMap[productId] === undefined) {
            countMap[productId] = 0;
        }
         if (countMap[productId] > 0) {
             countMap[productId] -= 1;
        }
            updateProductCount(productId);
            updateCart();
        
    };

    document.querySelector("#products").innerHTML = products
        .map((product) => getProductHTML(product))
        .join("");

    document.querySelector("#products").addEventListener("click", (e) => {
        const targetElement = e.target;
        const productElement = findElement(targetElement, ".product");
        const productId = productElement.getAttribute("data-product-id");
        const product = productMap[productId];
        // 위처럼 배열로 했을 때 배열이 너무 길면 느릴 수 있음.. productId를 키로해서 object 형채로 만들면 빨리 가져올 수 있음
        if (
            targetElement.matches(".btn-decrease") ||
            targetElement.matches(".btn-increase")
        ) {
            if (targetElement.matches(".btn-decrease")) {
                decreaseCount(productId);
            } else if (targetElement.matches(".btn-increase")) {
                increaseCount(productId);
            }
        }
    });

    document.querySelector(".cart-items").addEventListener("click", (e) => {
        const targetElement = e.target;
        const productElement = findElement(targetElement, ".product");
        const productId = productElement.getAttribute("data-product-id");
        const product = productMap[productId];
        // 위처럼 배열로 했을 때 배열이 너무 길면 느릴 수 있음.. productId를 키로해서 object 형채로 만들면 빨리 가져올 수 있음
        if (
            targetElement.matches(".btn-decrease") ||
            targetElement.matches(".btn-increase")
        ) {
            if (targetElement.matches(".btn-decrease")) {
                decreaseCount(productId);
            } else if (targetElement.matches(".btn-increase")) {
                increaseCount(productId);
            }
        }
    });

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
