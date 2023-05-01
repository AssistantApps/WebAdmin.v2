import { FeedbackQuestionType } from '@assistantapps/assistantapps.api.client';
import { Component } from 'solid-js';

import { getArrFromEnum } from '../../helper/enumHelper';
import { addSpacesForEnum, capitalizeFirstLetter, lowercaseFirstLetter } from '../../helper/stringHelper';
import { Dropdown } from '../common/dropdown';

interface IProps {
    placeholder?: string;
    value: string;
    onChange?: (values: Array<string> | string) => void;
}

export const QuestionTypeDropdown: Component<IProps> = (props: IProps) => {

    const getSelectedValues = (newValue: string | string[]) => {
        if (Array.isArray(newValue)) return;

        if (isNaN(newValue as any)) {
            return [
                FeedbackQuestionType[lowercaseFirstLetter(newValue ?? '') as any]?.toString?.() ?? ''
            ];
        }
        return [newValue?.toString?.()];
    }

    const onSelect = (newValue: string | string[]) => {
        if (props.onChange == null) return;
        if (Array.isArray(newValue)) return;

        const localNewValueStr = FeedbackQuestionType[newValue as any]?.toString?.() ?? '';
        const localNewValue = capitalizeFirstLetter(localNewValueStr);
        props.onChange(localNewValue);
    }

    return (
        <Dropdown
            title="Question Type"
            selectedValues={getSelectedValues(props.value)}
            multiple={false}
            placeholder={props.placeholder}
            onSelect={onSelect}
            options={getArrFromEnum(FeedbackQuestionType)
                .map(dType => ({
                    title: capitalizeFirstLetter(addSpacesForEnum((FeedbackQuestionType[dType as any]))),
                    value: dType.toString(),
                }))}
        />
    );
}