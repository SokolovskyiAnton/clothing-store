export const fields =  [
    {
        model: 'selected',
        placeholder: 'Sort',
        option: [ {name: 'Price high to low'}, {name: 'Price low to high'} ],
        range: false
    },
    {
        model: 'type',
        placeholder: 'Style',
        options: 'productType',
        range: false
    },
    {
        model: 'color',
        placeholder: 'Color',
        options: 'colors',
        range: false
    },
    {
        model: 'brand',
        placeholder: 'Brand',
        options: 'brand',
        range: false
    },
    {
        model: 'size',
        placeholder: 'Size',
        options: 'sizes',
        range: false
    },
    {
        model: 'priceRange',
        placeholder: 'Price range',
        options: 'priceRange',
        range: true
    }

]