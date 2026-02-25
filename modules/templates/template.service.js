import { db, saveDB } from "../../core/db.js";

export const TemplateService = {
  getAll() {
    return [...db.releaseTemplates];
  },

  getById(id) {
    return db.releaseTemplates.find((t) => t.id === Number(id));
  },

  create(name, description) {
    const newTemplate = {
      id: Date.now(),
      name,
      description,
      ruleIds: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    db.releaseTemplates.push(newTemplate);
    saveDB();

    return newTemplate;
  },

  update(id, data) {
    const index = db.releaseTemplates.findIndex((t) => t.id === Number(id));

    if (index === -1) return;

    db.releaseTemplates[index] = {
      ...db.releaseTemplates[index],
      ...data,
      updatedAt: Date.now(),
    };

    saveDB();
  },

  delete(id) {
    db.releaseTemplates = db.releaseTemplates.filter(
      (t) => t.id !== Number(id),
    );

    saveDB();
  },

  toggleRule(templateId, ruleId) {
    const template = this.getById(templateId);
    if (!template) return;

    if (template.ruleIds.includes(ruleId)) {
      template.ruleIds = template.ruleIds.filter((id) => id !== ruleId);
    } else {
      template.ruleIds.push(ruleId);
    }

    template.updatedAt = Date.now();
    saveDB();
  },
};
