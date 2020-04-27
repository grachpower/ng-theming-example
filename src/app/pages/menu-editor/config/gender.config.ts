import { Gender } from './gender.enum';

export const GENDERS_TRANSLATE_MAP: { [gender: string]: string } = {
    [Gender.FEMALE]: 'menu-editor.fist-level.headers.WOMEN',
    [Gender.MALE]: 'menu-editor.fist-level.headers.MEN',
    [Gender.CHILDREN]: 'menu-editor.fist-level.headers.CHILDREN',
};

export const GENDER_LIST: Gender[] = [
    Gender.FEMALE,
    Gender.MALE,
    Gender.CHILDREN,
];
