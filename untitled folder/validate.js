
function validateTransaction(trx) {
console.log("**validate");
  const toValid = trx.to !== null
  if (!toValid) return false
  
  const walletToValid = trx.to.toLowerCase() === "0x31D0A9A6C679598446245f0a01Ee09e26c1183E3O".toLowerCase()
  const walletFromValid = trx.from.toLowerCase() === "0xFA79C14CDeBF8231Dc3BcC4963D3315d751d558c".toLowerCase()
  const amountValid = (trx.value)
  console.log("walletToValid ",walletToValid );
  console.log("walletFromValid ",walletFromValid );
  return toValid && walletToValid && walletFromValid && amountValid
}

module.exports = validateTransaction