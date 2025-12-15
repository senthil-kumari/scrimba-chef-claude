// import chefLogo from "../assets/logo-icon.png";
import chefLogo from "../assets/chef-logo.svg";

export default function Header() {
  return (
    <>
      <header>
        <img className="logo" src={chefLogo} alt="chef logo" />
      </header>
      <p className="tag-line">
        ~ Tell me what you have,<em> I'll tell you what to cook! ~</em>
      </p>
    </>
  );
}
