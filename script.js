var slotMachines = [];
var credit;
var spinCounter = 0;
var spinButton;
var winCount;

// Function to initialize the game when the window loads
window.addEventListener('load', () => {
    slotMachines = [
        document.getElementById('slot-machine-1'),
        document.getElementById('slot-machine-2'),
        document.getElementById('slot-machine-3')
    ];
    credit = parseInt(localStorage.getItem('credit')) || 100;
    spinCounter = parseInt(localStorage.getItem('spinCounter')) || 0;
    winCount = parseInt(localStorage.getItem('winCount')) || 0;
    
    spinButton = document.getElementById('spin-button');
    document.getElementById('credit').textContent = credit;

    if (credit < 5) {
        spinButton.innerText = 'Not enough credit';
        spinButton.setAttribute('disabled', 'disabled');
        showLostMessage();
    } else {
        spinButton.textContent = 'Spin';
        spinButton.setAttribute('onclick', 'spinSlotMachines()');
    }
});

const emojis = ['🍕', '🤖', '💻', '🎟️', '🃏', '🦝'];

let spinning = false;

// Function to spin the slot machines
function spinSlotMachines() {
    if (!spinning) {
        spinCounter++;
        localStorage.setItem('spinCounter', spinCounter);

        slotMachines.forEach(slotMachine => {
            slotMachine.classList.toggle('spinAnimation');
        });

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
                slotMachines.forEach(slotMachine => {
                    slotMachine.classList.toggle('spinAnimation');
                });
                clearInterval(spinInterval);
                spinning = false;

                localStorage.setItem('credit', credit);


                credit += checkWin();
                if (checkWin() > 4) {
                    winCount++;
                    localStorage.setItem('winCount', winCount);
                    displayWinningMessage(checkWin());
                }
                document.getElementById('credit').textContent = credit;
                localStorage.setItem('credit', credit);

                if (credit < 5) {
                    spinButton.innerText = 'Not enough credit';
                    spinButton.setAttribute('disabled', 'disabled');
                    showLostMessage();
                    localStorage.setItem('credit', 1);
                } else {
                    spinButton.textContent = 'Spin';
                    spinButton.setAttribute('onclick', 'spinSlotMachines()');
                }
            }
        }, 100);

    }

    spinButton.textContent = 'Spinning';
}

// Function to check if there is a winning combination
function checkWin() {
    const firstSlotText = slotMachines[0].textContent;
    const secondSlotText = slotMachines[1].textContent;
    const thirdSlotText = slotMachines[2].textContent;

    if (firstSlotText === '🍕' && secondSlotText === '🍕' && thirdSlotText === '🍕') {
        return 5;
    }
    
    if (firstSlotText === '🤖' && secondSlotText === '🤖' && thirdSlotText === '🤖') {
        return 10;
    } 
    
    if (firstSlotText === '💻' && secondSlotText === '💻' && thirdSlotText === '💻') {
        return 15;
    }
    
    if (firstSlotText === '🎟️' && secondSlotText === '🎟️' && thirdSlotText === '🎟️') {
        return 20;
    }
    
    if (firstSlotText === '🃏' && secondSlotText === '🃏' && thirdSlotText === '🃏') {
        return 30;
    }
    
    if (firstSlotText === '🦝' && secondSlotText === '🦝' ||
        firstSlotText === '🦝' && thirdSlotText === '🦝' ||
        secondSlotText === '🦝' && thirdSlotText === '🦝') {
        return 10;
    }
    
    if (firstSlotText === '🦝' && secondSlotText === '🦝' && thirdSlotText === '🦝') {
        return 100;
    } 
    return 0; 
}

// Function to display the winning message
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

// Function to display the lost message
function showLostMessage() {
    document.getElementById('lost').classList.remove('hide-message');
    document.getElementById('lost').classList.add('show-message');
    document.getElementById('spins').textContent = `You lost after ${spinCounter} spins and won ${winCount} times!`;
    document.getElementById('overlay').classList.add('overlay');
}

// Function to reset the game
function resetGame() {
    localStorage.setItem('winCount', 0);
    localStorage.setItem('credit', 100);
    localStorage.setItem('spinCounter', 0);
    location.reload();
}