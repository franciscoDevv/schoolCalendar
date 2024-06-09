
export const subjectIcons = {
  "Diseño de Prototipos Web": "fa-code",
  "Historia": "fa-landmark",
  "Ciencias para la Ciudadanía": "fa-flask",
  "Matemáticas": "fa-square-root-alt",
  "Lenguaje": "fa-book",
  "Bases de Datos": "fa-database"
};

export function getSubjectIcon(subject) {
  return subjectIcons[subject] || "fa-question";
}
