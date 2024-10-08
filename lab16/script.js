let expressaoAtual = '';
let operacao = '';
let resultadoAtual = 0;

function inserirNumero(numero) {
    expressaoAtual += numero;
    atualizarDisplay(expressaoAtual);
}

function inserirOperador(operador) {
    if (expressaoAtual !== '') {
        operacao = operador;
        expressaoAtual += operador;
        atualizarDisplay(expressaoAtual);
    }
}

function executarCalculo() {
    try {
        resultadoAtual = eval(expressaoAtual);
        atualizarDisplay(resultadoAtual);
        expressaoAtual = resultadoAtual.toString();
    } catch (error) {
        atualizarDisplay('Erro');
        expressaoAtual = '';
    }
}

function resetar() {
    expressaoAtual = '';
    operacao = '';
    resultadoAtual = 0;
    atualizarDisplay(0);
}

function atualizarDisplay(valor) {
    document.getElementById('display').innerHTML = valor;
}
