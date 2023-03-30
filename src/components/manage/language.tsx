import { Text } from "@hope-ui/solid";
import { Component, createSignal, onMount, Show } from "solid-js";

import { NetworkState } from "../../constants/enum/networkState";
import { LanguageViewModel } from "../../contracts/generated/ViewModel/languageViewModel";
import { getManageLanguageService } from "../../services/api/manage/manageLanguageService";
import { LoadingSpinner } from "../core/loading";

interface IProps {
    languageGuid: string;
    langsFromApi?: Array<LanguageViewModel>;
}

export const LanguageFromGuid: Component<IProps> = (props: IProps) => {
    const [languages, setLanguages] = createSignal<Array<LanguageViewModel>>(props.langsFromApi ?? []);
    const [networkState, setNetworkState] = createSignal<NetworkState>((props.langsFromApi != null) ? NetworkState.Success : NetworkState.Loading);

    onMount(() => {
        if (props.langsFromApi != null && props.langsFromApi.length > 0) return;
        fetchKeys();
    })

    const fetchKeys = async () => {
        const tkResult = await getManageLanguageService().readAllCached();
        if (tkResult.isSuccess == false) {
            setNetworkState(NetworkState.Error);
        }

        setLanguages(tkResult.value);
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
                <Text>{(languages() ?? []).find(tk => tk.guid == props.languageGuid)?.name ?? 'unknown'}</Text>
            </Show>
        </>
    );
}