
var slotMachines = [];
var credit;
var spinCounter = 0;
var spinButton;
window.addEventListener('load', () => {
    slotMachines = [
        document.getElementById('slot-machine-1'),
        document.getElementById('slot-machine-2'),
        document.getElementById('slot-machine-3')
    ];
    credit = parseInt(localStorage.getItem('credit')) || 100;
    spinCounter = parseInt(localStorage.getItem('spinCounter')) || 0;

    spinButton = document.getElementById('spin-button');
    document.getElementById('credit').textContent = credit;

    if (credit < 5) {
        spinButton.innerText = 'Not enough credit';
        spinButton.setAttribute('disabled', 'disabled');
    } else {
        spinButton.textContent = 'Spin';
        spinButton.setAttribute('onclick', 'spinSlotMachines()');
    }
});

const emojis = ['🍕', '🤖', '💻', '🎟️', '🃏', '🦝'];

let spinning = false;

function spinSlotMachines() {
    if (!spinning) {
        spinCounter++;
        localStorage.setItem('spinCounter', spinCounter);

        spinButton.textContent = 'Spinning';
        spinButton.removeAttribute('onclick');
        credit -= 5;
        localStorage.setItem('credit', credit);
        document.getElementById('credit').textContent = credit;
        spinning = true;
        let spinCount = 0;
        const spinInterval = setInterval(() => {
            spinCount++;
            slotMachines.forEach(slotMachine => {
                const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
                slotMachine.textContent = randomEmoji;
            });
            if (spinCount >= 25) {
                clearInterval(spinInterval);
                spinning = false;

                localStorage.setItem('credit', credit);


                credit += checkWin();
                if (checkWin() > 4) {
                    displayWinningMessage(checkWin());
                }
                document.getElementById('credit').textContent = credit;
                localStorage.setItem('credit', credit);

                if (credit < 5) {
                    spinButton.innerText = 'Not enough credit';
                    spinButton.setAttribute('disabled', 'disabled');
                    showLostMessage();
                } else {
                    spinButton.textContent = 'Spin';
                    spinButton.setAttribute('onclick', 'spinSlotMachines()');
                }
            }
        }, 100);

    }

    spinButton.textContent = 'Spinning';
}

function checkWin() {
    const firstSlotText = slotMachines[0].textContent;
    const secondSlotText = slotMachines[1].textContent;
    const thirdSlotText = slotMachines[2].textContent;

    if (firstSlotText === '🍕' && secondSlotText === '🍕' && thirdSlotText === '🍕') {
        return 5;
    } else if (firstSlotText === '🤖' && secondSlotText === '🤖' && thirdSlotText === '🤖') {
        return 10;
    } else if (firstSlotText === '💻' && secondSlotText === '💻' && thirdSlotText === '💻') {
        return 15;
    } else if (firstSlotText === '🎟️' && secondSlotText === '🎟️' && thirdSlotText === '🎟️') {
        return 20;
    } else if (firstSlotText === '🃏' && secondSlotText === '🃏' && thirdSlotText === '🃏') {
        return 30;
    } else if (firstSlotText === '🦝' && secondSlotText === '🦝' ||
        firstSlotText === '🦝' && thirdSlotText === '🦝' ||
        secondSlotText === '🦝' && thirdSlotText === '🦝') {
        return 40;
    } else if (firstSlotText === '🦝' && secondSlotText === '🦝' && thirdSlotText === '🦝') {
        return 100;
    } else {
        return 0; // Default value if no winning combination
    }
}

function displayWinningMessage(credit) {
    const countdown = document.getElementById('val')
    const overlay = document.getElementById('overlay');
    const message = document.getElementById('won');
    const amount = document.getElementById('amount');

    countdown.textContent = 5;
    if (message) {
        overlay.classList.toggle('overlay');
        message.classList.remove('hide-message');
        message.classList.add('show-message');
        amount.textContent = `You won ${credit} credits!🎟️`;
        const countdownInterval = setInterval(() => {
            countdown.textContent = parseInt(countdown.textContent) - 1;
            if (parseInt(countdown.textContent) <= 0) {
                clearInterval(countdownInterval);
                message.classList.add('hide-message');
                message.classList.remove('show-message');
                overlay.classList.toggle('overlay');
            }
        }, 1000);
    }
}

function showLostMessage() {
    document.getElementById('lost').classList.remove('hide-message');
    document.getElementById('spins').textContent = `You lost after ${spinCounter} spins`;
    document.getElementById('overlay').classList.add('overlay');
}