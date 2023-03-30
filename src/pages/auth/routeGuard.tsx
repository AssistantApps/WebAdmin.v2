import { Image } from "@hope-ui/solid";
import { Outlet, useNavigate } from "@solidjs/router";
import { Component, createEffect, Show } from "solid-js";

import { routes } from "../../constants/route";
import { isLoggedIn } from "../../helper/loginHelper";
import { getAuthTokenExpire } from "../../services/store/sections/authState";
import { getStateService } from "../../services/store/stateService";

export const RouteGuard: Component = () => {
    const navigate = useNavigate();
    const stateRef = getStateService();
    const [tokenExpiry] = getAuthTokenExpire(stateRef);

    createEffect(() => {
        if (isLoggedIn(tokenExpiry()) == false) {
            navigate(routes.login, { replace: true });
        }
    })

    return (
        <div>
            <Outlet />

            <Show when={isLoggedIn(tokenExpiry())}>
                <Image
                    class="user-login"
                    position="absolute"
                    top="1em"
                    right="2em"
                    width="3em"
                    height="3em"
                    borderRadius="100%"
                    src={stateRef.getState().auth.profilePic}
                    fallbackSrc="/assets/img/fallbackAvatar.png"
                />
            </Show>
        </div>
    )
}