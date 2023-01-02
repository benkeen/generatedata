const { generate } = require('../dist');

(async () => {
    const template = {
        generationSettings: {
            numResults: 10
        },
        dataTemplate: [
            {
                plugin: 'Names',
                title: 'First Name',
                settings: {
                    options: ['Name']
                }
            },
            {
                plugin: 'Names',
                title: 'Last Name',
                settings: {
                    options: ['Surname']
                }
            }
        ],
        exportSettings: {
            plugin: 'XML',
            settings: {
                dataStructureFormat: 'simple'
            }
        }
    };

    const data = await generate(template);

    console.log(data);
})();
