async function run() {
    const { default: React } = await import('react')
    await import('react-router-dom')
    await import('react-markdown')
    const { render } = await import('react-dom')
    const { default: MainComponent } = await import('./pages/mainComponent')

    render(<MainComponent />, document.getElementById('root'))
}

run()
