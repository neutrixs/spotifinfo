let currentMs = 0
let totalMs = 0
let isPlaying = false

export default function updateProgress(setProgress: React.Dispatch<React.SetStateAction<string>>) {
    if (!isPlaying) return

    const newMs = currentMs + 100

    if (newMs > totalMs) return

    currentMs = newMs

    const currentMinute = Math.floor(currentMs / 60000)
    const s = Math.floor((currentMs % 60000) / 1000)
    const currentSecond = s < 10 ? '0' + s : s

    const totalMinute = Math.floor(totalMs / 60000)
    const tS = Math.floor((totalMs % 60000) / 1000)
    const totalSecond = tS < 10 ? '0' + tS : tS

    const progress = `${currentMinute}:${currentSecond} / ${totalMinute}:${totalSecond}`

    setProgress(progress)
}

function setCurrentMs(ms: number) {
    currentMs = ms
}

function setTotalMs(ms: number) {
    totalMs = ms
}

function setIsPlaying(isPlayingParam: boolean) {
    isPlaying = isPlayingParam
}

export { setCurrentMs, setTotalMs, setIsPlaying }
