import Link from "next/link";
import React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

// --- Configuration Data ---
const footerData = {
  brand: {
    title: "BlogSite",
    description:
      "A community-driven platform for developers to share knowledge, snippets, and stories. Opinions expressed here are those of the individual authors.",
  },
  columns: [
    {
      title: "Platform",
      links: [
        { label: "Home", href: "/" },
        { label: "Explore Blogs", href: "/blogs" },
        { label: "Write an Article", href: "/blogs/create" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "/privacy" }, // Placeholder routes
        { label: "Terms of Service", href: "/terms" },
      ],
    },
  ],
  socials: [
    {
      icon: <GitHubIcon fontSize="small" />,
      href: "https://github.com",
      label: "GitHub",
    },
    {
      icon: <TwitterIcon fontSize="small" />,
      href: "https://twitter.com",
      label: "Twitter",
    },
    {
      icon: <LinkedInIcon fontSize="small" />,
      href: "https://linkedin.com",
      label: "LinkedIn",
    },
  ],
  copyright: {
    text: "BlogSite. All rights reserved.",
    madeBy: "Kishore",
  },
};

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-gray-50 border-t border-gray-200 dark:bg-gray-950 dark:border-gray-800 mt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* 1. Brand Section (Spans 2 columns) */}
          <div className="md:col-span-2">
            <Link
              href="/"
              className="text-2xl font-bold text-blue-600 dark:text-blue-400"
            >
              {footerData.brand.title}
            </Link>
            <p className="mt-4 text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-xs">
              {footerData.brand.description}
            </p>
          </div>

          {/* 2. Dynamic Columns Loop */}
          {footerData.columns.map((col, index) => (
            <div key={index}>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                {col.title}
              </h4>
              <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                {col.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}

                {/* 3. Socials (Only show on the last column for design balance) */}
                {index === footerData.columns.length - 1 && (
                  <li className="flex gap-4 pt-4">
                    {footerData.socials.map((social, sIndex) => (
                      <a
                        key={sIndex}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        {social.icon}
                      </a>
                    ))}
                  </li>
                )}
              </ul>
            </div>
          ))}
        </div>

        {/* 4. Copyright Section */}
        <div className="pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400 text-center sm:text-left">
            © {currentYear} {footerData.copyright.text}
          </p>
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <span>Made with ❤️ by</span>
            <span className="font-medium text-gray-600 dark:text-gray-300">
              {footerData.copyright.madeBy}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
