import { Box, Image } from "@chakra-ui/react";
import React from "react";
import { Icon, List, Typography } from "@mui/material";
import { Flex } from "antd";
// import logo from "assets/Images/aqib-logo.png";
import {
  Dashboard,
  ExpandLess,
  ExpandMore,
  SpaceDashboard,
} from "@mui/icons-material";
function Sidebar(props) {
  const mainPanel = React.useRef();
  let sidebarBg = props.bgColor;
  let expanding = true;
  let active = false;

  // SIDEBAR
  return (
    <Box ref={mainPanel}>
      <Box display={{ sm: "none", xl: "block" }} position="fixed">
        <Box
          bg="#262626"
          w="calc(100vh - 479px)"
          maxW="240px"
          ms={{
            sm: "16px",
          }}
          my={{
            sm: "16px",
          }}
          h="calc(100vh - 32px)"
          ps="20px"
          pe="20px"
          style={{
            position: "fixed",
          }}
        >
          <Flex
            style={{
              paddingTop: "25px",
              paddingBottom: "25px",
              paddingLeft: "25px",
              flexWrap: "wrap",
            }}
          >
            <Box>
              {/* <Image
                src={logo}
                style={{
                  width: "30px",
                }}
              /> */}
            </Box>
            <Box
              style={{
                padding: "5px",
              }}
            >
              <Typography fontSize={"inherit"}>{props.logoText}</Typography>
            </Box>
          </Flex>
          <Box>
            <Flex
              style={{
                backgroundColor: !active ? "transparent" : "#ffffff",
                boxShadow: !active ? "none" : "1px 1px #88888896",
                borderRadius: "10px",
                paddingTop: "10px",
                paddingBottom: "10px",
                paddingLeft: "25px",
              }}
            >
              <Box
                style={{
                  backgroundColor: !active ? "#ffffff" : "#003d9a",
                  borderRadius: "10px",
                  paddingTop: "3px",
                  paddingRight: "3px",
                  paddingLeft: "3px",
                  boxShadow: "1px 1px #88888896",
                }}
              >
                <SpaceDashboard
                  style={{ color: !active ? "#003d9a" : "#ffffff" }}
                />
              </Box>
              <Box
                style={{
                  width: "calc(100% - 50px)",
                }}
              >
                <Typography
                  fontSize={"medium"}
                  style={{
                    marginLeft: "10px",
                    marginTop: "5px",
                    fontWeight: "bold",
                    color: !active ? "#a0aec0" : "#000000",
                  }}
                >
                  Dashboard
                </Typography>
              </Box>
              {expanding ? (
                !active ? (
                  <ExpandMore
                    fontSize="small"
                    style={{
                      color: "#a0aec0",
                      // fontSize:"20px",
                      marginTop: "5px",
                      marginRight: "5px",
                    }}
                  />
                ) : (
                  <ExpandLess
                    style={{
                      color: "#000000",
                      // fontSize:"20px",
                      marginTop: "5px",
                      marginRight: "5px",
                    }}
                  />
                )
              ) : (
                <></>
              )}
            </Flex>
            <List></List>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Sidebar;
