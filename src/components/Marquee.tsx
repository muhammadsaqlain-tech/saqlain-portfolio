/**
 * Marquee — an infinite ticker of the toolkit, sitting between the hero
 * and the about section. Pure CSS animation; pauses on hover.
 * Marked aria-hidden because it decorates content the Skills section
 * already presents accessibly.
 */
const items = [
  "Linux",
  "Python",
  "SQL",
  "C#",
  "C++",
  "Bash",
  "Git",
  "HTML / CSS",
  ".NET",
  "AWS",
  "Networking",
];

export default function Marquee() {
  // Rendered twice so the -50% loop has no visible seam.
  const row = [...items, ...items];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {row.map((item, index) => (
          <span className="marquee-item" key={index}>
            {item}
            <i className="marquee-star">✦</i>
          </span>
        ))}
      </div>
    </div>
  );
}
