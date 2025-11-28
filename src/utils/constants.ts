export const apiURL = (max?: number) => {
    return `https://pokeapi.co/api/v2/pokemon?limit=${max ?? 151}`
}