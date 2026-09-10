// Navigation Configuration - single source of truth for the header nav,
// the header scroll-spy and the footer's Quick Links column.

export interface NavLink {
  href: string;
  label: string;
  // id of the <section> this link targets; drives the header scroll-spy.
  section: string;
  // The footer lists a shorter subset than the header.
  showInFooter: boolean;
}

export const navLinks: NavLink[] = [
  { href: '#', label: 'Home', section: 'hero', showInFooter: false },
  { href: '#about', label: 'About', section: 'about', showInFooter: true },
  { href: '#skills', label: 'Skills', section: 'skills', showInFooter: true },
  { href: '#services', label: 'Services', section: 'services', showInFooter: true },
  { href: '#projects', label: 'Projects', section: 'projects', showInFooter: true },
  { href: '#experience', label: 'Experience', section: 'experience', showInFooter: true },
  { href: '#certifications', label: 'Certificates', section: 'certifications', showInFooter: false },
  { href: '#contact', label: 'Contact', section: 'contact', showInFooter: true },
];

export const footerNavLinks: NavLink[] = navLinks.filter((link) => link.showInFooter);
