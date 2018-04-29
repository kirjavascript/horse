const pooSounds = Array.from({length: 9}, (_, i) => new Audio(`./audio/pooing ${i+1}.wav`));
const weeSounds = Array.from({length: 3}, (_, i) => new Audio(`./audio/weeing ${i+1}.wav`));
const drinkingSounds = Array.from({length: 4}, (_, i) => new Audio(`./audio/drinking ${i+1}.wav`));
const eatingSounds = Array.from({length: 2}, (_, i) => new Audio(`./audio/eating ${i+1}.wav`));

export default {
    poo() { pooSounds[0|Math.random()*pooSounds.length].play(); },
    wee() { weeSounds[0|Math.random()*weeSounds.length].play(); },
    drinking() { drinkingSounds[0|Math.random()*drinkingSounds.length].play(); },
    eating() { eatingSounds[0|Math.random()*eatingSounds.length].play(); },
};
