
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spacer } from '@hope-ui/solid';
import { Component, JSX } from 'solid-js';


interface IProps {
    title: string;
    isOpen: boolean;
    children: JSX.Element;
    onSave: () => void;
    onClose: () => void;
}

export const ManageResourceBaseModal: Component<IProps> = (props: IProps) => {

    return (
        <Modal opened={props.isOpen} size="7xl" onClose={props.onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton />
                <ModalHeader>{props.title}</ModalHeader>
                <ModalBody>
                    {props.children}
                </ModalBody>
                <ModalFooter>
                    <Button mt="1em" mr="0.5em" onClick={props.onSave}>Save</Button>
                    <Button mt="1em" colorScheme="danger" onClick={props.onClose}>Close</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
};

