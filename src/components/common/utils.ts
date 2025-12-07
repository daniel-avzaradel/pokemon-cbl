export const capitalize = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1)
}

export const delay = async(ms: number) => await new Promise(resolve => setTimeout(resolve, ms));

export const pokedexEntry = (id: number) => {
        return id < 10 ? id.toString().padStart(3, "0")
            : (id >= 10 && id < 100) ? id.toString().padStart(3, "0")
                : id
    }