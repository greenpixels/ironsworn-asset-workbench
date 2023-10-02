/** @format */

import { Button } from "antd";
import Link from "antd/es/typography/Link";

type OriginalContentWarningProps = {
  onHide?: () => void;
};

export default function OriginalContentWarning(
  props: OriginalContentWarningProps
) {
  return (
    <div>
      <span>
        {"This work is from "}
        <Link href="https://www.ironswornrpg.com" target="_blank">
          Ironsworn
        </Link>
        {", created by Shawn Tomkin, and licensed for use under the "}
        <Link
          href="https://www.creativecommons.org/licenses/by-nc-sa/4.0/"
          target="_blank"
        >
          Creative Commons Attribution-NonCommercial-ShareAlike 4.0
          International
        </Link>
        {" license."}
      </span>

      {props.onHide && (
        <>
          <br />
          <br />
          <Button
            ghost
            type="primary"
            style={{ border: "none", padding: "0" }}
            onClick={() => props.onHide!()}
          >
            Hide
          </Button>
        </>
      )}
    </div>
  );
}
