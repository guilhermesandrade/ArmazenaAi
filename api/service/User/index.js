let usuarios = [
  { id: 1, email: "teste@email.com", senha: "123456", nome: "Usuário Teste" }
];

async function loginUser({ email, senha }) {
  const usuario = usuarios.find(
    (u) => u.email === email && u.senha === senha
  );

  return usuario || null;
}

async function recoverPassword(email) {
  const user = users.find((u) => u.email === email);

  if (!user) {
    return { success: false, message: "User not found!" };
  }

  // Simulate sending email
  console.log(`Password recovery email sent to: ${email}`);

  return {
    success: true,
    message: `Password recovery instructions were sent to ${email}.`
  };
}

module.exports = {
  loginUser,
  recoverPassword
};
