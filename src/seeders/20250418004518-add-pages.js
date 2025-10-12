'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const modules = await queryInterface.sequelize.query(
      `SELECT id, title FROM modules`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const getModuleId = (title) => {
      const module = modules.filter((m) => m.title === title);
      return module[0].id;
    };

    await queryInterface.bulkInsert('pages', [
      // Project 1 - Programming project
      {
        title: 'ORM Notes',
        emoji: '📝',
        description: 'Technical notes about the ORM structure',
        parent_id: null,
        next_sibling_id: null,
        project_id: 1,
        module_id: getModuleId('notes'),
      },
      {
        title: 'Sprint Calendar',
        emoji: '📅',
        description: 'Sprint planning calendar',
        parent_id: null,
        next_sibling_id: null,
        project_id: 1,
        module_id: getModuleId('calendar'),
      },
      {
        title: 'Task Board',
        emoji: '📌',
        description: 'Track ORM tasks in kanban',
        parent_id: null,
        next_sibling_id: null,
        project_id: 1,
        module_id: getModuleId('board'),
      },
      {
        title: 'ORM Models Draft',
        emoji: '📄',
        description: 'Draft of database models',
        parent_id: 1,
        next_sibling_id: null,
        project_id: 1,
        module_id: getModuleId('notes'),
      },

      // Project 2 - Abex IV
      {
        title: 'Lecture Notes',
        emoji: '📓',
        description: 'Notes from lectures and readings',
        parent_id: null,
        next_sibling_id: null,
        project_id: 2,
        module_id: getModuleId('notes'),
      },
      {
        title: 'Class Calendar',
        emoji: '📆',
        description: 'Schedule of classes and tests',
        parent_id: null,
        next_sibling_id: null,
        project_id: 2,
        module_id: getModuleId('calendar'),
      },
      {
        title: 'Midterm Notes',
        emoji: '🧾',
        description: 'Notes specifically for midterms',
        parent_id: 5,
        next_sibling_id: null,
        project_id: 2,
        module_id: getModuleId('notes'),
      },

      // Project 3 - Biology studies
      {
        title: 'Whale Biology',
        emoji: '🐋',
        description: 'Research notes on whale anatomy',
        parent_id: null,
        next_sibling_id: null,
        project_id: 3,
        module_id: getModuleId('notes'),
      },
      {
        title: 'Data Graphs',
        emoji: '📊',
        description: 'Graphs from reproductive studies',
        parent_id: null,
        next_sibling_id: null,
        project_id: 3,
        module_id: getModuleId('graphic'),
      },
      {
        title: 'Hormonal Data',
        emoji: '🧬',
        description: 'Graphs on hormone fluctuation',
        parent_id: 8,
        next_sibling_id: null,
        project_id: 3,
        module_id: getModuleId('graphic'),
      },

      // Project 4 - Machine Learning Experiments
      {
        title: 'ML Results',
        emoji: '📈',
        description: 'Charts of model accuracy and loss',
        parent_id: null,
        next_sibling_id: null,
        project_id: 4,
        module_id: getModuleId('graphic'),
      },
      {
        title: 'Experiment Notes',
        emoji: '🧪',
        description: 'Notes for each model configuration',
        parent_id: null,
        next_sibling_id: null,
        project_id: 4,
        module_id: getModuleId('notes'),
      },
      {
        title: 'Model 1',
        emoji: '🤖',
        description: 'Test results for model 1',
        parent_id: 11,
        next_sibling_id: null,
        project_id: 4,
        module_id: getModuleId('graphic'),
      },

      // Project 5 - Dev Blog
      {
        title: 'Article Calendar',
        emoji: '🗓️',
        description: 'Plan blog post publication dates',
        parent_id: null,
        next_sibling_id: null,
        project_id: 5,
        module_id: getModuleId('calendar'),
      },
      {
        title: 'Post Drafts',
        emoji: '✍️',
        description: 'Ideas and drafts for new posts',
        parent_id: null,
        next_sibling_id: null,
        project_id: 5,
        module_id: getModuleId('notes'),
      },
      {
        title: 'Post: Sequelize Intro',
        emoji: '📘',
        description: 'First draft for Sequelize article',
        parent_id: 14,
        next_sibling_id: null,
        project_id: 5,
        module_id: getModuleId('notes'),
      },

      // Project 6 - Digital Art Portfolio
      {
        title: 'Art Tasks',
        emoji: '🎨',
        description: 'Track design progress and deadlines',
        parent_id: null,
        next_sibling_id: null,
        project_id: 6,
        module_id: getModuleId('board'),
      },
      {
        title: 'Style Notes',
        emoji: '🖌️',
        description: 'Color palettes and inspiration',
        parent_id: null,
        next_sibling_id: null,
        project_id: 6,
        module_id: getModuleId('notes'),
      },
      {
        title: 'Color Study',
        emoji: '🎨',
        description: 'Notes about color theory and palettes',
        parent_id: 17,
        next_sibling_id: null,
        project_id: 6,
        module_id: getModuleId('notes'),
      },

      // Project 7 - AI Notes
      {
        title: 'Research Timeline',
        emoji: '📅',
        description: 'AI paper reading schedule',
        parent_id: null,
        next_sibling_id: null,
        project_id: 7,
        module_id: getModuleId('calendar'),
      },
      {
        title: 'Theory Notes',
        emoji: '📚',
        description: 'Math and AI concept notes',
        parent_id: null,
        next_sibling_id: null,
        project_id: 7,
        module_id: getModuleId('notes'),
      },

      // Project 8 - Marine Life
      {
        title: 'Observation Calendar',
        emoji: '🌊',
        description: 'Dates for marine observation trips',
        parent_id: null,
        next_sibling_id: null,
        project_id: 8,
        module_id: getModuleId('calendar'),
      },
      {
        title: 'Species Notes',
        emoji: '🐠',
        description: 'Details about marine species',
        parent_id: null,
        next_sibling_id: null,
        project_id: 8,
        module_id: getModuleId('notes'),
      },
      {
        title: 'Sharks',
        emoji: '🦈',
        description: 'Study of shark species',
        parent_id: 22,
        next_sibling_id: null,
        project_id: 8,
        module_id: getModuleId('notes'),
      },

      // Project 9 - ABEX IV - Complementary Study
      {
        title: 'Extra Notes',
        emoji: '🧾',
        description: 'Complementary materials and annotations',
        parent_id: null,
        next_sibling_id: null,
        project_id: 9,
        module_id: getModuleId('notes'),
      },
      {
        title: 'Complementary Tasks',
        emoji: '🗂',
        description: 'Organize readings and summaries',
        parent_id: null,
        next_sibling_id: null,
        project_id: 9,
        module_id: getModuleId('board'),
      },
      {
        title: 'Final Review',
        emoji: '✅',
        description: 'Summary for final exam prep',
        parent_id: 24,
        next_sibling_id: null,
        project_id: 9,
        module_id: getModuleId('notes'),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('pages', null, {});
  },
};
