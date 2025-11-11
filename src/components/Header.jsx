import chefLogo from "../assets/logo-icon.png";

export default function Header() {
  return (
    <header>
      <img className="logo" src={chefLogo} alt="chef logo" />
      <h1>Recipe Genie</h1>
    </header>
  );
}
