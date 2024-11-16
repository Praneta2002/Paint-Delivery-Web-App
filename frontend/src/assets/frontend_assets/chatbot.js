document.addEventListener('DOMContentLoaded', function() {
    const chatbot = document.getElementById('chatbot');
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotSend = document.getElementById('chatbot-send');

    chatbotToggle.addEventListener('click', function() {
        chatbot.classList.toggle('hidden');
    });

    chatbotClose.addEventListener('click', function() {
        chatbot.classList.add('hidden');
    });

    chatbotSend.addEventListener('click', function() {
        const message = chatbotInput.value;
        if (message.trim() === '') return;

        addMessage('user', message);
        chatbotInput.value = '';

        handleUserMessage(message);
    });

    chatbotInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            chatbotSend.click();
        }
    });

    function addMessage(sender, message) {
        const messageElement = document.createElement('div');
        messageElement.className = `chatbot-message chatbot-message-${sender}`;
        messageElement.textContent = message;
        chatbotMessages.appendChild(messageElement);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function handleUserMessage(message) {
        let response;
        if (message.toLowerCase().includes('add to cart')) {
            const productName = message.replace(/add to cart\s+/i, '').trim();
            addToCart(productName);
            response = `${productName} has been added to your cart.`;
        } else if (message.toLowerCase().includes('product')) {
            response = 'Here are some of our products: Girl’s portrait, Tribal Queen, SAHELI, Marilyn Monroe, Expression, Knife POP ART PORTRAIT, Pop letters, BANJARE, Popart, Beautiful green valley in pop art Abstract style, My Hair Style, 27\'s CLUB.';
        } else {
            response = 'I\'m sorry, I didn\'t understand that. Can you please rephrase?';
        }
        addMessage('bot', response);
    }

    function addToCart(productName) {
        const product = products.find(p => p.title.toLowerCase() === productName.toLowerCase());
        if (product) {
            const cartProduct = cart.find(p => p.id === product.id);

            if (cartProduct) {
                cartProduct.quantity += 1;
            } else {
                cart.push({ ...product, quantity: 1 });
            }

            saveCartToLocalStorage();
            updateCart();
            document.getElementById('cartPage').classList.add('open');
        } else {
            addMessage('bot', 'Sorry, the product you specified is not available.');
        }
    }
});
