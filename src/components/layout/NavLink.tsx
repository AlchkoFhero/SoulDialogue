import React from 'react';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  mobile?: boolean;
}

export function NavLink({ href, children, mobile }: NavLinkProps) {
  const baseStyles = "text-gray-700 hover:text-amber-800 transition-colors duration-200";
  const mobileStyles = mobile
    ? "block px-3 py-2 text-base font-medium"
    : "text-sm font-medium";

  return (
    <a href={href} className={`${baseStyles} ${mobileStyles}`}>
      {children}
    </a>
  );
}