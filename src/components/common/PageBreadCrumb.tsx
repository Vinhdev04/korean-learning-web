import React from "react";
import { useTranslations } from "next-intl";
interface BreadcrumbProps {
  pageTitle: string;
}
const PageBreadcrumb: React.FC<BreadcrumbProps> = ({ pageTitle }) => {
  const t = useTranslations();
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
      <h2
        className="text-xl font-semibold text-gray-800 dark:text-white/90"
        x-text="pageName"
      >
        {t(pageTitle ||'')}
      </h2>
      {/* <nav>
        <ol className="flex items-center gap-1.5">
          <li className="text-sm text-gray-800 dark:text-white/90">
            {t(pageTitle)}
          </li>
        </ol>
      </nav> */}
    </div>
  );
};

export default PageBreadcrumb;
