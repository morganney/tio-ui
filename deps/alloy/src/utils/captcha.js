const getCaptcha = () => {
    const maxDigit = 9;
    const numbers = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    const rand1 = Math.floor(Math.random() * maxDigit) + 1;
    const rand2 = Math.floor(Math.random() * maxDigit) + 1;
    const numRand1 = numbers[rand1];
    const numRand2 = numbers[rand2];
    let question = `What is ${numRand1} + ${rand2}?`;

    // Randomize placeholder text
    if (Math.round(Math.random())) {
        question = `What is ${rand1} + ${numRand2}?`;
    }

    // Return the Q & A
    return {
        question,
        answer: rand1 + rand2
    };
};

export {
    getCaptcha
};
