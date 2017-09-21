

import URlConfig from "../configs/url";

async function onChangeMessage(username, password, idct) {
    try {
        let urlLogin = URlConfig.getLoginRouter(username,password,idct);
        console.log("hihi", urlLogin)
        let response = await fetch(urlLogin);
        let responseJson = await response.json();
        URlConfig.OBJLOGIN.messageUnread=responseJson.data.messageUnread;
    } catch(error) {
        console.error(error);
    }
}
export {onChangeMessage}