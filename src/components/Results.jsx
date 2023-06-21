import React from "react";
import Tabs from "@mui/base/Tabs";
import TabsList from "@mui/base/TabsList";
import TabPanel from "@mui/base/TabPanel";
import Tab from "@mui/base/Tab";

import ModuleTranslations from "./ModuleTranslations";

const Results = ({ data, token }) => {
  return (
    <Tabs defaultValue={1}>
      <TabsList>
        {data.map((item, index) => (
          <Tab value={index + 1} key={item.moduleName}>
            {item.moduleName}
          </Tab>
        ))}
      </TabsList>
      {data.map((item, index) => (
        <TabPanel value={index + 1} key={item.moduleName}>
          <ModuleTranslations data={item} token={token} />
        </TabPanel>
      ))}
    </Tabs>
  );
};

export default Results;
