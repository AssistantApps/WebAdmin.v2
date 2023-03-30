
import { FormControl, FormLabel, Switch } from '@hope-ui/solid';
import { Component } from 'solid-js';

interface IFormSwitchProps {
    id: string;
    label: string;
    value: boolean;
    onChange: (newValue: boolean) => void;
}

export const FormSwitch: Component<IFormSwitchProps> = (props: IFormSwitchProps) => {

    const onChange = (event: any) => {
        const value = event.target?.checked;
        if (value == null) return;

        props.onChange(value);
    }

    return (
        <FormControl>
            <FormLabel for={props.id}>{props.label}</FormLabel><br />
            <Switch
                id={props.id}
                mt="$2"
                size="lg"
                checked={props.value}
                onChange={onChange}
                variant="outline"
            />
        </FormControl>
    );
};

