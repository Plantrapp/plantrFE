import React, { useState } from "react";
import NewPortfolioPost from "./NewPortfolioPost";
import NewBlogPost from "./NewBlogPost";

export default function NewPost() {
  const [component, setComponent] = useState(1);

  return (
    <div>
      {(() => {
        switch (component) {
          case 1:
            return <NewPortfolioPost changeComponent={setComponent} />;
          case 2:
            return <NewBlogPost changeComponent={setComponent} />;
        }
      })()}
    </div>
  );
}
