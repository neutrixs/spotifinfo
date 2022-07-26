import { useState } from 'react'

export default function useForceRerender() {
    const [_, set] = useState(0)

    function increment() {
        set(prev => prev + 1)
    }

    return increment
}