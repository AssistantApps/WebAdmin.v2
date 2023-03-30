
import { Box, Flex, FormControl, FormLabel, Textarea } from '@hope-ui/solid';
import { Component, createSignal } from 'solid-js';
import SolidMarkdown from "solid-markdown";
import { Card } from '../common/card';

interface IFormMarkdownProps {
    id: string;
    placeholder?: string;
    label: string;
    value: string;
    inputType?: string;
    onChange: (newValue: string) => void;
}

export const FormMarkdown: Component<IFormMarkdownProps> = (props: IFormMarkdownProps) => {
    const [markdown, setMarkdown] = createSignal<string>(props.value);

    const onChange = (event: any) => {
        const value = event.target?.value;
        if (value == null) return;

        setMarkdown(value);
        props.onChange(value);
    }

    return (
        <Flex flexDirection="row" gap="2em">
            <Box flex={1}>
                <FormControl>
                    <FormLabel for={props.id}>{props.label}</FormLabel>
                    <Textarea
                        id={props.id}
                        minH="15vh"
                        p="$4"
                        width="100% !important"
                        placeholder={props.placeholder}
                        value={props.value}
                        onInput={onChange}
                    />
                </FormControl>
            </Box>
            <Box flex={1}>
                <FormLabel>{props.label} preview</FormLabel>
                {
                    ((props.value?.length ?? 0) == (markdown()?.length ?? 0)) && (
                        <Card>
                            <Box class="markdown" minH="15vh">
                                <SolidMarkdown children={props.value} />
                            </Box>
                        </Card>
                    )
                }
            </Box>
        </Flex>
    );
};
