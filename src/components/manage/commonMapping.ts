import { CodeModal } from "../common/code";
import { GridItemSize } from "./grid";
import { FormLongInput } from "./input";
import { IPropertyToFormMapping } from "./manageResourceBasePage";
import { FormSwitch } from "./switch";

export const sortOrderMapping: IPropertyToFormMapping<any> = {
    component: FormLongInput,
    gridItemSize: GridItemSize.smol,
    property: 'sortOrder',
    label: 'Sort Order',
    additional: [
        {
            prop: 'inputType',
            value: (_) => 'number',
        },
    ],
};

export const isMapping = (property: string, label: string): IPropertyToFormMapping<any> => ({
    component: FormSwitch,
    gridItemSize: GridItemSize.xsmol,
    property,
    label,
});

export const isVisibleMapping: IPropertyToFormMapping<any> = isMapping('isVisible', 'Is Visible');
export const isTranslatableMapping: IPropertyToFormMapping<any> = isMapping('isTranslatable', 'Is Translatable');
// export const isActiveMapping: IPropertyToFormMapping<any> = isMapping('isActive', 'Is Active');

export const codeModalMapping: IPropertyToFormMapping<any> = {
    component: CodeModal,
    gridItemSize: GridItemSize.xsmol,
    property: 'json',
    label: 'View JSON',
    additional: [
        {
            prop: 'buttonTitle',
            value: () => '< >'
        },
        {
            prop: 'title',
            value: () => 'JSON data'
        },
        {
            prop: 'language',
            value: () => 'language-json'
        },
        {
            prop: 'codeContent',
            value: (itemBeingEdited) => JSON.stringify(itemBeingEdited, null, 2),
        }
    ]
};