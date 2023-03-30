
import { Box, Button, createDisclosure, FormLabel, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea } from '@hope-ui/solid';
import { Component, createSignal, JSX, Show } from 'solid-js';
import { SearchIcon } from './icon/seachIcon';

interface IProps {
    title: string;
    label: string | JSX.Element;
    language: string;
    codeContent: string;
    disableInput?: boolean;
    trigger?: (onOpen: () => void) => JSX.Element;
    onChange: (newValue: string) => void;
}

export const CodeModal: Component<IProps> = (props: IProps) => {
    const { isOpen, onOpen, onClose } = createDisclosure();
    const [textArea, setTextArea] = createSignal<string>();

    const onLocalOpen = () => {
        if (isOpen() == false) {
            setTimeout(() => {
                window.Prism.highlightAll();
            }, 250);
        }
        onOpen();
    }

    const onSave = () => {
        const jsonInput = textArea();
        if (jsonInput == null) return;

        props.onChange(jsonInput);
        onClose();
    }

    return (
        <>
            {
                (props.trigger != null)
                    ? props.trigger(onLocalOpen)
                    : (
                        <>
                            <FormLabel>{props.label}</FormLabel><br />
                            <Box
                                class="pointer"
                                backgroundColor="rgba(255, 255, 255, 0.1)"
                                borderRadius="10px"
                                p="5px 1em"
                                display="inline-block"
                                onClick={onLocalOpen}
                            >
                                <SearchIcon boxSize="30px" />
                            </Box>
                        </>
                    )
            }
            <Modal opened={isOpen()} size="7xl" onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalHeader>{props.title}</ModalHeader>
                    <ModalBody>
                        <Box overflow="hidden">
                            <pre>
                                <code class={props.language}>
                                    {props.codeContent}
                                </code>
                            </pre>
                        </Box>
                        <Show when={props.disableInput != true}>
                            <Box mt="1em" overflow="hidden">
                                <FormLabel for="json-input">JSON input</FormLabel>
                                <Textarea
                                    id="json-input"
                                    width="100% !important"
                                    onInput={(e: any) => setTextArea(e.target.value)}
                                />
                            </Box>
                        </Show>
                    </ModalBody>
                    <ModalFooter>
                        <Show when={props.disableInput != true}>
                            <Button mr="0.5em" onClick={onSave}>Save</Button>
                        </Show>
                        <Button colorScheme="danger" onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
};

