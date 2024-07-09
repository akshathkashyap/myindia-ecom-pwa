class LocalStorage {
    public key: string;
    public value: any;

    constructor(key: string) {
        this.key = key;
        this.value = this.read();
    }

    save() {
        localStorage.setItem(this.key, JSON.stringify(this.value));
    }

    read(): any {
        const value: string | null = localStorage.getItem(this.key);
        if (!value) return null;
        return JSON.parse(value);
    }
}

export default LocalStorage;
