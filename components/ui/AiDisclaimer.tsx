import { AutoAwesomeMosaicOutlined } from "@mui/icons-material";
import React from "react";

const AiDisclaimer = () => {
  return (
    <div className="mt-4 flex gap-2 items-start text-xs text-gray-400 dark:text-gray-500 max-w-lg mx-auto bg-blue-50 dark:bg-blue-900/10 p-3 rounded-lg border border-blue-100 dark:border-blue-900/20">
      <AutoAwesomeMosaicOutlined className="text-blue-500 w-4 h-4 mt-0.5 flex-shrink-0" />
      <p>
        To ensure a safe community, our <strong>AI Safety Agent</strong>{" "}
        analyzes all content before publication. Abusive, explicit, or spam
        content will be rejected.
      </p>
    </div>
  );
};

export default AiDisclaimer;
