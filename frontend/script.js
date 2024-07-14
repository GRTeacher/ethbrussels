const contractAddress = 'YOUR_CONTRACT_ADDRESS';
const contractABI = YOUR_CONTRACT_ABI;

const web3 = new Web3(window.ethereum);
const quizContract = new web3.eth.Contract(contractABI, contractAddress);

async function loadQuestions() {
    const questionCount = await quizContract.methods.questions().call();
    const questionsDiv = document.getElementById('questions');

    for (let i = 0; i < questionCount.length; i++) {
        const question = await quizContract.methods.getQuestion(i).call();
        const questionText = question[0];
        const options = question[1];

        const questionDiv = document.createElement('div');
        questionDiv.innerHTML = `<h3>${questionText}</h3>`;

        options.forEach((option, index) => {
            const optionButton = document.createElement('button');
            optionButton.innerText = option;
            optionButton.onclick = () => submitAnswer(i, index);
            questionDiv.appendChild(optionButton);
        });

        questionsDiv.appendChild(questionDiv);
    }
}

async function submitAnswer(questionIndex, selectedOption) {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];

    await quizContract.methods.answerQuestion(questionIndex, selectedOption).send({ from: account });
    updateScore(account);
}

async function updateScore(account) {
    const score = await quizContract.methods.getScore(account).call();
    document.getElementById('score').innerText = score;
}

loadQuestions();
