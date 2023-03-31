import React from "react";
import { Button, Result } from "antd";
import Link from "next/link";

class UnderConstruction extends React.PureComponent {
  constructor() {
    super();
  }
  render() {
    return (
      <Result
        status="404"
        title="Under Development"
        subTitle="This page is under development, come back later to check latest updates."
        extra={
          <Link href={"/"}>
            <Button type="primary" size={"large"}>
              Back Home
            </Button>
          </Link>
        }
      />
    );
  }
}

export default UnderConstruction;
