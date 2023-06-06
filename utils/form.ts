export const valueToUppercase = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.toUpperCase();
}

export const valueToLowercase = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.toLowerCase();
}