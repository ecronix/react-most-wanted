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
                path: '/home',
                displayName: 'Home',
                disabled: false,
            },
            {
                displayName: 'Demo Pages',
                disabled: false,
                nested: [
                    {
                        path: '/dialog',
                        displayName: 'Dialog Demo',
                        disabled: false,
                    },
                ]
            },
        ]
    }
]

export default menuItems;