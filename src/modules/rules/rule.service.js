import { db, saveDB } from "../../core/db.js";

export const RuleService = {
  getAll() {
    return [...db.testCases];
  },

  getById(id) {
    const rule = db.testCases.find((tc) => tc.id === Number(id));
    return rule ? JSON.parse(JSON.stringify(rule)) : null;
  },

  getByTopic(topicId) {
    return db.testCases.filter((tc) => tc.topicId === Number(topicId));
  },

  create(topicId, title) {
    const newRule = {
      id: Date.now(),
      topicId: Number(topicId),
      title,
      description: "",
      requirements: "",
      expected: "",
      stepsList: [],
      status: "Em Dev",
      versionHistory: [],
      lastUpdated: Date.now(),
    };

    db.testCases.push(newRule);
    saveDB();

    return JSON.parse(JSON.stringify(newRule));
  },

  update(id, data) {
    const index = db.testCases.findIndex((tc) => tc.id === Number(id));

    if (index === -1) return;

    db.testCases[index] = {
      ...data,
      id: Number(id),
      lastUpdated: Date.now(),
    };

    saveDB();
  },

  delete(id) {
    db.testCases = db.testCases.filter((tc) => tc.id !== Number(id));

    saveDB();
  },

  rename(id, newTitle) {
    const index = db.testCases.findIndex((tc) => tc.id === Number(id));

    if (index === -1) return;

    db.testCases[index].title = newTitle;
    db.testCases[index].lastUpdated = Date.now();

    saveDB();
  },

  calculateTopicRisk(topicId) {
    const rules = this.getByTopic(topicId);

    if (
      rules.some(
        (r) =>
          r.status === "Implementada" && (!r.stepsList?.length || !r.expected),
      )
    )
      return "HIGH";

    if (rules.some((r) => r.status === "Em Dev")) return "MEDIUM";

    return "LOW";
  },
};
