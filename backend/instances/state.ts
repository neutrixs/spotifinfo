interface state {
    state: string
    scope: string
}

class StateInstance {
    #pStates: state[] = []

    get(state: string) {
        return this.#pStates.find(s => s.state == state)
    }

    set(state: string, scope: string) {
        this.#pStates.push({ state, scope })
    }

    isMatch(state: string, scope: string) {
        const currentState = this.#pStates.find(s => s.state == state)

        if (!currentState) {
            return false
        }

        const sortedCurrentScope = currentState.scope.split(' ').sort().join(' ')
        const sortedScope = scope.split(' ').sort().join(' ')

        return sortedCurrentScope == sortedScope
    }
}

const initializedInstance = new StateInstance()

export default initializedInstance
