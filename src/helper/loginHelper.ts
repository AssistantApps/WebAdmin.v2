import { isBefore } from "./dateHelper";

export const isLoggedIn = (tokenExpiryDate?: Date) => {
    // console.warn(tokenExpiryDate, (tokenExpiryDate != null), isBefore(new Date(), tokenExpiryDate!))
    return (tokenExpiryDate != null) && isBefore(new Date(), tokenExpiryDate!);
}