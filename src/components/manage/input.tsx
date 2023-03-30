
import { FormControl, FormLabel, Input, Textarea } from '@hope-ui/solid';
import { Component } from 'solid-js';
import { formatForDateLocal } from '../../helper/dateHelper';

interface IFormLongInputProps {
    id: string;
    placeholder?: string;
    label: string;
    value: string | number;
    inputType?: string;
    disabled?: boolean;
    onChange: (newValue: string) => void;
}

export const FormLongInput: Component<IFormLongInputProps> = (props: IFormLongInputProps) => {

    const onChange = (event: any) => {
        const value = event.target?.value;
        if (value == null) return;

        props.onChange(value);
    }

    const handleSpecialDateLocalValue = (value: string | number, inputType?: string) => {
        if (inputType == 'datetime-local') {
            return formatForDateLocal(value as any);
        }

        return value;
    }

    return (
        <FormControl>
            <FormLabel for={props.id}>{props.label}</FormLabel>
            <Input
                id={props.id}
                placeholder={props.placeholder}
                value={handleSpecialDateLocalValue(props.value, props.inputType)}
                type={props.inputType}
                disabled={props.disabled}
                onBlur={onChange}
            />
        </FormControl>
    );
};

interface IFormTextAreaProps {
    id: string;
    placeholder?: string;
    label: string;
    minH?: string;
    value: string | number;
    inputType?: string;
    onChange: (newValue: string) => void;
}

export const FormTextArea: Component<IFormTextAreaProps> = (props: IFormTextAreaProps) => {

    const onChange = (event: any) => {
        const value = event.target?.value;
        if (value == null) return;

        props.onChange(value);
    }

    return (
        <FormControl>
            <FormLabel for={props.id}>{props.label}</FormLabel>
            <Textarea
                id={props.id}
                minH={props.minH}
                width="100% !important"
                placeholder={props.placeholder}
                value={props.value}
                onBlur={onChange}
            />
        </FormControl>
    );
};
