
var slotMachines=[];
var credit;
window.addEventListener('load', () => {
    slotMachines = [
        document.getElementById('slot-machine-1'),
        document.getElementById('slot-machine-2'),
        document.getElementById('slot-machine-3')
    ];
    credit = localStorage.getItem('credit') || 100;
    document.getElementById('credit').textContent = credit;
});

const emojis = ['🍕', '🤖', '💻', '🎟️', '🃏', '🦝'];
const spinButton = document.getElementById('spin-button');

let spinning = false;

function spinSlotMachines() {
    if (!spinning) {
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
                landOnRandomEmoji();
            }
        }, 100); 
        localStorage.setItem('credit', credit);
    }
}

function landOnRandomEmoji() {
    let delay = 0;
    slotMachines.forEach(slotMachine => {
        setTimeout(() => {
            const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
            slotMachine.textContent = randomEmoji;
        }, delay);
        delay += 500;
    });
}
