import React from "react";
import { api } from "@/utils/api";

const Test = () => {
  const createExecutor = api.executor.create.useMutation({
    onSuccess: () => {},
  });

  const onclick = () => {
    createExecutor.mutate({
      name: "testname",
      status: "teststatus",
    });
  };

  return (
    <div>
      <h1>Test</h1>
      <button onClick={onclick}>11</button>
    </div>
  );
};

export default Test;
