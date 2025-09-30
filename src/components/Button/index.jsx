import "./SimpleButton.css";

export default function SimpleButton({ label, color = "blue" }) {
  return (
    <button className={`btn ${color}`}>
      {label}
    </button>
  );
}
