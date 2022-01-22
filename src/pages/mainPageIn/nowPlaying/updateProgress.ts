export default function updateProgress(
    isPlaying: boolean,
    currentMs: number,
    totalMs: number,
    setCurrentMs: React.Dispatch<React.SetStateAction<number>>,
    setProgress: React.Dispatch<React.SetStateAction<string>>
) {
    if (!isPlaying) return

    const newMs = currentMs + 100

    if (newMs > totalMs) return

    const currentMinute = Math.floor(currentMs / 60000)
    const s = Math.floor((currentMs % 60000) / 1000)
    const currentSecond = s < 10 ? '0' + s : s

    const totalMinute = Math.floor(totalMs / 60000)
    const tS = Math.floor((totalMs % 60000) / 1000)
    const totalSecond = tS < 10 ? '0' + tS : tS

    const progress = `${currentMinute}:${currentSecond} / ${totalMinute}:${totalSecond}`

    setCurrentMs(newMs)
    setProgress(progress)
}
