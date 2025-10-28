class JournalEntry {
    constructor(title, graditute, content, date = new Date().toISOString()) {
        this.title = title;
        this.graditute = graditute;
        this.todo = todo;
        this.good_deed = good_deed;
        this.learning = learning;
        this. highlights = highlights;
        this.content = content;
        this.date = date;
    }

    toJSON() {
        return { title: this.title, content: this.content, date: this.date };
    }
}
