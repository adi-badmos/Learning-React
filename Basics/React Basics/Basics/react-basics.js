const container = document.querySelector('.js-container');
const root = ReactDOM.createRoot(container);

const socks = 10;
const tshirt = 8;

const productCost = 1 * 10 + 2 * 8;
console.log(productCost);

const shippingCost = 5;

const totalCost = productCost + shippingCost;
console.log(totalCost);

const today = dayjs().format('MMMM D');
console.log(today);

function renderPage() {
    const time = dayjs().format('HH:mm:ss');

    const div = (
        <div>
            <button>Good job!</button>
            
            <p>My name is adi-badmos</p>
            
            <br></br>
            
            <p>Cotton socks</p>
            <p>Price: $10</p>
            <button>Add to cart</button>

            <p></p>
            <br></br>

            <p>Product cost: ${productCost}</p>
            <p>Shipping cost: ${shippingCost}</p>
            <p>Total cost: ${totalCost}</p>
            <button>Place your order</button>

            <p></p>
            <br></br>

            <p>Today is {today}</p>

            <br></br>

            <p>Current time: {time}</p>
        </div>
    );

    root.render(div);
}

renderPage();
setInterval(() => {
    renderPage();
}, 1000);