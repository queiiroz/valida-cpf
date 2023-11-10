//705.484.450-52  070.987.720-03

/*

7x  0x  5x  4x  8x  4x  4x  5x  0x
10  9   8   7   6   5   4   3   2
70  0   40  28  48  20  16  15  0 = 237

11 - (237 % 11) = 5 (primeiro dígito)
(Se o número digito for maior que9, consideramos 0)


7x  0x  5x  4x  8x  4x  4x  5x  0x  5x
11  10  9   8   7   6   5   4   3   2  
77  0   45  32  56  24  20  20  0   10 = 284

11 - (284 % 11) = 2 (segundo dígito)

*/

const readline = require("node:readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function CPF(cpfEnviado) {
  Object.defineProperty(this, "cpfLimpo", {
    get: function () {
      return cpfEnviado.replace(/\D+/g, "");
    },
  });
}

CPF.prototype.valida = function () {
  if (typeof this.cpfLimpo === "undefined") return false;
  if (this.cpfLimpo.length !== 11) return false;
  if (this.isSequencia()) return false;

  const cpfParcial = this.cpfLimpo.slice(0, -2);
  const digito1 = this.somaDigitos(cpfParcial);
  const digito2 = this.somaDigitos(cpfParcial + digito1);

  const novoCPF = cpfParcial + digito1 + digito2;

  return novoCPF === this.cpfLimpo;
};

CPF.prototype.somaDigitos = function (cpfParcial) {
  const cpfArray = Array.from(cpfParcial);

  let regressivo = cpfArray.length + 1;
  const total = cpfArray.reduce((ac, val) => {
    ac += regressivo * Number(val);
    regressivo--;
    return ac;
  }, 0);

  const digito = 11 - (total % 11);
  return digito > 9 ? "0" : String(digito);
};

CPF.prototype.isSequencia = function () {
  const sequencia = this.cpfLimpo[0].repeat(this.cpfLimpo.length);

  return sequencia === this.cpfLimpo;
};

rl.question("Digite seu CPF ", function (cpf) {
  const cpf1 = new CPF(cpf);
  const isValid = cpf1.valida();

  if (isValid) {
    console.log("CPF Válido");
  } else {
    console.log("CPF Inválido");
  }

  rl.close();
});
