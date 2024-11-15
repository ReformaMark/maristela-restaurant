import useSound from 'use-sound'

export function useOrderStatusSound() {
const [playOrderStatus] = useSound('/sounds/notification.mp3', {
    volume: 0.3,
    soundEnabled: true,
    })

    return playOrderStatus
}