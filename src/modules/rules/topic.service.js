import { db, saveDB } from "../../core/db.js";

export const TopicService = {
  getAll() {
    return db.topics;
  },

  create(name) {
    const topic = {
      id: Date.now(),
      name,
    };

    db.topics.push(topic);
    saveDB();
    return topic;
  },

  delete(id) {
    db.topics = db.topics.filter((t) => t.id !== Number(id));
    saveDB();
  },
};
