Moralis.initialize("");
Moralis.serverURL = "";

let currentTrade = {};
let currentSelectSide;
let tokens;

async function initialize() {
    await Moralis.initPlugins();
    await Moralis.enableWeb3();
    await listAvailableTokens(); 
}
async function listAvailableTokens() {
    const result = await Moralis.Plugins.oneInch.getSupportedTokens({
        chain: 'eth',
    });
    tokens = result.tokens;
    let parent = document.getElementById("token_list");
    for ( const address in tokens) {
        let token = tokens[address];
        let div = document.createElement("div");
        div.setAttribute("data-address", address);
        div.className = "token_row";
        let html = `
        <img class="token_list_img" src="${token.logoURI}">
        <span class="token_list_text">${token.symbol}</span> 
        `
        div.innerHTML = html;
        div.onclick = selectToken;
        parent.appendChild(div);
    }
    //console.log(tokens);
}

async function selectToken() {
    closeModal();
    let address = event.target.getAttribute("data-address");
    //console.log(address);
    currentTrade[currentSelectSide] = tokens[address];
    console.log(currentTrade);
}
async function login() {
    try {
        currentUser = Moralis.User.current();
        if(!currentUser) {
            currentUser = await Moralis.Web3.authenticate();
        }
    } catch (error) {
        console.log(error);
    }
}

function displayModal(side) {
    currentSelectSide = side;
    document.getElementById("token_modal").style.display = "block";
}

function closeModal() {
    document.getElementById("token_modal").style.display = "none";
}

initialize();
document.getElementById("modal_close").onclick = closeModal;
document.getElementById("from_token_select").onclick = (() => {
    displayModal("from")
});
document.getElementById("login_button").onclick = login;