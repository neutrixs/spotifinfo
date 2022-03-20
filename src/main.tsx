async function run() {
    /**
     * Modules that's necessary for the whole site to run
     * Modules that's only needed in specific parts of the site must be dynamically imported
     */

    const reactRouterDOMImport = import('react-router-dom')
    const reactImport = import('react')
    const reactDOMImport = import('react-dom')
    const MainComponentImport = import('./pages/mainComponent')

    await reactRouterDOMImport
    const { default: React } = await reactImport
    const { render } = await reactDOMImport
    const { default: MainComponent } = await MainComponentImport

    render(<MainComponent />, document.getElementById('💀'))
}

run()

export {}
