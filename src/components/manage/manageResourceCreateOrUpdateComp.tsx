import { Component, createSignal, For } from 'solid-js';
import { ManageResourceMode } from '../../constants/enum/manageResourceMode';

import { anyObject } from '../../helper/typescriptHacks';
import { ManageItemGrid, ManageItemGridCell } from './grid';
import { IPropertyToFormMapping } from './manageResourceBasePage';

interface IProps<T> {
    item: T;
    mode: ManageResourceMode;
    mappings: Array<IPropertyToFormMapping<T>>;
    updateObject: (item: T) => void
    updateProperty: (prop: string, value: any) => void
}

export const ManageResourceCreateOrUpdate: Component<IProps<any>> = <T,>(props: IProps<T>) => {
    const [itemBeingEdited, setItemBeingEdited] = createSignal<T>(props.item);

    const updateProperty = (prop: string, value: any) => {
        if (prop === 'json') {
            console.log(JSON.parse(value));
            setItemBeingEdited(_ => JSON.parse(value));
            props.updateObject(JSON.parse(value));
        } else {
            setItemBeingEdited(prev => ({ ...prev, [prop]: value }) as any);
            props.updateProperty(prop, value);
        }
    }

    return (
        <ManageItemGrid>
            <For each={props.mappings}>
                {(item) => {
                    if ((item.hiddenIn ?? []).includes(props.mode)) {
                        return null;
                    }

                    const Component = item.component;

                    const getExtraProps = (localItemBeingEdited: T) => {
                        let extraProps = anyObject;
                        for (const extra of (item.additional ?? [])) {
                            extraProps = { ...extraProps, [extra.prop]: extra.value(localItemBeingEdited) };
                        }
                        return extraProps;
                    }

                    return (
                        <ManageItemGridCell size={item.gridItemSize}>
                            <Component
                                {...getExtraProps(itemBeingEdited())}
                                id={`${props.mode}-${item.property}`}
                                label={item.label}
                                value={(itemBeingEdited() as any)[item.property]}
                                placeholder={item.placeholder}
                                onChange={(newValue: string) => updateProperty(item.property, newValue)}
                            />
                        </ManageItemGridCell>
                    );
                }}
            </For>
        </ManageItemGrid>
    );
};

