module.exports = function (plop) {
  plop.setGenerator('component', {
    description: 'Create a component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is your component name?'
      }
    ],
    actions: [
      {
        type: 'add',
        path: '../src/components/{{pascalCase name}}/index.tsx',
        templateFile: 'templates/Component.tsx.hbs'
      },
      {
        type: 'add',
        path: '../src/components/{{pascalCase name}}/styles.ts',
        templateFile: 'templates/styles.ts.hbs'
      }
    ]
  })

  plop.setGenerator('page', {
    description: 'Create a page',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is your page name?'
      },
      {
        type: 'confirm',
        name: 'contains-children',
        message: 'Does the page have children?',
        default: false,
        choices: [
          { name: 'Yes', value: true },
          { name: 'No', value: false }
        ]
      }
    ],
    actions: function (data) {
      const actions = [
        {
          type: 'add',
          path: '../src/templates/{{pascalCase name}}/index.tsx',
          templateFile: 'templates/Component.tsx.hbs'
        },
        {
          type: 'add',
          path: '../src/templates/{{pascalCase name}}/styles.ts',
          templateFile: 'templates/styles.ts.hbs'
        }
      ]

      if (data && data['contains-children']) {
        actions.push({
          type: 'add',
          path: '../src/pages/{{pascalCase name}}/index.tsx',
          templateFile: 'templates/Page.tsx.hbs'
        })
      } else {
        actions.push({
          type: 'add',
          path: '../src/pages/{{lowerCase name}}.tsx',
          templateFile: 'templates/Page.tsx.hbs'
        })
      }

      return actions
    }
  })
}
