document.querySelector("#bridge-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const source = document.querySelector("#source").value;
    const destination = document.querySelector("#destination").value;
    const amount = document.querySelector("#amount").value;

    const response = await fetch("http://localhost:3000/bridge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sourceChain: source, destinationChain: destination, amount }),
    });

    const data = await response.json();
    document.querySelector("#response").innerText = data.message;
});
