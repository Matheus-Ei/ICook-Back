'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'recipes',
      [
        {
          title: 'Bolo de Chocolate Fofinho',
          description: 'A melhor e mais fácil receita de bolo de chocolate.',
          ingredients:
            '3 ovos, 1 xícara de açúcar, 2 xícaras de farinha de trigo, 1 xícara de chocolate em pó, 1/2 xícara de óleo, 1 xícara de água quente, 1 colher de sopa de fermento em pó.',
          instructions:
            '1. Bata os ovos com o açúcar. 2. Adicione o óleo e o chocolate em pó. 3. Intercale a farinha e a água quente. 4. Por último, adicione o fermento. 5. Asse em forno pré-aquecido a 180°C por 40 minutos.',
          owner_user_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          title: 'Frango Xadrez Simples',
          description: 'Receita clássica de frango xadrez para fazer em casa.',
          ingredients:
            '500g de peito de frango em cubos, 1 pimentão verde, 1 pimentão vermelho, 1 cebola, 2 colheres de sopa de shoyu, 1 colher de sopa de amido de milho, amendoim a gosto.',
          instructions:
            '1. Tempere o frango e frite até dourar. 2. Adicione os pimentões e a cebola e refogue. 3. Misture o shoyu com o amido de milho e um pouco de água e despeje na panela. 4. Cozinhe até engrossar e sirva com amendoim.',
          owner_user_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          title: 'Lasanha à Bolonhesa',
          description: 'Uma lasanha suculenta para o almoço de domingo.',
          ingredients:
            'Massa de lasanha, 500g de carne moída, molho de tomate, queijo mussarela, presunto, molho branco.',
          instructions:
            '1. Prepare o molho à bolonhesa. 2. Prepare o molho branco. 3. Monte a lasanha intercalando molho bolonhesa, massa, presunto, queijo e molho branco. 4. Finalize com queijo e leve ao forno por 30 minutos.',
          owner_user_id: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          title: 'Pão de Queijo Mineiro',
          description: 'O autêntico pão de queijo de Minas Gerais.',
          ingredients:
            '500g de polvilho azedo, 250ml de leite, 100ml de óleo, 100ml de água, 2 ovos, 200g de queijo minas padrão ralado, sal a gosto.',
          instructions:
            '1. Ferva o leite, a água e o óleo. 2. Despeje sobre o polvilho e misture bem (escaldar). 3. Espere esfriar e adicione os ovos, um a um. 4. Adicione o queijo e o sal. 5. Faça bolinhas e asse em forno pré-aquecido a 200°C até dourar.',
          owner_user_id: 4,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          title: 'Mousse de Maracujá Rápido',
          description: 'Sobremesa fácil e deliciosa com apenas 3 ingredientes.',
          ingredients:
            '1 lata de leite condensado, 1 lata de creme de leite, 1 lata de suco de maracujá concentrado (use a lata de leite condensado como medida).',
          instructions:
            '1. Bata todos os ingredientes no liquidificador por 3 minutos. 2. Despeje em uma travessa e leve à geladeira por pelo menos 2 horas.',
          owner_user_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('recipes', null, {});
  },
};
