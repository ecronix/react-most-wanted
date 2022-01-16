const menuItems = [
    /*
    {
        path: '/',
        displayName: 'Home',
        disabled: true,
        disabledMobile: false,
    },
    {
        path: '/',
        displayName: 'Dropdown with Link',
        disabled: true,
        disabledMobile: false,
        nested: [

        ]
    },
    */
    {
        displayName: 'Dropdown',
        disabled: false,
        nested: [
            {
                path: '/',
                displayName: 'Dropdown Item',
                disabled: false,
            },
            {
                path: '/',
                displayName: 'Dropdown Item',
                disabled: false,
            },
            {
                path: '/',
                displayName: 'Dropdown Item',
                disabled: false,
            },
            {
                displayName: 'Dropdown Item',
                disabled: false,
                nested: [
                    {
                        path: '/',
                        displayName: 'Dropdown Item',
                        disabled: false,
                    },
                    {
                        path: '/',
                        displayName: 'Dropdown Item',
                        disabled: false,
                        nested: [
                            {
                                path: '/',
                                displayName: 'Dropdown Item',
                                disabled: false,
                            },
                            {
                                path: '/',
                                displayName: 'Dropdown Item',
                                disabled: false,
                            }
                        ]
                    }
                ]
            },
        ]
    }
]

export default menuItems;