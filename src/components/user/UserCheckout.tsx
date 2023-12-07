import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import UserForm from "./UserForm";
import Review from "./UserReview";

import { api } from "@/utils/api";
import { Page } from "../Dashboard";

const UserCheckout: React.FC<{
  setDataTableView: React.Dispatch<React.SetStateAction<Page>>;
  type: string;
}> = ({ setDataTableView, type }) => {
  const steps = [`录入${type}信息`, `确认${type}信息`];
  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return <UserForm course={course} setCourse={setCourse} />;
      case 1:
        return <Review course={course} />;
      default:
        throw new Error("Unknown step");
    }
  }

  const [activeStep, setActiveStep] = React.useState(0);
  const handleNext = () => {
    if (activeStep === steps.length) {
      setDataTableView(Page.User);
    } else {
      setActiveStep(activeStep + 1);
    }
  };
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            {`申请职责变更为${type}`}
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                申请成功
              </Typography>
              <Typography variant="subtitle1">申请成功</Typography>
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  返回
                </Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    上一步
                  </Button>
                )}
                <Button
                  variant="contained"
                  onClick={() => {
                    // database
                    handleNext();
                  }}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? "提交" : "下一步"}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
      </Container>
    </React.Fragment>
  );
};

export default UserCheckout;
