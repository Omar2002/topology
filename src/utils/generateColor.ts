const maxColor = parseInt('ffffff', 16);

export function generateColor(): string {
    return '#' + Math.round(Math.random() * maxColor).toString(16);
}
