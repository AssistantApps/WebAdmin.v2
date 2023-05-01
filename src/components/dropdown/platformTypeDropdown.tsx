import { PlatformType } from '@assistantapps/assistantapps.api.client';
import { Component } from 'solid-js';

import { getArrFromEnum } from '../../helper/enumHelper';
import { capitalizeFirstLetter } from '../../helper/stringHelper';
import { Dropdown } from '../common/dropdown';

interface IProps {
    placeholder?: string;
    value: Array<string>;
    multiple?: boolean;
    onChange?: (values: Array<string> | string) => void;
}

export const PlatformTypeDropdown: Component<IProps> = (props: IProps) => {

    return (
        <Dropdown
            title={props.multiple == true ? 'Platforms' : 'Platform'}
            selectedValues={(props.value ?? [])
                .map(value =>
                    isNaN(value as any)
                        ? PlatformType[value as any]
                        : (value as any)
                )
            }
            multiple={props.multiple}
            placeholder={props.placeholder}
            onSelect={props.onChange}
            options={getArrFromEnum(PlatformType)
                .map(pType => ({
                    title: capitalizeFirstLetter(PlatformType[pType as any]),
                    value: pType as any,
                }))}
        />
    );
}