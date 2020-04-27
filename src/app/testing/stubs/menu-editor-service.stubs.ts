import { HeaderEntryModel } from '../../pages/menu-editor/models/header-entry.model';
import { EntryType } from '../../pages/menu-editor/config/entry-type.enum';
import { Gender } from '../../pages/menu-editor/config/gender.enum';

export const headerEntriesStub: HeaderEntryModel[] = [
    {
        type: EntryType.FIRST_LEVEL,
        name: 'Женское',
        gender: Gender.FEMALE,
        content: [
            {
                type: EntryType.SECOND_LEVEL,
                name: 'Одежда',
                content: [
                    {
                        type: EntryType.LINK_BLOCK,
                        name: 'Категории',
                        content: [
                            {type: EntryType.HIGHLIGHTED_LINK, name: 'Вся одежда', url: '/catalog/women-clothing'},
                            {type: EntryType.LINK, name: 'Платья', url: '/catalog/women-dresses'},
                        ]
                    },
                    {
                        type: EntryType.WIDE_BANNER,
                        name: 'Весна: Пастельные оттенки',
                        imageUrl: 'https://cf-static.clouty.ru/1cb84e1faff945308b6ad27dd9d528784702fb9e81f043e28af692d728698325',
                        url: '/product-collections/pastel'
                    }
                ]
            },
        ]
    },
];

export const headerEntriesStubModified: HeaderEntryModel[] = [
    {
        type: EntryType.FIRST_LEVEL,
        name: 'Женское',
        gender: Gender.FEMALE,
        content: [
            {
                type: EntryType.SECOND_LEVEL,
                name: 'Одежда',
                content: [
                    {
                        type: EntryType.LINK_BLOCK,
                        name: 'Категории',
                        content: [
                            {type: EntryType.HIGHLIGHTED_LINK, name: 'Вся одежда', url: '/catalog/women-clothing'},
                            {type: EntryType.LINK, name: 'Платья', url: '/catalog/women-dresses'},
                        ]
                    },
                ]
            },
        ]
    },
];

export const headerEntriesMultichildren: HeaderEntryModel[] = [
    {
        type: EntryType.FIRST_LEVEL,
        name: 'Женское',
        gender: Gender.FEMALE,
    },
    {
        type: EntryType.FIRST_LEVEL,
        name: 'Неженское',
        gender: Gender.FEMALE,
    },
    {
        type: EntryType.FIRST_LEVEL,
        name: 'Кекинское',
        gender: Gender.FEMALE,
    },
];
