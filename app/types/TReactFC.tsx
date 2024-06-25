import { FunctionComponent, ReactElement } from "react";

interface ReactFCProps {
  children: ReactElement;
}

export type ReactFC = FunctionComponent<ReactFCProps>;
