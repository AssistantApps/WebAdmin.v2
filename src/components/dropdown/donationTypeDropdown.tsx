import { DonationType } from '@assistantapps/assistantapps.api.client';
import { Component } from 'solid-js';

import { getArrFromEnum } from '../../helper/enumHelper';
import { capitalizeFirstLetter, lowercaseFirstLetter } from '../../helper/stringHelper';
import { Dropdown } from '../common/dropdown';

interface IProps {
    placeholder?: string;
    value: string;
    onChange?: (values: Array<string> | string) => void;
}

export const DonationTypeDropdown: Component<IProps> = (props: IProps) => {

    const getSelectedValues = (newValue: string | string[]) => {
        if (Array.isArray(newValue)) return;

        if (isNaN(newValue as any)) {
            return [
                DonationType[lowercaseFirstLetter(newValue ?? '') as any]?.toString?.() ?? ''
            ];
        }
        return [newValue?.toString?.()];
    }

    const onSelect = (newValue: string | string[]) => {
        if (props.onChange == null) return;
        if (Array.isArray(newValue)) return;

        const localNewValueStr = DonationType[newValue as any]?.toString?.() ?? '';
        const localNewValue = capitalizeFirstLetter(localNewValueStr);
        props.onChange(localNewValue);
    }

    return (
        <Dropdown
            title="Source"
            selectedValues={getSelectedValues(props.value)}
            multiple={false}
            placeholder={props.placeholder}
            onSelect={onSelect}
            options={getArrFromEnum(DonationType)
                .map(dType => ({
                    title: capitalizeFirstLetter(DonationType[dType as any]),
                    value: dType.toString(),
                }))}
        />
    );
}