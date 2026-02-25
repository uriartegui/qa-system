import { db, saveDB } from "../../core/db.js";
import { RuleService } from "../rules/rule.service.js";

export const ExecutionService = {
  getAll() {
    return [...db.regressions];
  },

  getById(id) {
    return db.regressions.find((r) => r.id === Number(id));
  },

  createFromTemplate(template) {
    const rules = template.ruleIds
      .map((id) => RuleService.getById(id))
      .filter(Boolean);

    const newRegression = {
      id: Date.now(),
      name: `${template.name} - ${new Date().toLocaleDateString()}`,
      templateId: template.id,
      date: Date.now(),
      results: rules.map((rule) => ({
        ruleId: rule.id,
        title: rule.title,
        status: "Não Executado",
        evidence: "",
      })),
    };

    db.regressions.push(newRegression);
    saveDB();

    return newRegression;
  },
};
