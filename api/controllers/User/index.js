const userService = require("../service/User/index.js");

async function loginUser(req, res) {
  try {
    const { email, senha } = req.body;

    const usuario = await userService.loginUser({ email, senha });

    if (!usuario) {
      return res.status(401).json({ message: "Email ou senha inválidos!" });
    }

    return res.status(200).json({ message: "Login realizado com sucesso!", usuario });
  } catch (error) {
    return res.status(500).json({ message: "Erro ao fazer login", error: error.message });
  }
}

async function recoverPassword(req, res) {
  try {
    const { email } = req.body;

    const result = await userService.recoverPassword(email);

    if (!result.success) {
      return res.status(404).json({ message: result.message });
    }

    return res.status(200).json({ message: result.message });
  } catch (error) {
    return res.status(500).json({ message: "Error recovering password", error: error.message });
  }
}

module.exports = {
  loginUser,
  recoverPassword
};
