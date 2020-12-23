

export function getLoader(name) {
    let loader = false
    loads.map((f) => {
        if (f.name === name) {
            let defaultProps = { ...initState }
            load = { ...defaultProps, ...f }
        }
        return f
    })
    return loader
}

