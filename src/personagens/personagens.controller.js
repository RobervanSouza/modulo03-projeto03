const mongoose = require('mongoose');
const personagensService = require('./personagens.service');

// todos os personagens
const findAllPersonagensController = async (req, res) => {
  const allpersonagens = await personagensService.findAllPersonagensService();

  if (allpersonagens.length == 0) {
    return res.status(400).send({ message: 'Nenhum personagen cadastrado' });
  }
  res
    .status(200)
    .send({ message: 'Todos os personagens da lista', allpersonagens });
};

// id dos personagens
const findByIdPersonagenController = async (req, res) => {
  const idParam = req.params.id;

  const chosenPersonagen = await personagensService.findByIdPersonagenService(
    idParam,
  );
  if (!idParam) {
    return res.status(404).send({
      message: 'Personagen não encontrado, verifiquei id no all-personagens',
    });
  }

  res.send({ message: 'Id do personagem', chosenPersonagen });
};

// cria personagens
const createPersonagenController = async (req, res) => {
  const personagen = req.body;
  const newPersonagen = await personagensService.createPersonagenService(
    personagen,
  );
  res
    .status(201)
    .send({ message: 'Personagen criado com sucesso!', newPersonagen });
};

// edita personagens
const updatePersonagenController = async (req, res) => {
  const idParam = req.params.id;
  const personagenEdited = req.body;
  const updatePersonagen = await personagensService.updatePersonagenService(
    idParam,
    personagenEdited,
  );
  res.send({ message: 'Id editado com sucesso', updatePersonagen });
};

// deleta personagens
const deletePersonagenController = async (req, res) => {
  const idParam = req.params.id;
  await personagensService.deletePersonagenService(idParam);
  res.send({ message: 'Personagen deletado com sucesso!!!', idParam });
};

// pesquisa personagens
const pesquisaPersonagenController = async (req, res) => {
  const { name } = req.query;

  const personagem = await personagensService.pesquisaPersonagenController(name);

  if (personagem.length === 0) {
    return res
      .status(400)
      .send({ message: 'There are no characters with this name registered!' });
  }
  res.status(200).send({
    personagem: personagem.map((personagem) => ({
      id: personagem._id,
      name: personagem.name,
      imageUrl: personagem.imageUrl,
      
     
    })),
  });
};

module.exports = {
  findAllPersonagensController,
  findByIdPersonagenController,
  createPersonagenController,
  updatePersonagenController,
  deletePersonagenController,
  pesquisaPersonagenController,
};
