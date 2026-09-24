import { CONTACT, mailUrl } from "@/content/home.config";

export function Footer() {
  return (
    <footer className="ftr">
      <span className="ftr__brand" translate="no">BIRO.mov</span>
      <span className="ftr__year">© {new Date().getFullYear()}</span>
      <ul className="ftr__links">
        <li>
          <a href={CONTACT.instagramUrl} target="_blank" rel="noopener noreferrer">Instagram</a>
        </li>
        <li>
          <a href={CONTACT.youtubeUrl} target="_blank" rel="noopener noreferrer">YouTube</a>
        </li>
        <li>
          <a href={mailUrl}>E-mail</a>
        </li>
      </ul>
    </footer>
  );
}
