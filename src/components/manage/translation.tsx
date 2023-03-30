import { Text } from "@hope-ui/solid";
import { Component, createSignal, onMount, Show } from "solid-js";

import { NetworkState } from "../../constants/enum/networkState";
import { TranslationKeyViewModel } from "../../contracts/generated/ViewModel/Translation/translationKeyViewModel";
import { getManageTranslationKeysService } from "../../services/api/manage/manageTranslationKeysService";
import { LoadingSpinner } from "../core/loading";

interface IProps {
    transKeyGuid: string;
    keysFromApi?: Array<TranslationKeyViewModel>;
}

export const TranslationKeyFromGuid: Component<IProps> = (props: IProps) => {
    const [translationKeys, setTranslationKeys] = createSignal<Array<TranslationKeyViewModel>>(props.keysFromApi ?? []);
    const [networkState, setNetworkState] = createSignal<NetworkState>((props.keysFromApi != null) ? NetworkState.Success : NetworkState.Loading);

    onMount(() => {
        if (props.keysFromApi != null && props.keysFromApi.length > 0) return;
        fetchKeys();
    })

    const fetchKeys = async () => {
        const tkResult = await getManageTranslationKeysService().readAllCached();
        if (tkResult.isSuccess == false) {
            setNetworkState(NetworkState.Error);
        }

        setTranslationKeys(tkResult.value);
        setNetworkState(NetworkState.Success);
    }

    return (
        <>
            <Show when={networkState() == NetworkState.Error}>
                <Text>Something went wrong</Text>
            </Show>
            <Show when={networkState() == NetworkState.Loading || networkState() == NetworkState.Pending}>
                <LoadingSpinner />
            </Show>
            <Show when={networkState() == NetworkState.Success}>
                <Text>{(translationKeys() ?? []).find(tk => tk.guid == props.transKeyGuid)?.key ?? 'unknown'}</Text>
            </Show>
        </>
    );
}