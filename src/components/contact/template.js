import "./styles.css";
export default function getTemplate(contact) {
  return ` 
    <li>${contact.firstName}</li>
    `;
}
