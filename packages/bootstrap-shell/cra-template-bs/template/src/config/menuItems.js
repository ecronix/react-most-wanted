const menuItems = [
    {
        path: '/',
        displayName: 'Home'
    },
    {
        path: '/',
        displayName: 'Dropdown with Link',
        nested: [

        ]
    },
    {
        displayName: 'Dropdown with out Link',
        nested: [
            {
                path: '/',
                displayName: 'Dropdown with Link',
                nested: [
                    path: '/',
                    displayName: 'Dropdown Item'
                ]
            }
        ]
    }
]

export default menuItems;