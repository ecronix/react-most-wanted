import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CountUp from "react-countup";
import Days from "../../containers/Reports/Days";
import Months from "../../containers/Reports/Months";
import { Scrollbar, Page } from "@ecronix/material-ui-shell";
import Providers from "../../containers/Reports/Providers";
import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import { useIntl } from "react-intl";
import { useFirebasePaths } from "@ecronix/rmw-shell";

const ReportContainer = ({ children }) => {
  return (
    <div
      style={{
        minWidth: 300,
        margin: 8,
        flex: 0.45,
        height: "100%",
      }}
    >
      <Card>
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  );
};

export default function DashboardPage() {
  const intl = useIntl();
  const { watchPath, getPath, unwatchPath } = useFirebasePaths();
  const users_count = getPath("users_count", 0);

  useEffect(() => {
    watchPath("users_count");
    return () => {
      unwatchPath("users_count");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Page
      pageTitle={intl.formatMessage({
        id: "dashboard",
        defaultMessage: "Dashboard",
      })}
    >
      <Scrollbar
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            alignContent: "stretch",
          }}
        >
          <Card
            style={{
              minWidth: 300,
              margin: 8,
              flex: 0.45,
            }}
          >
            <CardContent>
              <Typography color="textSecondary" variant="h5" gutterBottom>
                {intl.formatMessage({
                  id: "registered_usres",
                  defaultMessage: "Registered Users",
                })}
              </Typography>
            </CardContent>
            <div
              style={{
                display: "flex",
                width: "100%",
                height: "70%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CardContent>
                <Typography variant="h1" fontWeight={"bold"}>
                  <CountUp end={users_count || 0} duration={2} />
                </Typography>
              </CardContent>
            </div>
          </Card>

          <ReportContainer>
            <Months />
          </ReportContainer>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <ReportContainer>
            <Days />
          </ReportContainer>
          <ReportContainer>
            <Providers />
          </ReportContainer>
        </div>
      </Scrollbar>
    </Page>
  );
}
