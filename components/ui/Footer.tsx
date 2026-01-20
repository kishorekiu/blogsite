import Link from "next/link";
import React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-gray-50 border-t border-gray-200 dark:bg-gray-950 dark:border-gray-800 mt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Column 1: Brand & Disclaimer (Takes up 2 columns on desktop) */}
          <div className="md:col-span-2">
            <Link
              href="/"
              className="text-2xl font-bold text-blue-600 dark:text-blue-400"
            >
              BlogSite
            </Link>
            <p className="mt-4 text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-xs">
              A community-driven platform for developers to share knowledge,
              snippets, and stories. Opinions expressed here are those of the
              individual authors.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
              Platform
            </h4>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <li>
                <Link
                  href="/"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/blogs"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Explore Blogs
                </Link>
              </li>
              <li>
                <Link
                  href="/blogs/create"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Write an Article
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal & Social */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
              Connect
            </h4>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <li>
                <Link
                  href="#"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              {/* Social Icons Row */}
              <li className="flex gap-4 pt-2">
                <a
                  href="#"
                  className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  <GitHubIcon fontSize="small" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  <TwitterIcon fontSize="small" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-700 transition-colors"
                >
                  <LinkedInIcon fontSize="small" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright */}
        <div className="pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400 text-center sm:text-left">
            © {currentYear} BlogSite. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <span>Made with ❤️ by</span>
            <span className="font-medium text-gray-600 dark:text-gray-300">
              Kishore
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
