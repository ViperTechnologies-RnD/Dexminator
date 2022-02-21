Moralis.initialize(""); // Application id from moralis.io
Moralis.serverURL = "";

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

function displayModal() {
    document.getElementById("token_modal").style.display = "block";
}

function modal_close() {
    document.getElementById("token_modal").style.display = "block";
}


document.getElementById("modal_close").onclick = closeModal;
document.getElementById("from_token_select").onclick = displayModal;
document.getElementById("login_button").onclick = login;