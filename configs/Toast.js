import Toast from 'react-native-root-toast';

function showToast(msg, time = 3000) {
    let toast = Toast.show(msg, {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
        onShow: () => {
            console.log('show di r')
        },
        onShown: () => {
            // calls on toast\`s appear animation end.
            console.log('show di r1')
        },
        onHide: () => {
            // calls on toast\`s hide animation start.
            console.log('an di r')
        },
        onHidden: () => {
            // calls on toast\`s hide animation end.
            console.log('an di r1')
        }
    });

    setTimeout(function () {
        Toast.hide(toast);
        console.log('an di r')
    }, time);
}

export default showToast;
