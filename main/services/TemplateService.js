const fs = require('fs');
const path = require('path');

const templatesPath = path.join(__dirname, '../../config/templates.json');

const getTemplates = () => {
	if (!fs.existsSync(templatesPath)) {
		fs.writeFileSync(templatesPath, JSON.stringify([]));
	}
	return JSON.parse(fs.readFileSync(templatesPath));
};

const saveTemplate = (template) => {
	const templates = JSON.parse(fs.readFileSync(templatesPath));
	templates.push(template);
	fs.writeFileSync(templatesPath, JSON.stringify(templates, null, 2));
};

const deleteTemplate = (templateName) => {
	const templates = JSON.parse(fs.readFileSync(templatesPath));
	const filteredTemplates = templates.filter((t) => t.name !== templateName);
	fs.writeFileSync(templatesPath, JSON.stringify(filteredTemplates, null, 2));
};

const activateTemplate = (templateName) => {
    fs.writeFileSync(
    path.join(__dirname, "../../config/activeTemplate.json"),
        JSON.stringify({ name: templateName })
    );
};

module.exports = { getTemplates, saveTemplate, deleteTemplate, activateTemplate };