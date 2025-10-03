let usuarios = [
  { id: 1, email: "teste@email.com", senha: "123456", nome: "Usuário Teste" }
];

async function loginUser({ email, senha }) {
  const usuario = usuarios.find(
    (u) => u.email === email && u.senha === senha
  );

  return usuario || null;
}

module.exports = {
  loginUser,
};
