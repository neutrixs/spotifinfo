import { partialLoad, setOptions } from 'grecaptcha-loader'

async function run() {
    /**
     * Modules that's necessary for the whole site to run
     * Modules that's only needed in specific parts of the site must be dynamically imported
     */

    setOptions({ render: '6Ld9VmMcAAAAAK48XrvY1T8vcjjNBHN4tkRipg5C' })
    const loadRecaptcha = partialLoad()

    const reactRouterDOMImport = import('react-router-dom')
    const reactImport = import('react')
    const reactDOMClientImport = import('react-dom/client')
    const MainComponentImport = import('./pages/mainComponent')

    await loadRecaptcha
    await reactRouterDOMImport
    const { default: React } = await reactImport
    const { createRoot } = await reactDOMClientImport
    const { default: MainComponent } = await MainComponentImport

    const rootElement = document.createElement('div')
    const root = createRoot(rootElement)

    root.render(<MainComponent />)
    document.body.insertBefore(rootElement, document.body.firstChild)

    cleanup()
}

function cleanup() {
    const prevLoadingElement = document.getElementById('loading')
    prevLoadingElement?.parentElement?.removeChild(prevLoadingElement)
}

run()

export {}
