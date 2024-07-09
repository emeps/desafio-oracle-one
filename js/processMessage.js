/* As "chaves" de criptografia que utilizaremos são:
A letra "e" é convertida para "enter"
A letra "i" é convertida para "imes"
A letra "a" é convertida para "ai"
A letra "o" é convertida para "ober"
A letra "u" é convertida para "ufat" */

document.getElementById('crypt').addEventListener('click', function () {
    removeElements()
    processText(true)
})
document.getElementById('decrypt').addEventListener('click', function () {
    removeElements()
    processText(false)
})

document.getElementById('copy-button').addEventListener('click', function () {
    copyTextButton()
})
function copyTextButton() {
    let textAreaMessage = document.querySelector('textarea')
    textAreaMessage.select();
    let successful = document.execCommand('copy');
    let message = successful ? 'Texto copiado!' : 'Erro ao copiar o texto.';

    alert(message);

}
function removeElements() {
    let noMessageElement = document.querySelector('.div-content')
    if (noMessageElement) {
        noMessageElement.remove();
    }
}

function displayResult(message) {
    let resultContainer = document.getElementsByClassName('image-content');
    let appendResult = document.querySelector('.no-message')
    let textOldResult = document.querySelector('.text-result')

    if (resultContainer.length > 0) {
        resultContainer[0].remove();
    }

    if (textOldResult) {
        textOldResult.remove();
    }

    let div = document.createElement('div')
    div.className = 'div-content';
    div.id = 'div-content';

    let p = document.createElement('p');
    p.className = 'text-result';
    p.textContent = message;

    const button = document.createElement('button');
    button.className = 'copy-button';
    button.id = 'copy-button';
    button.textContent = 'Copiar';

    appendResult.appendChild(div)
    div.appendChild(p);
    div.appendChild(button)
}

function processText(encrypt) {
    let textArea = document.getElementById('text-input');
    let message = textArea.value;
    displayResult(processMessage(message, encrypt));
    textArea.value = ''
}

function processMessage(message, encrypt = true) {
    const key = {
        a: "ai",
        e: "enter",
        i: "imes",
        o: "ober",
        u: "ufat"
    };

    if (!encrypt) {
        const decryptedKey = Object.fromEntries(
            Object.entries(key).map(([k, v]) => [v, k])
        );

        let messageDecrypt = message;
        Object.keys(decryptedKey).forEach(encrypted => {
            const regex = new RegExp(encrypted, 'g');
            messageDecrypt = messageDecrypt.replace(regex, decryptedKey[encrypted]);
        });

        return messageDecrypt;
    }

    let arrayMessage = [];
    for (let i = 0; i < message.length; i++) {
        Object.keys(key).includes(message[i]) ? arrayMessage.push(key[message[i]]) : arrayMessage.push(message[i]);
    }

    return arrayMessage.join("");
}

