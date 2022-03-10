async function run() {
    /**
     * Modules that's necessary for the whole site to run
     * Modules that's only needed in specific parts of the site must be dynamically imported
     */

    await import('react-router-dom')
    const { default: React } = await import('react')
    const { render } = await import('react-dom')
    const { default: MainComponent } = await import('./pages/mainComponent')

    render(<MainComponent />, document.getElementById('root'))
}

run()
