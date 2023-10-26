export enum Delay {
    Short = 500,
    Medium = 2000,
    Long = 5000,
}

export class DelayHandler {
    public static delay(fun: () => void, delay: Delay = Delay.Medium) {
        setTimeout(() => fun(), delay);
    }
}
