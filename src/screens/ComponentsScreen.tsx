import React from "react";
import { StyleSheet, Text } from "react-native";
import { ScreenContainer } from "../components/layout/ScreenContainer";
import { Container } from "../components/layout/Container";
import { Grid, GridItem } from "../components/layout/Grid";
import { Card } from "../components/layout/Card";
import { ComponentsShowcase } from "../components/ComponentsShowcase";
import { ThemeShowcase } from "../components/ThemeShowcase";
import { ToastShowcase } from "../components/ToastShowcase";
import { useResponsive } from "../utils/responsive";
import { ErrorBoundaryShowcase } from "../components/showcase/ErrorBoundaryShowcase";

export const ComponentsScreen = () => {
  const { device, layout } = useResponsive();
  const columns = device === "phone" ? 1 : 2;

  return (
    <ScreenContainer>
      <Container>
        <Grid columns={columns} spacing={layout.gutter}>
          <GridItem>
            <Card variant="elevated">
              <ComponentsShowcase />
            </Card>
          </GridItem>

          <GridItem>
            <Card variant="elevated">
              <ThemeShowcase />
            </Card>
          </GridItem>

          <GridItem span={columns}>
            <Card variant="elevated">
              <ToastShowcase />
            </Card>
          </GridItem>

          <GridItem>
            <Card variant="elevated">
              <ErrorBoundaryShowcase />
            </Card>
          </GridItem>
        </Grid>
      </Container>
    </ScreenContainer>
  );
};
