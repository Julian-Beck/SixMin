class JournalEntry {
    constructor(id, graditutes, actions, good, learning, highlights, date = new Date().toISOString()) {
        this.id = id;
        this.graditutes = graditutes;
        this.actions = actions;
        this.good = good;
        this.learning = learning;
        this.highlights = highlights;
        this.date = date;
    }

    toJSON() {
        return { title: this.title, content: this.content, date: this.date };
    }
}

export default JournalEntry;
