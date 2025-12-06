export const capitalize = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1)
}

export const delay = async(ms: number) => await new Promise(resolve => setTimeout(resolve, ms))