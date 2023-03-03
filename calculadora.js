'use strict'

const display = document.getElementById("display")
const displayInput = document.getElementById("displayInput")
const numberButtons = document.querySelectorAll('[id*=tecla]');
const operatorButtons = document.querySelectorAll('[id*=operador]');
let newNumber = true;
let operador;
let numeroAnterior;

const existeDecimal = () => displayInput.textContent.includes(',');

const atualizarDisplayInput = (text) => {
  if (operador == undefined) display.textContent = ''
  if (newNumber) {
    displayInput.textContent = text
    newNumber = false
  } else {
    displayInput.textContent += text
  }
}

const atualizarDisplay = (text) => {
  if (operador == undefined) {
    numeroAnterior = parseFloat(displayInput.textContent.replace(",","."));
    display.textContent = displayInput.textContent + text;
    operador = text;
  } else {
    display.textContent += displayInput.textContent + text
  }
  newNumber = true;
}

const insertNumber = (event) => atualizarDisplayInput(event.target.textContent);
numberButtons.forEach (number => number.addEventListener('click',insertNumber));

const selectOperator = (event) => atualizarDisplay(event.target.textContent)
operatorButtons.forEach (operator => operator.addEventListener('click',selectOperator))

const calcular = () => {
  let numeroAtual = parseFloat(displayInput.textContent.replace(",","."));
  atualizarDisplay('=');
  newNumber=true;
  if (operador == '+') {
    console.log(numeroAnterior + numeroAtual);
    atualizarDisplayInput(numeroAnterior + numeroAtual);
  }else if (operador == '-') {
    atualizarDisplayInput(numeroAnterior - numeroAtual);
  }else if (operador == '*') {
    atualizarDisplayInput(numeroAnterior * numeroAtual);
  }else if (operador == '/') {
    atualizarDisplayInput(numeroAnterior / numeroAtual);
  }
  operador = undefined;
  newNumber=true;
}

// const ativarIgual = () => {
//   calcular()
// }
document.getElementById("igual").addEventListener('click',calcular)

const inserirDecimal = () => {
  if (displayInput.textContent==='') {
     displayInput.textContent = '0,'
     newNumber = false
  }
  if (!existeDecimal()) atualizarDisplayInput(',')
}
document.getElementById("decimal").addEventListener('click',inserirDecimal)

const limparDisplayInput = () => {
  if (display.textContent.includes('=')) {
    display.textContent = ''
  }
  displayInput.textContent = ''
}
document.getElementById("limparDisplay").addEventListener('click',limparDisplayInput)

const limparTudo = () => {
  display.textContent = ''
  displayInput.textContent = ''
  operador=undefined
  newNumber = true
}
document.getElementById("limparCalculo").addEventListener('click',limparTudo)

const removerUltimoNumero = () => displayInput.textContent = displayInput.textContent.slice(0,-1)
document.getElementById("backspace").addEventListener('click',removerUltimoNumero)

const inverterSinal = () => displayInput.textContent = parseFloat(displayInput.textContent) * -1
document.getElementById("inverter").addEventListener('click',inverterSinal)

const mapaTeclado = {
  0 : 'tecla0',
  1 : 'tecla1',
  2 : 'tecla2',
  3 : 'tecla3',
  4: 'tecla4',
  5: 'tecla5',
  6: 'tecla6',
  7: 'tecla7',
  8: 'tecla8',
  9: 'tecla9',
  '/': 'operadorDividir',
  '*': 'operadorMultiplicar',
  '-': 'operadorSubtrair',
  '+': 'operadorAdicionar',
  '=': 'igual',
  Enter: 'igual',
  Backspace: 'backspace',
  c: 'limparDisplay',
  Escape: 'limparCalculo',
  ',': 'decimal',
}

const mapearTeclado = (evento) => {
  const tecla = evento.key;

  const teclaPermitida = () => Object.keys(mapaTeclado).indexOf(tecla) !== -1;
  if (teclaPermitida()) document.getElementById(mapaTeclado[tecla]).click();
  console.log(evento)
}
document.addEventListener('keydown',mapearTeclado);