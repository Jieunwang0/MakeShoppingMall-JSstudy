import test from "./test.json";

// 여기 NODE_ENV는 빌드할 때 파일에 내용이 들어가지 않음.
// tree shaking!

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

async function main() {
    const products = await getProducts();
    const countMap = {};
    console.log("products", products);
    document.querySelector("#products").innerHTML = products
        .map(
            (product, index) => `
  <div class="product" data-product-id="${product.id} data-product-index="${index}">
  <img src="${product.images[0]}" alt="Image of ${product.name}" />
  <p>${product.name}</p>
  <div class="flex items-center justify-between"><span>Price: ${product.regularPrice}</span>
  <button type="button" class="btn-decrease  bg-green-200 hover:bg-green-300 text-green-800 py-1 px-3 rounded-full">-</button>
  <span class="cart-count text-green-800"></span>
  <button type="button" class="btn-increase bg-green-200 hover:bg-green-300 text-green-800 py-1 px-3 rounded-full">+</button>

  </div>
  </div>

  `
        )
        .join("");

    document.querySelector("#products").addEventListener("click", (e) => {
        const targetElement = e.target;
        const productElement = findElement(targetElement, ".product");
        const productId = productElement.getAttribute("data-product-id");
        console.log("productId", productId);
        const productIndex = productElement.getAttribute("data-product-index");
        const product = products[productIndex];
        if (
            targetElement.matches(".btn-decrease") ||
            targetElement.matches(".btn-increase")
        ) {
            console.log(countMap[productId]);
            if (countMap[productId] === undefined) {
                countMap[productId] = 0;
            }
            if (targetElement.matches(".btn-decrease")) {
                countMap[productId] -= 1;
            } else if (targetElement.matches(".btn-increase")) {
                countMap[productId] += 1;
            }

            const cartCount = productElement.querySelector(".cart-count");
            cartCount.innerHTML = countMap[productId];
            if (countMap[productId] === 0) {
                cartCount.innerHTML = "";
            }

            document.querySelector(".total_count").innerHTML = `(${sumAllCount(
                countMap
            )})`;
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
