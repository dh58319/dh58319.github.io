// Shared pill list used for skills, research interests, and project tags.
export default function SkillList({ items, compact = false }) {
  return (
    <ul className={`skill-list${compact ? ' compact' : ''}`}>
      {items.map((item) => (
        <li key={item} className="skill">
          {item}
        </li>
      ))}
    </ul>
  )
}
