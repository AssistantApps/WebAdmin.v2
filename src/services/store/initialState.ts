import { IAuthState } from "./sections/authState";
import { ISidebarState } from "./sections/sidebarState";

export interface IState {
    auth: IAuthState;
    sidebar: ISidebarState;
}

export const initialState: IState = {
    auth: {
        username: 'Guest',
    },
    sidebar: {
        isOpen: true,
    },
}

// export const getUiScale = (stateService: StateService): [state: () => number, setState: (state: number) => void] => [
//     () => stateService.getState().uiScale,
//     (uiScale: number) => stateService.setState(s => s.uiScale = uiScale),
// ];
