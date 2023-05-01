
import { TranslationImageViewModel } from '@assistantapps/assistantapps.api.client';
import { Box, Button, Center, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from '@hope-ui/solid';
import { Component, For, Show, createEffect, createSignal } from 'solid-js';

import { NetworkState } from '../../../constants/enum/networkState';
import { IPastedImage } from '../../../contracts/pastedImage';
import { getManageTranslationImageService } from '../../../services/api/manage/manageTranslationImageService';
import { getConfig } from '../../../services/internal/configService';
import { LoadingSpinner } from '../../core/loading';
import { FormImageDragAndDrop } from '../image';


interface IProps {
    title: string;
    isOpen: boolean;
    translationKeyGuid: string;
    onClose: () => void;
}

export const ManageTranslationImageModal: Component<IProps> = (props: IProps) => {
    const [networkState, setNetworkState] = createSignal<NetworkState>(NetworkState.Loading);
    const [items, setItems] = createSignal<Array<TranslationImageViewModel>>([]);

    createEffect(() => {
        if (props.translationKeyGuid != null) {
            fetchTranslationImages(props.translationKeyGuid);
        }
    });

    const fetchTranslationImages = async (guid: string) => {
        if (guid == null || guid.length < 5) {
            setItems([]);
            return;
        }

        setNetworkState(NetworkState.Loading);
        const imagesResult = await getManageTranslationImageService().readAll(guid);
        if (imagesResult.isSuccess == false) {
            setNetworkState(NetworkState.Error);
            return;
        }

        setItems(imagesResult.value);
        setNetworkState(NetworkState.Success);
    }

    const deleteTranslationImage = (item: TranslationImageViewModel) => async () => {
        setNetworkState(NetworkState.Loading);
        await getManageTranslationImageService().del(item);

        fetchTranslationImages(props.translationKeyGuid);
    }

    const addNewImages = async (pastedImages: Array<IPastedImage>) => {
        setNetworkState(NetworkState.Loading);

        const translationImageServ = getManageTranslationImageService();
        for (const translationKeyImage of (pastedImages ?? [])) {
            await translationImageServ.add(
                props.translationKeyGuid,
                translationKeyImage.contents,
            );
        }

        fetchTranslationImages(props.translationKeyGuid);
    }

    return (
        <Modal opened={props.isOpen} size="xl" onClose={props.onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton />
                <ModalHeader>{props.title}</ModalHeader>
                <ModalBody>
                    <Show when={networkState() == NetworkState.Loading || networkState() == NetworkState.Pending}>
                        <Center height="25vh">
                            <LoadingSpinner />
                        </Center>
                    </Show>
                    <Show when={networkState() == NetworkState.Error}>
                        <Center>Error</Center>
                    </Show>
                    <Show when={networkState() == NetworkState.Success}>
                        <Center minH="25vh" gap="0.5em">
                            <Show
                                when={items().length > 0}
                                fallback={(<Text>No images</Text>)}
                            >
                                <For each={items()}>
                                    {(item) => (
                                        <Box position="relative" maxW="200px" maxH="200px">
                                            <Image
                                                borderRadius="10px"
                                                src={`${getConfig().getAATranslationImageUrl()}/${item.imagePath}`}
                                            />
                                            <Button
                                                colorScheme="danger"
                                                class="top-right-cross"
                                                onClick={deleteTranslationImage(item)}
                                            >X</Button>
                                        </Box>
                                    )}
                                </For>
                            </Show>
                        </Center>
                        <FormImageDragAndDrop
                            id="image-upload"
                            label="Add image to translationKey"
                            value={[]}
                            placeholder="Paste image here"
                            onChange={addNewImages}
                        />
                    </Show>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={props.onClose}>Close</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
};

