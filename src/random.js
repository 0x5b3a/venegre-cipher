export const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/\\|[{(&%$#@!><?";

export function randomChar(string) {
    return string[Math.floor(Math.random() * (string.length - 1))]
}

export function randomString(string) {
    return Array.from(Array(string.length)).map(function () {
        return randomChar(string)
    }).join("")
}

