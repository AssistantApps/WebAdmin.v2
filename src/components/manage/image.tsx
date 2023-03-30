
import { Box, Center, FormControl, FormLabel, Image, Input, InputGroup, InputRightAddon, Td, Tooltip, Text } from '@hope-ui/solid';
import { Component, createSignal, For, onCleanup, Show } from 'solid-js';
import { AppImage } from '../../constants/image';
import { IPastedImage } from '../../contracts/pastedImage';
import { copyTextToClipboard } from '../../helper/browserHelper';
import { uuidv4 } from '../../helper/guidHelper';

interface ITableLogoCellProps {
    url: string;
    maxWidth?: string;
    maxHeight?: string;
    margin?: string;
    borderRadius?: string;
    showTooltip?: boolean;
    fallbackSrc?: string;
}

export const TableLogoCell: Component<ITableLogoCellProps> = (props: ITableLogoCellProps) => {

    const onClick = () => {
        copyTextToClipboard(props.url);
    }

    const imgNode = (
        <Image
            src={props.url}
            class="logo-sm"
            borderRadius={props.borderRadius}
            maxHeight={props.maxHeight}
            maxWidth={props.maxWidth}
            margin={props.margin}
            fallbackSrc={props.fallbackSrc}
            onClick={onClick}
        />
    );

    return (
        <Td >
            <Show when={props.showTooltip == true} fallback={imgNode}>
                <Tooltip label={<Text>{'Click to copy ' + props.url}</Text>}>
                    {imgNode}
                </Tooltip>
            </Show>
        </Td>
    );
};

export const getCountryCodeImage = (countryCode: string) => {
    if (countryCode == null) return '/assets/img/fallback.png';
    if (countryCode.length < 1) return '/assets/img/fallback.png';

    return `https://tools.assistantapps.com/assets/img/countryCode/${(countryCode).toUpperCase()}.svg`;
}

interface IFormImageUrlProps {
    id: string;
    placeholder?: string;
    label: string;
    value: string;
    imageValue?: string;
    onChange: (newValue: string) => void;
}

export const FormImageInput: Component<IFormImageUrlProps> = (props: IFormImageUrlProps) => {

    const onChange = (event: any) => {
        const value = event.target?.value;
        if (value == null) return;

        props.onChange(value);
    }

    const getImageOrFallback = (textUrl: string, imageUrl?: string) => {
        if (imageUrl != null) {
            return imageUrl;
        }

        if (textUrl == null) return AppImage.fallbackImg;
        if (textUrl.length < 3) return AppImage.fallbackImg;
        return textUrl;
    }

    return (
        <>
            <FormControl>
                <FormLabel for={props.id}>{props.label}</FormLabel>
                <InputGroup id={props.id}>
                    <Input
                        placeholder={props.placeholder}
                        value={props.value}
                        type="text"
                        onBlur={onChange}
                    />
                    <InputRightAddon>
                        <Image
                            src={getImageOrFallback(props.value, props.imageValue)}
                            maxH="25px"
                            minH="20px"
                            my="5px"
                            borderRadius="5px"
                        />
                    </InputRightAddon>
                </InputGroup>
            </FormControl>
        </>
    );
};


interface IFormImageDragAndDropProps {
    id: string;
    placeholder?: string;
    label: string;
    value: Array<IPastedImage>;
    onChange: (newValue: Array<IPastedImage>) => void;
}

export const FormImageDragAndDrop: Component<IFormImageDragAndDropProps> = (props: IFormImageDragAndDropProps) => {
    const [images, setImages] = createSignal<Array<IPastedImage>>([]);

    // I handle the paste event on the Window (see host bindings).
    const handlePaste = (event: any): void => {
        const isValid = event.clipboardData &&
            event.clipboardData.files &&
            event.clipboardData.files.length;

        if (!isValid) { return; }
        const files = event.clipboardData.files;
        if (files == null || files.length < 1) { return; }

        const images: Array<IPastedImage> = [];
        for (let fileIndex = 0; fileIndex < files.length; fileIndex++) {
            const file = files[fileIndex];
            const fileId = uuidv4();
            const fileName = fileId + '.png';
            const imageFormData = new FormData();
            imageFormData.append(fileName, file);
            images.push({
                id: fileId,
                name: fileName,
                contents: imageFormData,
            });
        }

        setImages(prev => {
            const newImages = [...prev, ...images];
            props.onChange(newImages);
            return newImages;
        });
    }

    addEventListener('paste', handlePaste);
    onCleanup(() => removeEventListener('paste', handlePaste));

    const removeImage = (id: string) => {
        setImages(prev => {
            const newImages = prev.filter(p => p.id != id);
            props.onChange(newImages);
            return newImages;
        });
    }

    return (
        <Box class="image-drop">
            <Center flexDirection="column">
                <Show when={images().length == 0}>
                    <Text>{props.placeholder}</Text>
                </Show>
                <Show when={images().length > 0}>
                    <For each={images()}>
                        {(item, index) => (
                            <Tooltip label="Click to remove">
                                <Text
                                    class="pointer"
                                    onClick={() => removeImage(item.id)}
                                >
                                    <Text>🖼️ {item.name}</Text>
                                </Text>
                            </Tooltip>
                        )}
                    </For>
                </Show>
            </Center>
        </Box>
    );
};
