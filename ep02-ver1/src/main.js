import test from './test.json';

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

async function main() {
    const products = await getProducts();
console.log('products', products)
    document.querySelector("#products").innerHTML = products
        .map(
            (product) => `
  <div class="product">
  <img src="${product.images[0]}" alt="Image of ${product.name}" />
  <p>${product.name}</p>
  <div class="flex items-center justify-between"><span>Price: ${product.regularPrice}</span>
  <button type="button" class="bg-green-200 hover:bg-green-300 text-green-800 py-1 px-3 rounded-full">-</button>
  <span class="hidden text-green-800"></span>
  <button type="button" class="bg-green-200 hover:bg-green-300 text-green-800 py-1 px-3 rounded-full">+</button>

  </div>
  </div>
  
  `
        )
        .join("");
}

main();
