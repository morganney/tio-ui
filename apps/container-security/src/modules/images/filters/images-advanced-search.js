const filters = [
    {
        name: 'dockerImageId',
        readable_name: 'Image ID',
        control: {
            type: 'entry',
            regex: '[0-9a-zA-Z]'
        },
        operators: [
            'eq'
        ]
    },
    {
        name: 'score',
        readable_name: 'Risk Score',
        control: {
            type: 'entry',
            regex: '[0-9]|10'
        },
        operators: [
            'eq',
            'lte',
            'gte'
        ]
    },
    {
        name: 'repo',
        readable_name: 'Repository',
        control: {
            type: 'entry',
            regex: '[0-9a-zA-Z]'
        },
        operators: [
            'eq'
        ]
    },
    {
        name: 'hasMalware',
        readable_name: 'Malware',
        control: {
            type: 'dropdown',
            list: [
                'Has malware',
                'Does not have malware'
            ]
        },
        operators: [
            'eq'
        ]
    },
    {
        name: 'tag',
        readable_name: 'Tag',
        control: {
            type: 'entry',
            regex: '[0-9a-zA-Z]'
        },
        operators: [
            'eq'
        ]
    }
];

export {
    filters
};
